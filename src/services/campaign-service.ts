import { CampaignDataCreate } from '@/interfaces/campaign';
import { Notification, MessageTypes } from '@/interfaces/proccess';
import { AxiosPost } from '@/services/axios-service'
import Store from '@/store/index'

export const CAMPAIGN_ROUTE = '/api/campaigns'

class CampaignService {

    async create(campaign: CampaignDataCreate) {
        try {
            return AxiosPost(CAMPAIGN_ROUTE, campaign);
        } catch (error) {
            console.error('CampaignService:create', { error: error })
        }
    }
}

export default new CampaignService()
