import { isEmpty, forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { Exchange } from '@/interfaces/custom_list'

const ROUTES = require('../routes').CUSTOM_LIST

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CUSTOM_LIST_EXCHANGE_ROUTE, token)

    const exchanges = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const exc = {
          id: value.id,
          description: value.description,
          abbreviation: value.abbreviation
        } as Exchange

        exchanges.push(exc)
      })

      return exchanges
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
