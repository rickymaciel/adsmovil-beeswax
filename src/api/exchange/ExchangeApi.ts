import { isEmpty, isUndefined, forEach } from 'lodash'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { AuctionType, InventorySource } from '@/interfaces/exchange'

const ROUTES = require('../routes').EXCHANGE

export async function auctionTypes (token: string) {
  try {
    const response = await AxiosGet(ROUTES.AUCTION_TYPE_ROUTE, token)

    const types = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const type = {
          id: value.id,
          type: value.type,
          description: value.description,
          extra: value.extra
        } as AuctionType

        types.push(type)
      })

      return success('', types)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function inventorySources (token: string) {
  try {
    const response = await AxiosGet(ROUTES.INVENTORY_SOURCE_ROUTE, token)

    const types = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const type = {
          id: value.id,
          external_id: value.external_id,
          name: value.name,
          key: value.key,
          mobile_app: value.mobile_app,
          mobile_web: value.mobile_web,
          mobile_native: value.mobile_native,
          desktop: value.desktop,
          desktop_native: value.desktop_native,
          video: value.video,
          other: value.other
        } as InventorySource

        types.push(type)
      })

      return success('', types)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
