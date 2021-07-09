export interface AppSite {
  id: number,
  account_id: number,
  external_id: number,
  name: string,
  custom_list_type_id: number,
  delimiter: string,
  default_radius_km: number,
  notes: string,
  active: boolean,
  terms_count: number
}

export interface AppName {
  id: number,
  app_bundle: string,
  app_id: string,
  app_name: string,
  inventory_source_id: number,
  volume_ranking: number,
  update_date: string
}

export interface Site {
  id: number,
  site_id: string,
  placement_id: string,
  site_name: string,
  inventory_source_id: number,
  volume_ranking: number,
  update_date: string
}
