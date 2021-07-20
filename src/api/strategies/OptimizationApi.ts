import { isEmpty, forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { Optimization } from '@/interfaces/strategy'

const ROUTES = require('../routes').STRATEGIES

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.STRATEGY_OPTIMIZATION_ROUTE, token)

    const optimizations = [] as any

    if (response.success) {
      let data = response.content

      if (Object.keys(data).length > 0) {
        Object.keys(data).forEach(function (key) {
          const opt = {
            id: parseInt(key),
            name: response[key]
          } as Optimization

          optimizations.push(opt)
        })

        return optimizations
      }
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
