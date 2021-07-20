import { isEmpty, forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { Currency } from '@/interfaces/currency'

const ROUTES = require('../routes').CURRENCY

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CURRENCY_ROUTE, token)

    const currencies = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const currency = {
          id: value.id,
          key: value.key,
          name: value.name,
          glyph: value.glyph,
          emoji_flag: value.emoji_flag
        } as Currency

        currencies.push(currency)
      })

      return currencies
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
