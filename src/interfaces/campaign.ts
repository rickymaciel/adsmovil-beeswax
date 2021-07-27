export interface Campaign {
    id: number,
    name: string,
    budget: number,
    daily_budget: number,
    start_date: string,
    end_date: string,
    active: boolean,
    alternative_id: string,
    external_id: number,
    spend: number,
    budget_remaining?: number,
    automatic_allocation: boolean,
    line_items_count?: number,
    kpi_objective: number,
    cpm_bid: number,
    target_ecpc: number,
    target_ctr: number,
    target_vcr: number,
    created_by: number,
    updated_by: number,
    deleted_by: number,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    account_id: number,
    advertiser_id: number,
    budget_type_id: number,
    currency_id: number,
    timezone_id: number,
    optimization_strategy_id: number,
    strategy_id: number,
    campaign_pacing_id: number,
    kpi_campaign_id: number,
    trafficker_id: number,
    advertiser_name?: string,
    currency_name?: string,
    optimization_strategy_name?: string,
    strategy_name?: string,
    campaign_pacing_name?: string,
    kpi_campaign_name?: string,
    trafficker_name?: string,
    timezone_name?: string,
    clicks?: number,
    conversion_orders?: number,
    conversion_value?: number,
    conversions?: number,
    cost_per_acquisition?: number,
    cost_per_acquisition_usd?: number,
    cpm?: number,
    ctr?: number,
    gross_margin?: number,
    impressions?: number,
    net_margin?: number,
    update_date?: number,
    vcpm?: number,
    video_complete_percent?: number,
    video_completes?: number,
    video_plays?: number,
    viewable_impressions?: number,
    viewable_percent?: number,
    clicks_lifetime?: number,
    conversion_orders_lifetime?: number,
    conversion_value_lifetime?: number,
    conversions_lifetime?: number,
    cost_per_acquisition_lifetime?: number,
    cost_per_acquisition_lifetime_usd?: number,
    cpm_lifetime?: number,
    ctr_lifetime?: number,
    gross_margin_lifetime?: number,
    impressions_lifetime?: number,
    net_margin_lifetime?: number,
    spend_lifetime?: number,
    vcpm_lifetime?: number,
    video_complete_percent_lifetime?: number,
    video_completes_lifetime?: number,
    video_plays_lifetime?: number,
    viewable_impressions_lifetime?: number,
    viewable_percent_lifetime?: number,
    frequency_caps?: FrecuencyCaps[],
    budget_type?: {
        id: number,
        description: string
    },
    currency?: {
        id: number,
        name: string
    },
    advertiser?: {
        id: number,
        name: string
    },
    timezone?: {
        id: number,
        name: string
    },
    optimization_strategy?: {
        id: number,
        description: string
    },
    strategy?: {
        id: number,
        description: string
    },
    campaign_pacing?: {
        id: number,
        description: string
    },
    kpi_campaign?: {
        id: number,
        description: string
    },
    trafficker?: {
        id: number,
        name: string,
        last_name: string
    }
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

export interface CampaingDataUpdate {
    id: number,
    name: string,
    advertiser_id: number,
    budget: number,
    start_date: string,
    end_date: string,
    budget_type_id: number,
    automatic_allocation: number,
    kpi_campaign_id: number,
    kpi_objective: number,
    optimization_strategy_id: number,
    strategy_id: number,
    campaign_pacing_id: number,
    daily_budget: number,
    cpm_bid: number,
    target_ecpc: number,
    target_ctr: number,
    target_vcr: number,
    frequency_caps: FrecuencyCapsDataCreate[],
    alternative_id: string
}

export interface FrecuencyCapsDataCreate {
    impressions: number,
    every_time: number,
    unit_time_id: number
}

export interface FrecuencyCaps {
    id: number,
    impressions: number,
    duration: number,
    every_time: number,
    created_by: number,
    updated_by: number,
    deleted_by: number,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    unit_time_id: number,
    campaign_id: number,
    line_item_id: number
}

export interface CampaingList {
    id: number;
    value: string;
}

export interface FrequencyCap {
    impressions: number,
    every_time: number,
    unit_time_id: number
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
export interface CampaingFilters {
    id?: number,
    name?: string,
    budget?: number,
    start_date?: string,
    end_date?: string,
    spend?: number,
    active?: boolean,
    automatic_allocation?: number,
    alternative_id?: number,
    advertiser_name?: string,
    budget_type?: string,
    currency_name?: string,
    optimization_strategy_name?: string,
    strategy_name?: string,
    campaign_pacing_name?: string,
    kpi_campaign_name?: string,
    bid_shading_name?: string,
    timezone_name?: string,
    trafficker_name?: string,
    budget_remaining: number
}

export interface CampaingOptions {
    sort: string;// name | budget | start_date |end_date | spend | advertiser_name | budget_type | currency_name | optimization_strategy_name | strategy_name | campaign_pacing_name | kpi_campaign_name | bid_shading_name | timezone_name
    order: string;// asc | desc
}

export interface CampaingPaginated {
    page: number;
    limit: number;
}

export interface ResultPaginate {
    current_page: number;
    data: Campaign[]
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}