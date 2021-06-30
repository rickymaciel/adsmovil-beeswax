import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet, AxiosPost, AxiosDelete } from '@/api/AxiosService'
import { Association, AssociationDataCreate } from '@/interfaces/creative'

const ROUTES = require('../../routes').CREATIVES

export async function create (association: AssociationDataCreate, token: string) {
  try {
    const response = await AxiosPost(ROUTES.CREATIVE_ASSOCIATE_ROUTE, association, token)

    if (response.success) {
      const data = response.content

      const associate = {} as Association

      return success('', associate)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function deleted (id: number, token: string) {
  try {
    const response = await AxiosDelete(ROUTES.CREATIVE_ASSOCIATE_ROUTE + '/' + id, token)

    if (response.success) {
      return true
    }

    console.log('ERROR: ', response.message)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
