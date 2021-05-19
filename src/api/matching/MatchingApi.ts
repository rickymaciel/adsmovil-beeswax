import { forEach, isEmpty } from 'lodash'
import { AxiosPost, MATCHING_ROUTE, AxiosGet, AxiosPatch } from '@/api/AxiosService'
import { Matching } from '@/interfaces/matching'

export async function matchings (token: string) {
  try {
    const response = await AxiosGet(MATCHING_ROUTE, token)

    const matchings = [] as any

    if (!isEmpty(response) && Object.keys(response).length > 0) {
      Object.keys(response).forEach(function (key) {
        const matching = {
          id: parseInt(key),
          name: response[key]
        } as Matching

        matchings.push(matching)
      })

      return matchings
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
