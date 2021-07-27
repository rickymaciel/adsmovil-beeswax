import {
  AdvertiserDataCreate,
  AddContentJsTagDataCreate,
  ExchangeOptionsJsTagDataCreate,
  AddonSettingDataCreate,
  AttributeDataCreate,
  AddContent,
  Advertiser,
  AddonSetting,
  Attribute,
  ExchangeOption,
  Template,
  Type,
  AdvertiserDataUpdate,
  AddContentJsTagDataUpdate,
  AttributeDataUpdate,
  ExchangeOptionsJsTagDataUpdate,
  AddonSettingDataUpdate
} from '@/interfaces/creative'

export interface JsTag {
  id: number,
  external_id: number,
  alternative_id: string,
  account_id: number,
  creative_type_id: number,
  creative_template_id: number,
  name: string,
  start_date: string,
  end_date: string,
  secure: boolean,
  active: boolean,
  created_by: number,
  updated_by: number,
  deleted_by: number,
  created_at: string,
  updated_at: string,
  template: Template,
  type: Type,
  creative_advertiser: Advertiser,
  creative_add_content: AddContent,
  creative_exchange_options: ExchangeOption,
  creative_attributes: Attribute,
  creative_addon_settings: AddonSetting
}

export interface JsTagDataCreate {
  creative_type_id: number,
  creative_template_id: number,
  alternative_id?: string,
  name: string,
  secure: boolean,
  start_date: string,
  end_date: string,
  creative_advertiser: AdvertiserDataCreate,
  creative_ad_content: AddContentJsTagDataCreate,
  creative_attributes: AttributeDataCreate,
  creative_exchange_options: ExchangeOptionsJsTagDataCreate,
  creative_addon_settings: AddonSettingDataCreate
}

export interface JsTagDataUpdate {
  id: number,
  name?: string,
  secure?: boolean,
  start_date?: string,
  end_date?: string,
  active?: boolean,
  creative_advertiser: AdvertiserDataUpdate,
  creative_ad_content: AddContentJsTagDataUpdate,
  creative_attributes: AttributeDataUpdate,
  creative_exchange_options: ExchangeOptionsJsTagDataUpdate,
  creative_addon_settings: AddonSettingDataUpdate
}
