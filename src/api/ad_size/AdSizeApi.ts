import { isEmpty, isUndefined, forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { CreativeSize } from '@/interfaces/ad_size'

const ROUTES = require('../routes').AD_SIZE

export async function creativeSize (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CREATIVE_SIZE_ROUTE, token)

    const creatives = [] as any

    if (!isEmpty(response) && response.length > 0) {
      forEach(response, function (value, key) {
        const cs = {
          id: value.id,
          name: value.name, //Key to use
          width: value.width,
          height: value.height,
          category: value.category
        } as CreativeSize

        creatives.push(cs)
      })

      return creatives
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
