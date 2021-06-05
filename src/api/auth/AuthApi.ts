import { AxiosPost, AxiosGet } from '@/api/AxiosService'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { Credential } from '@/interfaces/credential'
import { Reset } from '@/interfaces/reset'
import { Profile, UserInit, Account_scheme_1, Account_scheme_2, Permission, Pivot, Role } from '@/interfaces/user'
import { Token } from '@/interfaces/token'
import { isEmpty, isUndefined, forEach } from 'lodash'

const ROUTES = require('../routes').AUTH

export async function login (credentials: Credential) {
  try {
    const response = await AxiosPost(ROUTES.LOGIN_ROUTE, credentials, '')

    if (response.success) {
      let data = response.content

      return {
        token: data.access_token,
        expires_in: data.expires_in
      } as Token
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function logout (token: string) {
  try {
    const response = await AxiosPost(ROUTES.LOGOUT_ROUTE, null, token)

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

export async function profile (token: string) {
  try {
    const response = await AxiosPost(ROUTES.PROFILE_ROUTE, null, token)

    if (response.success) {
      let data = response.content
      let accounts = [] as any
      let roles = [] as any

      forEach(data.accounts, function (value, key) {
        let pivot = {
          user_id: value.pivot.user_id,
          account_id: value.pivot.account_id,
          active: value.pivot.active
        } as Pivot

        let account = {
          id: value.id,
          external_id: value.external_id,
          name: value.name,
          pivot: pivot
        } as Account_scheme_1

        accounts.push(account)
      })

      forEach(data.roles, function (value, key) {
        let pivot = {
          user_id: value.pivot.user_id,
          account_id: value.pivot.account_id,
          active: value.pivot.active,
          role_id: value.pivot.role_id
        } as Pivot

        let role = {
          id: value.id,
          name: value.name,
          description: value.description,
          pivot: pivot
        } as Role

        roles.push(role)
      })

      let profile = {
        id: data.id,
        account_id: data.account_id,
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        email_verified_at: data.email_verified_at,
        created_at: data.created_at,
        updated_at: data.updated_at,
        account: {
          id: data.account.id,
          external_id: data.account.external_id,
          name: data.account.name
        },
        accounts: accounts,
        roles: roles
      } as Profile

      return success('', profile)
    }

    console.log('ERROR: ', response.message)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function account (token: string) {
  try {
    const response = await AxiosGet(ROUTES.ACCOUNT_ROUTE, token)

    if (response.success) {
      let data = response.content

      return {
        id: data.id,
        name: data.name,
        currency: {
          id: data.currency.id,
          key: data.currency.key,
          name: data.currency.name,
          glyph: data.currency.glyph,
          emoji_flag: data.currency.emoji_flag
        },
        timezone: {
          id: data.timezone.id,
          name: data.timezone.name
        }
      } as Account_scheme_2
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function initialize (user: UserInit, hash: string, token: string) {
  try {
    const response = await AxiosPost(ROUTES.INITIALIZE_ROUTE + '/' + hash, user, token)

    if (response.success) {
      let data = response.content
      let accounts = [] as any
      let roles = [] as any

      forEach(data.accounts, function (value, key) {
        let pivot = {
          user_id: value.pivot.user_id,
          account_id: value.pivot.account_id,
          active: value.pivot.active
        } as Pivot

        let account = {
          id: value.id,
          external_id: value.external_id,
          name: value.name,
          pivot: pivot
        } as Account_scheme_1

        accounts.push(account)
      })

      forEach(data.roles, function (value, key) {
        let pivot = {
          user_id: value.pivot.user_id,
          account_id: value.pivot.account_id,
          active: value.pivot.active,
          role_id: value.pivot.role_id
        } as Pivot

        let role = {
          id: value.id,
          name: value.name,
          description: value.description,
          pivot: pivot
        } as Role

        roles.push(role)
      })

      let profile = {
        id: data.id,
        account_id: data.account_id,
        name: data.name,
        last_name: data.last_name,
        email: data.email,
        email_verified_at: data.email_verified_at,
        created_at: data.created_at,
        updated_at: data.updated_at,
        account: {
          id: data.account.id,
          external_id: data.account.external_id,
          name: data.account.name
        },
        accounts: accounts,
        roles: roles
      } as Profile

      return success('', profile)
    }

    console.log('ERROR: ', response.message)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function forgot (email: string, token: string) {
  try {
    const response = await AxiosPost(ROUTES.FORGOT_ROUTE, { email: email }, token)

    if (response.success) {
      return response.message
    }

    console.log('ERROR: ', response.message)

    return false
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return false
  }
}

export async function reset (reset: Reset, token: string) {
  try {
    const response = await AxiosPost(ROUTES.RESET_ROUTE, reset, token)

    if (response.success) {
      return response.message
    }

    console.log('ERROR: ', response.message)

    return false
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return false
  }
}

export async function permissions (token: string) {
  try {
    const response = await AxiosGet(ROUTES.PERMISSION_ROUTE, token)
    const permissions = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const permission = {
          name: value.name,
          description: value.description
        } as Permission

        permissions.push(permission)
      })

      return permissions
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
