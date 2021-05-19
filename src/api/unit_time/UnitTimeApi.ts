import { isEmpty, forEach } from 'lodash'
import { UnitTime } from '@/interfaces/unit_time'
import { UNIT_TIME_ROUTE, AxiosGet } from '@/api/AxiosService'

export async function list (token: string) {
  try {
    const response = await AxiosGet(UNIT_TIME_ROUTE, token)

    const unit_times = [] as any

    if (!isEmpty(response) && Object.keys(response).length > 0) {
      Object.keys(response).forEach(function (key) {
        const time = {
          id: parseInt(key),
          name: response[key]
        } as UnitTime

        unit_times.push(time)
      })

      return unit_times
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
