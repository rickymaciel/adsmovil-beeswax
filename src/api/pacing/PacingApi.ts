import { isEmpty, forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { PacingCampaing } from '@/interfaces/pacing'

const ROUTES = require('../routes').PACING

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CAMPAING_PACING_ROUTE, token)

    const campaign_pacings = [] as any

    if (!isEmpty(response) && Object.keys(response).length > 0) {
      Object.keys(response).forEach(function (key) {
        const pacing = {
          id: parseInt(key),
          name: response[key]
        } as PacingCampaing

        campaign_pacings.push(pacing)
      })

      return campaign_pacings
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
