import { Campaign, CampaignDataCreate, CampaingFilters, CampaingOptions, CampaingPaginated } from '@/interfaces/campaign';
import { AxiosPost, AxiosGet, AxiosPatch, GetData, GetErrors, HasErrors, GetMessage, GetDataError } from '@/services/axios-service'
import { isEmpty, isUndefined } from 'lodash'
export const CAMPAIGN_ROUTE = '/api/campaigns'

class CampaignService {

    async create(campaign: CampaignDataCreate) {
        try {
            const response = await AxiosPost(CAMPAIGN_ROUTE, campaign);
            return Promise.resolve(GetData(response));

        } catch (error) {
            console.error('CampaignService:create', { error: error })
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
            console.error('CampaignService:update', { error: error })
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

            console.error('CampaignService:show', { error: error })
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async paginated(filters?: CampaingFilters, options?: CampaingOptions) {
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
            const response = await AxiosGet(CAMPAIGN_ROUTE + url)

            return Promise.resolve(GetData(response));

        } catch (error) {
            console.error('CampaignService:paginated', { error: error })
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }
}

function getFilters(filters: CampaingFilters): string {
    let filter = ''
    /*
    const name = (isUndefined(filters?.name)) ? '' : filters?.name
    const advertiser_name = (isUndefined(filters.advertiser?.name)) ? '' : filters.advertiser?.name
    const budget_type = (isUndefined(filters?.budget_type)) ? '' : filters?.budget_type
    const app_bundle = (isUndefined(filters.app_bundle)) ? '' : filters.app_bundle
    const external_id = (isUndefined(filters.external_id)) ? '' : filters.external_id
    const active = (isUndefined(filters.active)) ? '' : filters.active
    
    filter += 'filters[name]=' + name + '&filters[advertiser_name]=' + advertiser_name + '&filters[budget_type]=' + budget_type + '&filters[app_bundle]=' + app_bundle + '&filters[external_id]=' + external_id + '&filters[active]=' + active
    */
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
