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

export interface CampaingFilters {
    name?: string,
    active?: boolean,
    automatic_allocation?: number,
    alternative_id?: number,
    advertiser?: {
        name: string
    },
    budget_type?: {
        description: string
    },
    currency?: {
        name: string
    },
    optimization_strategy?: {
        description: string
    },
    strategy?: {
        description: string
    },
    campaign_pacing?: {
        description: string
    },
    kpi_campaign?: {
        description: string
    },
    timezone?: {
        name: string
    },
    trafficker?: {
        name: string
    }
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