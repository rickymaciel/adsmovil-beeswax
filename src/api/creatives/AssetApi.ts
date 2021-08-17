import { forEach, isEmpty, isUndefined, isNull } from 'lodash'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosPost, AxiosGet, AxiosPatch } from '@/api/AxiosService'
import {
  Asset,
  AssetDataCreate,
  AssetFilters,
  AssetOptions,
  AssetPaginated,
  Advertiser,
  Metadata,
  AssetList
} from '@/interfaces/creativeAsset'

const ROUTES = require('../routes').CREATIVES

/* Se implementa directamente en el service */
export async function createAsset (asset: AssetDataCreate, token: string) {
  try {
    const response = await AxiosPost(ROUTES.CREATIVE_ASSETS_ROUTE, asset, token)

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

export async function all (token: string, filters?: AssetFilters, options?: AssetOptions) {
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
    const response = await AxiosGet(ROUTES.CREATIVE_ASSETS_ROUTE + url, token)

    const assets = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const asset = parseData(value)
        assets.push(asset)
      })

      return success('', assets)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function paginated (token: string, paginated: AssetPaginated, filters?: AssetFilters, options?: AssetOptions) {
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
    const response = await AxiosGet(ROUTES.CREATIVE_ASSETS_ROUTE + url, token)

    const assets = [] as any

    if (response.success) {
      const data = response.content.data

      forEach(data, function (value, key) {
        const asset = parseData(value)
        assets.push(asset)
      })

      return success('', {
        page: paginated.page,
        assets
      })
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function list (token: string, filters?: AssetFilters, options?: AssetOptions) {
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
    const response = await AxiosGet(ROUTES.CREATIVE_ASSETS_ROUTE + url, token)

    const list = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const item = {
          id: parseInt(key),
          value: value
        } as AssetList

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

function parseData (data): Asset {
  let metadata: null | {}
  let advertiser: null | {}

  if (isNull(data.metadata)) {
    metadata = null
  } else {
    metadata = {
      width: data.metadata.width,
      height: data.metadata.height,
      mime: data.metadata.mime
    } as Metadata
  }

  if (isNull(data.advertiser)) {
    advertiser = null
  } else {
    advertiser = {
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
  }

  return {
    id: data.id,
    external_id: data.external_id,
    name: data.name,
    account_id: data.account_id,
    asset_type_id: data.asset_type_id,
    advertiser_id: data.advertiser_id,
    size_in_bytes: data.size_in_bytes,
    video_encoding_id: data.video_encoding_id,
    thumbnail_name: data.thumbnail_name,
    mime_type_id: data.mime_type_id,
    media_host: data.media_host,
    active: data.active,
    created_by: data.created_by,
    updated_by: data.updated_by,
    deleted_by: data.deleted_by,
    created_at: data.created_at,
    updated_at: data.updated_at,
    asset_url: data.asset_url,
    thumbnail_url: data.thumbnail_url,
    video_encoding: data.video_encoding,
    type: {
      id: data.type.id,
      type: data.type.type,
      description: data.type.description,
      extra: data.type.extra
    },
    metadata: metadata,
    advertiser: advertiser
  } as Asset
}

function getFilters (filters: AssetFilters): string {
  let filter = ''

  const name = (isUndefined(filters.name)) ? '' : filters.name
  const model_type_id = (isUndefined(filters.model_type_id)) ? '' : filters.model_type_id
  const alternative_id = (isUndefined(filters.alternative_id)) ? '' : filters.alternative_id
  const external_id = (isUndefined(filters.external_id)) ? '' : filters.external_id
  const active = (isUndefined(filters.active)) ? '' : filters.active

  filter += 'filters[name]=' + name + '&filters[model_type_id]=' + model_type_id + '&filters[alternative_id]=' + alternative_id + '&filters[external_id]=' + external_id + '&filters[active]=' + active

  return filter
}

function getOptions (options: AssetOptions, mode: string, paginated?: AssetPaginated): string {
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
