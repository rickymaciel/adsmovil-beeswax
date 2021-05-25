///
/// SOLO CONFIGURACIONES DE AXIOS
///

import axios, { AxiosError, AxiosResponse } from 'axios'
import { HasProviderToken, ProviderToken } from './auth-service'
import { ValidateToken } from '@/services/jwt-service'
import { isNull, isUndefined } from 'lodash'

axios.defaults.baseURL = 'https://dsp-api-testing.adsmovil.com'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Accept'] = 'application/json'

const token = localStorage.getItem('token') || ''

if (token && token.startsWith('Bearer ')) {
    axios.defaults.headers.common.Authorization = ValidateToken(token)
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    return config
}, function (error) {
    console.error('AxiosService.interceptors', { request: error })
    return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    if (HasProviderToken(response)) {
        const provider = ProviderToken(response)
        if (provider && provider.startsWith('Bearer')) {
            const tokenValid = ValidateToken(provider)

            if (String(tokenValid).length > 0) {
                axios.defaults.headers.common.Authorization = tokenValid
                localStorage.setItem('token', tokenValid)
            }
        }
    }

    return response
}, function (error) {
    console.error('AxiosService.interceptors', { error: error })
    return Promise.reject(error)
})

/**
 * POST
 * @param url
 * @param payload
 */
export function AxiosPost(url: string, payload: any) {
    return axios.post(url, payload)
}

/**
 * GET
 * @param url
 */
export function AxiosGet(url: string) {
    return axios.get(url)
}

/**
 * PATCH
 * @param url
 * @param payload
 */
export function AxiosPatch(url: string, payload: any) {
    return axios.patch(url, payload)
}

// RESPONSE BOOLEAN CHECK //

/**
 * HasSuccess
 * @param response AxiosResponse<any>
 */
export function HasSuccess(response: AxiosResponse<any>) {
    return Boolean((response.status >= 200 && response.status < 300) && typeof response.data.success !== typeof undefined && response.data.success)
}

/**
 * HasError
 * @param response AxiosResponse<any>
 */
export function HasError(response: AxiosResponse<any>) {
    return Boolean((response.status < 200 || response.status > 300) && !response.data.success)
}

/**
 * HasErrors
 * @param error AxiosResponse<any>
 */
export function HasErrors(error: AxiosError<any>) {
    return Boolean(error.response?.data.errors)
}

/**
 * HasMessage
 * @param response AxiosResponse<any>
 */
export function HasMessage(response: AxiosResponse<any>) {
    return String(response.data.message).length > 0
}

// GET DATA FROM RESPONSE //

/**
 * GetData
 * @param response AxiosResponse<any>
 */
export function GetData(response: AxiosResponse<any>) {
    console.log('GetData', {
        response: response.data.response
    });
    return response.data.response
}

/**
 * GetDataError
 * @param error AxiosError<any>
 */
export function GetDataError(error: AxiosError<any>) {
    return error.response?.data
}

/**
 * GetErrors
 * @param error AxiosError<any>
 */
export function GetErrors(error: AxiosError<any>) {
    return error.response?.data.errors || {}
}

/**
 * GetMessage
 * @param response AxiosError<any>
 */
export function GetMessage(error: AxiosError<any>) {
    return error.response?.data.message
}