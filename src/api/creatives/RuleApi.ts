import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { Rule } from '@/interfaces/creative'
import { forEach } from 'lodash'

const ROUTES = require('../routes').CREATIVES

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CREATIVE_RULE_ROUTE, token)

    const rules = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const rule = {
          id: value.id,
          type: value.type,
          description: value.description,
          external_id: value.external_id,
          key: value.key,
          order: value.order,
          auto_detect_string: value.auto_detect_string
        } as Rule

        rules.push(rule)
      })

      return success('', rules)
    }

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
