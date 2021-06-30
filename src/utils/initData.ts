import { CampaignDataCreate, FrequencyCap } from '../interfaces/campaign'

export function initCampaign(): CampaignDataCreate {
    return {
        start_date: "",
        end_date: "",
        frequency_caps: [] as Array<FrequencyCap>
    } as CampaignDataCreate;
}

export function initLineItem(): any {
    return {
        advertiser_id: null,
        campaign_id: null,
        name: "",
        budget: null,
        daily_budget: null,
        daily_budget_suggested: null,
        start_date: "",
        end_date: "",
        active: 0,// Active --> 1 | Inactive --> 0
        alternative_id: "",
        bid_strategy_id: null,
        strategy_id: null,
        line_pacing_id: null,
        line_item_type_id: null,
        bid_shading_id: null,
        creative_method_id: null,
        fix_cpm: null,
        cpm_bid: null,
        target_ecpm: null,
        target_ecpc: null,
        target_ctr: null,
        target_ecpcv: null,
        target_cpcv: null,
        target_vcr: null,
        frequency_caps: [] as Array<FrequencyCap>
    } as any;
}
