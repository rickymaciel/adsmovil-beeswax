export interface Country {
  id: number,
  name: string,
  prefix: string,
  prefix_3: string //Key to use
}

export interface Region {
  id: number,
  name: string,
  prefix: string,
  key: string, //Key to use
  country_id: number
}

export interface Lat_Long {
  id: number,
  account_id: number,
  external_id: number, //Key to use
  name: string,
  custom_list_type_id: number,
  delimiter: string,
  default_radius_km: number,
  notes: string,
  active: boolean,
  terms_count: number
}
