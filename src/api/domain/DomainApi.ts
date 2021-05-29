import { isEmpty, isUndefined, forEach } from 'lodash'
import { AxiosGet } from '@/api/AxiosService'
import { DomainList } from '@/interfaces/domain'

const ROUTES = require('../routes').DOMAIN

export async function domainList (token: string) {
  try {
    const response = await AxiosGet(ROUTES.DOMAIN_LIST_ROUTE, token)

    const domains = [] as any

    if (!isEmpty(response) && response.length > 0) {
      forEach(response, function (value, key) {
        const dl = {
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
        } as DomainList

        domains.push(dl)
      })

      return domains
    }

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
