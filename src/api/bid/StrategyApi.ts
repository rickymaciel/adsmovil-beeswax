import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { Strategy } from '@/interfaces/bid'

const ROUTES = require('../routes').BID

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.BID_STRATEGY_ROUTE, token)

    const strategies = [] as any

    if (response.success) {
      let data = response.content

      if (Object.keys(data).length > 0) {
        Object.keys(data).forEach(function (key) {
          const strategy = {
            id: parseInt(key),
            name: data[key]
          } as Strategy

          strategies.push(strategy)
        })

        return success('', strategies)
      }
    }

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
