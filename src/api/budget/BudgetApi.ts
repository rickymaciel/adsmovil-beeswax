import { isEmpty, forEach } from 'lodash'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { Budget } from '@/interfaces/budget'

const ROUTES = require('../routes').BUDGET

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.BUDGET_ROUTE, token)

    const budgets = [] as any

    if (response.success) {
      let data = response.content

      Object.keys(data).forEach(function (key) {
        const budget = {
          id: parseInt(key),
          name: response[key]
        } as Budget

        budgets.push(budget)
      })

      return success('', budgets)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
