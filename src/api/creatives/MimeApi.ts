import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { Mime } from '@/interfaces/creative'
import { forEach } from 'lodash'

const ROUTES = require('../routes').CREATIVES

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CREATIVE_MIME_ROUTE, token)

    const mimeTypes = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const mt = {
          id: value.id,
          type: value.type,
          description: value.description,
          extra: value.extra
        } as Mime

        mimeTypes.push(mt)
      })

      return success('', mimeTypes)
    }

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
