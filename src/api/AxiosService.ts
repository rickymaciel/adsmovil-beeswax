import axios from 'axios'
import { GetMessage, GetErrors } from './handlers/HandlerError'
import { success, error } from './handlers/HandlerResponse'

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

export function AxiosPost (url: string, payload: any, token: string) {
  console.log('AXIOS POST DATA', payload)
  return axios.post(url, payload, {
    headers: {
      Authorization: token,
      Accept: 'application/json'
    }
  }).then(function (response) {
    console.log('POST AxiosPost', response)
    if (response.data.success) {
      return success('', response.data.response)
    }

    return error(response.data.message, [])
  }).catch(function (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
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
      return success('', response.data.response)
    }

    return error(response.data.message, [])
  }).catch(function (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
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
      return success('', response.data.response)
    }

    return error(response.data.message, [])
  }).catch(function (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  })
}

export function AxiosPut (url: string, payload: any, token: string) {
  return axios.put(url, payload, {
    headers: {
      Authorization: token,
      Accept: 'application/json'
    }
  }).then(function (response) {
    console.log('PUT AxiosPUT', response)
    if (response.data.success) {
      return success('', response.data.response)
    }

    return error(response.data.message, [])
  }).catch(function (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
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
      return success('', response.data.response)
    }

    return error(response.data.message, [])
  }).catch(function (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  })
}
