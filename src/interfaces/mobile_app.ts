export interface MobileApp {
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