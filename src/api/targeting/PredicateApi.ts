import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { Predicate } from '@/interfaces/predicate'

const ROUTES = require('../routes').TARGETING

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.TARGETING_PREDICATE_ROUTE, token)

    const predicates = [] as any

    if (response.success) {
      const data = response.content

      if (Object.keys(data).length > 0) {
        Object.keys(data).forEach(function (key) {
          const predicate = {
            id: parseInt(key),
            value: data[key]
          } as Predicate

          predicates.push(predicate)
        })

        return success('', predicates)
      }
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
