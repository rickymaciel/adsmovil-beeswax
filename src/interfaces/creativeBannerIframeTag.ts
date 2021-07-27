import {
  AdvertiserDataCreate,
  AddContentIframeTagDataCreate,
  AddonSettingDataCreate,
  AttributeDataCreate,
  ExchangeOptionsIframeTagDataCreate,
  AddContent,
  Advertiser,
  AddonSetting,
  Attribute,
  ExchangeOption,
  Template,
  Type,
  AdvertiserDataUpdate,
  AddContentIframeTagDataUpdate,
  AttributeDataUpdate,
  ExchangeOptionsIframeTagDataUpdate,
  AddonSettingDataUpdate
} from '@/interfaces/creative'

export interface IframeTag {
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

export interface IframeTagDataCreate {
  creative_type_id: number,
  creative_template_id: number,
  alternative_id?: string,
  name: string,
  secure: boolean,
  start_date: string,
  end_date: string,
  creative_advertiser: AdvertiserDataCreate,
  creative_ad_content: AddContentIframeTagDataCreate,
  creative_attributes: AttributeDataCreate,
  creative_exchange_options: ExchangeOptionsIframeTagDataCreate,
  creative_addon_settings: AddonSettingDataCreate
}

export interface IframeTagDataUpdate {
  id: number,
  name?: string,
  secure?: boolean,
  start_date?: string,
  end_date?: string,
  creative_advertiser: AdvertiserDataUpdate,
  creative_ad_content: AddContentIframeTagDataUpdate,
  creative_attributes: AttributeDataUpdate,
  creative_exchange_options: ExchangeOptionsIframeTagDataUpdate,
  creative_addon_settings: AddonSettingDataUpdate
}
