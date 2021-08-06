import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { Shading } from '@/interfaces/bid'

const ROUTES = require('../routes').BID

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.BID_SHADING_ROUTE, token)

    const shadings = [] as any

    if (response.success) { 
      let data = response.content
      
      if (Object.keys(data).length > 0) {
        Object.keys(data).forEach(function (key) {
          const shading = {
            id: parseInt(key),
            name: data[key]
          } as Shading

          shadings.push(shading)
        })

        return success('', shadings)
      }
    }

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
