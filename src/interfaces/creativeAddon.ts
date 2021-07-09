import { Type } from '@/interfaces/creative'

export interface Addon {
  id: number,
  external_id: number,
  alternative_id: string,
  account_id: number,
  name: string,
  advertiser_id: number,
  vendor_id: number,
  creative_type_id: number,
  addon_type_id: number,
  url: string,
  cpm_cost: any,
  secure: boolean,
  include_default: boolean,
  active: boolean,
  created_by: User,
  updated_by: User,
  deleted_by: User,
  created_at: string,
  updated_at: string,
  type: Type,
  advertiser: Advertiser,
  vendor: Vendor
}

export interface Advertiser {
  id: number,
  external_id: number,
  account_id: number,
  name: string,
  domain: string,
  category_id: number,
  app_bundle: string,
  currency_id: number,
  active: boolean,
  created_by: number,
  updated_by: number,
  deleted_by: number,
  created_at: string,
  updated_at: string
}

export interface Vendor {
}

export interface AddonList {
  id: number;
  value: string;
}

export interface AddonFilters {
  name?: string,
  model_type_id?: number,
  alternative_id?: string,
  external_id?: number,
  active?: boolean
}

export interface AddonOptions {
  sort: string;// external_id | alternative_id | name | model_type_id | active
  order: string;// asc | desc
}

export interface AddonPaginated {
  page: number;
  limit: number;
}

export interface ResultPaginate {
  current_page: number;
  data: Addon[]
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

interface User {
  id: number,
  first_name: string,
  last_name: string,
  email: string
}
