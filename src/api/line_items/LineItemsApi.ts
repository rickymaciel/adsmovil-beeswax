import { forEach, isEmpty, isUndefined } from 'lodash'
import { success, error } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { AxiosGet, AxiosPost, AxiosPut, AxiosPatch } from '@/api/AxiosService'
import { FrecuencyCaps } from '@/interfaces/frecuency_caps'
import {
  LineItem,
  LineItemDataCreate, LineItemDataUpdate,
  LineItemFilters, LineItemList,
  LineItemOptions,
  LineItemPaginated
} from '@/interfaces/line_item'

const ROUTES = require('../routes').LINE_ITEMS

export async function create (lineItem: LineItemDataCreate, token: string) {
  try {
    const response = await AxiosPost(ROUTES.LINE_ITEMS_ROUTE, lineItem, token)

    if (response.success) {
      let data = response.content
      let frequency_caps = [] as any

      forEach(data.frequency_caps, function (value, key) {
        const fc = {
          id: value.id,
          impressions: value.impressions,
          duration: value.duration,
          every_time: value.every_time,
          created_by: value.created_by,
          updated_by: value.updated_by,
          deleted_by: value.deleted_by,
          created_at: value.created_at,
          updated_at: value.updated_at,
          deleted_at: value.deleted_at,
          unit_time_id: value.unit_time_id,
          campaign_id: value.campaign_id,
          line_item_id: value.line_item_id
        } as FrecuencyCaps

        frequency_caps.push(fc)
      })

      let line = {
        id: data.id,
        name: data.name,
        alternative_id: data.alternative_id,
        start_date: data.start_date,
        end_date: data.end_date,
        budget: data.budget,
        daily_budget: data.daily_budget,
        fix_cpm: data.fix_cpm,
        cpm_bid: data.cpm_bid,
        target_ecpc: data.target_ecpc,
        target_ctr: data.target_ctr,
        target_vcr: data.target_vcr,
        active: data.active,
        external_id: data.external_id,
        spend: data.spend,
        created_by: data.created_by,
        updated_by: data.updated_by,
        deleted_by: data.deleted_by,
        created_at: data.created_at,
        updated_at: data.updated_at,
        deleted_at: data.deleted_at,
        account_id: data.account_id,
        advertiser_id: data.advertiser_id,
        campaign_id: data.campaign_id,
        line_item_type_id: data.line_item_type_id,
        budget_type_id: data.budget_type_id,
        strategy_id: data.strategy_id,
        bid_strategy_id: data.bid_strategy_id,
        line_pacing_id: data.line_pacing_id,
        bid_shading_id: data.bid_shading_id,
        creative_method_id: data.creative_method_id,
        budget_remaining: data.budget_remaining,
        frequency_caps: frequency_caps
      } as LineItem

      return success('', line)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function update (lineItem: LineItemDataUpdate, token: string) {
  try {
    const response = await AxiosPatch(ROUTES.LINE_ITEMS_ROUTE + '/' + lineItem.id, lineItem, token)

    if (response.success) {
      let data = response.content
      let frequency_caps = [] as any

      forEach(data.frequency_caps, function (value, key) {
        const fc = {
          id: value.id,
          impressions: value.impressions,
          duration: value.duration,
          every_time: value.every_time,
          created_by: value.created_by,
          updated_by: value.updated_by,
          deleted_by: value.deleted_by,
          created_at: value.created_at,
          updated_at: value.updated_at,
          deleted_at: value.deleted_at,
          unit_time_id: value.unit_time_id,
          campaign_id: value.campaign_id,
          line_item_id: value.line_item_id
        } as FrecuencyCaps

        frequency_caps.push(fc)
      })

      let line = {
        id: data.id,
        name: data.name,
        alternative_id: data.alternative_id,
        start_date: data.start_date,
        end_date: data.end_date,
        budget: data.budget,
        daily_budget: data.daily_budget,
        fix_cpm: data.fix_cpm,
        cpm_bid: data.cpm_bid,
        target_ecpc: data.target_ecpc,
        target_ctr: data.target_ctr,
        target_vcr: data.target_vcr,
        active: data.active,
        external_id: data.external_id,
        spend: data.spend,
        created_by: data.created_by,
        updated_by: data.updated_by,
        deleted_by: data.deleted_by,
        created_at: data.created_at,
        updated_at: data.updated_at,
        deleted_at: data.deleted_at,
        account_id: data.account_id,
        advertiser_id: data.advertiser_id,
        campaign_id: data.campaign_id,
        line_item_type_id: data.line_item_type_id,
        budget_type_id: data.budget_type_id,
        strategy_id: data.strategy_id,
        bid_strategy_id: data.bid_strategy_id,
        line_pacing_id: data.line_pacing_id,
        bid_shading_id: data.bid_shading_id,
        creative_method_id: data.creative_method_id,
        budget_remaining: data.budget_remaining,
        frequency_caps: frequency_caps
      } as LineItem

      return success('', line)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function changeStatus (id: number, status: boolean, token: string) {
  try {
    const active = status ? 1 : 0
    const response = await AxiosPut(ROUTES.LINE_ITEMS_ROUTE + '/' + id + '/set/' + active, {}, token)

    if (response.success) {
      return true
    }

    console.log('ERROR: ', response)

    return false
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return false
  }
}

export async function show (id: number, token: string) {
  try {
    const response = await AxiosGet(ROUTES.LINE_ITEMS_ROUTE + '/' + id, token)

    if (response.success) {
      let data = response.content

      let frequency_caps = [] as any

      forEach(data.frequency_caps, function (value, key) {
        const fc = {
          id: value.id,
          impressions: value.impressions,
          duration: value.duration,
          every_time: value.every_time,
          created_by: value.created_by,
          updated_by: value.updated_by,
          deleted_by: value.deleted_by,
          created_at: value.created_at,
          updated_at: value.updated_at,
          deleted_at: value.deleted_at,
          unit_time_id: value.unit_time_id,
          campaign_id: value.campaign_id,
          line_item_id: value.line_item_id
        } as FrecuencyCaps

        frequency_caps.push(fc)
      })

      let line = {
        id: data.id,
        name: data.name,
        alternative_id: data.alternative_id,
        start_date: data.start_date,
        end_date: data.end_date,
        budget: data.budget,
        daily_budget: data.daily_budget,
        fix_cpm: data.fix_cpm,
        cpm_bid: data.cpm_bid,
        target_ecpc: data.target_ecpc,
        target_ctr: data.target_ctr,
        target_vcr: data.target_vcr,
        active: data.active,
        external_id: data.external_id,
        spend: data.spend,
        created_by: data.created_by,
        updated_by: data.updated_by,
        deleted_by: data.deleted_by,
        created_at: data.created_at,
        updated_at: data.updated_at,
        deleted_at: data.deleted_at,
        account_id: data.account_id,
        advertiser_id: data.advertiser_id,
        campaign_id: data.campaign_id,
        line_item_type_id: data.line_item_type_id,
        budget_type_id: data.budget_type_id,
        strategy_id: data.strategy_id,
        bid_strategy_id: data.bid_strategy_id,
        line_pacing_id: data.line_pacing_id,
        bid_shading_id: data.bid_shading_id,
        creative_method_id: data.creative_method_id,
        budget_remaining: data.budget_remaining,
        frequency_caps: frequency_caps
      } as LineItem

      return success('', line)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function all (token: string, filters?: LineItemFilters, options?: LineItemOptions) {
  try {
    let filter = ''
    let option = ''

    if (!isUndefined(filters)) {
      filter = getFilters(filters)
    }

    if (!isUndefined(options)) {
      option += getOptions(options, 'all')
    }

    const url = getURL(filter, option)
    const response = await AxiosGet(ROUTES.LINE_ITEMS_ROUTE + url, token)

    const lineItems = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        let line = {
          id: value.id,
          name: value.name,
          alternative_id: value.alternative_id,
          start_date: value.start_date,
          end_date: value.end_date,
          budget: value.budget,
          daily_budget: value.daily_budget,
          fix_cpm: value.fix_cpm,
          cpm_bid: value.cpm_bid,
          target_ecpc: value.target_ecpc,
          target_ctr: value.target_ctr,
          target_vcr: value.target_vcr,
          active: value.active,
          external_id: value.external_id,
          spend: value.spend,
          created_by: value.created_by,
          updated_by: value.updated_by,
          deleted_by: value.deleted_by,
          created_at: value.created_at,
          updated_at: value.updated_at,
          deleted_at: value.deleted_at,
          account_id: value.account_id,
          advertiser_id: value.advertiser_id,
          campaign_id: value.campaign_id,
          line_item_type_id: value.line_item_type_id,
          budget_type_id: value.budget_type_id,
          strategy_id: value.strategy_id,
          bid_strategy_id: value.bid_strategy_id,
          line_pacing_id: value.line_pacing_id,
          bid_shading_id: value.bid_shading_id,
          creative_method_id: value.creative_method_id,
          budget_remaining: value.budget_remaining,
          advertiser_name: value.advertiser_name,
          budget_type: value.budget_type,
          campaign_name: value.campaign_name,
          line_item_type_name: value.line_item_type_name,
          strategy_name: value.strategy_name,
          line_pacing_name: value.line_pacing_name,
          bid_strategy_name: value.bid_strategy_name,
          bid_shading_name: value.bid_shading_name,
          creative_method_name: value.creative_method_name,
          clicks: value.clicks,
          conversion_orders: value.conversion_orders,
          conversion_value: value.conversion_value,
          conversions: value.conversions,
          cost_per_acquisition: value.cost_per_acquisition,
          cost_per_acquisition_usd: value.cost_per_acquisition_usd,
          cpm: value.cpm,
          ctr: value.ctr,
          gross_margin: value.gross_margin,
          impressions: value.impressions,
          net_margin: value.net_margin,
          update_date: value.update_date,
          vcpm: value.vcpm,
          video_complete_percent: value.video_complete_percent,
          video_completes: value.video_completes,
          video_plays: value.video_plays,
          viewable_impressions: value.viewable_impressions,
          viewable_percent: value.viewable_percent,
          clicks_lifetime: value.clicks_lifetime,
          conversion_orders_lifetime: value.conversion_orders_lifetime,
          conversion_value_lifetime: value.conversion_value_lifetime,
          conversions_lifetime: value.conversions_lifetime,
          cost_per_acquisition_lifetime: value.cost_per_acquisition_lifetime,
          cost_per_acquisition_lifetime_usd: value.cost_per_acquisition_lifetime_usd,
          cpm_lifetime: value.cpm_lifetime,
          ctr_lifetime: value.ctr_lifetime,
          gross_margin_lifetime: value.gross_margin_lifetime,
          impressions_lifetime: value.impressions_lifetime,
          net_margin_lifetime: value.net_margin_lifetime,
          spend_lifetime: value.spend_lifetime,
          vcpm_lifetime: value.vcpm_lifetime,
          video_complete_percent_lifetime: value.video_complete_percent_lifetime,
          video_completes_lifetime: value.video_completes_lifetime,
          video_plays_lifetime: value.video_plays_lifetime,
          viewable_impressions_lifetime: value.viewable_impressions_lifetime,
          viewable_percent_lifetime: value.viewable_percent_lifetime
        } as LineItem

        lineItems.push(line)
      })

      return success('', lineItems)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function paginated (token: string, paginated: LineItemPaginated, filters?: LineItemFilters, options?: LineItemOptions) {
  try {
    let filter = ''
    let option = ''

    if (!isUndefined(filters)) {
      filter = getFilters(filters)
    }

    if (!isUndefined(options)) {
      option += getOptions(options, 'paginated', paginated)
    }

    const url = getURL(filter, option)
    const response = await AxiosGet(ROUTES.LINE_ITEMS_ROUTE + url, token)

    const lineItems = [] as any

    if (response.success) {
      let data = response.content.data

      forEach(data, function (value, key) {
        let line = {
          id: value.id,
          name: value.name,
          alternative_id: value.alternative_id,
          start_date: value.start_date,
          end_date: value.end_date,
          budget: value.budget,
          daily_budget: value.daily_budget,
          fix_cpm: value.fix_cpm,
          cpm_bid: value.cpm_bid,
          target_ecpc: value.target_ecpc,
          target_ctr: value.target_ctr,
          target_vcr: value.target_vcr,
          active: value.active,
          external_id: value.external_id,
          spend: value.spend,
          created_by: value.created_by,
          updated_by: value.updated_by,
          deleted_by: value.deleted_by,
          created_at: value.created_at,
          updated_at: value.updated_at,
          deleted_at: value.deleted_at,
          account_id: value.account_id,
          advertiser_id: value.advertiser_id,
          campaign_id: value.campaign_id,
          line_item_type_id: value.line_item_type_id,
          budget_type_id: value.budget_type_id,
          strategy_id: value.strategy_id,
          bid_strategy_id: value.bid_strategy_id,
          line_pacing_id: value.line_pacing_id,
          bid_shading_id: value.bid_shading_id,
          creative_method_id: value.creative_method_id,
          budget_remaining: value.budget_remaining,
          advertiser_name: value.advertiser_name,
          budget_type: value.budget_type,
          campaign_name: value.campaign_name,
          line_item_type_name: value.line_item_type_name,
          strategy_name: value.strategy_name,
          line_pacing_name: value.line_pacing_name,
          bid_strategy_name: value.bid_strategy_name,
          bid_shading_name: value.bid_shading_name,
          creative_method_name: value.creative_method_name,
          clicks: value.clicks,
          conversion_orders: value.conversion_orders,
          conversion_value: value.conversion_value,
          conversions: value.conversions,
          cost_per_acquisition: value.cost_per_acquisition,
          cost_per_acquisition_usd: value.cost_per_acquisition_usd,
          cpm: value.cpm,
          ctr: value.ctr,
          gross_margin: value.gross_margin,
          impressions: value.impressions,
          net_margin: value.net_margin,
          update_date: value.update_date,
          vcpm: value.vcpm,
          video_complete_percent: value.video_complete_percent,
          video_completes: value.video_completes,
          video_plays: value.video_plays,
          viewable_impressions: value.viewable_impressions,
          viewable_percent: value.viewable_percent,
          clicks_lifetime: value.clicks_lifetime,
          conversion_orders_lifetime: value.conversion_orders_lifetime,
          conversion_value_lifetime: value.conversion_value_lifetime,
          conversions_lifetime: value.conversions_lifetime,
          cost_per_acquisition_lifetime: value.cost_per_acquisition_lifetime,
          cost_per_acquisition_lifetime_usd: value.cost_per_acquisition_lifetime_usd,
          cpm_lifetime: value.cpm_lifetime,
          ctr_lifetime: value.ctr_lifetime,
          gross_margin_lifetime: value.gross_margin_lifetime,
          impressions_lifetime: value.impressions_lifetime,
          net_margin_lifetime: value.net_margin_lifetime,
          spend_lifetime: value.spend_lifetime,
          vcpm_lifetime: value.vcpm_lifetime,
          video_complete_percent_lifetime: value.video_complete_percent_lifetime,
          video_completes_lifetime: value.video_completes_lifetime,
          video_plays_lifetime: value.video_plays_lifetime,
          viewable_impressions_lifetime: value.viewable_impressions_lifetime,
          viewable_percent_lifetime: value.viewable_percent_lifetime
        } as LineItem

        lineItems.push(line)
      })

      return success('', {
        page: paginated.page,
        lineItems
      })
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function list (token: string, filters?: LineItemFilters, options?: LineItemOptions) {
  try {
    let filter = ''
    let option = ''

    if (!isUndefined(filters)) {
      filter = getFilters(filters)
    }

    if (!isUndefined(options)) {
      option += getOptions(options, 'list')
    }

    const url = getURL(filter, option)
    const response = await AxiosGet(ROUTES.LINE_ITEMS_ROUTE + url, token)

    const list = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const item = {
          id: parseInt(key),
          value: value
        } as LineItemList

        list.push(item)
      })

      return success('', list)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

function getFilters (filters: LineItemFilters): string {
  let filter = ''

  const name = (isUndefined(filters.name)) ? '' : filters.name
  const active = (isUndefined(filters.active)) ? '' : filters.active
  const budget = (isUndefined(filters.budget)) ? '' : filters.budget
  const daily_budget = (isUndefined(filters.daily_budget)) ? '' : filters.daily_budget
  const start_date = (isUndefined(filters.start_date) || isUndefined(filters.start_date)) ? '' : filters.start_date
  const end_date = (isUndefined(filters.end_date) || isUndefined(filters.end_date)) ? '' : filters.end_date
  const spend = (isUndefined(filters.spend) || isUndefined(filters.spend)) ? '' : filters.spend
  const alternative_id = (isUndefined(filters.alternative_id)) ? '' : filters.alternative_id
  const advertiser_name = (isUndefined(filters.advertiser) || isUndefined(filters.advertiser.name)) ? '' : filters.advertiser.name
  const campaign_name = (isUndefined(filters.campaign) || isUndefined(filters.campaign.name)) ? '' : filters.campaign.name
  const budget_type = (isUndefined(filters.budget_type) || isUndefined(filters.budget_type.description)) ? '' : filters.budget_type.description
  const bid_strategy = (isUndefined(filters.bid_strategy) || isUndefined(filters.bid_strategy.description)) ? '' : filters.bid_strategy.description
  const strategy = (isUndefined(filters.strategy) || isUndefined(filters.strategy.description)) ? '' : filters.strategy.description
  const line_pacing = (isUndefined(filters.line_pacing) || isUndefined(filters.line_pacing.description)) ? '' : filters.line_pacing.description
  const line_item_type = (isUndefined(filters.line_item_type) || isUndefined(filters.line_item_type.description)) ? '' : filters.line_item_type.description
  const bid_shading = (isUndefined(filters.bid_shading) || isUndefined(filters.bid_shading.description)) ? '' : filters.bid_shading.description
  const creative_method = (isUndefined(filters.creative_method) || isUndefined(filters.creative_method.description)) ? '' : filters.creative_method.description

  filter += 'filters[name]=' + name + '&filters[active]=' + active + '&filters[budget]=' + budget + '&filters[daily_budget]=' + daily_budget + '&filters[start_date]=' + start_date + '&filters[end_date]=' + end_date + '&filters[spend]=' + spend + '&filters[alternative_id]=' + alternative_id + '&filters[advertiser.name]=' + advertiser_name + '&filters[campaign.name]=' + campaign_name + '&filters[budget_type.description]=' + budget_type + '&filters[bid_strategy.description]=' + bid_strategy + '&filters[strategy.description]=' + strategy + '&filters[line_pacing.description]=' + line_pacing + '&filters[line_item_type.description]=' + line_item_type + '&filters[bid_shading.description]=' + bid_shading + '&filters[creative_method.description]=' + creative_method

  return filter
}

function getOptions (options: LineItemOptions, mode: string, paginated?: LineItemPaginated): string {
  let option = ''

  const sort = (isUndefined(options.sort)) ? '' : options.sort
  const order = (isUndefined(options.order)) ? '' : options.order

  option += 'sort=' + sort + '&order=' + order + '&mode=' + mode

  if (mode == 'paginated') {
    option += '&page=' + paginated?.page + '&limit=' + paginated?.limit
  }

  return option
}

function getURL (filters: string, options: string): string {
  let url = ''

  if (!isEmpty(filters) && !isEmpty(options)) {
    url = '?' + filters + '&' + options
  } else if (!isEmpty(filters)) {
    url = '?' + filters
  } else if (!isEmpty(options)) {
    url = '?' + options
  }

  return url
}
