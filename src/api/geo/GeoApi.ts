import { isEmpty, isUndefined, forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { Country, Lat_Long, Region } from '@/interfaces/geo'

const ROUTES = require('../routes').GEO

export async function countries (token: string) {
  try {
    const response = await AxiosGet(ROUTES.COUNTRY_ROUTE, token)

    const countries = [] as any

    if (!isEmpty(response) && response.length > 0) {
      forEach(response, function (value, key) {
        const country = {
          id: value.id,
          name: value.name,
          prefix: value.prefix,
          prefix_3: value.prefix_3 //Key to use
        } as Country

        countries.push(country)
      })

      return countries
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function regions (token: string) {
  try {
    const response = await AxiosGet(ROUTES.REGION_ROUTE, token)

    const regions = [] as any

    if (!isEmpty(response) && response.length > 0) {
      forEach(response, function (value, key) {
        const region = {
          id: value.id,
          country_id: value.country_id,
          name: value.name,
          prefix: value.prefix,
          key: value.key //Key to use
        } as Region

        regions.push(region)
      })

      return regions
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function lat_long (token: string) {
  try {
    const response = await AxiosGet(ROUTES.LAT_LONG_ROUTE, token)

    const lls = [] as any

    if (!isEmpty(response) && response.length > 0) {
      forEach(response, function (value, key) {
        const ll = {
          id: value.id,
          account_id: value.account_id,
          external_id: value.external_id, //Key to use
          name: value.name,
          custom_list_type_id: value.custom_list_type_id,
          delimiter: value.delimiter,
          default_radius_km: value.default_radius_km,
          notes: value.notes,
          active: value.active,
          terms_count: value.terms_count
        } as Lat_Long

        lls.push(ll)
      })

      return lls
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
