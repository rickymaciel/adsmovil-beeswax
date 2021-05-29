import { isEmpty, isUndefined, forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { AdPosition } from '@/interfaces/inventory'

const ROUTES = require('../routes').INVENTORY

export async function adPositions (token: string) {
  try {
    const response = await AxiosGet(ROUTES.AD_POSITION_ROUTE, token)

    const positions = [] as any

    if (!isEmpty(response) && response.length > 0) {
      forEach(response, function (value, key) {
        const dl = {
          id: value.id,
          type: value.type,
          description: value.description,
          external_id: value.external_id, //Key to use
          open_rtb_code: value.open_rtb_code
        } as AdPosition

        positions.push(dl)
      })

      return positions
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
