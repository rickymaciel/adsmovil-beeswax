import { Type } from '@/interfaces/creative'
import { Addon } from '@/interfaces/creativeAddon'

export interface Asset {
  id: number,
  external_id: number,
  name: string,
  account_id: number,
  asset_type_id: number,
  advertiser_id: number,
  size_in_bytes: number,
  video_encoding_id: number,
  thumbnail_name: string,
  mime_type_id: number,
  media_host: string,
  active: boolean,
  created_by: number,
  updated_by: number,
  deleted_by: number,
  created_at: string,
  updated_at: string,
  asset_url: string,
  thumbnail_url: string,
  video_encoding: any,
  type: Type,
  metadata: Metadata,
  advertiser: Advertiser
}

export interface Metadata {
  width: number,
  height: number,
  mime: string
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

export interface AssetList {
  id: number;
  value: string;
}

export interface AssetFilters {
  name?: string,
  model_type_id?: number,
  alternative_id?: string,
  external_id?: number,
  active?: boolean
}

export interface AssetOptions {
  sort: string;// external_id | alternative_id | name | model_type_id | active
  order: string;// asc | desc
}

export interface AssetPaginated {
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
