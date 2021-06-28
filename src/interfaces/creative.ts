export interface Method {
  id: number,
  name: string
}

export interface Type {
  id: number,
  type: string,
  description: string,
  extra: string
}

export interface Template {
  id: number,
  external_id: number,
  creative_type_id: number,
  name: string,
  template_content: string
}

export interface Vendor {
  id: number,
  type: string,
  description: string,
  vendor_id: number,
  adx_gdpr_provider_id: number,
  adx_vendor_approval_id: number,
  iab_gdpr_vendor_id: number
}

export interface Rule {
  id: number,
  type: string,
  description: string,
  external_id: number,
  key: string,
  order: number,
  auto_detect_string: string
}

export interface Mime {
  id: number,
  type: string,
  description: string,
  extra: string
}

export interface Expandable {
  id: number,
  type: string,
  description: string,
  extra: string
}

export interface InBanner {
  id: number,
  type: string,
  description: string,
  extra: string
}

export interface Apis {
  id: number,
  type: string,
  description: string,
  extra: string
}

export interface Association {

}

export interface TagCheck {
  creative_rule_id: number,
  creative_content_tag: string
}

export interface AddContent {
  id: number,
  creative_id: number,
  primary_asset_id: number,
  secondary_asset_id: number,
  click_url: string,
  tag: string,
  creative_rule_id: number,
  title: string,
  video_duration: number,
  companion_html: string,
  companion_size_id: number,
  native_offer: string,
  created_by: number,
  updated_by: number,
  deleted_by: number,
  created_at: string,
  updated_at: string
}

export interface Advertiser {
  id: number,
  creative_id: number,
  advertiser_id: number,
  domain: string,
  category_id: number,
  app_bundle: string,
  created_by: number,
  updated_by: number,
  deleted_by: number,
  created_at: string,
  updated_at: string
}

export interface ExchangeOption {
  id: number,
  creative_id: number,
  vendors: string[],
  landing_page_url: string,
  appnexus_submit: boolean,
  thumbnail_id: number,
  thumbnail_url: string,
  created_by: number,
  updated_by: number,
  deleted_by: number,
  created_at: string,
  updated_at: string
}

export interface Attribute {
  id: number,
  creative_id: number,
  mime_type_id: number,
  width: number,
  height: number,
  responsive: boolean,
  expandable_type_id: number,
  expandable_directions: string[],
  moat_web_viewability: boolean,
  moat_inapp_viewability: boolean,
  skippable: boolean,
  skip_offset: string,
  in_banner_video_id: number,
  video_api_id: number,
  video_bit_rates: number[],
  video_mime_types: number[],
  created_by: number,
  updated_by: number,
  deleted_by: number,
  created_at: string,
  updated_at: string
}

export interface AddonSetting {
  id: number,
  creative_id: number,
  addons: string[],
  pixels: string[],
  scripts: string[],
  click_trackers: string[],
  vast_events: VastEvent[],
  progress_events: ProgressEvent[],
  created_by: number,
  updated_by: number,
  deleted_by: number,
  created_at: string,
  updated_at: string
}

export interface AssociationDataCreate {
  creative_id: number,
  line_item_id: number,
  start_date: string,
  end_date: string,
  active: boolean
}

export interface AdvertiserDataCreate {
  advertiser_id: number,
  category_id: number,
  domain: string,
  app_bundle: string
}

export interface AddContentImageDataCreate {
  primary_asset_id: number,
  click_url: string
}

export interface AddContentJsTagDataCreate {
  creative_rule_id: number,
  tag: string
}

export interface AddContentIframeTagDataCreate {
  creative_rule_id: number,
  tag: string
}

export interface AddContentMraidTagDataCreate {
  creative_rule_id: number,
  tag: string
}

export interface AddContentHtml5DataCreate {
  primary_asset_id: number
}

export interface AddContentVastInlineDataCreate {
  title: string,
  click_url: string,
  video_duration: number,
  primary_asset_id: number,
  secondary_asset_id?: number,
  companion_size_id: number,
  companion_html: string
}

export interface AddContentVastWrapperDataCreate {
  tag: string,
  video_duration: number
}

export interface ExchangeOptionsImageDataCreate {
  landing_page_url: string,
  appnexus_submit: boolean
  vendors: number[]
}

export interface ExchangeOptionsJsTagDataCreate {
  thumbnail_id: number,
  landing_page_url: string,
  appnexus_submit: boolean
  vendors: number[]
}

export interface ExchangeOptionsIframeTagDataCreate {
  thumbnail_id: number,
  landing_page_url: string,
  appnexus_submit: boolean
  vendors: number[]
}

export interface ExchangeOptionsMraidTagDataCreate {
  thumbnail_id: number,
  landing_page_url: string,
  appnexus_submit: boolean
  vendors: number[]
}

export interface ExchangeOptionsHtml5DataCreate {
  thumbnail_id: number,
  landing_page_url: string,
  appnexus_submit: boolean,
  vendors: number[]
}

export interface ExchangeOptionsVastInlineDataCreate {
  landing_page_url: string,
  appnexus_submit: boolean,
  vendors: number[]
}

export interface ExchangeOptionsVastWrapperDataCreate {
  landing_page_url: string,
  appnexus_submit: boolean,
  vendors: number[]
}

export interface AddonSettingDataCreate {
  addons: number[],
  pixels: string[],
  scripts: string[]
}

export interface AddonSettingVastInlineDataCreate {
  addons: number[],
  pixels: string[],
  scripts: string[],
  click_trackers: string[],
  vast_events: VastEvent[],
  progress_events: ProgressEvent[]
}

export interface AddonSettingVastWrapperDataCreate {
  addons: number[],
  pixels: string[],
  scripts: string[],
  click_trackers: string[],
  vast_events: VastEvent[],
  progress_events: ProgressEvent[]
}

export interface AttributeDataCreate {
  mime_type_id: number,
  expandable_type_id: number,
  in_banner_video_id: number,
  width: number,
  height: number,
  responsive: boolean,
  expandable_directions: number[]
}

export interface AttributeVastInlineDataCreate {
  skippable: boolean,
  skip_offset: string
}

export interface AttributeVastWrapperDataCreate {
  video_api_id: number,
  video_mime_types: number[],
  video_bit_rates: number[],
  skippable: boolean,
  skip_offset: string,
  moat_inapp_viewability: boolean
}

export interface VastEvent {
  event: string,
  url: string
}

export interface ProgressEvent {
  time: string,
  url: string
}
