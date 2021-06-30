import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { Expandable } from '@/interfaces/creative'
import { forEach } from 'lodash'

const ROUTES = require('../routes').CREATIVES

export async function types (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CREATIVE_EXPANDABLE_TYPE_ROUTE, token)

    const expandables = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const type = {
          id: value.id,
          type: value.type,
          description: value.description,
          extra: value.extra
        } as Expandable

        expandables.push(type)
      })

      return success('', expandables)
    }

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function direction (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CREATIVE_EXPANDABLE_DIRECTION_ROUTE, token)

    const expandables = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const direction = {
          id: value.id,
          type: value.type,
          description: value.description,
          extra: value.extra
        } as Expandable

        expandables.push(direction)
      })

      return success('', expandables)
    }

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
