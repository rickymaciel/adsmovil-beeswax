import { forEach, isEmpty, isUndefined } from 'lodash'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosPost } from '@/api/AxiosService'
import { VastInline, VastInlineDataCreate } from '@/interfaces/creativeVideoVastInline'
import {
  AddContent, AddonSetting, Advertiser, Attribute, ExchangeOption,
  ProgressEvent, Template, Type, VastEvent
} from '@/interfaces/creative'

const ROUTES = require('../../routes').CREATIVES

export async function create (creative: VastInlineDataCreate, token: string) {
  try {
    const response = await AxiosPost(ROUTES.CREATIVE_ROUTE, creative, token)

    if (response.success) {
      const data = response.content

      let vastEvent = [] as any
      forEach(data.creative_addon_settings.vast_events, function (value, key) {
        let event = {
          event: value.event,
          url: value.url
        } as VastEvent

        vastEvent.push(event)
      })

      let progressEvent = [] as any
      forEach(data.creative_addon_settings.progress_events, function (value, key) {
        let event = {
          time: value.time,
          url: value.url
        } as ProgressEvent

        progressEvent.push(event)
      })

      const template = {
        id: data.template.id,
        external_id: data.template.external_id,
        creative_type_id: data.template.creative_type_id,
        name: data.template.name,
        template_content: data.template.template_content
      } as Template

      const add_content = {
        id: data.creative_ad_content.id,
        creative_id: data.creative_ad_content.creative_id,
        primary_asset_id: data.creative_ad_content.primary_asset_id,
        secondary_asset_id: data.creative_ad_content.secondary_asset_id,
        click_url: data.creative_ad_content.click_url,
        tag: data.creative_ad_content.tag,
        creative_rule_id: data.creative_ad_content.creative_rule_id,
        title: data.creative_ad_content.title,
        video_duration: data.creative_ad_content.video_duration,
        companion_html: data.creative_ad_content.companion_html,
        companion_size_id: data.creative_ad_content.companion_size_id,
        native_offer: data.creative_ad_content.native_offer,
        created_by: data.creative_ad_content.created_by,
        updated_by: data.creative_ad_content.updated_by,
        deleted_by: data.creative_ad_content.deleted_by,
        created_at: data.creative_ad_content.created_at,
        updated_at: data.creative_ad_content.updated_at
      } as AddContent

      const type = {
        id: data.type.id,
        type: data.type.type,
        description: data.type.description,
        extra: data.type.extra,
      } as Type

      const advertiser = {
        id: data.creative_advertiser.id,
        creative_id: data.creative_advertiser.creative_id,
        advertiser_id: data.creative_advertiser.advertiser_id,
        domain: data.creative_advertiser.domain,
        category_id: data.creative_advertiser.category_id,
        app_bundle: data.creative_advertiser.app_bundle,
        created_by: data.creative_advertiser.created_by,
        updated_by: data.creative_advertiser.updated_by,
        deleted_by: data.creative_advertiser.deleted_by,
        created_at: data.creative_advertiser.created_at,
        updated_at: data.creative_advertiser.updated_at
      } as Advertiser

      const exchangeOptions = {
        id: data.creative_exchange_options.id,
        creative_id: data.creative_exchange_options.creative_id,
        vendors: data.creative_exchange_options.vendors,
        landing_page_url: data.creative_exchange_options.landing_page_url,
        appnexus_submit: data.creative_exchange_options.appnexus_submit,
        thumbnail_id: data.creative_exchange_options.thumbnail_id,
        thumbnail_url: data.creative_exchange_options.thumbnail_url,
        created_by: data.creative_exchange_options.created_by,
        updated_by: data.creative_exchange_options.updated_by,
        deleted_by: data.creative_exchange_options.deleted_by,
        created_at: data.creative_exchange_options.created_at,
        updated_at: data.creative_exchange_options.updated_at
      } as ExchangeOption

      const attribute = {
        id: data.creative_attributes.id,
        creative_id: data.creative_attributes.creative_id,
        mime_type_id: data.creative_attributes.mime_type_id,
        width: data.creative_attributes.width,
        height: data.creative_attributes.height,
        responsive: data.creative_attributes.responsive,
        expandable_type_id: data.creative_attributes.expandable_type_id,
        expandable_directions: data.creative_attributes.expandable_directions,
        moat_web_viewability: data.creative_attributes.moat_web_viewability,
        moat_inapp_viewability: data.creative_attributes.moat_inapp_viewability,
        skippable: data.creative_attributes.skippable,
        skip_offset: data.creative_attributes.skip_offset,
        in_banner_video_id: data.creative_attributes.in_banner_video_id,
        video_api_id: data.creative_attributes.video_api_id,
        video_bit_rates: data.creative_attributes.video_bit_rates,
        video_mime_types: data.creative_attributes.video_mime_types,
        created_by: data.creative_attributes.created_by,
        updated_by: data.creative_attributes.updated_by,
        deleted_by: data.creative_attributes.deleted_by,
        created_at: data.creative_attributes.created_at,
        updated_at: data.creative_attributes.updated_at
      } as Attribute

      const addonSetting = {
        id: data.creative_addon_settings.id,
        creative_id: data.creative_addon_settings.creative_id,
        addons: data.creative_addon_settings.addons,
        pixels: data.creative_addon_settings.pixels,
        scripts: data.creative_addon_settings.scripts,
        click_trackers: data.creative_addon_settings.click_trackers,
        vast_events: vastEvent,
        progress_events: progressEvent,
        created_by: data.creative_addon_settings.created_by,
        updated_by: data.creative_addon_settings.updated_by,
        deleted_by: data.creative_addon_settings.deleted_by,
        created_at: data.creative_addon_settings.created_at,
        updated_at: data.creative_addon_settings.updated_at
      } as AddonSetting

      const creative = {
        id: data.id,
        external_id: data.external_id,
        alternative_id: data.alternative_id,
        account_id: data.account_id,
        creative_type_id: data.creative_type_id,
        creative_template_id: data.creative_template_id,
        name: data.name,
        start_date: data.start_date,
        end_date: data.end_date,
        secure: data.secure,
        active: data.active,
        created_by: data.created_by,
        updated_by: data.updated_by,
        deleted_by: data.deleted_by,
        created_at: data.created_at,
        updated_at: data.updated_at,
        template: template,
        creative_add_content: add_content,
        type: type,
        creative_advertiser: advertiser,
        creative_exchange_options: exchangeOptions,
        creative_attributes: attribute,
        creative_addon_settings: addonSetting
      } as VastInline

      return success('', creative)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}
