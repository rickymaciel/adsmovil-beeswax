import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet, AxiosPost } from '@/api/AxiosService'
import { TagCheck } from '@/interfaces/creative'

const ROUTES = require('../routes').CREATIVES

export async function check (tag: TagCheck, token: string) {
  try {
    const response = await AxiosPost(ROUTES.CREATIVE_TAG_ROUTE, tag, token)

    if (response.success) {

      return success('', { tag: response.content.content })
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
