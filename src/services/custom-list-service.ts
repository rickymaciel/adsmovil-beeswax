import { CustomListPaginated, CustomListFilters, CustomListOptions, CustomList } from '@/interfaces/custom_list'
import { AxiosGet } from '@/services/axios-service'
import { isEmpty, isUndefined } from 'lodash'

export const CUSTOM_LIST_ROUTE = '/api/custom_lists'

class AdvertiserService {

    async paginated(paginated: CustomListPaginated, filters?: CustomListFilters, options?: CustomListOptions) {
        try {
            let filter = ''
            let option = ''

            if (!isUndefined(filters)) {
                filter = getFilters(filters)
            }

            if (!isUndefined(options)) {
                option += getOptions(options, 'all')
            }

            const url = getURL(filter, option)
            const response = await AxiosGet(CUSTOM_LIST_ROUTE + url)
            console.log('AxiosGet: ', { url: url, response: response })

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            // return {
            //     page: paginated.page,
            //     data: response.data
            // }

            return response.data.response;

        } catch (error) {
            console.error('AdvertiserService:all', { error: error })
        }
    }

}

function getFilters(filters: CustomListFilters): string {
    let filter = ''

    const name = (isUndefined(filters.name)) ? '' : filters.name
    const external_id = (isUndefined(filters.external_id)) ? '' : filters.external_id
    const type_id = (isUndefined(filters.custom_list_type_id)) ? '' : filters.custom_list_type_id
    const active = (isUndefined(filters.active)) ? '' : filters.active

    filter += 'filters[name]=' + name + '&filters[external_id]=' + external_id + '&filters[custom_list_type_id]=' + type_id + '&filters[active]=' + active

    return filter
}

function getOptions(options: CustomListOptions, mode: string, paginated?: CustomListPaginated): string {
    let option = ''

    const sort = (isUndefined(options.sort)) ? '' : options.sort
    const order = (isUndefined(options.order)) ? '' : options.order

    option += 'sort=' + sort + '&order=' + order + '&mode=' + mode

    if (mode == 'paginated') {
        option += '&page=' + paginated?.page + '&limit=' + paginated?.limit
    }

    return option
}

function getURL(filters: string, options: string): string {
    let url = ''

    if (!isEmpty(filters) && !isEmpty(options)) {
        url = '?' + filters + '&' + options
    } else if (!isEmpty(filters)) {
        url = '?' + filters
    } else if (!isEmpty(options)) {
        url = '?' + options
    }

    return url
}

export default new AdvertiserService()
