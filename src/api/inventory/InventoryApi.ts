import { isEmpty, isUndefined, forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import {  AdPosition, 
          AppInventory, 
          InterstitialTypes, 
          InventorySource, 
          DealIdList,
          PlacementId,
          PublisherId,
          SiteList
        } 
from '@/interfaces/inventory'

const ROUTES = require('../routes').INVENTORY

export async function adPositions (token: string) {
  try {
    const response = await AxiosGet(ROUTES.AD_POSITION_ROUTE, token)

    const positions = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
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

export async function appInventory (key: string, token: string) {

  let url = ''

  switch (key) {
    case 'auction_type':
      url = ROUTES.AUCTION_TYPE_ROUTE
      break
    case 'environment_types':
      url = ROUTES.ENVIROMENT_TYPE_ROUTE
      break
    case 'interstitial':
        url = ROUTES.INTERSTITIAL_FLAGS
        break
    case 'video_api':
        url = ROUTES.INVENTORY_VIDEO_APIS
        break
    default:
      return error(`The key "${key}" is invalid`, [])
  }

  try {
    const response = await AxiosGet(url, token)

    const inventorys = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const inventory_app = {
          id: value.id,
          type: value.type,
          description: value.description,
          extra: value.extra
        } as AppInventory

        inventorys.push(inventory_app)
      })

      return inventorys
    }
    
    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function interstitialTypes (token: string) {
  try {
    const response = await AxiosGet(ROUTES.INTESTITIAL_TYPES, token)

    const shadings = [] as any

    if (response.success) { 
      let data = response.content
    
      if (Object.keys(data).length > 0) {

        const shading = {
          BANNER_AND_VIDEO: data['BANNER_AND_VIDEO'],
          BANNER: data['BANNER'],
          VIDEO: data['VIDEO']
        } as InterstitialTypes
  
        shadings.push(shading)
        /*
        Object.keys(data).forEach(function (key) {
          const shading = {
            banner_and_video: data['BANNER_AND_VIDEO'],
            banner: data['BANNER'],
            video: data['VIDEO']
          } as InterstitialTypes

          shadings.push(shading)
        })*/
        
        return success('', shadings)
      }
    }

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

export async function dealIdList (token: string) {
  try {
    const response = await AxiosGet(ROUTES.DEAL_ID_LIST_ROUTE, token)

    const types = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const datos = {
          id: value.id,
          account_id: value.account_id,
          external_id: value.external_id,
          name: value.name,
          custom_list_type_id: value.custom_list_type_id,
          delimiter: value.delimiter,
          default_radius_km: value.default_radius_km,
          notes: value.notes,
          active: value.active,
          terms_count: value.terms_count
        } as DealIdList

        types.push(datos)
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

export async function placementId (token: string) {

  try {
    const response = await AxiosGet(ROUTES.PLACEMENT_ROUTE, token)

    const types = [] as any

    if (response.success) {
      const data = response.content
      
      forEach(data, function (value, key) {
        const datos = {
          
        } as PlacementId

        types.push(datos)
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

export async function publisherId (token: string) {

  try {
    const response = await AxiosGet(ROUTES.PUBLISER_ID_LIST_ROUTE, token)

    const types = [] as any

    if (response.success) {
      const data = response.content
      
      forEach(data, function (value, key) {
        const datos = {
          
        } as PublisherId

        types.push(datos)
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

export async function siteId (token: string) {

  try {
    const response = await AxiosGet(ROUTES.SITE_LIST_ROUTE, token)

    const site_list = [] as any

    if (response.success) {
      const data = response.content
      
      forEach(data, function (value, key) {
        const datos = {
          
        } as SiteList

        site_list.push(datos)
      })
      
      return success('', site_list)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }

}