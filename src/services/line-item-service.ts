import {
    LineItemDataCreate,
    LineItemFilters,
    LineItemOptions,
    LineItemPaginated,
} from '@/interfaces/line_item'
import { AxiosGet, AxiosPost, AxiosPatch, GetData, GetErrors, GetMessage, AxiosPut } from '@/services/axios-service'
import { isEmpty, isNull, isUndefined } from 'lodash'

export const LINE_ITEM_ROUTE = '/api/line_items'

const ROUTES_LINE_ITEMS = require('../api/routes').LINE_ITEMS

class LineItemService {

    async paginated(paginated?: LineItemPaginated, filters?: LineItemFilters, options?: LineItemOptions ) {
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

    async all(params: { filters: LineItemFilters; options: LineItemOptions }) {
        try {
            let filter = ''
            let option = ''

            if (params.filters) {
                filter = getFilters(params.filters)
            }

            option += getOptions(params.options, 'all')

            const url = getURL(filter, option)

            console.log('LineItemService::all', { filters: params.filters, options: params.options, url: url, filter: filter, option: option });

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

    async changeStatus(params: { id: number; active: Boolean }) {
        try {
            const response = await AxiosPut(`${ROUTES_LINE_ITEMS.LINE_ITEMS_ROUTE}/${params.id}/set/${params.active ? 1 : 0}`, {})
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

    const name = (isUndefined(filters.name) || isNull(filters.name)) ? '' : filters.name
    const advertiser_name = (isUndefined(filters.advertiser?.name) || isNull(filters.advertiser?.name)) ? '' : filters.advertiser?.name
    const advertiser_id = (isUndefined(filters.advertiser_id) || isNull(filters.advertiser_id)) ? '' : filters.advertiser_id
    const active = (isUndefined(filters.active) || isNull(filters.active)) ? '' : filters.active
    const budget = (isUndefined(filters.budget) || isNull(filters.budget)) ? '' : filters.budget
    const daily_budget = (isUndefined(filters.daily_budget) || isNull(filters.daily_budget)) ? '' : filters.daily_budget
    const start_date = (isUndefined(filters.start_date) || isNull(filters.start_date)) ? '' : filters.start_date
    const end_date = (isUndefined(filters.end_date) || isNull(filters.end_date)) ? '' : filters.end_date
    const spend = (isUndefined(filters.spend) || isNull(filters.spend)) ? '' : filters.spend
    const alternative_id = (isUndefined(filters.alternative_id) || isNull(filters.alternative_id)) ? '' : filters.alternative_id
    const campaign_name = (isUndefined(filters.campaign?.name) || isNull(filters.campaign?.name)) ? '' : filters.campaign?.name
    const budget_type_description = (isUndefined(filters.budget_type?.description) || isNull(filters.budget_type?.description)) ? '' : filters.budget_type?.description
    const bid_strategy_description = (isUndefined(filters.bid_strategy?.description) || isNull(filters.bid_strategy?.description)) ? '' : filters.bid_strategy?.description
    const strategy_description = (isUndefined(filters.strategy?.description) || isNull(filters.strategy?.description)) ? '' : filters.strategy?.description
    const line_pacing_description = (isUndefined(filters.line_pacing?.description) || isNull(filters.line_pacing?.description)) ? '' : filters.line_pacing?.description
    const line_item_type_description = (isUndefined(filters.line_item_type?.description) || isNull(filters.line_item_type?.description)) ? '' : filters.line_item_type?.description
    const bid_shading_description = (isUndefined(filters.bid_shading?.description) || isNull(filters.bid_shading?.description)) ? '' : filters.bid_shading?.description
    const creative_method_description = (isUndefined(filters.creative_method?.description) || isNull(filters.creative_method?.description)) ? '' : filters.creative_method?.description

    var symbol = '';

    if (name) {
        filter += `${symbol}filters[name]=${name}`;
        symbol = '&';
    }

    if (active) {
        filter += `${symbol}filters[active]=${active}`;
        symbol = '&';
    }

    if (advertiser_name) {
        filter += `${symbol}filters[advertiser.name]=${advertiser_name}`;
        symbol = '&';
    }

    if (budget) {
        filter += `${symbol}filters[budget]=${budget}`;
        symbol = '&';
    }

    if (daily_budget) {
        filter += `${symbol}filters[daily_budget]=${daily_budget}`;
        symbol = '&';
    }

    if (start_date) {
        filter += `${symbol}filters[start_date]=${start_date}`;
        symbol = '&';
    }

    if (end_date) {
        filter += `${symbol}filters[end_date]=${end_date}`;
        symbol = '&';
    }

    if (spend) {
        filter += `${symbol}filters[spend]=${spend}`;
        symbol = '&';
    }

    if (alternative_id) {
        filter += `${symbol}filters[alternative_id]=${alternative_id}`;
        symbol = '&';
    }

    if (advertiser_id) {
        filter += `${symbol}filters[advertiser_id]=${advertiser_id}`;
        symbol = '&';
    }

    if (campaign_name) {
        filter += `${symbol}filters[campaign.name]=${campaign_name}`;
        symbol = '&';
    }

    if (budget_type_description) {
        filter += `${symbol}filters[budget_type.description]=${budget_type_description}`;
        symbol = '&';
    }

    if (bid_strategy_description) {
        filter += `${symbol}filters[bid_strategy.description]=${bid_strategy_description}`;
        symbol = '&';
    }

    if (strategy_description) {
        filter += `${symbol}filters[strategy.description]=${strategy_description}`;
        symbol = '&';
    }

    if (line_pacing_description) {
        filter += `${symbol}filters[line_pacing.description]=${line_pacing_description}`;
        symbol = '&';
    }

    if (line_item_type_description) {
        filter += `${symbol}filters[line_item_type.description]=${line_item_type_description}`;
        symbol = '&';
    }

    if (bid_shading_description) {
        filter += `${symbol}filters[bid_shading.description]=${bid_shading_description}`;
        symbol = '&';
    }

    if (creative_method_description) {
        filter += `${symbol}filters[creative_method.description]=${creative_method_description}`;
        symbol = '&';
    }

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