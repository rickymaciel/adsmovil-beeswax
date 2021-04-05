export interface CustomList {
  id: number,
  account_id: number,
  external_id: number,
  name: string,
  custom_list_type_id: number,
  delimiter: string,
  default_radius_km: number,
  notes: string,
  active: boolean,
  created_by: number,
  updated_by: number,
  deleted_by: number,
  created_at: string,
  updated_at: string
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
