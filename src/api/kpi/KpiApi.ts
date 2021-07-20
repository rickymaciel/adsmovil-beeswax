import { isEmpty, forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { KpiCampaing } from '@/interfaces/kpi'

const ROUTES = require('../routes').KPI

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CAMPAING_KPI_ROUTE, token)

    const kpi_campaings = [] as any

    if (response.success) {
      let data = response.content

      if (Object.keys(data).length > 0) {
        Object.keys(data).forEach(function (key) {
          const kpi = {
            id: parseInt(key),
            name: response[key]
          } as KpiCampaing

          kpi_campaings.push(kpi)
        })

        return kpi_campaings
      }
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
