
export interface SortingOption {
    sort: string;
    order: string;
}

export interface Paginated {
    page: number;
    limit: number;
}

export interface ResultPaginate {
    current_page: number;
    data: Array<any>
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
