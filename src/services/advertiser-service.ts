import { AdvertiserDataCreate, AdvertiserDataUpdate, AdvertiserFilters, AdvertiserOptions, AdvertiserPaginated } from '@/interfaces/advertiser'
import { AxiosGet, AxiosPost, AxiosPatch } from '@/services/axios-service'
import { isEmpty, isUndefined } from 'lodash'

export const ADVERTISER_ROUTE = '/api/advertisers'
export const ADVERTISER_CATEGORIES_ROUTE = '/api/list/advertiser_categories'

class AdvertiserService {

    async all(filters?: AdvertiserFilters, options?: AdvertiserOptions) {
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
            const response = await AxiosGet(ADVERTISER_ROUTE + url)
            console.log('AxiosGet: ', { url: url, response: response })

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;

        } catch (error) {
            console.error('AdvertiserService:all', { error: error })
        }
    }

    async categories() {
        try {
            return AxiosGet(ADVERTISER_CATEGORIES_ROUTE)
        } catch (error) {
            console.error('AdvertiserService:categories', { error: error })
        }
    }

    async create(advertiser: AdvertiserDataCreate) {
        try {
            const response = await AxiosPost(ADVERTISER_ROUTE, advertiser);
            console.log('AdvertiserService:create: ', { response: response });

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;
        } catch (error) {
            console.error('AdvertiserService:create', { error: error })
        }
    }

    async show(id: number) {
        try {
            const response = await AxiosGet(`${ADVERTISER_ROUTE}/${id}`);
            console.log('AdvertiserService:show: ', { response: response });

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;
        } catch (error) {
            console.error('AdvertiserService:show', { error: error })
        }
    }

    async update(advertiser: AdvertiserDataUpdate, id: number) {
        try {
            const response = await AxiosPatch(`${ADVERTISER_ROUTE}/${id}`, advertiser);

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;
        } catch (error) {
            console.error('AdvertiserService:update', { error: error })
        }
    }

    async list(filters?: AdvertiserFilters, options?: AdvertiserOptions) {
        try {
            let filter = ''
            let option = ''

            if (!isUndefined(filters)) {
                filter = getFilters(filters)
            }

            if (!isUndefined(options)) {
                option += getOptions(options, 'list')
            }

            const url = getURL(filter, option)

            const response = await AxiosGet(`${ADVERTISER_ROUTE}/${url}`);

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;
        } catch (error) {
            console.error('AdvertiserService:list', { error: error })
        }
    }

}

function getFilters(filters: AdvertiserFilters): string {
    let filter = ''

    const name = (isUndefined(filters.name)) ? '' : filters.name
    const category_id = (isUndefined(filters.category_id)) ? '' : filters.category_id
    const domain = (isUndefined(filters.domain)) ? '' : filters.domain
    const app_bundle = (isUndefined(filters.app_bundle)) ? '' : filters.app_bundle
    const external_id = (isUndefined(filters.external_id)) ? '' : filters.external_id
    const active = (isUndefined(filters.active)) ? '' : filters.active

    filter += 'filters[name]=' + name + '&filters[category_id]=' + category_id + '&filters[domain]=' + domain + '&filters[app_bundle]=' + app_bundle + '&filters[external_id]=' + external_id + '&filters[active]=' + active

    return filter
}

function getOptions(options: AdvertiserOptions, mode: string, paginated?: AdvertiserPaginated): string {
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
