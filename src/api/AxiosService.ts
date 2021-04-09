import axios from 'axios'

axios.defaults.baseURL = 'https://dsp-api-testing.adsmovil.com'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  console.error('AxiosService.interceptors', { request: error })
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  console.error('AxiosService.interceptors', { error: error })
  return Promise.reject(error)
})

/**
 * Routes
 */
export const LOGIN_ROUTE = '/api/auth/login'
export const LOGOUT_ROUTE = '/api/auth/logout'
export const PROFILE_ROUTE = '/api/auth/me'
export const FORGOT_ROUTE = '/api/auth/password/forgot'
export const RESET_ROUTE = '/api/auth/password/reset'
export const PERMISSION_ROUTE = '/api/auth/permissions'
export const INITIALIZE_ROUTE = '/api/auth/init'
export const USER_ROUTE = '/api/users'
export const EMAIL_RESEND_ROUTE = '/api/users/resend_email'
export const ADVERTISER_ROUTE = '/api/advertisers'
export const ADVERTISER_CATEGORIES_ROUTE = '/api/list/advertiser_categories'
export const TIMEZONE_ROUTE = '/api/list/timezones'
export const CURRENCY_ROUTE = '/api/list/currencies'
export const CUSTOM_LIST_ROUTE = '/api/custom_lists'
export const CUSTOM_LIST_EXCHANGE_ROUTE = '/api/list/custom_list_exchanges'
export const CUSTOM_LIST_TYPES_ROUTE = '/api/list/custom_list_types'

export function AxiosPost (url: string, payload: any, token: string) {
  return axios.post(url, payload, {
    headers: {
      Authorization: token,
      Accept: 'application/json'
    }
  }).then(function (response) {
    console.log('POST AxiosPost', response)
    if (response.data.success) {
      return response.data.response
    }

    return response.data.message
  }).catch(function (error) {
    console.log('EXCEPTION: ', error)
    return null
  })
}

export function AxiosGet (url: string, token: string) {
  return axios.get(url, {
    headers: {
      Authorization: token,
      Accept: 'application/json'
    }
  }).then(function (response) {
    console.log('GET AxiosGet', response)
    if (response.data.success) {
      return response.data.response
    }

    return null
  }).catch(function (error) {
    console.log('EXCEPTION: ', error)
    return null
  })
}

export function AxiosPatch (url: string, payload: any, token: string) {
  return axios.patch(url, payload, {
    headers: {
      Authorization: token,
      Accept: 'application/json'
    }
  }).then(function (response) {
    console.log('PATCH AxiosPatch', response)
    if (response.data.success) {
      return response.data.response
    }

    return null
  }).catch(function (error) {
    console.log('EXCEPTION: ', error)
    return null
  })
}

export function AxiosDelete (url: string, token: string) {
  return axios.delete(url, {
    headers: {
      Authorization: token,
      Accept: 'application/json'
    }
  }).then(function (response) {
    console.log('DELETE AxiosDelete', response)
    if (response.data.success) {
      return response.data.response
    }

    return null
  }).catch(function (error) {
    console.log('EXCEPTION: ', error)
    return null
  })
}
