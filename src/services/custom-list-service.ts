import { CustomListPaginated, CustomListFilters, CustomListOptions, Type, CustomListDataCreate } from '@/interfaces/custom_list'
import { Paginated } from '@/interfaces/paginated'
import { AxiosGet, AxiosPost,  AxiosPatch, GetData, GetErrors, GetMessage, AxiosUpload, AxiosDownload } from '@/services/axios-service'
import { isUndefined, isEmpty } from 'lodash'
import { SortingOption } from '../interfaces/paginated';

export const CUSTOM_LIST_ROUTE = '/api/custom_lists'
export const CUSTOM_LIST_ITEMS_ROUTE = '/api/custom_list_items'
export const BUDGET_TYPE_ROUTE = '/api/list/budget_types'
export const CAMPAING_PACING_ROUTE = 'api/list/campaign_pacing'
export const STRATEGY_OPTIMIZATION_ROUTE = 'api/list/optimization_strategies'
export const CAMPAING_KPI_ROUTE = 'api/list/kpi_campaigns'
export const STRATEGY_ROUTE = 'api/list/strategies'
export const UNIT_TIME_ROUTE = 'api/list/unit_times'
export const CREATIVE_WEIGHTING_METHODS_ROUTE = '/api/list/creatives_methods'
export const BID_STRATEGY_ROUTE = 'api/list/bid_strategy'
export const BID_LINE_PACING_ROUTE = 'api/list/line_pacing'
export const BID_SHADING_ROUTE = 'api/list/bid_shadings'

class CustomListService {

    async paginated(params: { paginated?: Paginated, filters?: CustomListFilters, options?: SortingOption }) {
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
            const response = await AxiosGet(CUSTOM_LIST_ROUTE + url)
            return Promise.resolve(GetData(response));

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }  

    async download(params: { paginated?: Paginated, filters?: CustomListFilters, options?: SortingOption }) {
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
            
            await AxiosDownload(CUSTOM_LIST_ROUTE + url, 'custom_lists-export.csv')
            
            return Promise.resolve({});

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }     

    async update({id, name, active, edited, deleted, created}) {
        try {
            const response = await AxiosPatch(`${CUSTOM_LIST_ROUTE}/${id}/with_items`, {
                name,
                active,
                edited,
                deleted,
                created
            })
            return Promise.resolve(GetData(response));

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }  
    
    async uploadItems(payload, callback) {
        try {
            const response = await AxiosUpload(`${CUSTOM_LIST_ITEMS_ROUTE}/upload`, payload, callback);
            return Promise.resolve(GetData(response));

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async getViewByTypeSelected(type: Type) {
        try {
            return Promise.resolve(await MatchedView(type.key));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async getViewByTypeSelectedById(id: number) {
        try {
            return Promise.resolve(await MatchedViewById(id));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async create(customList: CustomListDataCreate) {
        try {
            const response = await AxiosPost(CUSTOM_LIST_ROUTE, customList)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async show(id: Number) {
        try {
            const response = await AxiosGet(`${CUSTOM_LIST_ROUTE}/${id}`)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async budgetTypes() {
        try {
            const response = await AxiosGet(`${BUDGET_TYPE_ROUTE}`)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async campaignPacing() {
        try {
            const response = await AxiosGet(`${CAMPAING_PACING_ROUTE}`)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async optimizationStrategies() {
        try {
            const response = await AxiosGet(`${STRATEGY_OPTIMIZATION_ROUTE}`)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async kpiCampaigns() {
        try {
            const response = await AxiosGet(`${CAMPAING_KPI_ROUTE}`)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async strategies() {
        try {
            const response = await AxiosGet(`${STRATEGY_ROUTE}`)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async unitTimes() {
        try {
            const response = await AxiosGet(`${UNIT_TIME_ROUTE}`)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async CreativeWeightingMethods() {
        try {
            const response = await AxiosGet(`${CREATIVE_WEIGHTING_METHODS_ROUTE}`)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async bidStrategyList() {
        try {
            const response = await AxiosGet(`${BID_STRATEGY_ROUTE}`)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }
    
    async linePacingList() {
        try {
            const response = await AxiosGet(`${BID_LINE_PACING_ROUTE}`)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }
    
    async biddingShadingList() {
        try {
            const response = await AxiosGet(`${BID_SHADING_ROUTE}`)
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

function getFilters(filters: CustomListFilters): string {
    let filter = ''

    const id = !!filters.id ? filters.id : '';
    const name = !!filters.name ? filters.name : '';
    const type = !!filters.type_name ? filters.type_name : '';
    const active = (typeof filters.active === "undefined") ? '' : filters.active

    filter += 'filters[custom_lists.id]=' + id 
            + '&filters[custom_lists.name]=' + name 
            + '&filters[list_types.name]=' + type 
            + '&filters[custom_lists.active]=' + active;

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
    return [
        {id: 10, key: "zip_code"},
        {id: 4, key: "domain"},
    ];
};

function ModelTwoList() {
    return [
        {id: 6, key: "lat_long"}
    ];
};

function ModelThreeList() {
    return [
        {id: 1, key: "app_bundle"},
        {id: 2, key: "app_id"},
        {id: 3, key: "deal_id"},
        {id: 5, key: "ip_address"},
        {id: 7, key: "placement_id"},
        {id: 8, key: "publisher_id"},
        {id9: 9, key: "site_id"},
    ];
};

async function MatchedView(key: string) {
    let modelView = '';

    if (ModelOneList().find( m => m.key == key)) {
        modelView = 'ModelOne'
    }

    if (ModelTwoList().find( m => m.key == key)) {
        modelView = 'ModelTwo'
    }

    if (ModelThreeList().find( m => m.key == key)) {
        modelView = 'ModelTree'
    }
    
    return modelView
};

async function MatchedViewById(id: number) {
    let modelView = '';

    if (ModelOneList().find( m => m.id == id)) {
        modelView = 'ModelOne'
    }

    if (ModelTwoList().find( m => m.id == id)) {
        modelView = 'ModelTwo'
    }

    if (ModelThreeList().find( m => m.id == id)) {
        modelView = 'ModelTree'
    }

    return modelView
};

export default new CustomListService()
