import { isEmpty, forEach } from 'lodash'
import { Timezone } from '@/interfaces/timezone'
import { TIMEZONE_ROUTE, AxiosGet } from '@/api/AxiosService'

export async function list (token: string) {
	try {
		const response = await AxiosGet(TIMEZONE_ROUTE, token)

		const timezones = [] as any

		if (!isEmpty(response) && response.length > 0) {
			forEach(response, function (value, key) {
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
