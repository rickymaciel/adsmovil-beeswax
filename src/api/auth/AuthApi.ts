import {
	LOGIN_ROUTE,
	LOGOUT_ROUTE,
	INITIALIZE_ROUTE,
	PROFILE_ROUTE,
	AxiosPost,
	PERMISSION_ROUTE,
	AxiosGet
} from '@/api/AxiosService'
import { Credential } from '@/interfaces/credential'
import { Profile, UserInit, Permission } from '@/interfaces/user'
import { Token } from '@/interfaces/token'
import { isEmpty, isUndefined, forEach } from 'lodash'

export async function login (credentials: Credential) {
	try {
		const response = await AxiosPost(LOGIN_ROUTE, credentials, '')

		if (!isEmpty(response) && !isUndefined(response.access_token)) {
			return {
				token: response.access_token,
				expires_in: response.expires_in
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
		const response = await AxiosPost(LOGOUT_ROUTE, null, token)

		if (!isEmpty(response) && !isUndefined(response.message)) {
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
		const response = await AxiosPost(PROFILE_ROUTE, null, token)

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

export async function initialize (user: UserInit, hash: string, token: string) {
	try {
		const response = await AxiosPost(INITIALIZE_ROUTE + '/' + hash, user, token)

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

export async function permissions (token: string) {
	try {
		const response = await AxiosGet(PERMISSION_ROUTE, token)
		const permissions = [] as any

		if (!isEmpty(response) && response.length > 0) {
			forEach(response, function (value, key) {
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
