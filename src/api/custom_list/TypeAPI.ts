import { isEmpty, forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { Type } from '@/interfaces/custom_list'

const ROUTES = require('../routes').CUSTOM_LIST

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CUSTOM_LIST_TYPES_ROUTE, token)

    const types = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const type = {
          id: value.id,
          key: value.key,
          name: value.name
        } as Type

        types.push(type)
      })

      return types
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
