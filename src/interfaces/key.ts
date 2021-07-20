import { LineItem } from '@/interfaces/line_item'

export interface Key {
  id: number,
  name: string,
  comparator: string,
  extra: string,
  active: boolean,
  unique_predicate: boolean,
  targeting_module_id: number,
  created_by: number,
  updated_by: number,
  deleted_by: number,
  created_at: string,
  updated_at: string,
  targeting_module: Module,
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

export interface KeyList {
  id: number;
  value: string;
}

export interface KeyFilters {
  id?: number,
  name?: string,
  targeting_module_id?: number,
  active?: boolean
}

export interface KeyOptions {
  sort: string,// name | targeting_module_id | active | id
  order: string// asc | desc
}

export interface KeyPaginated {
  page: number;
  limit: number;
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


interface Module {
  id: number,
  type: string,
  description: string,
  extra: string
}
