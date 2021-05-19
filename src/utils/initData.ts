import { CampaignDataCreate, FrequencyCap } from '../interfaces/campaign'

export function initCampaign(): CampaignDataCreate {
    return {
        start_date: "",
        end_date: "",
        frequency_caps: [] as Array<FrequencyCap>
    } as CampaignDataCreate;
}
