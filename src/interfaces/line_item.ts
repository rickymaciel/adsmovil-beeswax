import { FrequencyCap } from '@/interfaces/campaign'

export interface LineItem {
    id: number,
    name: string,
    alternative_id: number,
    start_date: string,
    end_date: string,
    budget: number,
    daily_budget: number,
    fix_cpm: number,
    cpm_bid: number,
    target_ecpc: number,
    target_ctr: number,
    target_vcr: number,
    active: boolean,
    external_id: number,
    spend: number,
    created_by: number,
    updated_by: number,
    deleted_by: number,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    account_id: number,
    advertiser_id: number,
    campaign_id: number,
    line_item_type_id: number,
    budget_type_id: number,
    strategy_id: number,
    bid_strategy_id: number,
    line_pacing_id: number,
    bid_shading_id: number,
    creative_method_id: number,
    budget_remaining: number,
    frequency_caps?: FrequencyCap[],
    advertiser_name?: string,
    budget_type?: string,
    campaign_name?: string,
    line_item_type_name?: string,
    strategy_name?: string,
    line_pacing_name?: string,
    bid_strategy_name?: string,
    bid_shading_name?: string,
    creative_method_name?: string,
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
    viewable_percent_lifetime?: number
}

export interface LineItemDataCreate {
    advertiser_id: number,
    campaign_id: number,
    name: string,
    budget: number,
    daily_budget: number,
    start_date: string,
    end_date: string,
    active: boolean,
    alternative_id: string,
    bid_strategy_id: number,
    strategy_id: number,
    line_pacing_id: number,
    line_item_type_id: number,
    bid_shading_id?: number,
    creative_method_id?: number,
    fix_cpm: number,
    cpm_bid: number,
    target_ecpc: number,
    target_ctr: number,
    target_vcr: number,
    frequency_caps: FrequencyCap[]
}

export interface LineItemDataUpdate {
    id: number,
    advertiser_id?: number,
    campaign_id?: number,
    name?: string,
    budget?: number,
    daily_budget?: number,
    start_date?: string,
    end_date?: string,
    active?: boolean,
    alternative_id?: string,
    bid_strategy_id?: number,
    strategy_id?: number,
    line_pacing_id?: number,
    line_item_type_id?: number,
    bid_shading_id?: number,
    creative_method_id?: number,
    fix_cpm?: number,
    cpm_bid?: number,
    target_ecpc?: number,
    target_ctr?: number,
    target_vcr?: number,
    frequency_caps?: FrequencyCap[]
}

export interface LineItemFilters {
    name?: string,
    active?: boolean,
    budget?: number,
    daily_budget?: number,
    start_date?: string,
    end_date?: string,
    spend?: number,
    alternative_id?: number,
    advertiser_id?: number,
    advertiser?: {
        name: string
    },
    campaign?: {
        name: string
    },
    budget_type?: {
        description: string
    },
    bid_strategy?: {
        description: string
    },
    strategy?: {
        description: string
    },
    line_pacing?: {
        description: string
    },
    line_item_type?: {
        description: string
    },
    bid_shading?: {
        description: string
    },
    creative_method?: {
        description: string
    }
}

export interface LineItemOptions {
    sort: string,// name | active | budget | spend | daily_budget | start_date | end_date | advertiser.name | campaign.name | budget_type.description | bid_strategy.description | strategy.description | line_pacing.description | bid_shading.description | creative_method.description | line_item_type.description
    order: string// asc | desc
}

export interface LineItemPaginated {
    page: number;
    limit: number;
}

export interface Type {
    id: number,
    name: string
}

export interface LineItemList {
    id: number;
    value: string;
}

export interface ResultPaginate {
    current_page?: number;
    data?: LineItem[]
    first_page_url?: string;
    from?: number;
    last_page?: number;
    last_page_url?: string;
    next_page_url?: string;
    path?: string;
    per_page?: number;
    prev_page_url?: string;
    to?: number;
    total?: number;
}
