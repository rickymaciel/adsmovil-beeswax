import { CustomList } from './custom_list'

export interface ListItem {
  id: number,
  external_id: number,
  list_item: any,
  value: number,
  name: string,
  active: boolean,
  custom_list_id: number,
  created_by: number,
  updated_by: number,
  deleted_by: number,
  created_at: string,
  updated_at: string,
  deleted_at: string,
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

export interface ListItemDataCreate {
  custom_list_id: number,
  list_item: any,
  name: string,
  value?: number
}

export interface ListItemDataUpdate {
  id: number,
  name: string,
  value: number,
  active: boolean
}

export interface ListItemField {// Custom List type 6
  lat: number,
  long: number,
  radius_km: number
}

export interface List {
  id: number;
  value: string;
}

export interface ListItemFilters {
  name?: string,
  external_id?: number,
  list_item?: string,
  active?: boolean
}

export interface ListItemOptions {
  sort: string,// name | external_id | custom_list_type_id | active
  order: string// asc | desc
}

export interface ListItemPaginated {
  page: number,
  limit: number
}

export interface ListItemResultPaginate {
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
