import {
    ModifierDataCreate,
    ModifierDataUpdate,
    ModifierFilters,
    ModifierOptions,
    ModifierPaginated,
} from '@/interfaces/modifier'
import { AxiosGet, AxiosPost, AxiosPatch, GetData, GetErrors } from '@/services/axios-service'
import { isEmpty, isUndefined } from 'lodash'

export const MODIFIER_ROUTE = '/api/modifiers'

class ModifierService {

    async paginated(filters?: ModifierFilters, options?: ModifierOptions) {
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
            const response = await AxiosGet(MODIFIER_ROUTE + url)

            return Promise.resolve(GetData(response));

        } catch (error) {
            console.error('ModifierService:paginated', { error: error })
            return Promise.reject(GetErrors(error));
        }
    }

    async create(modifier: ModifierDataCreate) {
        try {
            const response = await AxiosPost(MODIFIER_ROUTE, modifier);
            console.log('ModifierService:create: ', { response: response });

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;
        } catch (error) {
            console.error('ModifierService:create', { error: error })
        }
    }

    async show(id: number) {
        try {
            const response = await AxiosGet(`${MODIFIER_ROUTE}/${id}`);
            console.log('ModifierService:show: ', { response: response });

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;
        } catch (error) {
            console.error('ModifierService:show', { error: error })
        }
    }

    async update(modifier: ModifierDataUpdate, id: number) {
        try {
            const response = await AxiosPatch(`${MODIFIER_ROUTE}/${id}`, modifier);

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;
        } catch (error) {
            console.error('ModifierService:update', { error: error })
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

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;
        } catch (error) {
            console.error('ModifierService:list', { error: error })
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