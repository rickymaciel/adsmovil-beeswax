import { forEach, isEmpty, isUndefined } from 'lodash'
import { AxiosPost, AxiosGet, AxiosPatch } from '@/api/AxiosService'
import {
  CustomList,
  CustomListDataCreate,
  CustomListDataUpdate,
  CustomListFilters,
  CustomListOptions,
  CustomListPaginated,
  List
} from '@/interfaces/custom_list'

const ROUTES = require('../routes').CUSTOM_LIST

export async function create (customList: CustomListDataCreate, token: string) {
  try {
    const response = await AxiosPost(ROUTES.CUSTOM_LIST_ROUTE, customList, token)

    if (response.success) {
      const data = response.content

      return {
        id: data.id,
        external_id: data.external_id,
        name: data.name,
        type_id: data.type_id,
        type_name: data.type_name,
        type_key: data.type_key,
        delimiter: data.delimiter,
        default_radius_km: data.default_radius_km,
        notes: data.notes,
        custom_list_items_count: data.custom_list_items_count,
        active: data.active,
        type: {
          id: data.type.id,
          key: data.type.key,
          name: data.type.name
        }
      } as CustomList
    }

    console.log('ERROR: ', response)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function update (customList: CustomListDataUpdate, token: string) {
  try {
    const response = await AxiosPatch(ROUTES.CUSTOM_LIST_ROUTE + '/' + customList.id, customList, token)

    if (response.success) {
      const data = response.content

      return {
        id: data.id,
        external_id: data.external_id,
        name: data.name,
        type_id: data.type_id,
        type_name: data.type_name,
        type_key: data.type_key,
        delimiter: data.delimiter,
        default_radius_km: data.default_radius_km,
        notes: data.notes,
        custom_list_items_count: data.custom_list_items_count,
        active: data.active,
        type: {
          id: data.type.id,
          key: data.type.key,
          name: data.type.name
        }
      } as CustomList
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function changeStatus (id: number, status: boolean, token: string) {
  try {
    const active = status ? 1 : 0
    const response = await AxiosPatch(ROUTES.CUSTOM_LIST_ROUTE + '/' + id + '/set/' + active, {}, token)

    if (response.success) {
      return true
    }

    console.log('ERROR: ', response.message)

    return false
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return false
  }
}

export async function show (id: number, token: string) {
  try {
    const response = await AxiosGet(ROUTES.CUSTOM_LIST_ROUTE + '/' + id, token)

    if (response.success) {
      const data = response.content

      return {
        id: data.id,
        external_id: data.external_id,
        name: data.name,
        type_id: data.type_id,
        type_name: data.type_name,
        type_key: data.type_key,
        delimiter: data.delimiter,
        default_radius_km: data.default_radius_km,
        notes: data.notes,
        custom_list_items_count: data.custom_list_items_count,
        active: data.active,
        type: {
          id: data.type.id,
          key: data.type.key,
          name: data.type.name
        }
      } as CustomList
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function all (token: string, filters?: CustomListFilters, options?: CustomListOptions) {
  try {
    let filter = ''
    let option = ''

    if (!isUndefined(filters)) {
      filter = getFilters(filters)
    }

    if (!isUndefined(options)) {
      option += getOptions(options, 'all')
    }

    const url = getURL(filter, option)
    const response = await AxiosGet(ROUTES.CUSTOM_LIST_ROUTE + url, token)

    const customs_lists = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const custom_list = {
          id: value.id,
          external_id: value.external_id,
          name: value.name,
          type_id: value.type_id,
          type_name: value.type_name,
          type_key: value.type_key,
          delimiter: value.delimiter,
          default_radius_km: value.default_radius_km,
          notes: value.notes,
          custom_list_items_count: value.custom_list_items_count,
          active: value.active,
          type: {
            id: value.type.id,
            key: value.type.key,
            name: value.type.name
          }
        } as CustomList

        customs_lists.push(custom_list)
      })

      return customs_lists
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function paginated (token: string, paginated: CustomListPaginated, filters?: CustomListFilters, options?: CustomListOptions) {
  try {
    let filter = ''
    let option = ''

    if (!isUndefined(filters)) {
      filter = getFilters(filters)
    }

    if (!isUndefined(options)) {
      option += getOptions(options, 'paginated', paginated)
    }

    const url = getURL(filter, option)
    const response = await AxiosGet(ROUTES.CUSTOM_LIST_ROUTE + url, token)

    const customs_lists = [] as any

    if (response.success) {
      const data = response.content.data

      forEach(data, function (value, key) {
        const custom_list = {
          id: value.id,
          external_id: value.external_id,
          name: value.name,
          type_id: value.type_id,
          type_name: value.type_name,
          type_key: value.type_key,
          delimiter: value.delimiter,
          default_radius_km: value.default_radius_km,
          notes: value.notes,
          custom_list_items_count: value.custom_list_items_count,
          active: value.active,
          type: {
            id: value.type.id,
            key: value.type.key,
            name: value.type.name
          }
        } as CustomList

        customs_lists.push(custom_list)
      })

      return {
        page: paginated.page,
        customs_lists
      }
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function list (token: string, filters?: CustomListFilters, options?: CustomListOptions) {
  try {
    let filter = ''
    let option = ''

    if (!isUndefined(filters)) {
      filter = getFilters(filters)
    }

    if (!isUndefined(options)) {
      option += getOptions(options, 'list')
    }

    const url = getURL(filter, option)
    const response = await AxiosGet(ROUTES.CUSTOM_LIST_ROUTE + url, token)

    const list = [] as any

    if (!isEmpty(response)) {
      forEach(response, function (value, key) {
        const item = {
          id: parseInt(key),
          value: value
        } as List

        list.push(item)
      })

      return list
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

function getFilters (filters: CustomListFilters): string {
  let filter = ''

  const id = (isUndefined(filters.id)) ? '' : filters.id
  const name = (isUndefined(filters.name)) ? '' : filters.name
  const type_name = (isUndefined(filters.type_name)) ? '' : filters.type_name
  const active = (isUndefined(filters.active)) ? '' : filters.active

  filter += 'filters[id]=' + id + '&filters[name]=' + name + '&filters[type_name]=' + type_name + '&filters[active]=' + active

  return filter
}

function getOptions (options: CustomListOptions, mode: string, paginated?: CustomListPaginated): string {
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
