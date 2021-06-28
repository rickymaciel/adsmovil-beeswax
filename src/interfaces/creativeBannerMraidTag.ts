import {
  AdvertiserDataCreate,
  AddContentMraidTagDataCreate,
  AddonSettingDataCreate,
  AttributeDataCreate,
  ExchangeOptionsMraidTagDataCreate,
  AddContent,
  Advertiser,
  AddonSetting,
  Attribute,
  ExchangeOption,
  Template,
  Type
} from '@/interfaces/creative'

export interface MraidTag {
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

export interface MraidTagDataCreate {
  creative_type_id: number,
  creative_template_id: number,
  alternative_id?: string,
  name: string,
  secure: boolean,
  start_date: string,
  end_date: string,
  creative_advertiser: AdvertiserDataCreate,
  creative_ad_content: AddContentMraidTagDataCreate,
  creative_attributes: AttributeDataCreate,
  creative_exchange_options: ExchangeOptionsMraidTagDataCreate,
  creative_addon_settings: AddonSettingDataCreate
}
