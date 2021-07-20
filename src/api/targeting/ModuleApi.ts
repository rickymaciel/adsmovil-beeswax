import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { Module } from '@/interfaces/module'

const ROUTES = require('../routes').TARGETING

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.TARGETING_MODULE_ROUTE, token)

    const modules = [] as any

    if (response.success) {
      const data = response.content

      if (Object.keys(data).length > 0) {
        Object.keys(data).forEach(function (key) {
          const module = {
            id: parseInt(key),
            name: data[key]
          } as Module

          modules.push(module)
        })

        return success('', modules)
      }
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
