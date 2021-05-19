import { isEmpty, forEach } from 'lodash'
import { Strategy } from '@/interfaces/strategy'
import { STRATEGY_ROUTE, AxiosGet } from '@/api/AxiosService'

export async function list (token: string) {
  try {
    const response = await AxiosGet(STRATEGY_ROUTE, token)

    const strategies = [] as any

    if (!isEmpty(response) && Object.keys(response).length > 0) {
      Object.keys(response).forEach(function (key) {
        const strategy = {
          id: parseInt(key),
          name: response[key]
        } as Strategy

        strategies.push(strategy)
      })

      return strategies
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
