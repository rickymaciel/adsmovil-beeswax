import { ListItemDataUpdate, ListItemFilters, ListItemOptions, ListItemPaginated } from '@/interfaces/list_items'
import { AxiosGet, AxiosDelete, AxiosPost, GetData, GetErrors, GetMessage, AxiosPatch } from './axios-service';
import { isEmpty, isUndefined } from 'lodash'
import { Paginated, SortingOption } from '../interfaces/paginated';
export const LIST_ITEM_UPLOAD = '/api/custom_list_items/upload'
export const LIST_ITEM_ROUTE = '/api/custom_list_items'
export const CUSTOM_LIST_EXCHANGES_ROUTE = '/api/custom_list_exchanges'

class ListItemService {
    
    async paginated(params: { paginated?: Paginated, filters?: ListItemFilters, options?: SortingOption }) {
        try {
            let filter = ''
            let option = ''

            const { paginated, filters, options } = params;

            if (!isUndefined(filters)) {
                filter = getFilters(filters)
            }
            
            if (!isUndefined(options)) {
                option += getOptions(options, 'paginated', paginated)
            }

            const url = getURL(filter, option)
            const response = await AxiosGet(LIST_ITEM_ROUTE + url)
            return Promise.resolve(GetData(response));

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async delete(id) {
        try {
            console.log('url',LIST_ITEM_ROUTE+'/'+id);
            const response = await AxiosDelete(LIST_ITEM_ROUTE+'/'+id);
            return Promise.resolve(true);    
        } 
        catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async upload(listItem: any) {
        try {
            const response = await AxiosPost(LIST_ITEM_UPLOAD, listItem)
            console.log('ListItemService:upload: ', { response: response })
            if (response.status < 200 && response.status > 300) {
                return null
            }

            return response.data.response
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async all(filters?: ListItemFilters, options?: ListItemOptions) {
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
            const response = await AxiosGet(LIST_ITEM_ROUTE + url)

            return Promise.resolve(GetData(response));

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async create(listItem: any, customListType: string) {
        try {
            const response = await AxiosPost(LIST_ITEM_ROUTE, {...listItem, customListType: customListType});
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
            const response = await AxiosGet(`${LIST_ITEM_ROUTE}/${id}`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async update(listItem: ListItemDataUpdate, customListType: string) {
        try {
            const response = await AxiosPatch(`${LIST_ITEM_ROUTE}/${listItem.id}`, {...listItem, customListType: customListType});
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async list(filters?: ListItemFilters, options?: ListItemOptions) {
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
            const response = await AxiosGet(`${LIST_ITEM_ROUTE}/${url}`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }
    
    async getAllByCustomId(id: Number) {
        try {
            const response = await AxiosGet(LIST_ITEM_ROUTE+'?filters[custom_list_id]='+id?.toString()+'&mode=all');
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

function getFilters(filters: ListItemFilters): string {
    let filter = ''

    const custom_list_id = (isUndefined(filters.custom_list_id)) ? '' : filters.custom_list_id;
    filter += 'filters[custom_list_id]=' + custom_list_id;

    return filter
}

function getOptions(options: ListItemOptions, mode: string, paginated?: ListItemPaginated): string {
    let option = ''
/*
    const sort = (isUndefined(options.sort)) ? '' : options.sort
    const order = (isUndefined(options.order)) ? '' : options.order

    option += 'sort=' + sort + '&order=' + order + '&mode=' + mode
*/
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

export default new ListItemService()