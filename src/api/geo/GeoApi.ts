import { isEmpty, isUndefined, forEach } from 'lodash'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { City, Country, Lat_Long, LocationType, Region } from '@/interfaces/geo'

const ROUTES = require('../routes').GEO

export async function countries (token: string) {
  try {
    const response = await AxiosGet(ROUTES.COUNTRY_ROUTE, token)

    const countries = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const country = {
          id: value.id,
          name: value.name,
          prefix: value.prefix,
          prefix_3: value.prefix_3 //Key to use
        } as Country

        countries.push(country)
      })

      return success('', countries)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function regions (token: string) {
  try {
    const response = await AxiosGet(ROUTES.REGION_ROUTE, token)

    const regions = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const region = {
          id: value.id,
          country_id: value.country_id,
          name: value.name,
          prefix: value.prefix,
          key: value.key //Key to use
        } as Region

        regions.push(region)
      })

      return success('', regions)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function cities (term: string, token: string) {
  try {
    if (isEmpty(term) || term.length < 3) {
      return error('Invalid data for the term parameter', ['It should not be empty', 'Minimum of 3 characters'] as any)
    }

    const response = await AxiosGet(ROUTES.CITY_ROUTE + '?term=' + term, token)

    const cities = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const city = {
          id: value.id,
          name: value.name,
          prefix: value.prefix, //Key to use
          country_id: value.country_id,
          region_id: value.region_id
        } as City

        cities.push(city)
      })

      return success('', cities)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function lat_long (token: string) {
  try {
    const response = await AxiosGet(ROUTES.LAT_LONG_ROUTE, token)

    const lls = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
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

      return success('', lls)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function locationTypes (token: string) {
  try {
    const response = await AxiosGet(ROUTES.LOCATION_TYPE_ROUTE, token)

    const locations = [] as any

    if (response.success) {
      const data = response.content

      forEach(data, function (value, key) {
        const lt = {
          id: value.id,
          type: value.type,
          description: value.description,
          extra: value.extra //Key to use
        } as LocationType

        locations.push(lt)
      })

      return success('', locations)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
