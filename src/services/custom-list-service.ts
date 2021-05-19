import { CustomListPaginated, CustomListFilters, CustomListOptions, Type, CustomListDataCreate } from '@/interfaces/custom_list'
import { AxiosGet, AxiosPost } from '@/services/axios-service'
import { isUndefined, isEmpty } from 'lodash'

export const CUSTOM_LIST_ROUTE = '/api/custom_lists'
export const BUDGET_TYPE_ROUTE = '/api/list/budget_types'
export const CAMPAING_PACING_ROUTE = 'api/list/campaign_pacing'
export const STRATEGY_OPTIMIZATION_ROUTE = 'api/list/optimization_strategies'
export const CAMPAING_KPI_ROUTE = 'api/list/kpi_campaigns'
export const STRATEGY_ROUTE = 'api/list/strategies'
export const UNIT_TIME_ROUTE = 'api/list/unit_times'

class CustomListService {

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
            console.log('AxiosGet:paginated ', { url: url, response: response })

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;

        } catch (error) {
            console.error('CustomListService:paginated', { error: error })
        }
    }

    async getViewByTypeSelected(type: Type) {
        try {
            return MatchedView(type.key);
        } catch (error) {
            console.error('CustomListService:getViewByTypeSelected', { error: error })
        }
    }

    async create(customList: CustomListDataCreate) {
        try {
            const response = await AxiosPost(CUSTOM_LIST_ROUTE, customList)
            console.log('AxiosPost:create ', { response: response })

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;
        } catch (error) {
            console.error('CustomListService:create', { error: error })
        }
    }

    async show(id: Number) {
        try {
            const response = await AxiosGet(`${CUSTOM_LIST_ROUTE}/${id}`)
            console.log('AxiosGet:show ', { response: response })

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;
        } catch (error) {
            console.error('CustomListService:show', { error: error })
        }
    }

    async budgetTypes() {
        try {
            const response = await AxiosGet(`${BUDGET_TYPE_ROUTE}`)
            console.log('AxiosGet:budgetTypes ', { response: response })

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;

        } catch (error) {
            console.error('CustomListService:budgetTypes', { error: error })
        }
    }

    async campaignPacing() {
        try {
            const response = await AxiosGet(`${CAMPAING_PACING_ROUTE}`)
            console.log('AxiosGet:campaignPacing ', { response: response })

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;

        } catch (error) {
            console.error('CustomListService:campaignPacing', { error: error })
        }
    }

    async optimizationStrategies() {
        try {
            const response = await AxiosGet(`${STRATEGY_OPTIMIZATION_ROUTE}`)
            console.log('AxiosGet:optimizationStrategies ', { response: response })

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;

        } catch (error) {
            console.error('CustomListService:optimizationStrategies', { error: error })
        }
    }

    async kpiCampaigns() {
        try {
            const response = await AxiosGet(`${CAMPAING_KPI_ROUTE}`)
            console.log('AxiosGet:kpiCampaigns ', { response: response })

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;

        } catch (error) {
            console.error('CustomListService:kpiCampaigns', { error: error })
        }
    }

    async strategies() {
        try {
            const response = await AxiosGet(`${STRATEGY_ROUTE}`)
            console.log('AxiosGet:strategies ', { response: response })

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;

        } catch (error) {
            console.error('CustomListService:strategies', { error: error })
        }
    }

    async unitTimes() {
        try {
            const response = await AxiosGet(`${UNIT_TIME_ROUTE}`)
            console.log('AxiosGet:unitTimes ', { response: response })

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;

        } catch (error) {
            console.error('CustomListService:unitTimes', { error: error })
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

function ModelOneList() {
    return ["zip_code"];
};

function ModelTwoList() {
    return ["lat_long"];
};

function ModelTreeList() {
    return [
        "app_bundle",
        "app_id",
        "deal_id",
        "domain",
        "ip_address",
        "placement_id",
        "publisher_id",
        "site_id",
    ];
};

function MatchedView(key: string) {
    let modelView = '';

    if (ModelOneList().includes(key)) {
        modelView = 'ModelOne'
    }

    if (ModelTwoList().includes(key)) {
        modelView = 'ModelTwo'
    }

    if (ModelTreeList().includes(key)) {
        modelView = 'ModelTree'
    }

    return modelView
};

export default new CustomListService()
