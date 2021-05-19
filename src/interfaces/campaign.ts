export interface Campaign {
    id: number,
    name: string,
    advertiser_id: number,
    budget: number,
    start_date: string,
    end_date: string,
    budget_type_id: number,
    automatic_allocation: number, //0=false, 1=true
    kpi_campaign_id: number,
    kpi_objective: number,
    optimization_strategy_id?: number,
    strategy_id?: number,
    campaign_pacing_id?: number,
    daily_budget?: number,
    cpm_bid?: number,
    target_ecpc?: number,
    target_ctr?: number,
    target_vcr?: number,
    frequency_caps: FrequencyCap[],
    alternative_id: string,
    active: number, //0=false, 1=true
    trafficker_id: number
}

export interface CampaignDataCreate {
    name: string,
    advertiser_id: number,
    budget: number | null,
    start_date: string,
    end_date: string,
    budget_type_id: number | null,
    automatic_allocation: number, //0=false, 1=true
    kpi_campaign_id: number | null,
    kpi_objective: number | null,
    optimization_strategy_id?: number,
    strategy_id?: number,
    campaign_pacing_id?: number,
    daily_budget?: number,
    cpm_bid?: number,
    target_ecpc?: number,
    target_ctr?: number,
    target_vcr?: number,
    frequency_caps: FrequencyCap[],
    alternative_id: string,
    active: number, //0=false, 1=true
    trafficker_id: number
}

export interface FrequencyCap {
    impressions: number,
    every_time: number,
    unit_time_id: number
}