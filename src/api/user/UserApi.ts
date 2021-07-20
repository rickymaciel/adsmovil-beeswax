import { isEmpty, isUndefined, forEach, replace } from 'lodash'
import { AxiosPost, AxiosGet, AxiosDelete, AxiosPatch } from '@/api/AxiosService'
import {
  User,
  Profile,
  UserDataCreate,
  UserDataUpdate,
  UserFilters,
  UserOptions,
  UserPaginated,
  UserList
} from '@/interfaces/user'

const ROUTES = require('../routes').USER

export async function create (user: UserDataCreate, token: string) {
  try {
    const response = await AxiosPost(ROUTES.USER_ROUTE, user, token)

    if (response.success) {
      const data = response.content

      return {
        id: data.id,
        account_id: data.account_id,
        email: data.email
      } as User
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function update (user: UserDataUpdate, token: string) {
  try {
    const response = await AxiosPatch(ROUTES.USER_ROUTE + '/' + user.id, user, token)

    if (response.success) {
      const data = response.content

      return {
        id: data.id || 'N/A',
        account_id: data.account_id || 'N/A',
        name: data.name || 'N/A',
        last_name: data.last_name || 'N/A',
        email: data.email || 'N/A',
        account: data.account || {},
        accounts: data.accounts || [],
        roles: data.roles || []
      } as Profile
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function remove (userId: number, token: string) {
  try {
    const response = await AxiosDelete(ROUTES.USER_ROUTE + '/' + userId, token)

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

export async function show (userId: number, token: string) {
  try {
    const response = await AxiosGet(ROUTES.USER_ROUTE + '/' + userId, token)

    if (response.success) {
      const data = response.content

      return {
        id: data.id || 'N/A',
        account_id: data.account_id || 'N/A',
        name: data.name || 'N/A',
        last_name: data.last_name || 'N/A',
        email: data.email || 'N/A',
        account: data.account || {},
        accounts: data.accounts || [],
        roles: data.roles || []
      } as Profile
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function all (token: string, filters?: UserFilters, options?: UserOptions) {
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
    const response = await AxiosGet(ROUTES.USER_ROUTE + url, token)

    const users = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const user = {
          id: value.id,
          account_id: value.account_id,
          name: value.name,
          last_name: value.last_name,
          email: value.email,
          created_at: value.created_at,
          account: value.account,
          accounts: value.accounts,
          roles: value.roles
        } as Profile

        users.push(user)
      })

      return users
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function paginated (token: string, paginated: UserPaginated, filters?: UserFilters, options?: UserOptions) {
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
    const response = await AxiosGet(ROUTES.USER_ROUTE + url, token)

    const users = [] as any

    if (response.success) {
      const data = response.content.data

      forEach(data, function (value, key) {
        const user = {
          id: value.id,
          account_id: value.account_id,
          name: value.name,
          last_name: value.last_name,
          email: value.email,
          created_at: value.created_at,
          account: value.account,
          accounts: value.accounts,
          roles: value.roles
        } as Profile

        users.push(user)
      })

      return {
        page: paginated.page,
        users
      }
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function list (token: string, filters?: UserFilters, options?: UserOptions) {
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
    const response = await AxiosGet(ROUTES.USER_ROUTE + url, token)

    const list = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const validItem = replace(value, ' ', '')
        if (!isEmpty(validItem)) {
          const item = {
            id: parseInt(key),
            value: value
          } as UserList

          list.push(item)
        }
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

export async function resendEmail (userId: number, token: string) {
  try {
    const response = await AxiosPost(ROUTES.EMAIL_RESEND_ROUTE + '/' + userId, null, token)

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

function getFilters (filters: UserFilters): string {
  let filter = ''

  const first_name = (isUndefined(filters.name)) ? '' : filters.name
  const last_name = (isUndefined(filters.last_name)) ? '' : filters.last_name
  const email = (isUndefined(filters.email)) ? '' : filters.email

  filter += 'filters[name]=' + first_name + '&filters[last_name]=' + last_name + '&filters[email]=' + email

  return filter
}

function getOptions (options: UserOptions, mode: string, paginated?: UserPaginated): string {
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
