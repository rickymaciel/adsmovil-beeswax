import { isEmpty, forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { Strategy } from '@/interfaces/strategy'

const ROUTES = require('../routes').STRATEGIES

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.STRATEGY_ROUTE, token)

    const strategies = [] as any

    if (response.success) {
      let data = response.content

      if (Object.keys(data).length > 0) {
        Object.keys(data).forEach(function (key) {
          const strategy = {
            id: parseInt(key),
            name: response[key]
          } as Strategy

          strategies.push(strategy)
        })

        return strategies
      }
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
