import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { Rate } from '@/interfaces/bid'
import { forEach } from 'lodash'

const ROUTES = require('../routes').BID

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.BID_RATE_ROUTE, token)

    const rates = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const rate = {
          id: value.id,
          type: value.type,
          description: value.description,
          extra: value.extra
        } as Rate

        rates.push(rate)
      })

      return success('', rates)
    }

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
