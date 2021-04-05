import { isEmpty, forEach } from 'lodash'
import { CUSTOM_LIST_EXCHANGE_ROUTE, AxiosGet } from '@/api/AxiosService'
import { Exchange } from '@/interfaces/custom_list'

export async function list (token: string) {
  try {
    const response = await AxiosGet(CUSTOM_LIST_EXCHANGE_ROUTE, token)

    const exchanges = [] as any

    if (!isEmpty(response) && response.length > 0) {
      forEach(response, function (value, key) {
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
