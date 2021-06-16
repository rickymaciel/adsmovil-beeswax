import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { PacingCampaing, PacingLine } from '@/interfaces/pacing'

const ROUTES = require('../routes').PACING

export async function pacingCampaing (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CAMPAING_PACING_ROUTE, token)

    const campaign_pacings = [] as any

    if (response.success) {
      let data = response.content

      if (Object.keys(data).length > 0) {
        Object.keys(data).forEach(function (key) {
          const pacing = {
            id: parseInt(key),
            name: data[key]
          } as PacingCampaing

          campaign_pacings.push(pacing)
        })

        return success('', campaign_pacings)
      }
    }

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', error)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function pacingLine (token: string) {
  try {
    const response = await AxiosGet(ROUTES.LINE_PACING_ROUTE, token)

    const line_pacings = [] as any

    if (response.success) {
      let data = response.content

      if (Object.keys(data).length > 0) {
        Object.keys(data).forEach(function (key) {
          const pacing = {
            id: parseInt(key),
            name: data[key]
          } as PacingLine

          line_pacings.push(pacing)
        })

        return success('', line_pacings)
      }
    }

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', error)
    return error(GetMessage(err), GetErrors(err))
  }
}
