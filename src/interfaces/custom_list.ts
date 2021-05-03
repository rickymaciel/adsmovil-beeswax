export interface CustomList {
  id: number,
  account_id: number,
  external_id: number,
  name: string,
  custom_list_type_id: number,
  type?: {
    id: number,
    key: string,
    name: string
  },
  delimiter: string,
  default_radius_km: number,
  notes: string,
  active: boolean,
  created_by: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  },
  updated_by: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  },
  deleted_by: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  },
  created_at: string,
  updated_at: string,
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
}

export interface CustomListDataCreate {
  name: string,
  custom_list_type_id: number
}

export interface CustomListDataUpdate {
  id: number,
  name: string,
  custom_list_type_id: number
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
  name?: string,
  external_id?: number,
  custom_list_type_id?: number,
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
