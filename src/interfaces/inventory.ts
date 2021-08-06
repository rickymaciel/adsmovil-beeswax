export interface AdPosition {
  id: number,
  type: string,
  description: string,
  external_id: number, //Key to use
  open_rtb_code: string
}

export interface AppInventory {
  id: number,
  type: string,
  description: string,
  extra: string
}

export interface InterstitialTypes {
  BANNER_AND_VIDEO: string,
  BANNER: string,
  VIDEO: string
}

export interface InventorySource {
  id: number,
  external_id: number,
  name: string,
  key: string,
  mobile_app: boolean,
  mobile_web: boolean,
  mobile_native: boolean,
  desktop: boolean,
  desktop_native: boolean,
  video: boolean,
  other: boolean
}

export interface DealIdList {
  id: number,
  account_id: number,
  external_id: number,
  name: string,
  custom_list_type_id: number,
  delimiter: string,
  default_radius_km?: null,
  notes?: null,
  active: boolean,
  terms_count: number
}

export interface PlacementId {
  
}

export interface SiteList {
  
}

export interface PublisherId {
  
}