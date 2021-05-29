import { forEach, isEmpty, isUndefined } from 'lodash'
import { AxiosPost, AxiosGet, AxiosPatch } from '@/api/AxiosService'
import {
  Modifier,
  ModifierType,
  ModifierModule,
  ModifierTerm,
  ModifierFilters,
  ModifierOptions,
  ModifierPaginated,
  ModifierList,
  ModifierDataCreate,
  ModifierDataUpdate
} from '@/interfaces/modifier'

const ROUTES = require('../routes').MODIFIERS

export async function create (modifier: ModifierDataCreate, token: string) {
  try {
    const response = await AxiosPost(ROUTES.MODIFIER_ROUTE, modifier, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      let terms = [] as any

      forEach(response.terms, function (value, key) {
        const term = {
          id: value.id,
          modifier_id: value.modifier_id,
          module_id: value.module_id,
          key: value.key,
          value: value.value,
          modifier: value.modifier,
          matching_type_id: value.matching_type_id,
          active: value.active,
          module: {
            id: value.module.id,
            type: value.module.type,
            description: value.module.description,
            extra: value.module.extra
          },
          matching_type: {
            id: value.matching_type.id,
            type: value.matching_type.type,
            description: value.matching_type.description,
            extra: value.matching_type.extra
          }
        } as ModifierTerm

        terms.push(term)
      })

      return {
        id: response.id,
        external_id: response.external_id,
        alternative_id: response.alternative_id,
        account_id: response.account_id,
        advertiser_id: response.advertiser_id,
        name: response.name,
        modifier_type_id: response.modifier_type_id,
        active: response.active,
        created_by: response.created_by,
        updated_by: response.updated_by,
        deleted_by: response.deleted_by,
        created_at: response.created_at,
        updated_at: response.updated_at,
        advertiser: {
          id: response.advertiser.id,
          external_id: response.advertiser.external_id,
          account_id: response.advertiser.account_id,
          name: response.advertiser.name,
          domain: response.advertiser.domain,
          category_id: response.advertiser.category_id,
          app_bundle: response.advertiser.app_bundle,
          currency_id: response.advertiser.currency_id,
          active: response.advertiser.active,
          created_by: response.advertiser.created_by,
          updated_by: response.advertiser.updated_by,
          deleted_by: response.advertiser.deleted_by,
          created_at: response.advertiser.created_at,
          updated_at: response.advertiser.updated_at
        },
        type: {
          id: response.type.id,
          type: response.type.type,
          description: response.type.description,
          extra: response.type.extra
        },
        terms: terms
      } as Modifier
    }

    console.log('ERROR: ', response)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function update (modifier: ModifierDataUpdate, token: string) {
  try {
    const response = await AxiosPatch(ROUTES.MODIFIER_ROUTE + '/' + modifier.id, modifier, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      let terms = [] as any

      forEach(response.terms, function (value, key) {
        const term = {
          id: value.id,
          modifier_id: value.modifier_id,
          module_id: value.module_id,
          key: value.key,
          value: value.value,
          modifier: value.modifier,
          matching_type_id: value.matching_type_id,
          active: value.active,
          module: {
            id: value.module.id,
            type: value.module.type,
            description: value.module.description,
            extra: value.module.extra
          },
          matching_type: {
            id: value.matching_type.id,
            type: value.matching_type.type,
            description: value.matching_type.description,
            extra: value.matching_type.extra
          }
        } as ModifierTerm

        terms.push(term)
      })

      return {
        id: response.id,
        external_id: response.external_id,
        alternative_id: response.alternative_id,
        account_id: response.account_id,
        advertiser_id: response.advertiser_id,
        name: response.name,
        modifier_type_id: response.modifier_type_id,
        active: response.active,
        created_by: response.created_by,
        updated_by: response.updated_by,
        deleted_by: response.deleted_by,
        created_at: response.created_at,
        updated_at: response.updated_at,
        advertiser: {
          id: response.advertiser.id,
          external_id: response.advertiser.external_id,
          account_id: response.advertiser.account_id,
          name: response.advertiser.name,
          domain: response.advertiser.domain,
          category_id: response.advertiser.category_id,
          app_bundle: response.advertiser.app_bundle,
          currency_id: response.advertiser.currency_id,
          active: response.advertiser.active,
          created_by: response.advertiser.created_by,
          updated_by: response.advertiser.updated_by,
          deleted_by: response.advertiser.deleted_by,
          created_at: response.advertiser.created_at,
          updated_at: response.advertiser.updated_at
        },
        type: {
          id: response.type.id,
          type: response.type.type,
          description: response.type.description,
          extra: response.type.extra
        },
        terms: terms
      } as Modifier
    }

    console.log('ERROR: ', response)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function show (id: number, token: string) {
  try {
    const response = await AxiosGet(ROUTES.MODIFIER_ROUTE + '/' + id, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      let terms = [] as any

      forEach(response.terms, function (value, key) {
        const term = {
          id: value.id,
          modifier_id: value.modifier_id,
          module_id: value.module_id,
          key: value.key,
          value: value.value,
          modifier: value.modifier,
          matching_type_id: value.matching_type_id,
          active: value.active,
          created_by: value.created_by,
          updated_by: value.updated_by,
          deleted_by: value.deleted_by,
          created_at: value.created_at,
          updated_at: value.updated_at
        } as ModifierTerm

        terms.push(term)
      })

      return {
        id: response.id,
        external_id: response.external_id,
        alternative_id: response.alternative_id,
        account_id: response.account_id,
        advertiser_id: response.advertiser_id,
        name: response.name,
        modifier_type_id: response.modifier_type_id,
        active: response.active,
        created_by: response.created_by,
        updated_by: response.updated_by,
        deleted_by: response.deleted_by,
        created_at: response.created_at,
        updated_at: response.updated_at,
        advertiser: {
          id: response.advertiser.id,
          external_id: response.advertiser.external_id,
          account_id: response.advertiser.account_id,
          name: response.advertiser.name,
          domain: response.advertiser.domain,
          category_id: response.advertiser.category_id,
          app_bundle: response.advertiser.app_bundle,
          currency_id: response.advertiser.currency_id,
          active: response.advertiser.active,
          created_by: response.advertiser.created_by,
          updated_by: response.advertiser.updated_by,
          deleted_by: response.advertiser.deleted_by,
          created_at: response.advertiser.created_at,
          updated_at: response.advertiser.updated_at
        },
        type: {
          id: response.type.id,
          type: response.type.type,
          description: response.type.description,
          extra: response.type.extra
        },
        terms: terms
      } as Modifier
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function all (token: string, filters?: ModifierFilters, options?: ModifierOptions) {
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
    const response = await AxiosGet(ROUTES.MODIFIER_ROUTE + url, token)

    const modifiers = [] as any

    if (!isEmpty(response) && response.length > 0) {
      forEach(response, function (value, key) {
        const modifier = {
          id: value.id,
          external_id: value.external_id,
          alternative_id: value.alternative_id,
          account_id: value.account_id,
          advertiser_id: value.advertiser_id,
          name: value.name,
          modifier_type_id: value.modifier_type_id,
          active: value.active,
          created_by: value.created_by,
          updated_by: value.updated_by,
          deleted_by: value.deleted_by,
          created_at: value.created_at,
          updated_at: value.updated_at,
          advertiser: {
            id: value.advertiser.id,
            external_id: value.advertiser.external_id,
            account_id: value.advertiser.account_id,
            name: value.advertiser.name,
            domain: value.advertiser.domain,
            category_id: value.advertiser.category_id,
            app_bundle: value.advertiser.app_bundle,
            currency_id: value.advertiser.currency_id,
            active: value.advertiser.active,
            created_by: value.advertiser.created_by,
            updated_by: value.advertiser.updated_by,
            deleted_by: value.advertiser.deleted_by,
            created_at: value.advertiser.created_at,
            updated_at: value.advertiser.updated_at
          },
          type: {
            id: value.type.id,
            type: value.type.type,
            description: value.type.description,
            extra: value.type.extra
          }
        } as Modifier

        modifiers.push(modifier)
      })

      return modifiers
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function paginated (token: string, paginated: ModifierPaginated, filters?: ModifierFilters, options?: ModifierOptions) {
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
    const response = await AxiosGet(ROUTES.MODIFIER_ROUTE + url, token)

    const modifiers = [] as any

    if (!isEmpty(response) && !isUndefined(response.data) && response.data.length > 0) {
      forEach(response.data, function (value, key) {
        const modifier = {
          id: value.id,
          external_id: value.external_id,
          alternative_id: value.alternative_id,
          account_id: value.account_id,
          advertiser_id: value.advertiser_id,
          name: value.name,
          modifier_type_id: value.modifier_type_id,
          active: value.active,
          created_by: value.created_by,
          updated_by: value.updated_by,
          deleted_by: value.deleted_by,
          created_at: value.created_at,
          updated_at: value.updated_at,
          advertiser: {
            id: value.advertiser.id,
            external_id: value.advertiser.external_id,
            account_id: value.advertiser.account_id,
            name: value.advertiser.name,
            domain: value.advertiser.domain,
            category_id: value.advertiser.category_id,
            app_bundle: value.advertiser.app_bundle,
            currency_id: value.advertiser.currency_id,
            active: value.advertiser.active,
            created_by: value.advertiser.created_by,
            updated_by: value.advertiser.updated_by,
            deleted_by: value.advertiser.deleted_by,
            created_at: value.advertiser.created_at,
            updated_at: value.advertiser.updated_at
          },
          type: {
            id: value.type.id,
            type: value.type.type,
            description: value.type.description,
            extra: value.type.extra
          }
        } as Modifier

        modifiers.push(modifier)
      })

      return {
        page: paginated.page,
        modifiers
      }
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function list (token: string, filters?: ModifierFilters, options?: ModifierOptions) {
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
    const response = await AxiosGet(ROUTES.MODIFIER_ROUTE + url, token)

    const list = [] as any

    if (!isEmpty(response)) {
      forEach(response, function (value, key) {
        const item = {
          id: parseInt(key),
          value: value
        } as ModifierList

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

export async function types (token: string) {
  try {
    const response = await AxiosGet(ROUTES.MODIFIER_TYPE_ROUTE, token)

    const types = [] as any

    if (!isEmpty(response) && Object.keys(response).length > 0) {
      Object.keys(response).forEach(function (key) {
        const type = {
          id: parseInt(key),
          name: response[key]
        } as ModifierType

        types.push(type)
      })

      return types
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function modules (token: string) {
  try {
    const response = await AxiosGet(ROUTES.MODIFIER_MODULE_ROUTE, token)

    const modules = [] as any

    if (!isEmpty(response) && Object.keys(response).length > 0) {
      Object.keys(response).forEach(function (key) {
        const module = {
          id: parseInt(key),
          name: response[key]
        } as ModifierModule

        modules.push(module)
      })

      return modules
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

function getFilters (filters: ModifierFilters): string {
  let filter = ''

  const name = (isUndefined(filters.name)) ? '' : filters.name
  const alternative_id = (isUndefined(filters.alternative_id)) ? '' : filters.alternative_id
  const external_id = (isUndefined(filters.external_id)) ? '' : filters.external_id
  const advertiser_id = (isUndefined(filters.advertiser_id)) ? '' : filters.advertiser_id
  const modifier_type_id = (isUndefined(filters.modifier_type_id)) ? '' : filters.modifier_type_id
  const active = (isUndefined(filters.active)) ? '' : filters.active

  filter += 'filters[name]=' + name + '&filters[alternative_id]=' + alternative_id + '&filters[external_id]=' + external_id + '&filters[advertiser_id]=' + advertiser_id + '&filters[modifier_type_id]=' + modifier_type_id + '&filters[active]=' + active

  return filter
}

function getOptions (options: ModifierOptions, mode: string, paginated?: ModifierPaginated): string {
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
