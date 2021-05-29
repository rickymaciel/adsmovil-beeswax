import { forEach, isEmpty } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { Matching } from '@/interfaces/matching'

const ROUTES = require('../routes').MATCHING

export async function matchings (token: string) {
  try {
    const response = await AxiosGet(ROUTES.MATCHING_ROUTE, token)

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
