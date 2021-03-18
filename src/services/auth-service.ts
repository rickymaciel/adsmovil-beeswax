import { Credential } from '@/interfaces/credential'
import { AxiosPost } from '@/services/axios-service'

export const LOGIN_ROUTE = '/api/auth/login'
export const LOGOUT_ROUTE = '/api/auth/logout'

class AuthService {

    async login(credentials: Credential) {
        try {
            return AxiosPost(LOGIN_ROUTE, credentials)
        } catch (error) {
            console.error('AuthService:login', { error: error })
        }
    }

    async logout() {
        try {
            return AxiosPost(LOGOUT_ROUTE, null)
        } catch (error) {
            console.error('AuthService:logout', { error: error })
        }
    }

}

/**
 * Util: has token on response
 * @param response
 */
export function HasProviderToken(response: any): boolean {
    if (!response.data.success) return false
    return Boolean(String(response.data.response.access_token).length > 0)
}

/**
 * Util: get token
 * @param response
 */
export function ProviderToken(response: any): string {
    return response.data.success ? response.data.response.access_token : ''
}

export default new AuthService()
