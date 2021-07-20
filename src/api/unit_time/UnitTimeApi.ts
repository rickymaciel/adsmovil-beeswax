import { isEmpty, forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { UnitTime } from '@/interfaces/unit_time'

const ROUTES = require('../routes').UNIT_TIME

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.UNIT_TIME_ROUTE, token)

    const unit_times = [] as any

    if (response.success) {
      let data = response.content

      if (Object.keys(data).length > 0) {
        Object.keys(data).forEach(function (key) {
          const time = {
            id: parseInt(key),
            name: response[key]
          } as UnitTime

          unit_times.push(time)
        })

        return unit_times
      }
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
