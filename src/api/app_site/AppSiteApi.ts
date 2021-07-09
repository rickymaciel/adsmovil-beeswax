import { isEmpty, isUndefined, forEach } from 'lodash'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { AppName, AppSite, Site } from '@/interfaces/appSite'

const ROUTES = require('../routes').APP_SITE

export async function appSites (key: string, token: string) {
  let url = ''

  switch (key) {
  case 'app_bundle_list':
    url = ROUTES.APP_BUNDLE_LIST_ROUTE
    break
  case 'app_id_list':
    url = ROUTES.APP_ID_ROUTE
    break
  case 'deal_id':
    url = ROUTES.DEAL_ID_ROUTE
    break
  case 'deal_id_list':
    url = ROUTES.DEAL_ID_LIST_ROUTE
    break
  case 'domain_list':
    url = ROUTES.DOMAIN_ROUTE
    break
  case 'placement_list':
    url = ROUTES.PLACEMENT_ROUTE
    break
  case 'publisher_id':
    url = ROUTES.PUBLISER_ID_ROUTE
    break
  case 'publisher_id_list':
    url = ROUTES.PUBLISER_ID_LIST_ROUTE
    break
  case 'site_list':
    url = ROUTES.SITE_LIST_ROUTE
    break
  default:
    return error(`The key "${key}" is invalid`, [])
  }

  try {
    const response = await AxiosGet(url, token)

    const items = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const item = {
          id: value.id,
          account_id: value.account_id,
          external_id: value.external_id, //Key to use
          name: value.name,
          custom_list_type_id: value.custom_list_type_id,
          delimiter: value.delimiter,
          default_radius_km: value.default_radius_km,
          notes: value.notes,
          active: value.active,
          terms_count: value.terms_count
        } as AppSite

        items.push(item)
      })

      return success('', items)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function appNames (term: string, by_attribute: string, token: string) {
  try {
    if (isEmpty(term) || term.length < 3) {
      return error('Invalid data for the term parameter', ['It should not be empty', 'Minimum of 3 characters'] as any)
    }

    if (isEmpty(by_attribute) || (by_attribute !== 'app_name' && by_attribute !== 'app_id' && by_attribute !== 'app_bundle')) {
      return error('Invalid data for the by_attribute parameter', ['It should not be empty', 'Data options: app_name | app_id | app_bundle'] as any)
    }

    const response = await AxiosGet(ROUTES.APP_NAME_ROUTE + '?term=' + term + '&by_attribute=' + by_attribute, token)

    const names = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const name = {
          id: value.id,
          app_bundle: value.app_bundle,
          app_id: value.app_id,
          app_name: value.app_name,
          inventory_source_id: value.inventory_source_id,
          volume_ranking: value.volume_ranking,
          update_date: value.update_date
        } as AppName

        names.push(name)
      })

      return success('', names)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function sites (term: string, by_attribute: string, token: string) {
  try {
    if (isEmpty(term) || term.length < 3) {
      return error('Invalid data for the term parameter', ['It should not be empty', 'Minimum of 3 characters'] as any)
    }

    if (isEmpty(by_attribute) || (by_attribute !== 'site_id' && by_attribute !== 'site_name' && by_attribute !== 'placement_id')) {
      return error('Invalid data for the by_attribute parameter', ['It should not be empty', 'Data options: site_id | site_name | placement_id'] as any)
    }

    const response = await AxiosGet(ROUTES.SITE_ROUTE + '?term=' + term + '&by_attribute=' + by_attribute, token)

    const sites = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const site = {
          id: value.id,
          site_id: value.site_id,
          placement_id: value.placement_id,
          site_name: value.site_name,
          inventory_source_id: value.inventory_source_id,
          volume_ranking: value.volume_ranking,
          update_date: value.update_date
        } as Site

        sites.push(site)
      })

      return success('', sites)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
