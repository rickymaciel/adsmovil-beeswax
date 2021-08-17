/**
 * Routes
 */
const LOGIN_ROUTE = '/api/auth/login'
const LOGOUT_ROUTE = '/api/auth/logout'
const PROFILE_ROUTE = '/api/auth/me'
const FORGOT_ROUTE = '/api/auth/password/forgot'
const RESET_ROUTE = '/api/auth/password/reset'
const PERMISSION_ROUTE = '/api/auth/permissions'
const INITIALIZE_ROUTE = '/api/auth/init'
const ACCOUNT_ROUTE = '/api/account'
const USER_ROUTE = '/api/users'
const EMAIL_RESEND_ROUTE = '/api/users/resend_email'
const ADVERTISER_ROUTE = '/api/advertisers'
const ADVERTISER_CATEGORIES_ROUTE = '/api/list/advertiser_categories'
const TIMEZONE_ROUTE = '/api/list/timezones'
const CURRENCY_ROUTE = '/api/list/currencies'
const CUSTOM_LIST_ROUTE = '/api/custom_lists'
const CUSTOM_LIST_EXCHANGE_ROUTE = '/api/list/custom_list_exchanges'
const CUSTOM_LIST_TYPES_ROUTE = '/api/list/custom_list_types'
const LIST_ITEM_ROUTE = '/api/custom_list_items'
const MODIFIER_TYPE_ROUTE = 'api/list/modifier_types'
const MODIFIER_MODULE_ROUTE = 'api/list/modifier_modules'
const MODIFIER_ROUTE = '/api/modifiers'
const MATCHING_ROUTE = 'api/list/matching_types'
const UNIT_TIME_ROUTE = 'api/list/unit_times'
const BUDGET_ROUTE = 'api/list/budget_types'
const CAMPAING_KPI_ROUTE = 'api/list/kpi_campaigns'
const STRATEGY_ROUTE = 'api/list/strategies'
const STRATEGY_OPTIMIZATION_ROUTE = 'api/list/optimization_strategies'
const CAMPAING_PACING_ROUTE = 'api/list/campaign_pacing'
const CAMPAING_ROUTE = 'api/campaigns'
const COUNTRY_ROUTE = 'api/list/countries'
const REGION_ROUTE = 'api/list/regions'
const CITY_ROUTE = 'api/list/cities'
const LAT_LONG_ROUTE = 'api/list/custom_lists/lat_long'
const LOCATION_TYPE_ROUTE = 'api/list/targeting_location_types'
const CREATIVE_SIZE_ROUTE = 'api/list/creative_sizes'
const DOMAIN_LIST_ROUTE = 'api/list/custom_lists/domain'
const AD_POSITION_ROUTE = 'api/list/ad_positions'
const BID_SHADING_ROUTE = 'api/list/bid_shadings'
const BID_STRATEGY_ROUTE = 'api/list/bid_strategy'
const BID_RATE_ROUTE = 'api/list/video_bid_rates'
const LINE_PACING_ROUTE = 'api/list/line_pacing'
const LINE_ITEM_TYPE_ROUTE = 'api/list/line_items_types'
const LINE_ITEMS_ROUTE = 'api/line_items'
const CREATIVE_METHOD_ROUTE = 'api/list/creatives_methods'
const CREATIVE_TYPE_ROUTE = 'api/list/creative_types'
const CREATIVE_TEMPLATE_ROUTE = 'api/list/creative_templates'
const CREATIVE_VENDOR_ROUTE = 'api/list/creative_vendors'
const CREATIVE_RULE_ROUTE = 'api/list/creative_rules'
const CREATIVE_MIME_ROUTE = 'api/list/mime_types'
const CREATIVE_EXPANDABLE_TYPE_ROUTE = 'api/list/expandable_types'
const CREATIVE_EXPANDABLE_DIRECTION_ROUTE = 'api/list/expandable_directions'
const CREATIVE_VIDEO_ROUTE = 'api/list/inbanner_videos'
const CREATIVE_APIS_ROUTE = 'api/list/video_apis'
const CREATIVE_TAG_ROUTE = 'api/creatives/check_tag'
const CREATIVE_ASSOCIATE_ROUTE = 'api/creative_line_associations'
const CREATIVE_ADDONS_ROUTE = 'api/creative_addons'
const CREATIVE_ASSETS_ROUTE = 'api/creative_assets'
const CREATIVE_ROUTE = 'api/creatives'
const APP_BUNDLE_LIST_ROUTE = 'api/list/custom_lists/app_bundle'
const APP_ID_ROUTE = 'api/list/custom_lists/app_id'
const APP_NAME_ROUTE = 'api/list/app_name'
const DEAL_ID_ROUTE = 'undefined_url'
const DEAL_ID_LIST_ROUTE = 'api/list/custom_lists/deal_id'
const DOMAIN_ROUTE = 'api/list/custom_lists/domain'
const PLACEMENT_ROUTE = 'api/list/custom_lists/placement_id'
const PUBLISER_ID_ROUTE = 'undefined_url'
const PUBLISER_ID_LIST_ROUTE = 'api/list/custom_lists/publisher_id'
const SITE_ROUTE = 'api/list/site_id'
const SITE_LIST_ROUTE = 'api/list/custom_lists/site_id'
const AUCTION_TYPE_ROUTE = 'api/list/auction_types'
const INVENTORY_SOURCE_ROUTE = 'api/list/inventory_sources'
const INTERSTITIAL_FLAGS = '/api/list/interstitial_flags'
const INTESTITIAL_TYPES = 'api/list/interstitial_types'
const INVENTORY_VIDEO_APIS = 'api/list/video_apis'
const TARGETING_ROUTE = 'api/targeting_expressions'
const TARGETING_PREDICATE_ROUTE = 'api/list/targeting_predicates'
const TARGETING_KEY_ROUTE = 'api/targeting_keys'
const TARGETING_LOCATION_TYPE_ROUTE = 'api/list/targeting_location_types'
const TARGETING_MODULE_ROUTE = 'api/list/targeting_modules'
const ENVIROMENT_TYPE_ROUTE = 'api/list/environment_types'
const ENVIROMENT_TPFRAME_ROUTE = 'api/list/topframes'
const ENVIROMENT_VIDEO_ROUTE = 'api/list/video_apis'
const PLATFORM_BANDWITDH = 'api/list/bandwidths'
const PLATFORM_BROWSER_ROUTE = 'api/list/browsers'
const PLATFORM_BROWSER_VERSION_ROUTE = 'api/list/browser_versions'
const PLATFORM_CARRIER_ROUTE = 'api/list/carriers'
const PLATFORM_DEVICE_TYPE_ROUTE = 'api/list/devices'
const PLATFORM_DEVICE_MAKE_ROUTE = 'api/list/device_makes'
const PLATFORM_DEVICE_MODEL_ROUTE = 'api/list/device_models'
const PLATFORM_DEVICE_SCREEN_SIZE_ROUTE = 'api/list/device_screen_sizes'
const PLATFORM_OPERATING_SYSTEM_ROUTE = 'api/list/operating_systems'
const PLATFORM_OPERATING_SYSTEM_VERSION_ROUTE = 'api/list/operating_system_versions'
const CONTENT_CATEGORY_ROUTE = 'api/list/content_categories'
const CONTENT_LENGUAGE_ROUTE = 'api/list/languages'
const CONTENT_RATINGS_ROUTE = 'api/list/content_ratings'
const NATIVE_NATIVE_LAYOUT_ROUTE = 'api/list/native_layouts'
const VIDEO_COMPANION_REQUIRED = 'api/list/companion_support'
const VIDEO_PLAYBACK_METHOD = 'api/list/video_playback_methods'
const VIDEO_START_DELAY = 'api/list/video_start_delays'
const VIDEO_PLAYER_SIZE = 'api/list/video_player_sizes'
const VIDEO_PLACEMENT_TYPE = 'api/list/video_placement_types'
const SEGMENTS_ROUTE = '/api/segments'
const SEGMENTS_CATEGORY_ROUTE = 'api/segment_categories'

module.exports = {
    ADVERTISER: {
        ADVERTISER_ROUTE,
        ADVERTISER_CATEGORIES_ROUTE
    },
    AD_SIZE: {
        CREATIVE_SIZE_ROUTE
    },
    APP_SITE: {
        APP_BUNDLE_LIST_ROUTE,
        APP_ID_ROUTE,
        APP_NAME_ROUTE,
        DEAL_ID_ROUTE,
        DEAL_ID_LIST_ROUTE,
        DOMAIN_ROUTE,
        PLACEMENT_ROUTE,
        PUBLISER_ID_ROUTE,
        PUBLISER_ID_LIST_ROUTE,
        SITE_ROUTE,
        SITE_LIST_ROUTE
    },
    AUTH: {
        LOGIN_ROUTE,
        LOGOUT_ROUTE,
        PROFILE_ROUTE,
        FORGOT_ROUTE,
        RESET_ROUTE,
        PERMISSION_ROUTE,
        INITIALIZE_ROUTE,
        ACCOUNT_ROUTE
    },
    BID: {
        BID_SHADING_ROUTE,
        BID_STRATEGY_ROUTE,
        BID_RATE_ROUTE
    },
    BUDGET: {
        BUDGET_ROUTE
    },
    CAMPAING: {
        CAMPAING_ROUTE
    },
    CONTENT: {
        CONTENT_CATEGORY_ROUTE,
        CONTENT_LENGUAGE_ROUTE,
        CONTENT_RATINGS_ROUTE
    },
    CREATIVES: { 
        CREATIVE_ROUTE,
        CREATIVE_METHOD_ROUTE,
        CREATIVE_TYPE_ROUTE,
        CREATIVE_TEMPLATE_ROUTE,
        CREATIVE_VENDOR_ROUTE,
        CREATIVE_RULE_ROUTE,
        CREATIVE_TAG_ROUTE,
        CREATIVE_MIME_ROUTE,
        CREATIVE_EXPANDABLE_TYPE_ROUTE,
        CREATIVE_EXPANDABLE_DIRECTION_ROUTE,
        CREATIVE_VIDEO_ROUTE,
        CREATIVE_APIS_ROUTE,
        CREATIVE_ASSOCIATE_ROUTE,
        CREATIVE_ADDONS_ROUTE,
        CREATIVE_ASSETS_ROUTE
    },
    CURRENCY: {
        CURRENCY_ROUTE
    },
    CUSTOM_LIST: {
        CUSTOM_LIST_ROUTE,
        CUSTOM_LIST_EXCHANGE_ROUTE,
        CUSTOM_LIST_TYPES_ROUTE,
        LIST_ITEM_ROUTE
    },
    DOMAIN: {
        DOMAIN_LIST_ROUTE
    },
    ENVIROMENT: {
        ENVIROMENT_TYPE_ROUTE,
        ENVIROMENT_TPFRAME_ROUTE,
        ENVIROMENT_VIDEO_ROUTE
    },
    EXCHANGE: {
        AUCTION_TYPE_ROUTE,
        INVENTORY_SOURCE_ROUTE
    },
    GEO: {
        COUNTRY_ROUTE,
        REGION_ROUTE,
        CITY_ROUTE,
        LAT_LONG_ROUTE,
        LOCATION_TYPE_ROUTE
    },
    INVENTORY: {
        AD_POSITION_ROUTE,
        AUCTION_TYPE_ROUTE,
        ENVIROMENT_TYPE_ROUTE,
        INVENTORY_SOURCE_ROUTE,
        INTERSTITIAL_FLAGS,
        INTESTITIAL_TYPES,
        INVENTORY_VIDEO_APIS,
        DEAL_ID_LIST_ROUTE,
        PLACEMENT_ROUTE,
        PUBLISER_ID_LIST_ROUTE,
        SITE_LIST_ROUTE
    },
    KPI: {
        CAMPAING_KPI_ROUTE
    },
    LINE_ITEMS: {
        LINE_ITEM_TYPE_ROUTE,
        LINE_ITEMS_ROUTE
    },
    MATCHING: {
        MATCHING_ROUTE
    },
    MODIFIERS: {
        MODIFIER_TYPE_ROUTE,
        MODIFIER_MODULE_ROUTE,
        MODIFIER_ROUTE
    },
    PACING: {
        CAMPAING_PACING_ROUTE,
        LINE_PACING_ROUTE
    },
    PLATFORM: {
        PLATFORM_BROWSER_ROUTE,
        PLATFORM_BROWSER_VERSION_ROUTE,
        PLATFORM_CARRIER_ROUTE,
        PLATFORM_DEVICE_TYPE_ROUTE,
        PLATFORM_DEVICE_MAKE_ROUTE,
        PLATFORM_DEVICE_MODEL_ROUTE,
        PLATFORM_DEVICE_SCREEN_SIZE_ROUTE,
        PLATFORM_OPERATING_SYSTEM_ROUTE,
        PLATFORM_OPERATING_SYSTEM_VERSION_ROUTE,
        PLATFORM_BANDWITDH
    },
    STRATEGIES: {
        STRATEGY_ROUTE,
        STRATEGY_OPTIMIZATION_ROUTE
    },
    TARGETING: {
        TARGETING_ROUTE,
        TARGETING_PREDICATE_ROUTE,
        TARGETING_KEY_ROUTE,
        TARGETING_LOCATION_TYPE_ROUTE,
        TARGETING_MODULE_ROUTE
    },
    TIMEZONE: {
        TIMEZONE_ROUTE
    },
    UNIT_TIME: {
        UNIT_TIME_ROUTE
    },
    USER: {
        USER_ROUTE,
        EMAIL_RESEND_ROUTE
    },
    MOBILE_APP: {
        APP_BUNDLE_LIST_ROUTE,
        APP_ID_ROUTE
    },
    NATIVE: {
        NATIVE_NATIVE_LAYOUT_ROUTE
    },
    VIDEO: {
        VIDEO_COMPANION_REQUIRED,
        VIDEO_PLAYBACK_METHOD,
        VIDEO_START_DELAY,
        VIDEO_PLAYER_SIZE,
        VIDEO_PLACEMENT_TYPE
    },
    SEGMENTS: {
        SEGMENTS_ROUTE,
        SEGMENTS_CATEGORY_ROUTE
    }
}
