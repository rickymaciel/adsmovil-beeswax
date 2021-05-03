import { forEach, isEmpty, isUndefined } from 'lodash'
import { CUSTOM_LIST_ROUTE, AxiosPost, AxiosGet, AxiosPatch } from '@/api/AxiosService'
import {
  CustomList,
  CustomListDataCreate,
  CustomListDataUpdate,
  CustomListFilters,
  CustomListOptions,
  CustomListPaginated,
  List
} from '@/interfaces/custom_list'

export async function create (customList: CustomListDataCreate, token: string) {
  try {
    const response = await AxiosPost(CUSTOM_LIST_ROUTE, customList, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      return {
        id: response.id,
        account_id: response.account_id,
        external_id: response.external_id,
        name: response.name,
        custom_list_type_id: response.custom_list_type_id,
        delimiter: response.delimiter,
        default_radius_km: response.default_radius_km,
        notes: response.notes,
        active: response.active,
        created_by: response.created_by,
        updated_by: response.updated_by,
        deleted_by: response.deleted_by,
        created_at: response.created_at,
        updated_at: response.updated_at
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
    const response = await AxiosPatch(CUSTOM_LIST_ROUTE + '/' + customList.id, customList, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      return {
        id: response.id,
        account_id: response.account_id,
        external_id: response.external_id,
        name: response.name,
        custom_list_type_id: response.custom_list_type_id,
        delimiter: response.delimiter,
        default_radius_km: response.default_radius_km,
        notes: response.notes,
        active: response.active,
        created_by: response.created_by,
        updated_by: response.updated_by,
        deleted_by: response.deleted_by,
        created_at: response.created_at,
        updated_at: response.updated_at
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
    const response = await AxiosPatch(CUSTOM_LIST_ROUTE + '/' + id + '/set/' + active, {}, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
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
    const response = await AxiosGet(CUSTOM_LIST_ROUTE + '/' + id, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      return {
        id: response.id,
        account_id: response.account_id,
        external_id: response.external_id,
        name: response.name,
        custom_list_type_id: response.custom_list_type_id,
        delimiter: response.delimiter,
        default_radius_km: response.default_radius_km,
        notes: response.notes,
        active: response.active,
        created_by: response.created_by,
        updated_by: response.updated_by,
        deleted_by: response.deleted_by,
        created_at: response.created_at,
        updated_at: response.updated_at
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
    const response = await AxiosGet(CUSTOM_LIST_ROUTE + url, token)

    const customs_lists = [] as any

    if (!isEmpty(response) && response.length > 0) {
      forEach(response, function (value, key) {
        const custom_list = {
          id: value.id,
          account_id: value.account_id,
          external_id: value.external_id,
          name: value.name,
          custom_list_type_id: value.custom_list_type_id,
          type: {
            id: value.type.id,
            key: value.type.key,
            name: value.type.name
          },
          delimiter: value.delimiter,
          default_radius_km: value.default_radius_km,
          notes: value.notes,
          active: value.active,
          created_by: {
            id: value.created_by.id,
            first_name: value.created_by.name,
            last_name: value.created_by.last_name,
            email: value.created_by.email
          },
          updated_by: {
            id: value.updated_by.id,
            first_name: value.updated_by.name,
            last_name: value.updated_by.last_name,
            email: value.updated_by.email
          },
          deleted_by: {
            id: (isEmpty(value.deleted_by)) ? null : value.deleted_by.id,
            first_name: (isEmpty(value.deleted_by)) ? null : value.deleted_by.name,
            last_name: (isEmpty(value.deleted_by)) ? null : value.deleted_by.last_name,
            email: (isEmpty(value.deleted_by)) ? null : value.deleted_by.email
          },
          created_at: value.created_at,
          updated_at: value.updated_at
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
    const response = await AxiosGet(CUSTOM_LIST_ROUTE + url, token)

    const customs_lists = [] as any

    if (!isEmpty(response) && !isUndefined(response.data) && response.data.length > 0) {
      forEach(response.data, function (value, key) {
        const custom_list = {
          id: value.id,
          account_id: value.account_id,
          external_id: value.external_id,
          name: value.name,
          custom_list_type_id: value.custom_list_type_id,
          type: {
            id: value.type.id,
            key: value.type.key,
            name: value.type.name
          },
          delimiter: value.delimiter,
          default_radius_km: value.default_radius_km,
          notes: value.notes,
          active: value.active,
          created_by: {
            id: value.created_by.id,
            first_name: value.created_by.name,
            last_name: value.created_by.last_name,
            email: value.created_by.email
          },
          updated_by: {
            id: value.updated_by.id,
            first_name: value.updated_by.name,
            last_name: value.updated_by.last_name,
            email: value.updated_by.email
          },
          deleted_by: {
            id: (isEmpty(value.deleted_by)) ? null : value.deleted_by.id,
            first_name: (isEmpty(value.deleted_by)) ? null : value.deleted_by.name,
            last_name: (isEmpty(value.deleted_by)) ? null : value.deleted_by.last_name,
            email: (isEmpty(value.deleted_by)) ? null : value.deleted_by.email
          },
          created_at: value.created_at,
          updated_at: value.updated_at
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
    const response = await AxiosGet(CUSTOM_LIST_ROUTE + url, token)

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

  const name = (isUndefined(filters.name)) ? '' : filters.name
  const external_id = (isUndefined(filters.external_id)) ? '' : filters.external_id
  const type_id = (isUndefined(filters.custom_list_type_id)) ? '' : filters.custom_list_type_id
  const active = (isUndefined(filters.active)) ? '' : filters.active

  filter += 'filters[name]=' + name + '&filters[external_id]=' + external_id + '&filters[custom_list_type_id]=' + type_id + '&filters[active]=' + active

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
