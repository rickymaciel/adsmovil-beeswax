import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet } from '@/api/AxiosService'
import { Vendor } from '@/interfaces/creative'
import { forEach } from 'lodash'

const ROUTES = require('../routes').CREATIVES

export async function list (token: string) {
  try {
    const response = await AxiosGet(ROUTES.CREATIVE_VENDOR_ROUTE, token)

    const vendors = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const vendor = {
          id: value.id,
          type: value.type,
          description: value.description,
          vendor_id: value.vendor_id,
          adx_gdpr_provider_id: value.adx_gdpr_provider_id,
          adx_vendor_approval_id: value.adx_vendor_approval_id,
          iab_gdpr_vendor_id: value.iab_gdpr_vendor_id
        } as Vendor

        vendors.push(vendor)
      })

      return success('', vendors)
    }

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
