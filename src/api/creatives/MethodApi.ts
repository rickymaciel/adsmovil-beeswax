import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { Method } from '@/interfaces/creative'

const ROUTES = require('../routes').CREATIVES

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CREATIVE_METHOD_ROUTE, token)

    const types = [] as any

    if (response.success) {
      let data = response.content

      if (Object.keys(data).length > 0) {
        Object.keys(data).forEach(function (key) {
          const type = {
            id: parseInt(key),
            name: data[key]
          } as Method

          types.push(type)
        })

        return success('', types)
      }
    }

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
