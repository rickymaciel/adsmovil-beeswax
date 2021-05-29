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

export function AxiosPut (url: string, payload: any, token: string) {
  return axios.put(url, payload, {
    headers: {
      Authorization: token,
      Accept: 'application/json'
    }
  }).then(function (response) {
    console.log('PUT AxiosPUT', response)
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
