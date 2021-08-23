import {
    ModifierDataCreate,
    ModifierDataUpdate,
    ModifierFilters,
    ModifierOptions,
    ModifierPaginated,
} from '@/interfaces/modifier'
import { AxiosGet, AxiosPost, AxiosPatch, GetData, GetErrors, GetMessage, AxiosDownload } from '@/services/axios-service'
import { isEmpty, isUndefined } from 'lodash'

export const MODIFIER_ROUTE = '/api/modifiers'

class ModifierService {

    async paginated(paginated: ModifierPaginated, filters?: ModifierFilters, options?: ModifierOptions ) {
        try {
            let filter = ''
            let option = ''

            if (!isUndefined(filters)) {
                filter = getFilters(filters)
            }

            if (!isUndefined(options)) {
                option += getOptions(options, 'paginated', paginated)
            }

            const url = getURL(filter, option)
            const response = await AxiosGet(MODIFIER_ROUTE + url)
            return Promise.resolve(GetData(response));
            /* let data: any[] = [];
            for (let i = 0; i < 50; i++) {
                const element = {
                    id: Math.floor((Math.random() * (100-1))+1),
                    updated_at: new Date(),
                    advertiser_id: Math.floor((Math.random() * (100-1))+1),
                    advertiser_name: "Advertiser ".concat(Math.floor((Math.random() * (100-1))+1).toString()),
                    alternative_id: Math.floor((Math.random() * (100-1))+1),
                    modifier_type_id: Math.floor((Math.random() * (100-1))+1),
                    modifier_type_name: "Modifier type ".concat(Math.floor((Math.random() * (100-1))+1).toString()),
                    name: "Test modifier ".concat(Math.floor((Math.random() * (100-1))+1).toString()),
                    terms: [
                        {
                            module_id: Math.floor((Math.random() * (100-1))+1),
                            key: "country",
                            value: "USA",
                            modifier: Math.floor((Math.random() * (100-1))+1),
                            matching_type_id: Math.floor((Math.random() * (100-1))+1)
                        }
                    ],
                    active: Math.floor((Math.random() * (2-0))+0)
                };
                data.push(element);
            }
            return Promise.resolve({
                data: data.slice((paginated.page - 1 ) * paginated.limit,(paginated.limit * paginated.page)),
                per_page: paginated?.limit,
                total: data.length,
                current_page: paginated.page,
            }); */
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async create(modifier: ModifierDataCreate) {
        try {
            const response = await AxiosPost(MODIFIER_ROUTE, modifier);
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
            const response = await AxiosGet(`${MODIFIER_ROUTE}/${id}`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async update(modifier: ModifierDataUpdate, id: number) {
        try {
            const response = await AxiosPatch(`${MODIFIER_ROUTE}/${id}`, modifier);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async list(filters?: ModifierFilters, options?: ModifierOptions) {
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

            const response = await AxiosGet(`${MODIFIER_ROUTE}/${url}`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async download(params: { paginated?: ModifierPaginated, filters?: ModifierFilters, options?: ModifierOptions }) {
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
            
            await AxiosDownload(MODIFIER_ROUTE + url, 'modifiers-export.csv')
            
            return Promise.resolve({});

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }
}

function getFilters(filters: ModifierFilters): string {
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

function getOptions(options: ModifierOptions, mode: string, paginated?: ModifierPaginated): string {
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

export default new ModifierService()