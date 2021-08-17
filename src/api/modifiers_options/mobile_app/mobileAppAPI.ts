import { isEmpty, forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import {  MobileApp } from '@/interfaces/mobile_app'

const ROUTES = require('../../routes').MOBILE_APP

/**
 * 
 * Implementa 
 * App_Bundle_List
 * App_Id_List
 */
export async function mobileApp (key: string, token: string) {

    let url = getURL(key);

    if(isEmpty(url)) return error(`The key "${key}" is invalid`, [])

    try {
      const response = await AxiosGet(url, token)
  
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
          } as MobileApp
  
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

function getURL(key: string): string {
    let url = ''
  
    switch (key) {
      case 'app_bundle_list':
        url = ROUTES.APP_BUNDLE_LIST_ROUTE
        break
      case 'app_id_list':
        url = ROUTES.APP_ID_ROUTE
        break
      default:
        return ''
    }
    return url;
}