import { AdvertiserDataCreate, AdvertiserDataUpdate, AdvertiserFilters, AdvertiserOptions, AdvertiserPaginated } from '@/interfaces/advertiser'
import { isEmpty, isUndefined } from 'lodash'
import { AxiosDownload, AxiosGet, AxiosPatch, AxiosPost, GetData, GetErrors, GetMessage } from './axios-service';

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

            return Promise.resolve(GetData(response));

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async paginated(params: { paginated?: AdvertiserPaginated, filters?: AdvertiserFilters, options?: AdvertiserOptions }) {
        try {
            let filter = ''
            let option = ''

            if (!isUndefined(params.filters)) {
                filter = getFilters(params.filters)
            }

            if (!isUndefined(params.options)) {
                option += getOptions(params.options, 'paginated', params.paginated)
            }

            const url = getURL(filter, option)
            const response = await AxiosGet(ADVERTISER_ROUTE + url)
            return Promise.resolve(GetData(response));

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async download(params: { paginated?: AdvertiserPaginated, filters?: AdvertiserFilters, options?: AdvertiserOptions }) {
        try {
            let filter = ''
            let option = ''

            if (!isUndefined(params.filters)) {
                filter = getFilters(params.filters)
            }

            if (!isUndefined(params.options)) {
                option += getOptions(params.options, 'download', params.paginated)
            }

            const url = getURL(filter, option)
            
            await AxiosDownload(ADVERTISER_ROUTE + url, 'advertisers-export.csv')
            
            return Promise.resolve({});

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    } 

    async categories() {
        try {
            const response = await AxiosGet(ADVERTISER_CATEGORIES_ROUTE)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async create(advertiser: AdvertiserDataCreate) {
        try {
            const response = await AxiosPost(ADVERTISER_ROUTE, advertiser);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async show(id: number) {
        try {
            const response = await AxiosGet(`${ADVERTISER_ROUTE}/${id}`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async update(advertiser: AdvertiserDataUpdate, id: number) {
        try {
            const response = await AxiosPatch(`${ADVERTISER_ROUTE}/${id}`, advertiser);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async list(params: {filters?: AdvertiserFilters, options?: AdvertiserOptions}) {
        try {
            
            const {filters, options} = params;

            let filter = ''
            let option = ''

            if (!isUndefined(filters)) {
                filter = getFilters(filters)
            }

            if (!isUndefined(options)) {
                option += getOptions(options, 'list')
            } else {
                option += '&mode=list'
            }

            const url = getURL(filter, option)
            const response = await AxiosGet(`${ADVERTISER_ROUTE}`+url);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

}

function getFilters(filters: AdvertiserFilters): string {
    let filter = ''

    const id = !!filters.id ? filters.id : '';
    const name = !!filters.name ? filters.name : '';
    const category = !!filters.category ? filters.category : '';
    const domain = !!filters.domain ? filters.domain : '';
    const app_bundle = !!filters.app_bundle ? filters.app_bundle : '';
    const active = (typeof filters.active === "undefined") ? '' : (!!filters.active ? 1 : 0);

    filter += 'filters[advertisers.id]=' + id 
            + '&filters[advertisers.name]=' + name 
            + '&filters[categories.name]=' + category 
            + '&filters[advertisers.domain]=' + domain 
            + '&filters[advertisers.app_bundle]=' + app_bundle 
            + '&filters[advertisers.active]=' + active

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
