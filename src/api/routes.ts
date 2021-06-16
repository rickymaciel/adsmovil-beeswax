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
const CITY_ROUTE = 'api/list/city'
const LAT_LONG_ROUTE = 'api/list/custom_lists/lat_long'
const CREATIVE_SIZE_ROUTE = 'api/list/creative_sizes'
const DOMAIN_LIST_ROUTE = 'api/list/custom_lists/domain'
const AD_POSITION_ROUTE = 'api/list/ad_positions'
const BID_SHADING_ROUTE = 'api/list/bid_shadings'
const BID_STRATEGY_ROUTE = 'api/list/bid_strategy'
const LINE_PACING_ROUTE = 'api/list/line_pacing'
const LINE_ITEM_TYPE_ROUTE = 'api/list/line_items_types'
const CREATIVE_METHOD_ROUTE = 'api/list/creatives_methods'
const LINE_ITEMS_ROUTE = 'api/line_items'

module.exports = {
  ADVERTISER: {
    ADVERTISER_ROUTE,
    ADVERTISER_CATEGORIES_ROUTE
  },
  AD_SIZE: {
    CREATIVE_SIZE_ROUTE
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
    BID_STRATEGY_ROUTE
  },
  BUDGET: {
    BUDGET_ROUTE
  },
  CAMPAING: {
    CAMPAING_ROUTE
  },
  CREATIVES: {
    CREATIVE_METHOD_ROUTE
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
  GEO: {
    COUNTRY_ROUTE,
    REGION_ROUTE,
    CITY_ROUTE,
    LAT_LONG_ROUTE
  },
  INVENTORY: {
    AD_POSITION_ROUTE
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
  STRATEGIES: {
    STRATEGY_ROUTE,
    STRATEGY_OPTIMIZATION_ROUTE
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
  }
}
