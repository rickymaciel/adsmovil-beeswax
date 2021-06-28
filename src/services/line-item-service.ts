import {
    LineItemDataCreate,
    LineItemFilters,
    LineItemOptions,
    LineItemPaginated,
} from '@/interfaces/line_item'
import { AxiosGet, AxiosPost, AxiosPatch, GetData, GetErrors, GetMessage } from '@/services/axios-service'
import { isEmpty, isUndefined } from 'lodash'

export const LINE_ITEM_ROUTE = '/api/line_items'

class LineItemService {

    async paginated(filters?: LineItemFilters, options?: LineItemOptions) {
        try {
            let filter = ''
            let option = ''

            if (!isUndefined(filters)) {
                filter = getFilters(filters)
            }

            if (!isUndefined(options)) {
                option += getOptions(options, 'paginated')
            }

            const url = getURL(filter, option)
            const response = await AxiosGet(LINE_ITEM_ROUTE + url)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async create(lineItem: LineItemDataCreate) {
        try {
            const response = await AxiosPost(LINE_ITEM_ROUTE, lineItem);
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
            const response = await AxiosGet(`${LINE_ITEM_ROUTE}/${id}`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async update(lineItem: any, id: number) {
        try {
            const response = await AxiosPatch(`${LINE_ITEM_ROUTE}/${id}`, lineItem);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async list(filters?: LineItemFilters, options?: LineItemOptions) {
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

            const response = await AxiosGet(`${LINE_ITEM_ROUTE}/${url}`);
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

function getFilters(filters: LineItemFilters): string {
    let filter = ''
    /*
    const name = (isUndefined(filters.name)) ? '' : filters.name
    const category_id = (isUndefined(filters.category_id)) ? '' : filters.category_id
    const domain = (isUndefined(filters.domain)) ? '' : filters.domain
    const app_bundle = (isUndefined(filters.app_bundle)) ? '' : filters.app_bundle
    const external_id = (isUndefined(filters.external_id)) ? '' : filters.external_id
    const active = (isUndefined(filters.active)) ? '' : filters.active

    filter += 'filters[name]=' + name + '&filters[category_id]=' + category_id + '&filters[domain]=' + domain + '&filters[app_bundle]=' + app_bundle + '&filters[external_id]=' + external_id + '&filters[active]=' + active
    */
    return filter
}

function getOptions(options: LineItemOptions, mode: string, paginated?: LineItemPaginated): string {
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

export default new LineItemService()