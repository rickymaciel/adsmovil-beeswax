import { isEmpty, forEach } from 'lodash'
import { KpiCampaing } from '@/interfaces/kpi'
import { CAMPAING_KPI_ROUTE, AxiosGet } from '@/api/AxiosService'

export async function list (token: string) {
  try {
    const response = await AxiosGet(CAMPAING_KPI_ROUTE, token)

    const kpi_campaings = [] as any

    if (!isEmpty(response) && Object.keys(response).length > 0) {
      Object.keys(response).forEach(function (key) {
        const kpi = {
          id: parseInt(key),
          name: response[key]
        } as KpiCampaing

        kpi_campaings.push(kpi)
      })

      return kpi_campaings
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
