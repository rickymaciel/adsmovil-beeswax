import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { Apis, InBanner } from '@/interfaces/creative'
import { forEach } from 'lodash'

const ROUTES = require('../routes').CREATIVES

export async function inBanner (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CREATIVE_VIDEO_ROUTE, token)

    const inbanners = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const inb = {
          id: value.id,
          type: value.type,
          description: value.description,
          extra: value.extra
        } as InBanner

        inbanners.push(inb)
      })

      return success('', inbanners)
    }

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function apis (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CREATIVE_APIS_ROUTE, token)

    const apis = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const api = {
          id: value.id,
          type: value.type,
          description: value.description,
          extra: value.extra
        } as Apis

        apis.push(api)
      })

      return success('', apis)
    }

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
