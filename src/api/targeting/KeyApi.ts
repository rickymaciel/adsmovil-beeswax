import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { forEach, isEmpty, isUndefined } from 'lodash'
import { Key, KeyFilters, KeyList, KeyOptions, KeyPaginated } from '@/interfaces/key'

const ROUTES = require('../routes').TARGETING

export async function show (id: number, token: string) {
  try {
    const response = await AxiosGet(ROUTES.TARGETING_KEY_ROUTE + '/' + id, token)

    if (response.success) {
      const data = response.content

      const targeting = parseData(data)

      return success('', targeting)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function all (token: string, filters?: KeyFilters, options?: KeyOptions) {
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
    console.log('URL', url)
    const response = await AxiosGet(ROUTES.TARGETING_KEY_ROUTE + url, token)

    const keys = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const item = parseData(value)
        keys.push(item)
      })

      return success('', keys)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function paginated (token: string, paginated: KeyPaginated, filters?: KeyFilters, options?: KeyOptions) {
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
    const response = await AxiosGet(ROUTES.TARGETING_KEY_ROUTE + url, token)

    const keys = [] as any

    if (response.success) {
      const data = response.content.data

      forEach(data, function (value, key) {
        const item = parseData(value)
        keys.push(item)
      })

      return success('', {
        page: paginated.page,
        keys
      })
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function list (token: string, filters?: KeyFilters, options?: KeyOptions) {
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
    const response = await AxiosGet(ROUTES.TARGETING_KEY_ROUTE + url, token)

    const list = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const item = {
          id: parseInt(key),
          value: value
        } as KeyList

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

function parseData (data): Key {
  return {
    id: data.id,
    name: data.name,
    comparator: data.comparator,
    extra: data.extra,
    active: data.active,
    unique_predicate: data.unique_predicate,
    targeting_module_id: data.targeting_module_id,
    created_by: data.created_by,
    updated_by: data.updated_by,
    deleted_by: data.deleted_by,
    created_at: data.created_at,
    updated_at: data.updated_at,
    targeting_module: {
      id: data.targeting_module.id,
      type: data.targeting_module.type,
      description: data.targeting_module.description,
      extra: data.targeting_module.extra
    }
  } as Key
}

function getFilters (filters: KeyFilters): string {
  let filter = ''

  const id = (isUndefined(filters.id)) ? '' : filters.id
  const name = (isUndefined(filters.name)) ? '' : filters.name
  const targeting_module_id = (isUndefined(filters.targeting_module_id)) ? '' : filters.targeting_module_id
  const active = (isUndefined(filters.active)) ? '' : filters.active

  filter += 'filters[id]=' + id + '&filters[name]=' + name + '&filters[targeting_module_id]=' + targeting_module_id + '&filters[active]=' + active

  return filter
}

function getOptions (options: KeyOptions, mode: string, paginated?: KeyPaginated): string {
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
