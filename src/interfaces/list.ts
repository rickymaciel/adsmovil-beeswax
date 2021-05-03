export interface List {
    id: number;
    external_id?: number;
    account_id?: number;
    name: string;
    items: string[];
    actions: string[];
    domain?: string;
    app_bundle?: string;
    active: boolean;
    created_by?: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
    },
    updated_by?: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
    },
    deleted_by?: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
    },
    created_at?: string;
    updated_at?: string;
    type?: Type,
    currency?: {
        id: number;
        key: string;
        name: string;
        glyph: string;
        emoji_flag: string;
    },
    clicks?: number;
    conversion_orders?: number;
    conversion_value?: number;
    conversions?: number;
    cost_per_acquisition?: number;
    cost_per_acquisition_usd?: number;
    cpm?: number;
    ctr?: number;
    gross_margin?: number;
    impressions?: number;
    net_margin?: number;
    spend?: number;
    update_date?: number;
    vcpm?: number;
    video_complete_percent?: number;
    video_completes?: number;
    video_plays?: number;
    viewable_impressions?: number;
    viewable_percent?: number;
    clicks_lifetime?: number;
    conversion_orders_lifetime?: number;
    conversion_value_lifetime?: number;
    conversions_lifetime?: number;
    cost_per_acquisition_lifetime?: number;
    cost_per_acquisition_lifetime_usd?: number;
    cpm_lifetime?: number;
    ctr_lifetime?: number;
    gross_margin_lifetime?: number;
    impressions_lifetime?: number;
    net_margin_lifetime?: number;
    spend_lifetime?: number;
    vcpm_lifetime?: number;
    video_complete_percent_lifetime?: number;
    video_completes_lifetime?: number;
    video_plays_lifetime?: number;
    viewable_impressions_lifetime?: number;
    viewable_percent_lifetime?: number;
}

export interface ListDataCreate {
    name: string;
    type_id: number;
    domain: string;
    app_bundle: string;
    active: boolean;
}

export interface ListDataUpdate {
    id: number;
    name: string;
    type_id: number;
    domain: string;
    app_bundle: string;
    active: boolean;
}

export interface ListList {
    id: number;
    value: string;
}

export interface Type {
    id?: number;
    key?: string;
    name?: string;
}

export interface ListFilters {
    name?: string;
    type_id?: number;
    external_id?: number;
    domain?: string;
    app_bundle?: string;
    active?: boolean;
}

export interface ListOptions {
    sort: string;// name | domain | app_bundle | external_id
    order: string;// asc | desc
}

export interface ListPaginated {
    page: number;
    limit: number;
}

export interface ResultPaginate {
    current_page?: number;
    data?: List[]
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
