import { Campaign, CampaignDataCreate } from '@/interfaces/campaign';
import { AxiosGet, AxiosPatch, AxiosPost } from '@/services/axios-service'

export const CAMPAIGN_ROUTE = '/api/campaigns'

class CampaignService {

    async create(campaign: CampaignDataCreate) {
        return AxiosPost(CAMPAIGN_ROUTE, campaign);
    }

    async update(campaign: Campaign) {
        return AxiosPatch(`${CAMPAIGN_ROUTE}/${campaign.id}`, campaign);
    }

    async show(id: number) {
        return AxiosGet(`${CAMPAIGN_ROUTE}/${id}`);
    }
}

export default new CampaignService()
