import { Credential } from '@/interfaces/credential'
import { AxiosPost, GetData, GetErrors, GetMessage } from '@/services/axios-service'

export const LOGIN_ROUTE = '/api/auth/login'
export const LOGOUT_ROUTE = '/api/auth/logout'

class AuthService {

    async login(credentials: Credential) {
        try {
            const response = await AxiosPost(LOGIN_ROUTE, credentials)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async logout() {
        try {
            const response = await AxiosPost(LOGOUT_ROUTE, null)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
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
