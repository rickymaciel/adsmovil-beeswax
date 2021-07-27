import { AddContentHtml5DataCreate, AddContentIframeTagDataCreate, AddContentImageDataCreate, AddContentJsTagDataCreate, AddContentMraidTagDataCreate, AddContentVastInlineDataCreate, AddonSettingDataCreate, AddonSettingVastInlineDataCreate, AdvertiserDataCreate, AttributeDataCreate, AttributeVastInlineDataCreate, Creative, ExchangeOptionsHtml5DataCreate, ExchangeOptionsIframeTagDataCreate, ExchangeOptionsImageDataCreate, ExchangeOptionsJsTagDataCreate, ExchangeOptionsMraidTagDataCreate, ExchangeOptionsVastInlineDataCreate } from "@/interfaces/creative";
import { Html5DataCreate } from "@/interfaces/creativeBannerHtml5";
import { IframeTagDataCreate } from "@/interfaces/creativeBannerIframeTag";
import { ImageDataCreate } from "@/interfaces/creativeBannerImage";
import { JsTagDataCreate } from "@/interfaces/creativeBannerJsTag";
import { MraidTagDataCreate } from "@/interfaces/creativeBannerMraidTag";
import { VastInlineDataCreate } from "@/interfaces/creativeVideoVastInline";
import moment from 'moment-timezone';


export function fieldsCreative() {
    return [
        {
            creative_template_id: 1, // Image template
            fields: [
                'budget_type_id',
                'primary_asset_id',
                'click_url',
                'vendors',
                'landing_page_url',
                'appnexus_submit',
                'addons',
                'pixels',
                'scripts'
            ]
        },
        {
            creative_template_id: 3, // VAST InLine
            fields: [
                'start_date',
                'end_date',
                'budget_type_id',
                'title',
                'click_url',
                'video_duration',
                'primary_asset_id',
                'secondary_asset_id',
                'companion_html',
                'companion_size_id',
                'skippable',
                'skip_offset',
                'vendors',
                'landing_page_url',
                'appnexus_submit',
                'thumbnail_id',
                'addons',
                'pixels',
                'scripts',
                'click_trackers',
                'vast_events',
                'progress_events'

            ]
        },
        {
            creative_template_id: 4, // JS Tag
            fields: [
                'start_date',
                'end_date',
                'tag',
                'creative_rule_id',
                'size_id',
                'mime_type_id',
                'expandable_type_id',
                'expandable_directions',
                'responsive',
                'in_banner_video_id',
                'vendors',
                'landing_page_url',
                'appnexus_submit',
                'thumbnail_id',
                'addons',
                'pixels',
                'scripts'
            ]
        },
        {
            creative_template_id: 5, // iFrame Tag
            fields: [
                'start_date',
                'end_date',
                'tag',
                'creative_rule_id',
                'size_id',
                'mime_type_id',
                'expandable_type_id',
                'expandable_directions',
                'responsive',
                'in_banner_video_id',
                'vendors',
                'landing_page_url',
                'appnexus_submit',
                'thumbnail_id',
                'addons',
                'pixels',
                'scripts'
            ]
        },
        {
            creative_template_id: 6, // VAST and VPAID Wrapper
            fields: []
        },
        {
            creative_template_id: 13, // MRAID Tag
            fields: [
                'start_date',
                'end_date',
                'tag',
                'creative_rule_id',
                'size_id',
                'mime_type_id',
                'expandable_type_id',
                'expandable_directions',
                'responsive',
                'in_banner_video_id',
                'vendors',
                'landing_page_url',
                'appnexus_submit',
                'thumbnail_id',
                'addons',
                'pixels',
                'scripts'
            ]
        },
        {
            creative_template_id: 14, // Native Image App Install
            fields: []
        },
        {
            creative_template_id: 15, // Native Video App Install
            fields: []
        },
        {
            creative_template_id: 16, // Native Image Content
            fields: []
        },
        {
            creative_template_id: 17, // Native Video Content
            fields: []
        },
        {
            creative_template_id: 18, // Native Video App Install (VAST/VPAID Wrapper)
            fields: []
        },
        {
            creative_template_id: 19, // Native Video Content (VAST/VPAID Wrapper)
            fields: []
        },
        {
            creative_template_id: 20, // VAST Wrapper with MOAT Viewability
            fields: []
        },
        {
            creative_template_id: 21, // HTML5 Creative
            fields: [
                'start_date',
                'end_date',
                'tag',
                'creative_rule_id',
                'budget_type_id',
                'primary_asset_id',
                'size_id',
                'mime_type_id',
                'expandable_type_id',
                'expandable_directions',
                'responsive',
                'in_banner_video_id',
                'vendors',
                'landing_page_url',
                'appnexus_submit',
                'thumbnail_id',
                'addons',
                'pixels',
                'scripts'
            ]
        },
        {
            creative_template_id: 22, // App Promo Icon
            fields: []
        },
    ]
}

export function hasFieldByTemplateId(creative_template_id: number, input: string) {
    const fields = fieldsCreative().find(template => template.creative_template_id === creative_template_id)?.fields;
    return fields && fields.includes(input);
}

export function parseDataCreativeImage(params: ImageDataCreate) {
    return {
        creative_type_id: params.creative_type_id,
        alternative_id: params.alternative_id,
        creative_template_id: params.creative_template_id,
        name: params.name,
        secure: params.secure,
        creative_advertiser: {
            advertiser_id: params.creative_advertiser.advertiser_id,
            category_id: params.creative_advertiser.category_id,
            domain: params.creative_advertiser.domain,
            app_bundle: params.creative_advertiser.app_bundle
        } as AdvertiserDataCreate,
        creative_ad_content: {
            primary_asset_id: params.creative_ad_content.primary_asset_id,
            click_url: params.creative_ad_content.click_url
        } as AddContentImageDataCreate,
        creative_exchange_options: {
            vendors: params.creative_exchange_options.vendors,
            landing_page_url: params.creative_exchange_options.landing_page_url,
            appnexus_submit: params.creative_exchange_options.appnexus_submit
        } as ExchangeOptionsImageDataCreate,
        creative_addon_settings: {
            addons: params.creative_addon_settings.addons,
            pixels: params.creative_addon_settings.pixels,
            scripts: params.creative_addon_settings.scripts
        } as AddonSettingDataCreate
    } as ImageDataCreate
}

export function parseDataCreativeJsTag(params: JsTagDataCreate) {
    return {
        creative_type_id: params.creative_type_id,
        creative_template_id: params.creative_template_id,
        start_date: params.start_date ? moment(String(params.start_date)).format('YYYY-MM-DD HH:mm:ss') : undefined,
        end_date: params.end_date ? moment(String(params.end_date)).format('YYYY-MM-DD HH:mm:ss') : undefined,
        alternative_id: params.alternative_id,
        name: params.name,
        secure: params.secure,
        creative_advertiser: {
            advertiser_id: params.creative_advertiser.advertiser_id,
            category_id: params.creative_advertiser.category_id,
            domain: params.creative_advertiser.domain,
            app_bundle: params.creative_advertiser.app_bundle
        } as AdvertiserDataCreate,
        creative_ad_content: {
            creative_rule_id: params.creative_ad_content.creative_rule_id,
            tag: params.creative_ad_content.tag
        } as AddContentJsTagDataCreate,
        creative_attributes: {
            width: params.creative_attributes.width,
            height: params.creative_attributes.height,
            expandable_directions: params.creative_attributes.expandable_directions,
            expandable_type_id: params.creative_attributes.expandable_type_id,
            in_banner_video_id: params.creative_attributes.in_banner_video_id,
            mime_type_id: params.creative_attributes.mime_type_id,
            responsive: params.creative_attributes.responsive
        } as AttributeDataCreate,
        creative_exchange_options: {
            vendors: params.creative_exchange_options.vendors,
            landing_page_url: params.creative_exchange_options.landing_page_url,
            appnexus_submit: params.creative_exchange_options.appnexus_submit,
            thumbnail_id: params.creative_exchange_options.thumbnail_id,
        } as ExchangeOptionsJsTagDataCreate,
        creative_addon_settings: {
            addons: params.creative_addon_settings.addons,
            pixels: params.creative_addon_settings.pixels,
            scripts: params.creative_addon_settings.scripts
        } as AddonSettingDataCreate
    } as JsTagDataCreate
}

export function parseDataCreativeIframeTag(params: IframeTagDataCreate) {
    return {
        creative_type_id: params.creative_type_id,
        creative_template_id: params.creative_template_id,
        start_date: params.start_date ? moment(String(params.start_date)).format('YYYY-MM-DD HH:mm:ss') : undefined,
        end_date: params.end_date ? moment(String(params.end_date)).format('YYYY-MM-DD HH:mm:ss') : undefined,
        alternative_id: params.alternative_id,
        name: params.name,
        secure: params.secure,
        creative_advertiser: {
            advertiser_id: params.creative_advertiser.advertiser_id,
            category_id: params.creative_advertiser.category_id,
            domain: params.creative_advertiser.domain,
            app_bundle: params.creative_advertiser.app_bundle
        } as AdvertiserDataCreate,
        creative_ad_content: {
            creative_rule_id: params.creative_ad_content.creative_rule_id,
            tag: params.creative_ad_content.tag
        } as AddContentIframeTagDataCreate,
        creative_attributes: {
            width: params.creative_attributes.width,
            height: params.creative_attributes.height,
            expandable_directions: params.creative_attributes.expandable_directions,
            expandable_type_id: params.creative_attributes.expandable_type_id,
            in_banner_video_id: params.creative_attributes.in_banner_video_id,
            mime_type_id: params.creative_attributes.mime_type_id,
            responsive: params.creative_attributes.responsive
        } as AttributeDataCreate,
        creative_exchange_options: {
            vendors: params.creative_exchange_options.vendors,
            landing_page_url: params.creative_exchange_options.landing_page_url,
            appnexus_submit: params.creative_exchange_options.appnexus_submit,
            thumbnail_id: params.creative_exchange_options.thumbnail_id,
        } as ExchangeOptionsIframeTagDataCreate,
        creative_addon_settings: {
            addons: params.creative_addon_settings.addons,
            pixels: params.creative_addon_settings.pixels,
            scripts: params.creative_addon_settings.scripts
        } as AddonSettingDataCreate
    } as IframeTagDataCreate
}

export function parseDataCreativeMraidTag(params: MraidTagDataCreate) {
    return {
        creative_type_id: params.creative_type_id,
        creative_template_id: params.creative_template_id,
        start_date: params.start_date ? moment(String(params.start_date)).format('YYYY-MM-DD HH:mm:ss') : undefined,
        end_date: params.end_date ? moment(String(params.end_date)).format('YYYY-MM-DD HH:mm:ss') : undefined,
        alternative_id: params.alternative_id,
        name: params.name,
        secure: params.secure,
        creative_advertiser: {
            advertiser_id: params.creative_advertiser.advertiser_id,
            category_id: params.creative_advertiser.category_id,
            domain: params.creative_advertiser.domain,
            app_bundle: params.creative_advertiser.app_bundle
        } as AdvertiserDataCreate,
        creative_ad_content: {
            creative_rule_id: params.creative_ad_content.creative_rule_id,
            tag: params.creative_ad_content.tag,
        } as AddContentMraidTagDataCreate,
        creative_attributes: {
            width: params.creative_attributes.width,
            height: params.creative_attributes.height,
            expandable_directions: params.creative_attributes.expandable_directions,
            expandable_type_id: params.creative_attributes.expandable_type_id,
            in_banner_video_id: params.creative_attributes.in_banner_video_id,
            mime_type_id: params.creative_attributes.mime_type_id,
            responsive: params.creative_attributes.responsive
        } as AttributeDataCreate,
        creative_exchange_options: {
            vendors: params.creative_exchange_options.vendors,
            landing_page_url: params.creative_exchange_options.landing_page_url,
            appnexus_submit: params.creative_exchange_options.appnexus_submit,
            thumbnail_id: params.creative_exchange_options.thumbnail_id
        } as ExchangeOptionsMraidTagDataCreate,
        creative_addon_settings: {
            addons: params.creative_addon_settings.addons,
            pixels: params.creative_addon_settings.pixels,
            scripts: params.creative_addon_settings.scripts
        } as AddonSettingDataCreate
    } as MraidTagDataCreate
}

export function parseDataCreativeVastInline(params: VastInlineDataCreate) {
    return {
        creative_type_id: params.creative_type_id,
        creative_template_id: params.creative_template_id,
        start_date: params.start_date ? moment(String(params.start_date)).format('YYYY-MM-DD HH:mm:ss') : undefined,
        end_date: params.end_date ? moment(String(params.end_date)).format('YYYY-MM-DD HH:mm:ss') : undefined,
        alternative_id: params.alternative_id,
        name: params.name,
        secure: params.secure,
        creative_advertiser: {
            advertiser_id: params.creative_advertiser.advertiser_id,
            category_id: params.creative_advertiser.category_id,
            domain: params.creative_advertiser.domain,
            app_bundle: params.creative_advertiser.app_bundle
        } as AdvertiserDataCreate,
        creative_ad_content: {
            title: params.creative_ad_content.title,
            click_url: params.creative_ad_content.click_url,
            companion_html: params.creative_ad_content.companion_html,
            companion_size_id: params.creative_ad_content.companion_size_id,
            primary_asset_id: params.creative_ad_content.primary_asset_id,
            video_duration: params.creative_ad_content.video_duration,
            secondary_asset_id: params.creative_ad_content.secondary_asset_id,
        } as AddContentVastInlineDataCreate,
        creative_attributes: {
            skippable: params.creative_attributes.skippable,
            skip_offset: params.creative_attributes.skip_offset
        } as AttributeVastInlineDataCreate,
        creative_exchange_options: {
            vendors: params.creative_exchange_options.vendors,
            landing_page_url: params.creative_exchange_options.landing_page_url,
            appnexus_submit: params.creative_exchange_options.appnexus_submit
        } as ExchangeOptionsVastInlineDataCreate,
        creative_addon_settings: {
            addons: params.creative_addon_settings.addons,
            pixels: params.creative_addon_settings.pixels,
            scripts: params.creative_addon_settings.scripts,
            click_trackers: params.creative_addon_settings.click_trackers,
            vast_events: params.creative_addon_settings.vast_events,
            progress_events: params.creative_addon_settings.progress_events
        } as AddonSettingVastInlineDataCreate
    } as VastInlineDataCreate
}

export function parseDataCreativeHtml5(params: Html5DataCreate) {
    return {
        creative_type_id: params.creative_type_id,
        creative_template_id: params.creative_template_id,
        start_date: params.start_date ? moment(String(params.start_date)).format('YYYY-MM-DD HH:mm:ss') : undefined,
        end_date: params.end_date ? moment(String(params.end_date)).format('YYYY-MM-DD HH:mm:ss') : undefined,
        alternative_id: params.alternative_id,
        name: params.name,
        secure: params.secure,
        creative_advertiser: {
            advertiser_id: params.creative_advertiser.advertiser_id,
            category_id: params.creative_advertiser.category_id,
            domain: params.creative_advertiser.domain,
            app_bundle: params.creative_advertiser.app_bundle
        } as AdvertiserDataCreate,
        creative_ad_content: {
            primary_asset_id: params.creative_ad_content.primary_asset_id,
        } as AddContentHtml5DataCreate,
        creative_attributes: {
            width: params.creative_attributes.width,
            height: params.creative_attributes.height,
            expandable_directions: params.creative_attributes.expandable_directions,
            expandable_type_id: params.creative_attributes.expandable_type_id,
            in_banner_video_id: params.creative_attributes.in_banner_video_id,
            mime_type_id: params.creative_attributes.mime_type_id,
            responsive: params.creative_attributes.responsive,
        } as AttributeDataCreate,
        creative_exchange_options: {
            thumbnail_id: params.creative_exchange_options.thumbnail_id,
            vendors: params.creative_exchange_options.vendors,
            landing_page_url: params.creative_exchange_options.landing_page_url,
            appnexus_submit: params.creative_exchange_options.appnexus_submit
        } as ExchangeOptionsHtml5DataCreate,
        creative_addon_settings: {
            addons: params.creative_addon_settings.addons,
            pixels: params.creative_addon_settings.pixels,
            scripts: params.creative_addon_settings.scripts
        } as AddonSettingDataCreate
    } as Html5DataCreate
}