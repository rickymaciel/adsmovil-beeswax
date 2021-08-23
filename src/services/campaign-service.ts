import { Campaign, CampaignDataCreate, CampaingFilters, CampaingOptions, CampaingPaginated } from '@/interfaces/campaign';
import { AxiosPost, AxiosGet, AxiosPatch, GetData, GetErrors, HasErrors, GetMessage, GetDataError, AxiosDownload } from '@/services/axios-service'
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
            let filter = ''
            let option = ''

            if (!isUndefined(params.filters)) {
                filter = getFilters(params.filters)
            }

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

    async download(params: { paginated?: CampaingPaginated, filters?: CampaingFilters, options?: CampaingOptions }) {
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
            
            await AxiosDownload(CAMPAIGN_ROUTE + url, 'campaigns-export.csv')
            
            return Promise.resolve({});

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

    const id = !!filters.id ? filters.id : '';
    const name = !!filters.name ? filters.name : '';
    const budget = !!filters.budget ? filters.budget : '';
    const start_date = !!filters.start_date ? filters.start_date : '';
    const end_date = !!filters.end_date ? filters.end_date : '';
    const spend = !!filters.spend ? filters.spend : '';
    const advertiser_name = !!filters.advertiser_name ? filters.advertiser_name : '';
    const budget_type = !!filters.budget_type ? filters.budget_type : '';
    const currency_name = !!filters.currency_name ? filters.currency_name : '';
    const optimization_strategy_name = !!filters.optimization_strategy_name ? filters.optimization_strategy_name : '';
    const strategy_name = !!filters.strategy_name ? filters.strategy_name : '';
    const campaign_pacing_name = !!filters.campaign_pacing_name ? filters.campaign_pacing_name : '';
    const kpi_campaign_name = !!filters.kpi_campaign_name ? filters.kpi_campaign_name : '';
    const bid_shading_name = !!filters.bid_shading_name ? filters.bid_shading_name : '';
    const timezone_name = !!filters.timezone_name ? filters.timezone_name : '';
    const trafficker_name = !!filters.trafficker_name ? filters.trafficker_name : '';
    const active = (typeof filters.active === "undefined") ? '' : filters.active
    const alternative_id = !!filters.alternative_id ? filters.alternative_id : '';
    const automatic_allocation = !!filters.automatic_allocation ? filters.automatic_allocation : '';
    const budget_remaining = !!filters.budget_remaining ? filters.budget_remaining : '';

    filter = `filters[id]=${id}`
          + `&filters[name]=${name}` 
          + `&filters[budget]=${budget}`
          + `&filters[start_date]=${start_date}`
          + `&filters[end_date]=${end_date}`
          + `&filters[spend]=${spend}`
          + `&filters[advertiser.name]=${advertiser_name}`
          + `&filters[budget_type.description]=${budget_type}`
          + `&filters[currency.name]=${currency_name}`
          + `&filters[optimization_strategy.description]=${optimization_strategy_name}`
          + `&filters[strategy.description]]=${strategy_name}`
          + `&filters[campaign_pacing.description]=${campaign_pacing_name}`
          + `&filters[kpi_campaign.description]=${kpi_campaign_name}`
          + `&filters[bid_shading.name]=${bid_shading_name}`
          + `&filters[timezone.name]=${timezone_name}`
          + `&filters[trafficker.name]=${trafficker_name}`
          + `&filters[active]=${active}`
          + `&filters[alternative_id]=${alternative_id}`
          + `&filters[automatic_allocation]=${automatic_allocation}`
          + `&filters[budget_remaining]=${budget_remaining}`

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
