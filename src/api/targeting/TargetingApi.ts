import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet, AxiosPatch, AxiosPost } from '@/api/AxiosService'
import { forEach, isEmpty, isUndefined } from 'lodash'
import {
  Targeting,
  TargetingDataCreate, TargetingDataUpdate,
  TargetingFilters, TargetingList,
  TargetingOptions, TargetingPaginated,
  TargetingValues
} from '@/interfaces/targeting'

const ROUTES = require('../routes').TARGETING

export async function create (targeting: TargetingDataCreate, token: string) {
  try {
    const response = await AxiosPost(ROUTES.TARGETING_ROUTE, targeting, token)

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

export async function update (targeting: TargetingDataUpdate, token: string) {
  try {
    const response = await AxiosPatch(ROUTES.TARGETING_ROUTE + '/' + targeting.id, targeting, token)

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

export async function show (id: number, token: string) {
  try {
    const response = await AxiosGet(ROUTES.TARGETING_ROUTE + '/' + id, token)

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

export async function all (token: string, filters?: TargetingFilters, options?: TargetingOptions) {
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
    const response = await AxiosGet(ROUTES.TARGETING_ROUTE + url, token)

    const targetings = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const targeting = parseData(value)
        targetings.push(targeting)
      })

      return success('', targetings)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function paginated (token: string, paginated: TargetingPaginated, filters?: TargetingFilters, options?: TargetingOptions) {
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
    const response = await AxiosGet(ROUTES.TARGETING_ROUTE + url, token)

    const targetings = [] as any

    if (response.success) {
      const data = response.content.data

      forEach(data, function (value, key) {
        const item = parseData(value)
        targetings.push(item)
      })

      return success('', {
        page: paginated.page,
        targetings
      })
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function list (token: string, filters?: TargetingFilters, options?: TargetingOptions) {
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
    const response = await AxiosGet(ROUTES.TARGETING_ROUTE + url, token)

    const list = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const item = {
          id: parseInt(key),
          value: value
        } as TargetingList

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

function parseData (data): Targeting {
  const tValues = [] as any

  forEach(data.targeting_values, function (value, key) {
    let item = {
      id: value.id,
      value: value.value,
      targeting_key_id: value.targeting_key_id,
      targeting_predicate_id: value.targeting_predicate_id,
      targeting_expression_id: value.targeting_expression_id,
      created_by: value.created_by,
      updated_by: value.updated_by,
      deleted_by: value.deleted_by,
      created_at: value.created_at,
      updated_at: value.updated_at
    } as TargetingValues

    tValues.push(item)
  })

  return {
    id: data.id,
    name: data.name,
    notes: data.notes,
    extra: data.extra,
    active: data.active,
    external_id: data.external_id,
    account_id: data.account_id,
    line_item_id: data.line_item_id,
    created_by: data.created_by,
    updated_by: data.updated_by,
    deleted_by: data.deleted_by,
    created_at: data.created_at,
    updated_at: data.updated_at,
    targeting_values: tValues
  } as Targeting
}

function getFilters (filters: TargetingFilters): string {
  let filter = ''

  const id = (isUndefined(filters.id)) ? '' : filters.id
  const line_item_id = (isUndefined(filters.line_item_id)) ? '' : filters.line_item_id
  const active = (isUndefined(filters.active)) ? '' : filters.active

  filter += 'filters[id]=' + id + '&filters[line_item_id]=' + line_item_id + '&filters[active]=' + active

  return filter
}

function getOptions (options: TargetingOptions, mode: string, paginated?: TargetingPaginated): string {
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
