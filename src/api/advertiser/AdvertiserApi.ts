import {
  ADVERTISER_ROUTE,
  AxiosPost,
  AxiosGet,
  AxiosPatch,
  ADVERTISER_CATEGORIES_ROUTE
} from '@/api/AxiosService'
import { forEach, isEmpty, isUndefined, replace } from 'lodash'
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

export async function create (advertiser: AdvertiserDataCreate, token: string) {
  try {
    const response = await AxiosPost(ADVERTISER_ROUTE, advertiser, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      return {
        id: response.id,
        external_id: response.external_id,
        account_id: response.account_id,
        name: response.name,
        domain: response.domain,
        app_bundle: response.app_bundle,
        active: response.active,
        created_by: {
          id: response.created_by.id,
          first_name: response.created_by.name,
          last_name: response.created_by.last_name,
          email: response.created_by.email
        },
        updated_by: {
          id: response.updated_by.id,
          first_name: response.updated_by.name,
          last_name: response.updated_by.last_name,
          email: response.updated_by.email
        },
        deleted_by: {
          id: (isEmpty(response.deleted_by)) ? null : response.deleted_by.id,
          first_name: (isEmpty(response.deleted_by)) ? null : response.deleted_by.name,
          last_name: (isEmpty(response.deleted_by)) ? null : response.deleted_by.last_name,
          email: (isEmpty(response.deleted_by)) ? null : response.deleted_by.email
        },
        created_at: response.created_at,
        updated_at: response.updated_at,
        category: {
          id: response.category.id,
          key: response.category.key,
          name: response.category.name
        },
        currency: {
          id: response.currency.id,
          key: response.currency.key,
          name: response.currency.name,
          glyph: response.currency.glyph,
          emoji_flag: response.currency.emoji_flag
        }
      } as Advertiser
    }

    console.log('ERROR: ', response)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function update (advertiser: AdvertiserDataUpdate, token: string) {
  try {
    const response = await AxiosPatch(ADVERTISER_ROUTE + '/' + advertiser.id, advertiser, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      return {
        id: response.id,
        external_id: response.external_id,
        account_id: response.account_id,
        name: response.name,
        domain: response.domain,
        app_bundle: response.app_bundle,
        active: response.active,
        created_by: {
          id: response.created_by.id,
          first_name: response.created_by.name,
          last_name: response.created_by.last_name,
          email: response.created_by.email
        },
        updated_by: {
          id: response.updated_by.id,
          first_name: response.updated_by.name,
          last_name: response.updated_by.last_name,
          email: response.updated_by.email
        },
        deleted_by: {
          id: (isEmpty(response.deleted_by)) ? null : response.deleted_by.id,
          first_name: (isEmpty(response.deleted_by)) ? null : response.deleted_by.name,
          last_name: (isEmpty(response.deleted_by)) ? null : response.deleted_by.last_name,
          email: (isEmpty(response.deleted_by)) ? null : response.deleted_by.email
        },
        created_at: response.created_at,
        updated_at: response.updated_at,
        category: {
          id: response.category.id,
          key: response.category.key,
          name: response.category.name
        },
        currency: {
          id: response.currency.id,
          key: response.currency.key,
          name: response.currency.name,
          glyph: response.currency.glyph,
          emoji_flag: response.currency.emoji_flag
        }
      } as Advertiser
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
    const response = await AxiosPatch(ADVERTISER_ROUTE + '/' + id + '/set/' + active, {}, token)

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
    const response = await AxiosGet(ADVERTISER_ROUTE + '/' + id, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      return {
        id: response.id,
        external_id: response.external_id,
        account_id: response.account_id,
        name: response.name,
        domain: response.domain,
        app_bundle: response.app_bundle,
        active: response.active,
        created_by: {
          id: response.created_by.id,
          first_name: response.created_by.name,
          last_name: response.created_by.last_name,
          email: response.created_by.email
        },
        updated_by: {
          id: response.updated_by.id,
          first_name: response.updated_by.name,
          last_name: response.updated_by.last_name,
          email: response.updated_by.email
        },
        deleted_by: {
          id: (isEmpty(response.deleted_by)) ? null : response.deleted_by.id,
          first_name: (isEmpty(response.deleted_by)) ? null : response.deleted_by.name,
          last_name: (isEmpty(response.deleted_by)) ? null : response.deleted_by.last_name,
          email: (isEmpty(response.deleted_by)) ? null : response.deleted_by.email
        },
        created_at: response.created_at,
        updated_at: response.updated_at,
        category: {
          id: response.category.id,
          key: response.category.key,
          name: response.category.name
        },
        currency: {
          id: response.currency.id,
          key: response.currency.key,
          name: response.currency.name,
          glyph: response.currency.glyph,
          emoji_flag: response.currency.emoji_flag
        }
      } as Advertiser
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
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
    const response = await AxiosGet(ADVERTISER_ROUTE + url, token)

    const advertisers = [] as any

    if (!isEmpty(response) && response.length > 0) {
      forEach(response, function (value, key) {
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

      return advertisers
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
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
    const response = await AxiosGet(ADVERTISER_ROUTE + url, token)

    const advertisers = [] as any

    if (!isEmpty(response) && !isUndefined(response.data) && response.data.length > 0) {
      forEach(response.data, function (value, key) {
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

      return {
        page: paginated.page,
        advertisers
      }
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
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
    const response = await AxiosGet(ADVERTISER_ROUTE + url, token)

    const list = [] as any

    if (!isEmpty(response)) {
      forEach(response, function (value, key) {
        const item = {
          id: parseInt(key),
          value: value
        } as AdvertiserList

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

export async function categories (token: string) {
  try {
    const response = await AxiosGet(ADVERTISER_CATEGORIES_ROUTE, token)

    const categories = [] as any

    if (!isEmpty(response) && response.length > 0) {
      forEach(response, function (value, key) {
        const category = {
          id: value.id,
          name: value.name
        } as Category

        categories.push(category)
      })

      return categories
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
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
