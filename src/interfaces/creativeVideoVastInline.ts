import {
  AdvertiserDataCreate,
  AddContentVastInlineDataCreate,
  AttributeVastInlineDataCreate,
  ExchangeOptionsVastInlineDataCreate,
  AddonSettingVastInlineDataCreate,
  AddContent,
  Advertiser,
  AddonSetting,
  Attribute,
  ExchangeOption,
  Template,
  Type,
  AdvertiserDataUpdate,
  AddContentVastInlineDataUpdate,
  AttributeVastInlineDataUpdate,
  ExchangeOptionsVastInlineDataUpdate, AddonSettingVastInlineDataUpdate
} from '@/interfaces/creative'

export interface VastInline {
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

export interface VastInlineDataCreate {
  creative_type_id: number,
  creative_template_id: number,
  alternative_id?: string,
  name: string,
  secure: boolean,
  start_date: string,
  end_date: string,
  active: boolean,
  creative_advertiser: AdvertiserDataCreate,
  creative_ad_content: AddContentVastInlineDataCreate,
  creative_attributes: AttributeVastInlineDataCreate,
  creative_exchange_options: ExchangeOptionsVastInlineDataCreate,
  creative_addon_settings: AddonSettingVastInlineDataCreate
}

export interface VastInlineDataUpdate {
  id: number,
  name: string,
  secure: boolean,
  start_date: string,
  end_date: string,
  active: boolean,
  creative_advertiser: AdvertiserDataUpdate,
  creative_ad_content: AddContentVastInlineDataUpdate,
  creative_attributes: AttributeVastInlineDataUpdate,
  creative_exchange_options: ExchangeOptionsVastInlineDataUpdate,
  creative_addon_settings: AddonSettingVastInlineDataUpdate
}
