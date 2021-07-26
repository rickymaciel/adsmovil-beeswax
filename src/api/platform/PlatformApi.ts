import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { forEach } from 'lodash'
import {
  Browsers,
  BrowserVersion,
  DeviceModel,
  DeviceScreenSize,
  OperatingSystemVersion,
  Platform
} from '@/interfaces/platform'

const ROUTES = require('../routes').PLATFORM

export async function platforms (key: string, token: string) {
  let url = ''

  switch (key) {
  case 'carrier':
    url = ROUTES.PLATFORM_CARRIER_ROUTE
    break
  case 'device_type':
    url = ROUTES.PLATFORM_DEVICE_TYPE_ROUTE
    break
  case 'device_make':
    url = ROUTES.PLATFORM_DEVICE_MAKE_ROUTE
    break
  case 'operating_system':
    url = ROUTES.PLATFORM_OPERATING_SYSTEM_ROUTE
    break
  default:
    return error(`The key "${key}" is invalid`, [])
  }

  try {
    const response = await AxiosGet(url, token)

    const items = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const item = {
          id: value.id,
          type: value.type,
          description: value.description,
          extra: value.extra //Key to use
        } as Platform

        items.push(item)
      })

      return success('', items)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function browsers (token: string) {
  try {
    const response = await AxiosGet(ROUTES.PLATFORM_BROWSER_ROUTE, token)

    const items = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const item = {
          id: value.id,
          type: value.type,
          description: value.description,
          extra: value.extra //Key to use
        } as Browsers

        items.push(item)
      })

      return success('', items)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function browserVersions (token: string) {
  try {
    const response = await AxiosGet(ROUTES.PLATFORM_BROWSER_VERSION_ROUTE, token)

    const items = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const item = {
          id: value.id,
          type: value.type,
          description: value.description,
          key: value.key, //Key to use
          browser_key: value.browser_key
        } as BrowserVersion

        items.push(item)
      })

      return success('', items)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function deviceModels (token: string) {
  try {
    const response = await AxiosGet(ROUTES.PLATFORM_DEVICE_MODEL_ROUTE, token)

    const items = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const item = {
          id: value.id,
          type: value.type,
          description: value.description,
          key: value.key, //Key to use
          device_make_key: value.device_make_key
        } as DeviceModel

        items.push(item)
      })

      return success('', items)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function deviceScreenSize (token: string) {
  try {
    const response = await AxiosGet(ROUTES.PLATFORM_DEVICE_SCREEN_SIZE_ROUTE, token)

    const items = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const item = {
          id: value.id,
          type: value.type,
          description: value.description,
          key: value.key, //Key to use
          field_order: value.field_order
        } as DeviceScreenSize

        items.push(item)
      })

      return success('', items)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function operatingSystemVersion (token: string) {
  try {
    const response = await AxiosGet(ROUTES.PLATFORM_OPERATING_SYSTEM_VERSION_ROUTE, token)

    const items = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const item = {
          id: value.id,
          type: value.type,
          description: value.description,
          key: value.key, //Key to use
          operating_system_key: value.operating_system_key
        } as OperatingSystemVersion

        items.push(item)
      })

      return success('', items)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
