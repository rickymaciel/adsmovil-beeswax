import { USER_ROUTE, EMAIL_RESEND_ROUTE, AxiosPost, AxiosGet, AxiosDelete, AxiosPatch } from '@/api/AxiosService'
import { isEmpty, isUndefined, forEach, replace } from 'lodash'
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

export async function create (user: UserDataCreate, token: string) {
  try {
    const response = await AxiosPost(USER_ROUTE, user, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      return {
        id: response.id,
        account_id: response.account_id,
        email: response.email
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
    const response = await AxiosPatch(USER_ROUTE + '/' + user.id, user, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      return {
        id: response.id || 'N/A',
        account_id: response.account_id || 'N/A',
        first_name: response.name || 'N/A',
        last_name: response.last_name || 'N/A',
        email: response.email || 'N/A'
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
    const response = await AxiosDelete(USER_ROUTE + '/' + userId, token)

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

export async function show (userId: number, token: string) {
  try {
    const response = await AxiosGet(USER_ROUTE + '/' + userId, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      return {
        id: response.id || 'N/A',
        account_id: response.account_id || 'N/A',
        first_name: response.name || 'N/A',
        last_name: response.last_name || 'N/A',
        email: response.email || 'N/A'
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
    const response = await AxiosGet(USER_ROUTE + url, token)

    const users = [] as any

    if (!isEmpty(response) && response.length > 0) {
      forEach(response, function (value, key) {
        const user = {
          id: value.id,
          account_id: value.account_id,
          first_name: value.name,
          last_name: value.last_name,
          email: value.email,
          created_at: value.created_at
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
    const response = await AxiosGet(USER_ROUTE + url, token)

    const users = [] as any

    if (!isEmpty(response) && !isUndefined(response.data) && response.data.length > 0) {
      forEach(response.data, function (value, key) {
        const user = {
          id: value.id,
          account_id: value.account_id,
          first_name: value.name,
          last_name: value.last_name,
          email: value.email,
          created_at: value.created_at
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
    const response = await AxiosGet(USER_ROUTE + url, token)

    const list = [] as any

    if (!isEmpty(response)) {
      forEach(response, function (value, key) {
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
    const response = await AxiosPost(EMAIL_RESEND_ROUTE + '/' + userId, null, token)

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

function getFilters (filters: UserFilters): string {
  let filter = ''

  const first_name = (isUndefined(filters.first_name)) ? '' : filters.first_name
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
