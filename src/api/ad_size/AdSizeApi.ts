import { isEmpty, isUndefined, forEach } from 'lodash'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { CreativeSize } from '@/interfaces/ad_size'

const ROUTES = require('../routes').AD_SIZE

export async function creativeSize (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CREATIVE_SIZE_ROUTE, token)

    const creatives = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const cs = {
          id: value.id,
          name: value.name, //Key to use
          width: value.width,
          height: value.height,
          category: value.category
        } as CreativeSize

        creatives.push(cs)
      })

      return success('', creatives)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
