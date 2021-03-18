export interface User {
    id: number;
    account_id: number;
    email: string;
}

export interface Profile {
    id: number;
    account_id: number;
    first_name: string;
    last_name: string;
    document_type?: string;
    document_number?: string;
    phone?: string;
    cell_phone?: string;
    email: string;
    birthday?: string;
    gender?: string;
    address?: string;
    created_at?: string;
    avatar?: string
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
