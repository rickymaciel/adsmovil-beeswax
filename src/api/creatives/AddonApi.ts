import { forEach, isEmpty, isUndefined, isNull } from 'lodash'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosPost, AxiosGet, AxiosPatch } from '@/api/AxiosService'
import {
  Addon,
  AddonDataCreate, AddonDataUpdate,
  AddonFilters,
  AddonList,
  AddonOptions,
  AddonPaginated,
  Advertiser
} from '@/interfaces/creativeAddon'
import { Type } from '@/interfaces/creative'

const ROUTES = require('../routes').CREATIVES

export async function create (addon: AddonDataCreate, token: string) {
  try {
    const response = await AxiosPost(ROUTES.CREATIVE_ADDONS_ROUTE, addon, token)

    if (response.success) {
      const data = response.content

      const item = parseData(data)

      return success('', item)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function update (addon: AddonDataUpdate, token: string) {
  try {
    const response = await AxiosPatch(ROUTES.CREATIVE_ADDONS_ROUTE + '/' + addon.id, addon, token)

    if (response.success) {
      const data = response.content

      const item = parseData(data)

      return success('', item)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function show (id: number, token: string) {
  try {
    const response = await AxiosGet(ROUTES.CREATIVE_ADDONS_ROUTE + '/' + id, token)

    if (response.success) {
      const data = response.content

      const addons = parseData(data)

      return success('', addons)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function all (token: string, filters?: AddonFilters, options?: AddonOptions) {
  try {
    let filter = ''
    let option = ''

    if (!isUndefined(filters) && !isEmpty(filters)) {
      filter = getFilters(filters)
    }

    if (!isUndefined(options) && !isEmpty(options)) {
      option += getOptions(options, 'all')
    }

    const url = getURL(filter, option)
    const response = await AxiosGet(ROUTES.CREATIVE_ADDONS_ROUTE + url, token)

    const addons = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const addon = parseData(value)
        addons.push(addon)
      })

      return success('', addons)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function paginated (token: string, paginated: AddonPaginated, filters?: AddonFilters, options?: AddonOptions) {
  try {
    let filter = ''
    let option = ''

    if (!isUndefined(filters) && !isEmpty(filters)) {
      filter = getFilters(filters)
    }

    if (!isUndefined(options) && !isEmpty(options)) {
      option += getOptions(options, 'paginated', paginated)
    }

    const url = getURL(filter, option)
    const response = await AxiosGet(ROUTES.CREATIVE_ADDONS_ROUTE + url, token)

    const addons = [] as any

    if (response.success) {
      const data = response.content.data

      forEach(data, function (value, key) {
        const addon = parseData(value)
        addons.push(addon)
      })

      return success('', {
        page: paginated.page,
        addons
      })
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function list (token: string, filters?: AddonFilters, options?: AddonOptions) {
  try {
    let filter = ''
    let option = ''

    if (!isUndefined(filters) && !isEmpty(filters)) {
      filter = getFilters(filters)
    }

    if (!isUndefined(options) && !isEmpty(options)) {
      option += getOptions(options, 'list')
    }

    const url = getURL(filter, option)
    const response = await AxiosGet(ROUTES.CREATIVE_ADDONS_ROUTE + url, token)

    const list = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const item = {
          id: parseInt(key),
          value: value
        } as AddonList

        list.push(item)
      })

      return success('', list)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

function parseData (data): Addon {
  const type = {
    id: data.type.id,
    type: data.type.type,
    description: data.type.description,
    extra: data.type.extra,
  } as Type 

  const advertiser = {
    id: data.advertiser.id,
    external_id: data.advertiser.external_id,
    account_id: data.advertiser.account_id,
    name: data.advertiser.name,
    domain: data.advertiser.domain,
    category_id: data.advertiser.category_id,
    app_bundle: data.advertiser.app_bundle,
    currency_id: data.advertiser.currency_id,
    active: data.advertiser.active,
    created_by: data.advertiser.created_by,
    updated_by: data.advertiser.updated_by,
    deleted_by: data.advertiser.deleted_by,
    created_at: data.advertiser.created_at,
    updated_at: data.advertiser.updated_at
  } as Advertiser

  return {
    id: data.id,
    external_id: data.external_id,
    alternative_id: data.alternative_id,
    account_id: data.account_id,
    name: data.name,
    advertiser_id: data.advertiser_id,
    vendor_id: data.vendor_id,
    creative_type_id: data.creative_type_id,
    addon_type_id: data.addon_type_id,
    url: data.url,
    cpm_cost: data.cpm_cost,
    secure: data.secure,
    include_default: data.include_default,
    active: data.active,
    created_by: {
      id: data.created_by.id,
      first_name: data.created_by.name,
      last_name: data.created_by.last_name,
      email: data.created_by.email
    },
    updated_by: {
      id: data.updated_by.id,
      first_name: data.updated_by.name,
      last_name: data.updated_by.last_name,
      email: data.updated_by.email
    },
    deleted_by: {
      id: (isEmpty(data.deleted_by)) ? null : data.deleted_by.id,
      first_name: (isEmpty(data.deleted_by)) ? null : data.deleted_by.name,
      last_name: (isEmpty(data.deleted_by)) ? null : data.deleted_by.last_name,
      email: (isEmpty(data.deleted_by)) ? null : data.deleted_by.email
    },
    created_at: data.created_at,
    updated_at: data.updated_at,
    type: type,
    advertiser: advertiser,
    vendor: data.vendor
  } as Addon
}

function getFilters (filters: AddonFilters): string {
  let filter = ''

  const name = (isUndefined(filters.name)) ? '' : filters.name
  const model_type_id = (isUndefined(filters.model_type_id)) ? '' : filters.model_type_id
  const alternative_id = (isUndefined(filters.alternative_id)) ? '' : filters.alternative_id
  const external_id = (isUndefined(filters.external_id)) ? '' : filters.external_id
  const active = (isUndefined(filters.active)) ? '' : filters.active

  filter += 'filters[name]=' + name + '&filters[model_type_id]=' + model_type_id + '&filters[alternative_id]=' + alternative_id + '&filters[external_id]=' + external_id + '&filters[active]=' + active

  return filter
}

function getOptions (options: AddonOptions, mode: string, paginated?: AddonPaginated): string {
  let option = ''

  const sort = (isUndefined(options.sort)) ? '' : options.sort
  const order = (isUndefined(options.order)) ? '' : options.order

  option += 'sort=' + sort + '&order=' + order + '&mode=' + mode

  if (mode == 'paginated') {
    option += '&page=' + paginated?.page + '&limit=' + paginated?.limit
  }

  return option
}

function getURL (filters: string, options: string): string {
  let url = ''

  if (!isEmpty(filters) && !isEmpty(options)) {
    url = '?' + filters + '&' + options
  } else if (!isEmpty(filters)) {
    url = '?' + filters
  } else if (!isEmpty(options)) {
    url = '?' + options
  }

  return url
}
