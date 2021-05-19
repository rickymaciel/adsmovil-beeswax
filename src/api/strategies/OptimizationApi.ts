import { isEmpty, forEach } from 'lodash'
import { Optimization } from '@/interfaces/strategy'
import { STRATEGY_OPTIMIZATION_ROUTE, AxiosGet } from '@/api/AxiosService'

export async function list (token: string) {
  try {
    const response = await AxiosGet(STRATEGY_OPTIMIZATION_ROUTE, token)

    const optimizations = [] as any

    if (!isEmpty(response) && Object.keys(response).length > 0) {
      Object.keys(response).forEach(function (key) {
        const opt = {
          id: parseInt(key),
          name: response[key]
        } as Optimization

        optimizations.push(opt)
      })

      return optimizations
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
