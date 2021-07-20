import { isEmpty, forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { Timezone } from '@/interfaces/timezone'

const ROUTES = require('../routes').TIMEZONE

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.TIMEZONE_ROUTE, token)

    const timezones = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const timezone = {
          id: value.id,
          name: value.name
        } as Timezone

        timezones.push(timezone)
      })

      return timezones
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
