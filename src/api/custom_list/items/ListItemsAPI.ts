import { forEach, isEmpty, isUndefined, isNull } from 'lodash'
import { AxiosPost, AxiosGet, AxiosPatch, AxiosDelete } from '@/api/AxiosService'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import {
  ListItem,
  ListItemDataCreate,
  ListItemFilters,
  ListItemOptions,
  ListItemPaginated,
  List, ListItemDataUpdate, ListItemLoad
} from '@/interfaces/list_items'

const ROUTES = require('../../routes').CUSTOM_LIST

export async function create (listItem: ListItemDataCreate, customListType: string, token: string) {
  try {
    if (customListType == 'lat_long') {
      if (isUndefined(listItem.list_item.lat) || isUndefined(listItem.list_item.long) || isUndefined(listItem.list_item.radius_km)) {
        return error('Field list_item invalid format.', []) // {'lat':number,'long':number,'radius_km':number}
      }
    }

    return AxiosPost(ROUTES.LIST_ITEM_ROUTE, listItem, token).then(async (result) => {
      if (result.success) {
        let data = result.content

        let item = {
          id: data.id,
          external_id: data.external_id,
          list_item: data.list_item,
          value: data.value,
          name: data.name,
          active: data.active,
          custom_list_id: data.custom_list_id,
          created_by: data.created_by,
          updated_by: data.updated_by,
          deleted_by: data.deleted_by,
          created_at: data.created_at,
          updated_at: data.updated_at,
          deleted_at: data.deleted_at
        } as ListItem

        return success('', item)
      }

      console.log('ERROR: ', result)

      return error(result.message, result.errors)
    }).catch(function (err) {
      console.log('EXCEPTION: ', err)
      return error(GetMessage(err), GetErrors(err))
    })
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function update (listItem: ListItemDataUpdate, token: string) {
  try {
    return AxiosPatch(ROUTES.LIST_ITEM_ROUTE + '/' + listItem.id, listItem, token).then((result) => {
      if (result.success) {
        let data = result.content

        let item = {
          id: data.id,
          external_id: data.external_id,
          list_item: data.list_item,
          value: data.value,
          name: data.name,
          active: data.active,
          custom_list_id: data.custom_list_id,
          created_by: data.created_by,
          updated_by: data.updated_by,
          deleted_by: data.deleted_by,
          created_at: data.created_at,
          updated_at: data.updated_at,
          deleted_at: data.deleted_at
        } as ListItem

        return success('', item)
      }

      console.log('ERROR: ', result)

      return error(result.message, result.errors)
    }).catch(function (err) {
      console.log('EXCEPTION: ', err)
      return error(GetMessage(err), GetErrors(err))
    })
  } catch (err) {
    console.log('EXCEPTION: ', error)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function loadItems (items: ListItemLoad[], type: string, token: string) {
  try {
    let listItems = {
      success: true,
      message: '',
      content: [] as any
    }

    return new Promise((resolve, reject) => {
      let load = [] as any

      forEach(items, async function (value, key) {
        let item = {
          success: true,
          message: '',
          errors: [],
          item: value
        }

        if (isNull(value.id)) {//Create
          let data = {
            custom_list_id: value.custom_list_id,
            list_item: value.list_item,
            name: value.name,
            value: value.value
          } as ListItemDataCreate

          let response = create(data, type, token).then((result) => {
            if (!result.success) {
              item.success = false
              item.message = result.message
              item.errors = result.errors
            }

            listItems.content.push(item)
          }).catch(function (err) {
            console.log('EXCEPTION: ', err)
            return error(GetMessage(err), GetErrors(err))
          })

          load.push(response)
        } else {//Update
          let data = {
            id: value.id,
            name: value.name,
            value: value.value,
            active: value.active
          } as ListItemDataUpdate

          let response = update(data, token).then((result) => {
            if (!result.success) {
              item.success = false
              item.message = result.message
              item.errors = result.errors
            }

            listItems.content.push(item)
          }).catch(function (err) {
            console.log('EXCEPTION: ', err)
            return error(GetMessage(err), GetErrors(err))
          })

          load.push(response)
        }
      })

      return Promise.all(load).then(data => {
        resolve(listItems)
      })
    }).then((result) => {
      return result
    }).catch(function (err) {
      console.log('EXCEPTION: ', err)
      return error(GetMessage(err), GetErrors(err))
    })
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function changeStatus (id: number, status: boolean, token: string) {
  try {
    const active = status ? 1 : 0
    const response = await AxiosPatch(ROUTES.LIST_ITEM_ROUTE + '/' + id + '/set/' + active, {}, token)

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

export async function deleted (id: number, token: string) {
  try {
    const response = await AxiosDelete(ROUTES.LIST_ITEM_ROUTE + '/' + id, token)

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

export async function clear (id: number, token: string) {
  try {
    const response = await AxiosDelete(ROUTES.LIST_ITEM_ROUTE + '/clear/' + id, token)

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

export async function all (token: string, filters?: ListItemFilters, options?: ListItemOptions) {
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
    const response = await AxiosGet(ROUTES.LIST_ITEM_ROUTE + url, token)

    const list_items = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const list_item = {
          id: value.id,
          external_id: value.external_id,
          list_item: value.list_item,
          value: value.value,
          name: value.name,
          active: value.active,
          custom_list_id: value.custom_list_id,
          created_by: value.created_by,
          updated_by: value.updated_by,
          deleted_by: value.deleted_by,
          created_at: value.created_at,
          updated_at: value.updated_at,
          deleted_at: value.deleted_at
        } as ListItem

        list_items.push(list_item)
      })

      return list_items
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function paginated (token: string, paginated: ListItemPaginated, filters?: ListItemFilters, options?: ListItemOptions) {
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
    const response = await AxiosGet(ROUTES.LIST_ITEM_ROUTE + url, token)

    const list_items = [] as any

    if (response.success) {
      const data = response.content.data

      forEach(data, function (value, key) {
        const list_item = {
          id: value.id,
          external_id: value.external_id,
          list_item: value.list_item,
          value: value.value,
          name: value.name,
          active: value.active,
          custom_list_id: value.custom_list_id,
          created_by: value.created_by,
          updated_by: value.updated_by,
          deleted_by: value.deleted_by,
          created_at: value.created_at,
          updated_at: value.updated_at,
          deleted_at: value.deleted_at
        } as ListItem

        list_items.push(list_item)
      })

      return {
        page: paginated.page,
        list_items
      }
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function list (token: string, filters?: ListItemFilters, options?: ListItemOptions) {
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
    const response = await AxiosGet(ROUTES.LIST_ITEM_ROUTE + url, token)

    const list_items = [] as any

    if (!isEmpty(response)) {
      forEach(response, function (value, key) {
        const item = {
          id: parseInt(key),
          value: value
        } as List

        list_items.push(item)
      })

      return list_items
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

function getFilters (filters: ListItemFilters): string {
  let filter = ''

  const name = (isUndefined(filters.name)) ? '' : filters.name
  const external_id = (isUndefined(filters.external_id)) ? '' : filters.external_id
  const list_item = (isUndefined(filters.list_item)) ? '' : filters.list_item
  const active = (isUndefined(filters.active)) ? '' : filters.active

  filter += 'filters[name]=' + name + '&filters[external_id]=' + external_id + '&filters[list_item]=' + list_item + '&filters[active]=' + active

  return filter
}

function getOptions (options: ListItemOptions, mode: string, paginated?: ListItemPaginated): string {
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
