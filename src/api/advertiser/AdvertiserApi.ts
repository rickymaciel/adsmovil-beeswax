import { forEach, isEmpty, isUndefined, replace } from 'lodash'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosPost, AxiosGet, AxiosPatch } from '@/api/AxiosService'
import {
  Advertiser,
  AdvertiserDataCreate,
  AdvertiserDataUpdate,
  AdvertiserList,
  AdvertiserPaginated,
  AdvertiserFilters,
  AdvertiserOptions,
  Category
} from '@/interfaces/advertiser'

const ROUTES = require('../routes').ADVERTISER

export async function create (advertiser: AdvertiserDataCreate, token: string) {
  try {
    const response = await AxiosPost(ROUTES.ADVERTISER_ROUTE, advertiser, token)

    if (response.success) {
      let data = response.content

      let advertiser = {
        id: data.id,
        external_id: data.external_id,
        account_id: data.account_id,
        name: data.name,
        domain: data.domain,
        app_bundle: data.app_bundle,
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
        category: {
          id: data.category.id,
          key: data.category.key,
          name: data.category.name
        },
        currency: {
          id: data.currency.id,
          key: data.currency.key,
          name: data.currency.name,
          glyph: data.currency.glyph,
          emoji_flag: data.currency.emoji_flag
        }
      } as Advertiser

      return success('', advertiser)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function update (advertiser: AdvertiserDataUpdate, token: string) {
  try {
    const response = await AxiosPatch(ROUTES.ADVERTISER_ROUTE + '/' + advertiser.id, advertiser, token)

    if (response.success) {
      let data = response.content

      let advertiser = {
        id: data.id,
        external_id: data.external_id,
        account_id: data.account_id,
        name: data.name,
        domain: data.domain,
        app_bundle: data.app_bundle,
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
        category: {
          id: data.category.id,
          key: data.category.key,
          name: data.category.name
        },
        currency: {
          id: data.currency.id,
          key: data.currency.key,
          name: data.currency.name,
          glyph: data.currency.glyph,
          emoji_flag: data.currency.emoji_flag
        }
      } as Advertiser

      return success('', advertiser)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function changeStatus (id: number, status: boolean, token: string) {
  try {
    const active = status ? 1 : 0
    const response = await AxiosPatch(ROUTES.ADVERTISER_ROUTE + '/' + id + '/set/' + active, {}, token)

    if (response.success) {
      return true
    }

    console.log('ERROR: ', response.message)

    return false
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return false
  }
}

export async function show (id: number, token: string) {
  try {
    const response = await AxiosGet(ROUTES.ADVERTISER_ROUTE + '/' + id, token)

    if (response.success) {
      let data = response.content

      let advertiser = {
        id: data.id,
        external_id: data.external_id,
        account_id: data.account_id,
        name: data.name,
        domain: data.domain,
        app_bundle: data.app_bundle,
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
        category: {
          id: data.category.id,
          key: data.category.key,
          name: data.category.name
        },
        currency: {
          id: data.currency.id,
          key: data.currency.key,
          name: data.currency.name,
          glyph: data.currency.glyph,
          emoji_flag: data.currency.emoji_flag
        }
      } as Advertiser

      return success('', advertiser)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function all (token: string, filters?: AdvertiserFilters, options?: AdvertiserOptions) {
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
    const response = await AxiosGet(ROUTES.ADVERTISER_ROUTE + url, token)

    const advertisers = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
          const advertiser = {
            id: value.id,
            external_id: value.external_id,
            account_id: value.account_id,
            name: value.name,
            domain: value.domain,
            app_bundle: value.app_bundle,
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
            updated_at: value.updated_at,
            category: {
              id: value.category.id,
              key: value.category.key,
              name: value.category.name
            },
            currency: {
              id: value.currency.id,
              key: value.currency.key,
              name: value.currency.name,
              glyph: value.currency.glyph,
              emoji_flag: value.currency.emoji_flag
            }
          } as Advertiser

          advertisers.push(advertiser)
        }
      )

      return success('', advertisers)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function paginated (token: string, paginated: AdvertiserPaginated, filters?: AdvertiserFilters, options?: AdvertiserOptions) {
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
    const response = await AxiosGet(ROUTES.ADVERTISER_ROUTE + url, token)

    const advertisers = [] as any

    if (response.success) {
      let data = response.content.data

      forEach(data, function (value, key) {
        const advertiser = {
          id: value.id,
          external_id: value.external_id,
          account_id: value.account_id,
          name: value.name,
          domain: value.domain,
          app_bundle: value.app_bundle,
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
          updated_at: value.updated_at,
          category: {
            id: value.category.id,
            key: value.category.key,
            name: value.category.name
          },
          currency: {
            id: value.currency.id,
            key: value.currency.key,
            name: value.currency.name,
            glyph: value.currency.glyph,
            emoji_flag: value.currency.emoji_flag
          }
        } as Advertiser

        advertisers.push(advertiser)
      })

      return success('', {
        page: paginated.page,
        advertisers
      })
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function list (token: string, filters?: AdvertiserFilters, options?: AdvertiserOptions) {
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
    const response = await AxiosGet(ROUTES.ADVERTISER_ROUTE + url, token)

    const list = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const item = {
          id: parseInt(key),
          value: value
        } as AdvertiserList

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

export async function categories (token: string) {
  try {
    const response = await AxiosGet(ROUTES.ADVERTISER_CATEGORIES_ROUTE, token)

    const categories = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const category = {
          id: value.id,
          name: value.name
        } as Category

        categories.push(category)
      })

      return success('', categories)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

function getFilters (filters: AdvertiserFilters): string {
  let filter = ''

  const name = (isUndefined(filters.name)) ? '' : filters.name
  const category_id = (isUndefined(filters.category_id)) ? '' : filters.category_id
  const domain = (isUndefined(filters.domain)) ? '' : filters.domain
  const app_bundle = (isUndefined(filters.app_bundle)) ? '' : filters.app_bundle
  const external_id = (isUndefined(filters.external_id)) ? '' : filters.external_id
  const active = (isUndefined(filters.active)) ? '' : filters.active

  filter += 'filters[name]=' + name + '&filters[category_id]=' + category_id + '&filters[domain]=' + domain + '&filters[app_bundle]=' + app_bundle + '&filters[external_id]=' + external_id + '&filters[active]=' + active

  return filter
}

function getOptions (options: AdvertiserOptions, mode: string, paginated?: AdvertiserPaginated): string {
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
