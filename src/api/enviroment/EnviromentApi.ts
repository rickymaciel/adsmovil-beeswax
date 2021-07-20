import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { forEach } from 'lodash'
import { Enviroment } from '@/interfaces/enviroment'

const ROUTES = require('../routes').ENVIROMENT

export async function enviroments (key: string, token: string) {
  let url = ''

  switch (key) {
  case 'environment_type':
    url = ROUTES.ENVIROMENT_TYPE_ROUTE
    break
  case 'topframe':
    url = ROUTES.ENVIROMENT_TPFRAME_ROUTE
    break
  case 'video_api':
    url = ROUTES.ENVIROMENT_VIDEO_ROUTE
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
          extra: value.extra
        } as Enviroment

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
