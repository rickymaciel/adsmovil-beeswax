import { AddContentHtml5DataCreate, AddContentIframeTagDataCreate, AddContentImageDataCreate, AddContentJsTagDataCreate, AddContentMraidTagDataCreate, AddContentVastInlineDataCreate, AddonSettingDataCreate, AddonSettingVastInlineDataCreate, AdvertiserDataCreate, AttributeDataCreate, AttributeVastInlineDataCreate, Creative, ExchangeOptionsHtml5DataCreate, ExchangeOptionsIframeTagDataCreate, ExchangeOptionsImageDataCreate, ExchangeOptionsJsTagDataCreate, ExchangeOptionsMraidTagDataCreate, ExchangeOptionsVastInlineDataCreate } from "@/interfaces/creative";
import { AssociationDataCreate } from "@/interfaces/creativeAssociation";
import { Html5DataCreate } from "@/interfaces/creativeBannerHtml5";
import { IframeTagDataCreate } from "@/interfaces/creativeBannerIframeTag";
import { ImageDataCreate } from "@/interfaces/creativeBannerImage";
import { JsTagDataCreate } from "@/interfaces/creativeBannerJsTag";
import { MraidTagDataCreate } from "@/interfaces/creativeBannerMraidTag";
import { VastInlineDataCreate } from "@/interfaces/creativeVideoVastInline";
import moment from 'moment-timezone';

const creative_12 = {
    id: 12,
    external_id: 8587,
    alternative_id: null,
    account_id: 1,
    creative_type_id: 21,
    creative_template_id: 4,
    name: "Creative JS Tag Test Polaco",
    start_date: "2021-06-26 00:00:00",
    end_date: "2021-06-30 00:00:00",
    secure: true,
    active: true,
    created_by: 2,
    updated_by: 2,
    deleted_by: null,
    created_at: "2021-06-23T00:19:12.000000Z",
    updated_at: "2021-06-23T00:19:12.000000Z",
    creative_advertiser: {
        id: 12,
        creative_id: 12,
        advertiser_id: 14,
        domain: "https://advertiserpolaco.com",
        category_id: 6,
        app_bundle: "com.adsmovil.PicoPlaca",
        created_by: 2,
        updated_by: 2,
        deleted_by: null,
        created_at: "2021-06-23T00:19:12.000000Z",
        updated_at: "2021-06-23T00:19:12.000000Z",
    },
    creative_ad_content: {
        id: 16,
        creative_id: 12,
        primary_asset_id: null,
        secondary_asset_id: null,
        click_url: null,
        tag: '<ins data-dcm-placement=""/>',
        creative_rule_id: 617,
        title: null,
        video_duration: null,
        companion_html: null,
        companion_size_id: null,
        native_offer: null,
        created_by: 2,
        updated_by: 2,
        deleted_by: null,
        created_at: "2021-06-23T00:19:12.000000Z",
        updated_at: "2021-06-23T00:19:12.000000Z",
    },
    creative_exchange_options: {
        id: 15,
        creative_id: 12,
        vendors: [649, 650, 651],
        landing_page_url: "http://adsmovil.com",
        appnexus_submit: true,
        thumbnail_id: 36,
        thumbnail_url: null,
        created_by: 2,
        updated_by: 2,
        deleted_by: null,
        created_at: "2021-06-23T00:19:12.000000Z",
        updated_at: "2021-06-23T00:19:12.000000Z",
    },
    creative_attributes: {
        id: 10,
        creative_id: 12,
        mime_type_id: 630,
        size_id: 1,
        width: 320,
        height: 50,
        responsive: false,
        expandable_type_id: 639,
        expandable_directions: [1817],
        moat_web_viewability: false,
        moat_inapp_viewability: false,
        skippable: false,
        skip_offset: null,
        in_banner_video_id: 619,
        video_api_id: null,
        video_bit_rates: null,
        video_mime_types: null,
        created_by: 2,
        updated_by: 2,
        deleted_by: null,
        created_at: "2021-06-23T00:19:12.000000Z",
        updated_at: "2021-06-23T00:19:12.000000Z",
    },
    creative_addon_settings: {
        id: 15,
        creative_id: 12,
        addons: [1],
        pixels: [
            "https://adsmovil.com/pixels/pixel1.js",
            "https://adsmovil.com/pixels/pixel2.js",
        ],
        scripts: [
            "https://adsmovil.com/scripts/script1.js",
            "https://adsmovil.com/scripts/script2.js",
        ],
        click_trackers: null,
        vast_events: null,
        progress_events: null,
        created_by: 2,
        updated_by: 2,
        deleted_by: null,
        created_at: "2021-06-23T00:19:12.000000Z",
        updated_at: "2021-06-23T00:19:12.000000Z",
    },
    type: {
        id: 21,
        type: "line_item_type",
        description: "Banner",
        extra: "0",
    },
    template: {
        id: 4,
        external_id: 4,
        creative_type_id: 21,
        name: "JS Tag",
        template_content:
            "<div id='beeswax-ad-wrapper' style='position: relative;'><img src=\"{{IMPRESSION_URL}}\" style=\"position: absolute;\" width='0' height='0'>{{CUSTOM:TAG:STRING}}{{#ADDITIONAL_PIXELS:0:10<img src='{{CUSTOM:PIXEL_URL:URL}}' width='0' height='0'>/}}{{#ADDITIONAL_SCRIPTS:0:10<script type='text/javascript' src='{{CUSTOM:SCRIPT_URL:URL}}'></script>/}}{{BEESWAX_COOKIE_SYNC_IFRAME}}</div>",
    },
    line_associations: [],
};

export async function getCreativeData() {
    return creative_12;
};

export function initCreative() {
    return {
        budget_type_id: "",
        alternative_id: "",
        creative_type_id: "",
        creative_template_id: "",
        name: "",
        start_date: "",
        end_date: "",
        secure: true,
        active: false,
        creative_advertiser: {
            advertiser_id: "",
            domain: "",
            category_id: "",
            app_bundle: "",
        },
        creative_ad_content: {
            primary_asset_id: "",
            secondary_asset_id: "",
            secondary_size_id: "",
            companion_html: "",
            click_url: "",
            tag: "",
            creative_rule_id: "",
        },
        creative_exchange_options: {
            vendors: [],
            landing_page_url: "",
            appnexus_submit: false,
            thumbnail_id: "",
        },
        creative_addon_settings: {
            addons: [],
            pixels: [],
            scripts: [],
            click_trackers: [],
            vast_events: [],
            progress_events: []
        },
        creative_attributes: {
            size_id: "",
            width: "",
            height: "",
            mime_type_id: "",
            expandable_type_id: "",
            expandable_directions: [],
            responsive: false,
            in_banner_video_id: "",
        },
        line_associations: [],
    }
};

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

export function initAssociationCreative(creative: Creative): AssociationDataCreate {
    return {
        creative_id: creative.id,
        line_item_id: creative.creative_type_id | 0,
        start_date: "",
        end_date: "",
        active: true
    } as AssociationDataCreate
};

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