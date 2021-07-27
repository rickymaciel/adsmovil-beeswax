import {
  AdvertiserDataCreate,
  AddContentHtml5DataCreate,
  AddonSettingDataCreate,
  AttributeDataCreate,
  ExchangeOptionsHtml5DataCreate,
  AddContent,
  Advertiser,
  AddonSetting,
  Attribute,
  ExchangeOption,
  Template,
  Type,
  AdvertiserDataUpdate,
  AddContentHtml5DataUpdate,
  AttributeDataUpdate,
  ExchangeOptionsHtml5DataUpdate,
  AddonSettingDataUpdate
} from '@/interfaces/creative'

export interface Html5 {
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

export interface Html5DataCreate {
  creative_type_id: number,
  creative_template_id: number,
  alternative_id?: string,
  name: string,
  secure: boolean,
  start_date: string,
  end_date: string,
  creative_advertiser: AdvertiserDataCreate,
  creative_ad_content: AddContentHtml5DataCreate,
  creative_attributes: AttributeDataCreate,
  creative_exchange_options: ExchangeOptionsHtml5DataCreate,
  creative_addon_settings: AddonSettingDataCreate
}

export interface Html5DataUpdate {
  id: number,
  name?: string,
  secure?: boolean,
  active?: boolean,
  start_date?: string,
  end_date?: string,
  creative_advertiser?: AdvertiserDataUpdate,
  creative_ad_content?: AddContentHtml5DataUpdate,
  creative_attributes?: AttributeDataUpdate,
  creative_exchange_options?: ExchangeOptionsHtml5DataUpdate,
  creative_addon_settings?: AddonSettingDataUpdate
}
