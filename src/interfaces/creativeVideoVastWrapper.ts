import {
  AdvertiserDataCreate,

  AddContent,
  Advertiser,
  AddonSetting,
  Attribute,
  ExchangeOption,
  Template,
  Type,
  AddContentVastWrapperDataCreate,
  AttributeVastWrapperDataCreate,
  ExchangeOptionsVastWrapperDataCreate,
  AddonSettingVastWrapperDataCreate,
  AdvertiserDataUpdate,
  AddContentVastWrapperDataUpdate,
  AttributeVastWrapperDataUpdate, ExchangeOptionsVastWrapperDataUpdate, AddonSettingVastWrapperDataUpdate
} from '@/interfaces/creative'

export interface VastWrapper {
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

export interface VastWrapperDataCreate {
  creative_type_id: number,
  creative_template_id: number,
  alternative_id?: string,
  name: string,
  secure: boolean,
  start_date: string,
  end_date: string,
  active: boolean,
  creative_advertiser: AdvertiserDataCreate,
  creative_ad_content: AddContentVastWrapperDataCreate,
  creative_attributes: AttributeVastWrapperDataCreate,
  creative_exchange_options: ExchangeOptionsVastWrapperDataCreate,
  creative_addon_settings: AddonSettingVastWrapperDataCreate
}

export interface VastWrapperDataUpdate {
  id: number,
  name: string,
  secure: boolean,
  start_date: string,
  end_date: string,
  active: boolean,
  creative_advertiser: AdvertiserDataUpdate,
  creative_ad_content: AddContentVastWrapperDataUpdate,
  creative_attributes: AttributeVastWrapperDataUpdate,
  creative_exchange_options: ExchangeOptionsVastWrapperDataUpdate,
  creative_addon_settings: AddonSettingVastWrapperDataUpdate
}
