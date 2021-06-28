import { Campaign, CampaignDataCreate, CampaingFilters, CampaingOptions, CampaingPaginated } from '@/interfaces/campaign';
import { AxiosPost, AxiosGet, AxiosPatch, GetData, GetErrors, HasErrors, GetMessage, GetDataError } from '@/services/axios-service'
import { isEmpty, isNull, isUndefined } from 'lodash'
export const CAMPAIGN_ROUTE = '/api/campaigns'

class CampaignService {

    async create(campaign: CampaignDataCreate) {
        try {
            const response = await AxiosPost(CAMPAIGN_ROUTE, campaign);
            return Promise.resolve(GetData(response));

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async update(campaign: Campaign) {
        try {
            const response = await AxiosPatch(`${CAMPAIGN_ROUTE}/${campaign.id}`, campaign);
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
            const response = await AxiosGet(`${CAMPAIGN_ROUTE}/${id}`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async paginated(params: { paginated?: CampaingPaginated, filters?: CampaingFilters, options?: CampaingOptions }) {
        try {

            console.log('CampaignService::paginated', { params: params });

            let filter = ''
            let option = ''

            if (!isUndefined(params.filters)) {
                filter = getFilters(params.filters)
            }
            console.log('CampaignService::paginated', { filter: filter });

            if (!isUndefined(params.options)) {
                option += getOptions(params.options, 'paginated', params.paginated)
            }

            const url = getURL(filter, option)
            const response = await AxiosGet(CAMPAIGN_ROUTE + url)
            return Promise.resolve(GetData(response));

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async list(filters?: CampaingFilters, options?: CampaingOptions) {
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
            const response = await AxiosGet(`${CAMPAIGN_ROUTE}/${url}`);
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

/**
 * name,
 * budget,
 * start_date,
 * end_date,
 * spend,
 * advertiser_name,
 * budget_type,
 * currency_name,
 * optimization_strategy_name,
 * strategy_name,
 * campaign_pacing_name,
 * kpi_campaign_name,
 * bid_shading_name,
 * timezone_name
 */
function getFilters(filters: CampaingFilters): string {

    let filter = ''

    const name = (isUndefined(filters.name) || isNull(filters.name)) ? '' : filters.name
    const budget = (isUndefined(filters.budget) || isNull(filters.budget)) ? '' : filters.budget
    const start_date = (isUndefined(filters.start_date) || isNull(filters.start_date)) ? '' : filters.start_date
    const end_date = (isUndefined(filters.end_date) || isNull(filters.end_date)) ? '' : filters.end_date
    const spend = (isUndefined(filters.spend) || isNull(filters.spend)) ? '' : filters.spend
    const advertiser_name = (isUndefined(filters.advertiser_name) || isNull(filters.advertiser_name)) ? '' : filters.advertiser_name
    const budget_type = (isUndefined(filters.budget_type) || isNull(filters.budget_type)) ? '' : filters.budget_type
    const currency_name = (isUndefined(filters.currency_name) || isNull(filters.currency_name)) ? '' : filters.currency_name
    const optimization_strategy_name = (isUndefined(filters.optimization_strategy_name) || isNull(filters.optimization_strategy_name)) ? '' : filters.optimization_strategy_name
    const strategy_name = (isUndefined(filters.strategy_name) || isNull(filters.strategy_name)) ? '' : filters.strategy_name
    const campaign_pacing_name = (isUndefined(filters.campaign_pacing_name) || isNull(filters.campaign_pacing_name)) ? '' : filters.campaign_pacing_name
    const kpi_campaign_name = (isUndefined(filters.kpi_campaign_name) || isNull(filters.kpi_campaign_name)) ? '' : filters.kpi_campaign_name
    const bid_shading_name = (isUndefined(filters.bid_shading_name) || isNull(filters.bid_shading_name)) ? '' : filters.bid_shading_name
    const timezone_name = (isUndefined(filters.timezone_name) || isNull(filters.timezone_name)) ? '' : filters.timezone_name
    const trafficker_name = (isUndefined(filters.trafficker_name) || isNull(filters.trafficker_name)) ? '' : filters.trafficker_name
    const active = (isUndefined(filters.active) || isNull(filters.active)) ? '' : filters.active
    const alternative_id = (isUndefined(filters.alternative_id) || isNull(filters.alternative_id)) ? '' : filters.alternative_id
    const automatic_allocation = (isUndefined(filters.automatic_allocation) || isNull(filters.automatic_allocation)) ? '' : filters.automatic_allocation

    var symbol = '';

    if (name) {
        filter += `${symbol}filters[name]=${name}`;
        symbol = '&';
    }

    if (budget) {
        filter += `${symbol}filters[budget]=${budget}`;
        symbol = '&';
    }

    if (start_date) {
        filter += `${symbol}filters[start_date]=${start_date}`
        symbol = '&';
    }

    if (end_date) {
        filter += `${symbol}filters[end_date]=${end_date}`
        symbol = '&';
    }

    if (spend) {
        filter += `${symbol}filters[spend]=${spend}`
        symbol = '&';
    }

    if (advertiser_name) {
        filter += `${symbol}filters[advertiser.name]=${advertiser_name}`
        symbol = '&';
    }

    if (budget_type) {
        filter += `${symbol}filters[budget_type.description]=${budget_type}`
        symbol = '&';
    }

    if (currency_name) {
        filter += `${symbol}filters[currency.name]=${currency_name}`
        symbol = '&';
    }

    if (optimization_strategy_name) {
        filter += `${symbol}filters[optimization_strategy.description]=${optimization_strategy_name}`
        symbol = '&';
    }

    if (strategy_name) {
        filter += `${symbol}filters[strategy.description]]=${strategy_name}`
        symbol = '&';
    }

    if (campaign_pacing_name) {
        filter += `${symbol}filters[campaign_pacing.description]=${campaign_pacing_name}`
        symbol = '&';
    }

    if (kpi_campaign_name) {
        filter += `${symbol}filters[kpi_campaign.description]=${kpi_campaign_name}`
        symbol = '&';
    }

    if (bid_shading_name) {
        filter += `${symbol}filters[bid_shading.name]=${bid_shading_name}`
        symbol = '&';
    }

    if (timezone_name) {
        filter += `${symbol}filters[timezone.name]=${timezone_name}`
        symbol = '&';
    }

    if (trafficker_name) {
        filter += `${symbol}filters[trafficker.name]=${trafficker_name}`
        symbol = '&';
    }

    if (active) {
        filter += `${symbol}filters[active]=${active}`
        symbol = '&';
    }

    if (alternative_id) {
        filter += `${symbol}filters[alternative_id]=${alternative_id}`
        symbol = '&';
    }

    if (automatic_allocation) {
        filter += `${symbol}filters[automatic_allocation]=${automatic_allocation}`
        symbol = '&';
    }

    return filter
}

function getOptions(options: CampaingOptions, mode: string, paginated?: CampaingPaginated): string {
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

export default new CampaignService()
