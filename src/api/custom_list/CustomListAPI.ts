import { forEach, isEmpty, isUndefined } from 'lodash'
import { CUSTOM_LIST_ROUTE, AxiosPost, AxiosGet, AxiosPatch, ADVERTISER_ROUTE } from '@/api/AxiosService'
import { CustomList, CustomListDataCreate, CustomListDataUpdate } from '@/interfaces/custom_list'

export async function create (customList: CustomListDataCreate, token: string) {
  try {
    const response = await AxiosPost(CUSTOM_LIST_ROUTE, customList, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      return {
        id: response.id,
        account_id: response.account_id,
        external_id: response.external_id,
        name: response.name,
        custom_list_type_id: response.custom_list_type_id,
        delimiter: response.delimiter,
        default_radius_km: response.default_radius_km,
        notes: response.notes,
        active: response.active,
        created_by: response.created_by,
        updated_by: response.updated_by,
        deleted_by: response.deleted_by,
        created_at: response.created_at,
        updated_at: response.updated_at
      } as CustomList
    }

    console.log('ERROR: ', response)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function update (customList: CustomListDataUpdate, token: string) {
  try {
    const response = await AxiosPatch(CUSTOM_LIST_ROUTE + '/' + customList.id, customList, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      return {
        id: response.id,
        account_id: response.account_id,
        external_id: response.external_id,
        name: response.name,
        custom_list_type_id: response.custom_list_type_id,
        delimiter: response.delimiter,
        default_radius_km: response.default_radius_km,
        notes: response.notes,
        active: response.active,
        created_by: response.created_by,
        updated_by: response.updated_by,
        deleted_by: response.deleted_by,
        created_at: response.created_at,
        updated_at: response.updated_at
      } as CustomList
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function changeStatus (id: number, status: boolean, token: string) {
  try {
    const active = status ? 1 : 0
    const response = await AxiosPatch(CUSTOM_LIST_ROUTE + '/' + id + '/set/' + active, {}, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      return true
    }

    console.log('ERROR: ', response.message)

    return false
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return false
  }
}

export async function show (id: number, token: string) {
  try {
    const response = await AxiosGet(CUSTOM_LIST_ROUTE + '/' + id, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      return {
        id: response.id,
        account_id: response.account_id,
        external_id: response.external_id,
        name: response.name,
        custom_list_type_id: response.custom_list_type_id,
        delimiter: response.delimiter,
        default_radius_km: response.default_radius_km,
        notes: response.notes,
        active: response.active,
        created_by: response.created_by,
        updated_by: response.updated_by,
        deleted_by: response.deleted_by,
        created_at: response.created_at,
        updated_at: response.updated_at
      } as CustomList
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}
