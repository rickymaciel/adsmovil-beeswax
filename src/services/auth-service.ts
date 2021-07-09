import { Credential } from '@/interfaces/credential'
import { AxiosPost, GetData, GetErrors, GetMessage } from '@/services/axios-service'
import { isUndefined } from 'lodash'

export const LOGIN_ROUTE = '/api/auth/login'
export const INIT_ROUTE = '/api/auth/init'
export const LOGOUT_ROUTE = '/api/auth/logout'
export const FORGOT_PASSWORD_ROUTE = '/api/auth/password/forgot'
export const PASSWORD_RESET_ROUTE = '/api/auth/password/reset'

class AuthService {

    async login(credentials: Credential) {
        try {
            const response = await AxiosPost(LOGIN_ROUTE, credentials)
            return Promise.resolve({
                success: true,
                token: ProviderToken(response)
            });
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async init(initData: any) {
        try {
            const response = await AxiosPost(`${INIT_ROUTE}/${initData.init_token}`, initData)
            return Promise.resolve({
                success: true,
                token: ProviderToken(response)
            });
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

    async forgotPassword(email) {
        try {
            const response = await AxiosPost(FORGOT_PASSWORD_ROUTE, {email})
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }        
    }

    async resetPassword({email, password, password_confirmation, token}) {
        try {
            const response = await AxiosPost(PASSWORD_RESET_ROUTE, {
                email,
                password,
                password_confirmation,
                token
            });
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
    if (isUndefined(response.data.success) && !response.data.success) return false
    return Boolean(String(response.data.response.access_token).length > 0)
}

/**
 * Util: get token
 * @param response
 */
export function ProviderToken(response: any): string {
    if (!HasProviderToken(response)) return "";
    return response.data.response.access_token
}

export default new AuthService()
