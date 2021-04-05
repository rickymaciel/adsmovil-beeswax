import { isEmpty, forEach } from 'lodash'
import { CUSTOM_LIST_TYPES_ROUTE, AxiosGet } from '@/api/AxiosService'
import { Type } from '@/interfaces/custom_list'

export async function list (token: string) {
  try {
    const response = await AxiosGet(CUSTOM_LIST_TYPES_ROUTE, token)

    const types = [] as any

    if (!isEmpty(response) && response.length > 0) {
      forEach(response, function (value, key) {
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
