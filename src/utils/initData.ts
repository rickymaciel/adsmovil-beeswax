import { CampaignDataCreate, FrequencyCap } from '../interfaces/campaign'

export function initCampaign(): CampaignDataCreate {
    return {
        start_date: "",
        end_date: "",
        frequency_caps: [] as Array<FrequencyCap>
    } as CampaignDataCreate;
}

export function initTargeting(): any {
    return {
        app_site: {
            app_bundle_list: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 1,
                targeting_predicate_id: 1824,
            },
            app_id_list: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 2,
                targeting_predicate_id: 1823,
            },
            app_name: {
                by_attribute: "app_name",
                value: [],
                targeting_terms: [],
                targeting_key_id: 3,
                targeting_predicate_id: 1823,
            },
            deal_id: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 4,
                targeting_predicate_id: 1823,
            },
            deal_id_list: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 5,
                targeting_predicate_id: 1823,
            },
            domain_list: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 6,
                targeting_predicate_id: 1823,
            },
            placement_id: {
                value: [],
                targeting_terms: [],
                targeting_key_id: undefined,
                targeting_predicate_id: 1823,
            },
            placement_list: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 7,
                targeting_predicate_id: 1823,
            },
            publisher_id: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 8,
                targeting_predicate_id: 1823,
            },
            publisher_id_list: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 9,
                targeting_predicate_id: 1823,
            },
            site: {
                by_attribute: "site_id",
                value: [],
                targeting_terms: [],
                targeting_key_id: 10,
                targeting_predicate_id: 1823,
            },
            site_list: {
                value: [],
                targeting_terms: [],
                targeting_key_id: 11,
                targeting_predicate_id: 1823,
            },
        },
        content: {
            content_category: {
                url: "",
                field: "",
            },
            language: {
                url: "",
                field: "",
            },
        },
        environment: {
            environment_type: {
                url: "",
                field: "",
            },
            topframe: {
                url: "",
                field: "",
            },
            video_api: {
                url: "",
                field: "",
            },
        },
        exchange: {
            auction_type: {
                url: "",
                field: "extra",
            },
            inventory_source: {
                url: "",
                field: "",
            },
        },
        geo: {
            country: {
                url: "",
                field: "",
            },
            region: {
                url: "",
                field: "",
            },
            city: {
                url: "",
                field: "",
            },
            lat_long_list: {
                url: "",
                field: "",
            },
            location_type: {
                url: "",
                field: "",
            },
        },
    }
}

export function initLineItem(): any {
    return {
        advertiser_id: null,
        campaign_id: null,
        name: "",
        budget: null,
        daily_budget: null,
        daily_budget_suggested: null,
        start_date: "",
        end_date: "",
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
        frequency_caps: [] as Array<FrequencyCap>
    } as any;
}

export function initHardCoreLineItem(): any {
    return {
        id: 30,
        name: "Name test 31",
        alternative_id: "43f",
        start_date: "2021-07-07 00:00:00",
        end_date: "2021-07-22 02:59:59",
        budget: 897,
        daily_budget: 897,
        fix_cpm: 8,
        cpm_bid: null,
        target_ecpc: null,
        target_ctr: null,
        target_vcr: null,
        active: false,
        external_id: 4233,
        spend: 0,
        created_by: 2,
        updated_by: 2,
        deleted_by: null,
        created_at: "2021-07-06T05:02:07.000000Z",
        updated_at: "2021-07-06T05:02:07.000000Z",
        deleted_at: null,
        account_id: 1,
        advertiser_id: 10,
        campaign_id: 28,
        line_item_type_id: 22,
        budget_type_id: 2,
        strategy_id: null,
        bid_strategy_id: 24,
        line_pacing_id: 13,
        bid_shading_id: 18,
        creative_method_id: 26,
        budget_remaining: 897,
        frequency_caps: [
            {
                id: 100,
                impressions: 20,
                duration: 201600,
                every_time: 56,
                created_by: null,
                updated_by: null,
                deleted_by: null,
                created_at: "2021-07-06T05:02:07.000000Z",
                updated_at: "2021-07-06T05:02:07.000000Z",
                deleted_at: null,
                unit_time_id: 4,
                campaign_id: null,
                line_item_id: 30,
            },
        ],
        budget_type: {
            id: 2,
            description: "Impressions",
        },
        line_item_type: {
            id: 22,
            description: "Video",
        },
        advertiser: {
            id: 10,
            name: "Advertiser para Test 4",
        },
        campaign: {
            id: 28,
            name: "Prueba Campa\u00f1a 01072021 v1",
            budget_remaining: 0,
        },
        bid_strategy: {
            id: 24,
            description: "Fix",
        },
        strategy: null,
        line_pacing: {
            id: 13,
            description: "Daily",
        },
        bid_shading: {
            id: 18,
            description: "Normal",
        },
        creative_method: {
            id: 26,
            description: "RANDOM",
        },
    };
}
