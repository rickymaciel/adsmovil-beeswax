import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { Template } from '@/interfaces/creative'
import { forEach } from 'lodash'

const ROUTES = require('../routes').CREATIVES

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CREATIVE_TEMPLATE_ROUTE, token)

    const templates = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const template = {
          id: value.id,
          external_id: value.external_id,
          creative_type_id: value.creative_type_id,
          name: value.name,
          template_content: value.template_content
        } as Template

        templates.push(template)
      })

      return success('', templates)
    }

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
