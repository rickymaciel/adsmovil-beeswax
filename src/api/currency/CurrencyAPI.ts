import { isEmpty, forEach } from 'lodash'
import { Currency } from '@/interfaces/currency'
import { CURRENCY_ROUTE, AxiosGet } from '@/api/AxiosService'

export async function list (token: string) {
  try {
    const response = await AxiosGet(CURRENCY_ROUTE, token)

    const currencies = [] as any

    if (!isEmpty(response) && response.length > 0) {
      forEach(response, function (value, key) {
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
