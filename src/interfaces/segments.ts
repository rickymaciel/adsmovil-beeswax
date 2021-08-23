export interface Segments {
    id: number,
    account_id: number,
    external_id: number,
    segment_provider_id: number,
    key: string,
    name: string,
    description: string,
    verb_usage_id: number,
    days: number,
    advertiser_id?: number,
    active: boolean,
    created_by: {
        id: number,
        account_id?: number,
        name: string,
        last_name: string,
        email: string,
        email_verified_at?: String,
        created_at: string,
        updated_at: string
    },
    updated_by: {
        id: number,
        account_id?: number,
        name: string,
        last_name: string,
        email: string,
        email_verified_at?: string,
        created_at: string,
        updated_at: string
    },
    
}