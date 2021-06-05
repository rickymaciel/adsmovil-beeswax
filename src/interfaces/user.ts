import { Currency } from '@/interfaces/currency'
import { Timezone } from '@/interfaces/timezone'

export interface User {
    id: number;
    account_id: number;
    email: string;
}

export interface Profile {
    id: number,
    account_id: number,
    name: string,
    last_name: string,
    email: string,
    email_verified_at: string,
    created_at: string,
    updated_at: string,
    account: Account_scheme_1,
    accounts: Account_scheme_1[],
    roles: Role[]
}

export interface Pivot {
    user_id: number,
    account_id: number,
    active: number,
    role_id?: number
}

export interface Role {
    id: number,
    name: string,
    description: string,
    pivot: Pivot
}

export interface Account_scheme_1 {
    id: number,
    external_id: number,
    name: string,
    pivot: Pivot
}

export interface Account_scheme_2 {
    id: number,
    name: string,
    currency: Currency,
    timezone: Timezone
}

export interface Permission {
    name: string;
    description: string;
}

export interface UserDataCreate {
    email: string;
    role_id: number;
}

export interface UserDataUpdate {
    id: number;
    name?: string;
    last_name?: string;
    role_id?: number;
}

export interface UserInit {
    email: string;
    password: string;
    password_confirmation: string;
    name: string;
    last_name: string;
}

export interface UserList {
    id: number;
    value: string;
}

export interface UserFilters {
    first_name?: string;
    last_name?: string;
    email?: string;
}

export interface UserOptions {
    sort: string;// name | last_name | email
    order: string;// asc | desc
}

export interface UserPaginated {
    page: number;
    limit: number;
}
