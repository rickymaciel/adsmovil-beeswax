import { isEmpty, forEach } from 'lodash'
import { Budget } from '@/interfaces/budget'
import { AxiosGet } from '@/api/AxiosService'

const ROUTES = require('../routes').BUDGET

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.BUDGET_ROUTE, token)

    const budgets = [] as any

    if (!isEmpty(response) && Object.keys(response).length > 0) {
      Object.keys(response).forEach(function (key) {
        const budget = {
          id: parseInt(key),
          name: response[key]
        } as Budget

        budgets.push(budget)
      })

      return budgets
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
