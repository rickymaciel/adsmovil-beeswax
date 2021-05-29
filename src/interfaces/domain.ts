export interface DomainList {
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
