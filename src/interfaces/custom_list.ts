export interface CustomList {
    id: number,
    external_id: number,
    name: string,
    type_id: number,
    type_name: string,
    type_key: string,
    delimiter: string,
    default_radius_km: number,
    notes: string,
    custom_list_items_count: number,
    active: boolean,
    type?: {
        id: number,
        key: string,
        name: string
    }
}

/*
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
    spend?: number,
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
*/

export interface CustomListDataCreate {
    name: string,
    custom_list_type_id: number,
    active?: boolean,
    default_radius_km?: number
}

export interface CustomListDataUpdate {
    id: number,
    name: string,
    custom_list_type_id: number,
    active?: boolean,
    default_radius_km?: number
}

export interface Exchange {
    id: number,
    description: string,
    abbreviation: string
}

export interface Type {
    id: number,
    key: string,
    name: string
}

export interface List {
    id: number;
    value: string;
}

export interface CustomListFilters {
    id?: number,
    name?: string,
    type_name?: string,
    active?: boolean
}

export interface CustomListOptions {
    sort: string,// name | external_id | custom_list_type_id | active
    order: string// asc | desc
}

export interface CustomListPaginated {
    page: number,
    limit: number
}

export interface CustomListResultPaginate {
    current_page: number,
    data: CustomList[],
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: string,
    to: number,
    total: number
}
