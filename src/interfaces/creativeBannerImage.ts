import {
  AdvertiserDataCreate, AddContentImageDataCreate, ExchangeOptionsImageDataCreate, AddonSettingDataCreate,
  AddContent, Advertiser, AddonSetting, Attribute, ExchangeOption, Template, Type
} from '@/interfaces/creative'

export interface Image {
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
  creative_add_content: AddContent,
  type: Type,
  creative_advertiser: Advertiser,
  creative_exchange_options: ExchangeOption,
  creative_attributes: Attribute,
  creative_addon_settings: AddonSetting
}

export interface ImageDataCreate {
  creative_type_id: number,
  creative_template_id: number,
  alternative_id?: string,
  name: string,
  secure: boolean,
  creative_advertiser: AdvertiserDataCreate,
  creative_ad_content: AddContentImageDataCreate,
  creative_exchange_options: ExchangeOptionsImageDataCreate,
  creative_addon_settings: AddonSettingDataCreate
}
