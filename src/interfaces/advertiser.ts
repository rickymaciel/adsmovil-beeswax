export interface Advertiser_Scheme_1 {
  id: number;
  external_id: number;
  account_id: number;
  category_id: number;
  currency_id: number;
  name: string;
  domain: string;
  app_bundle: string;
  created_by: number;
  updated_by: number;
  deleted_by: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  currency: {
    id: number;
    key: string;
    name: string;
    glyph: string;
    emoji_flag: string;
  };
}

export interface Advertiser_Scheme_2 {
  id: number;
  external_id: number;
  account_id: number;
  name: string;
  domain: string;
  app_bundle: string;
  active: boolean;
  created_by: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  },
  updated_by: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  },
  deleted_by: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  },
  created_at: string;
  updated_at: string;
  category: {
    id: number;
    key: string;
    name: string
  },
  currency: {
    id: number;
    key: string;
    name: string;
    glyph: string;
    emoji_flag: string;
  }
}

export interface Advertiser_Scheme_3 {
  id: number;
  external_id: number;
  account_id: number;
  name: string;
  domain: string;
  category_id: number;
  app_bundle: string;
  currency_id: number;
  active: boolean;
  created_by: number;
  updated_by: number;
  deleted_by: number;
  created_at: string;
  updated_at: string;
}

export interface AdvertiserDataCreate {
  name: string;
  category_id: number;
  domain: string;
  app_bundle: string;
  active: boolean;
}

export interface AdvertiserDataUpdate {
  id: number;
  name: string;
  category_id: number;
  domain: string;
  app_bundle: string;
  active: boolean;
}

export interface AdvertiserList {
  id: number;
  value: string;
}

export interface AdvertiserFilters {// name, category_id, domain, app_bundle, external_id, active
  name?: string;
  category_id?: number;
  external_id?: number;
  domain?: string;
  app_bundle?: string;
  active?: boolean;
}

export interface AdvertiserOptions {
  sort: string;// name | domain | app_bundle | external_id
  order: string;// asc | desc
}

export interface AdvertiserPaginated {
  page: number;
  limit: number;
}
