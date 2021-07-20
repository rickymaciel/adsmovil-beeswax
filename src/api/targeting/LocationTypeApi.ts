import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { forEach } from 'lodash'
import { LocationType } from '@/interfaces/location_type'

const ROUTES = require('../routes').TARGETING

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.TARGETING_LOCATION_TYPE_ROUTE, token)

    const locationTypes = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const location = {
          id: value.id,
          type: value.type,
          description: value.description,
          extra: value.extra
        } as LocationType

        locationTypes.push(location)
      })

      return success('', locationTypes)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
