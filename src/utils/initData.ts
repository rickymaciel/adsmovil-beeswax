import { Creative } from '@/interfaces/creative';
import { AssociationDataCreate } from '@/interfaces/creativeAssociation';
import { CampaignDataCreate, FrequencyCap } from '../interfaces/campaign'


/**
 * only for test
 */
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

/**
 * only for test
 */
export async function getCreativeData() {
    return creative_12;
};

/**
 * only for test
 */
export function initHardCoreLineItem(): any {
    return {
	id: 24,
	name: "Line Item Final",
	alternative_id: null,
	start_date: "2021-08-09 00:00:00",
	end_date: "2021-08-11 23:59:59",
	budget: 2000,
	daily_budget: null,
	fix_cpm: 1,
	cpm_bid: null,
	target_ecpc: null,
	target_ctr: null,
	target_vcr: null,
	active: true,
	external_id: 98,
	spend: 0,
	created_by: 2,
	updated_by: 2,
	deleted_by: null,
	created_at: "2021-08-06T14:15:16.000000Z",
	updated_at: "2021-08-06T14:16:31.000000Z",
	deleted_at: null,
	account_id: 1,
	advertiser_id: 18,
	campaign_id: 89,
	line_item_type_id: 21,
	budget_type_id: 2,
	strategy_id: null,
	bid_strategy_id: 24,
	line_pacing_id: 12,
	bid_shading_id: 18,
	creative_method_id: 26,
	budget_remaining: 2000,
	frequency_caps: [
		{
			id: 165,
			impressions: 200,
			duration: 120,
			every_time: 2,
			created_by: null,
			updated_by: null,
			deleted_by: null,
			created_at: "2021-08-06T14:15:16.000000Z",
			updated_at: "2021-08-06T14:15:16.000000Z",
			deleted_at: null,
			unit_time_id: 3,
			campaign_id: null,
			line_item_id: 24,
		},
	],
	budget_type: {
		id: 2,
		description: "Impressions",
	},
	line_item_type: {
		id: 21,
		description: "Banner",
	},
	advertiser: {
		id: 18,
		name: "Advertiser Final",
	},
	campaign: {
		id: 89,
		name: "Campaing final",
		budget_remaining: 0,
	},
	bid_strategy: {
		id: 24,
		description: "Fix",
	},
	strategy: null,
	line_pacing: {
		id: 12,
		description: "ASAP",
	},
	bid_shading: {
		id: 18,
		description: "Normal",
	},
	creative_method: {
		id: 26,
		description: "RANDOM",
	},
	creative_associations: [
		{
			id: 9,
			external_id: 12,
			creative_id: 38,
			line_item_id: 24,
			start_date: "2021-08-10 00:00:00",
			end_date: "2021-08-11 23:59:59",
			active: true,
			created_by: 2,
			updated_by: 2,
			deleted_by: null,
			created_at: "2021-08-06T14:16:27.000000Z",
			updated_at: "2021-08-06T14:16:27.000000Z",
		},
	],
}
}

/**
 * Line Item Resources
 * @returns
 */
export function getLineItemResources() {
    return {
        campaigns: [],
        advertisers: [],
        line_item_types: [],
        creative_weighting_methods: [],
        budget_types: [],
        bid_strategies: [],
        strategies: [],
        strategies_filtered: [],
        bidding_shadings: [],
        campaigns_pacing: [],
        optimization_strategies: [],
        unit_times: [],
        line_pacings: [],
        selected_campaign: null,
        budget_display: "Total",
        fields: {
            budget: {
                required: true,
                show: true,
                disabled: false,
            },
            budget_type_id: {
                required: true,
                show: true,
                disabled: false,
            },
            fix_cpm: {
                required: false,
                show: false,
                disabled: false,
            },
            bid_shading_id: {
                required: false,
                show: false,
                disabled: false,
            },
            bid_strategy_id: {
                required: true,
                show: true,
                disabled: false,
            },
            strategy_id: {
                required: false,
                show: false,
                disabled: false,
            },
            line_pacing_id: {
                required: true,
                show: false,
                disabled: true,
            },
            daily_budget: {
                required: false,
                show: false,
                disabled: true,
            },
			daily_budget_suggested: {
                required: false,
                show: false,
                disabled: true,
            },
            cpm_bid: {
                required: false,
                show: false,
                disabled: true,
            },
            target_ecpm: {
                required: false,
                show: false,
                disabled: false,
            },
            target_ecpc: {
                required: false,
                show: false,
                disabled: true,
            },
            target_ctr: {
                required: false,
                show: false,
                disabled: false,
            },
            target_ecpcv: {
                required: false,
                show: false,
                disabled: false,
            },
            target_cpcv: {
                required: false,
                show: false,
                disabled: false,
            },
            target_vcr: {
                required: false,
                show: false,
                disabled: false,
            },
        },
    }
}

export function initDataVariables() {
    return {
        app_site: {
            app_bundle_list: [],
            app_id_list: [],
            app_name: [],
            deal_id: [],
            deal_id_list: [],
            domain_list: [],
            placement_id: [],
            placement_list: [],
            publisher_id: [],
            publisher_id_list: [],
            site: [],
            site_list: [],
            app_name_attributes: getDataVariables().app_name,
            site_attributes: getDataVariables().site,
            placement_id_attributes: getDataVariables().site
        },
        geo: {
            city: [],
            country: [],
            region: [],
            lat_long_list: [],
            location_type: [],
        },
        exchange: {
            inventory_source: [],
            auction_type: [],
        },
        environment: {
            environment_type: [],
            topframe: [],
            video_api: [],
        },
        platform: {
            browser: [],
            browser_version: [],
            carrier: [],
            device_type: [],
            device_make: [],
            device_model: [],
            device_screen_size: [],
            operating_system: [],
            operating_system_version: [],
        },
        time: {
            user_time_of_week: [],
        },
    }
}

export function getDataVariables() {
    return {
        app_name: [
            {
                value: "app_name",
                text: "by App Name",
            },
            {
                value: "app_id",
                text: "by App ID",
            },
            {
                value: "app_bundle",
                text: "by App Bundle",
            },
        ],
        site: [
            {
                value: "site_id",
                text: "by Site ID",
            },
            {
                value: "site_name",
                text: "by Site Name",
            },
            {
                value: "placement_id",
                text: "by Placement ID",
            },
        ]
    };
};

/**
 * Creative
 * @returns
 */
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

/**
 * Campaign
 * @returns
 */
export function initCampaign(): CampaignDataCreate {
    return {
        start_date: "",
        end_date: "",
        frequency_caps: [] as Array<FrequencyCap>
    } as CampaignDataCreate;
}

/**
 * Targeting
 * @returns
 */
export function initTargeting(targeting_predicate_id: Number = 0): any {
    return {
        app_site: {
            app_bundle_list: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 1,
                targeting_predicate_id: targeting_predicate_id,
            },
            app_id_list: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 2,
                targeting_predicate_id: targeting_predicate_id,
            },
            app_name: {
                by_attribute: "app_name",
                value: [],
                targeting_terms: [],
                targeting_key_id: 3,
                targeting_predicate_id: targeting_predicate_id,
            },
            deal_id: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 4,
                targeting_predicate_id: targeting_predicate_id,
            },
            deal_id_list: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 5,
                targeting_predicate_id: targeting_predicate_id,
            },
            domain_list: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 6,
                targeting_predicate_id: targeting_predicate_id,
            },
            placement_id: {
                by_attribute: "placement_id",
                value: [],
                targeting_terms: [],
                targeting_key_id: undefined,
                targeting_predicate_id: targeting_predicate_id,
            },
            placement_list: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 7,
                targeting_predicate_id: targeting_predicate_id,
            },
            publisher_id: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 8,
                targeting_predicate_id: targeting_predicate_id,
            },
            publisher_id_list: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 9,
                targeting_predicate_id: targeting_predicate_id,
            },
            site: {
                by_attribute: "site_id",
                value: [],
                targeting_terms: [],
                targeting_key_id: 10,
                targeting_predicate_id: targeting_predicate_id,
            },
            site_list: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 11,
                targeting_predicate_id: targeting_predicate_id,
            },
        },
        geo: {
            country: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 12,
                targeting_predicate_id: targeting_predicate_id,
            },
            city: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 13,
                targeting_predicate_id: targeting_predicate_id,
            },
            lat_long_list: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 14,
                targeting_predicate_id: targeting_predicate_id,
            },
            location_type: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 15,
                targeting_predicate_id: targeting_predicate_id,
            },
            region: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 16,
                targeting_predicate_id: targeting_predicate_id,
            },
        },
        exchange: {
            auction_type: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 17,
                targeting_predicate_id: targeting_predicate_id,
            },
            inventory_source: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 18,
                targeting_predicate_id: targeting_predicate_id,
            },
        },
        environment: {
            environment_type: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 19,
                targeting_predicate_id: targeting_predicate_id,
            },
            topframe: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 20,
                targeting_predicate_id: targeting_predicate_id,
            },
            video_api: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 21,
                targeting_predicate_id: targeting_predicate_id,
            },
        },
        platform: {
            browser: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 22,
                targeting_predicate_id: targeting_predicate_id,
            },
            browser_version: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 23,
                targeting_predicate_id: targeting_predicate_id,
            },
            carrier: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 24,
                targeting_predicate_id: targeting_predicate_id,
            },
            device_type: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 25,
                targeting_predicate_id: targeting_predicate_id,
            },
            device_make: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 26,
                targeting_predicate_id: targeting_predicate_id,
            },
            device_model: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 27,
                targeting_predicate_id: targeting_predicate_id,
            },
            device_screen_size: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 28,
                targeting_predicate_id: targeting_predicate_id,
            },
            operating_system: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 29,
                targeting_predicate_id: targeting_predicate_id,
            },
            operating_system_version: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 30,
                targeting_predicate_id: targeting_predicate_id,
            },
        },
        content: {
            content_category: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 32,
                targeting_predicate_id: targeting_predicate_id,
            },
            language: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 33,
                targeting_predicate_id: targeting_predicate_id,
            },
        },
        time: {
            user_time_of_week: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 31,
                targeting_predicate_id: targeting_predicate_id,
            },
        },
    }
}

/**
 * Targeting keys
 * @returns
 */
export function getTargetingIDByValue() {
    return {
        // app_site
        app_site: {
            app_bundle_list: 1,
            app_id_list: 2,
            app_name: 3,
            deal_id: 4,
            deal_id_list: 5,
            domain_list: 6,
            placement_list: 7,
            publisher_id: 8,
            publisher_id_list: 9,
            site: 10,
            site_list: 11,
        },

        // geo
        geo: {
            country: 12,
            city: 13,
            lat_long_list: 14,
            location_type: 15,
            region: 16,
        },

        // exchange
        exchange: {
            auction_type: 17,
            inventory_source: 18,
        },

        // environment
        environment: {
            environment_type: 19,
            topframe: 20,
            video_api: 21,
        },

        // platform
        platform: {
            browser: 22,
            browser_version: 23,
            carrier: 24,
            device_type: 25,
            device_make: 26,
            device_model: 27,
            device_screen_size: 28,
            operating_system: 29,
            operating_system_version: 30,
        },
    };
}

/**
 * Line Item
 * @returns
 */
export function initLineItem(): any {
    return {
        id: null,
        advertiser_id: null,
        campaign_id: null,
        name: "",
        budget_type_id: null,
        budget: null,
        daily_budget: null,
        daily_budget_suggested: null,
        start_date: "",
        end_date: "",
        line_duration: null,
        active: 0,// Active --> 1 | Inactive --> 0
        alternative_id: "",
        bid_strategy_id: null,
        strategy_id: null,
        line_pacing_id: null,
        line_item_type_id: null,
        bid_shading_id: null,
        creative_method_id: null,
        fix_cpm: null,
        cpm_bid: null,
        target_ecpm: null,
        target_ecpc: null,
        target_ctr: null,
        target_ecpcv: null,
        target_cpcv: null,
        target_vcr: null,
        frequency_caps: [] as Array<FrequencyCap>,
        creative_associations: []
    } as any;
}

/**
 * Creative
 * @param creative
 * @returns
 */
export function initAssociationCreative(creative: Creative): AssociationDataCreate {
    return {
        creative_id: creative.id,
        line_item_id: creative.creative_type_id | 0,
        start_date: "",
        end_date: "",
        active: true
    } as AssociationDataCreate
};
