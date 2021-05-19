export interface Modifier {
  id: number,
  external_id: number,
  alternative_id: number,
  account_id: number,
  advertiser_id: number,
  name: string,
  modifier_type_id: number,
  active: boolean,
  created_by: number,
  updated_by: number,
  deleted_by: string,
  created_at: string,
  updated_at: string,
  advertiser: {
    id: number,
    external_id: number,
    account_id: number,
    name: string,
    domain: string,
    category_id: number,
    app_bundle: string,
    currency_id: number,
    active: boolean,
    created_by: number,
    updated_by: number,
    deleted_by: string,
    created_at: string,
    updated_at: string
  },
  type: {
    id: number,
    type: string,
    description: string,
    extra: string
  },
  terms?: ModifierTerm[],
}

export interface ModifierDataCreate {
  name: string;
  advertiser_id: number;
  alternative_id: number;
  modifier_type_id: number;
  terms: ModifierTermData[];
}

export interface ModifierDataUpdate {
  id: number
  name: string;
  alternative_id: number;
  terms: ModifierTermData[];
}

export interface ModifierTermData {
  module_id: number,
  key: string,
  value: string,
  modifier: number,
  matching_type_id: number,
}

export interface ModifierTerm {
  id: number,
  modifier_id: number,
  module_id: number,
  key: string,
  value: string,
  modifier: number,
  matching_type_id: number,
  active: boolean,
  created_by?: number,
  updated_by?: number,
  deleted_by?: string,
  created_at?: string,
  updated_at?: string,
  module?: {
    id: number,
    type: string,
    description: string,
    extra: string
  },
  matching_type?: {
    id: number,
    type: string,
    description: string,
    extra: string
  }
}

export interface ModifierType {
  id: number,
  name: string
}

export interface ModifierModule {
  id: number,
  name: string
}

export interface ModifierDataUpdate {
  id: number;
  name: string;
  category_id: number;
  domain: string;
  app_bundle: string;
  active: boolean;
}

export interface ModifierFilters {
  name?: string;
  alternative_id?: number;
  external_id?: number;
  advertiser_id?: number;
  modifier_type_id?: number;
  active?: boolean;
}

export interface ModifierOptions {
  sort: string;// name | domain | app_bundle | external_id
  order: string;// asc | desc
}

export interface ModifierPaginated {
  page: number;
  limit: number;
}

export interface ModifierList {
  id: number;
  value: string;
}

export interface ResultPaginate {
  current_page?: number;
  data?: Modifier[]
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  next_page_url?: string;
  path?: string;
  per_page?: number;
  prev_page_url?: string;
  to?: number;
  total?: number;
}
