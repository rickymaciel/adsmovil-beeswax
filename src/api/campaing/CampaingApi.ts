import { forEach, isEmpty, isUndefined } from 'lodash'
import { AxiosPost, AxiosPatch, AxiosGet, AxiosPut } from '@/api/AxiosService'
import { error, success } from '@/api/handlers/HandlerResponse'
import { GetMessage, GetErrors } from '@/api/handlers/HandlerError'
import { FrecuencyCaps } from '@/interfaces/frecuency_caps'
import {
  Campaing,
  CampaingDataCreate,
  CampaingDataUpdate,
  CampaingFilters,
  CampaingList,
  CampaingOptions,
  CampaingPaginated
} from '@/interfaces/campaing'

const ROUTES = require('../routes').CAMPAING

export async function create (campaing: CampaingDataCreate, token: string) {
  try {
    const response = await AxiosPost(ROUTES.CAMPAING_ROUTE, campaing, token)

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

      let campaing = {
        id: data.id,
        name: data.name,
        budget: data.budget,
        daily_budget: data.daily_budget,
        start_date: data.start_date,
        end_date: data.end_date,
        active: data.active,
        alternative_id: data.alternative_id,
        external_id: data.external_id,
        spend: data.spend,
        automatic_allocation: data.automatic_allocation,
        kpi_objective: data.kpi_objective,
        cpm_bid: data.cpm_bid,
        target_ecpc: data.target_ecpc,
        target_ctr: data.target_ctr,
        target_vcr: data.target_vcr,
        created_by: data.created_by,
        updated_by: data.updated_by,
        deleted_by: data.deleted_by,
        created_at: data.created_at,
        updated_at: data.updated_at,
        deleted_at: data.deleted_at,
        account_id: data.account_id,
        advertiser_id: data.advertiser_id,
        budget_type_id: data.budget_type_id,
        currency_id: data.currency_id,
        timezone_id: data.timezone_id,
        optimization_strategy_id: data.optimization_strategy_id,
        strategy_id: data.strategy_id,
        campaign_pacing_id: data.campaign_pacing_id,
        kpi_campaign_id: data.kpi_campaign_id,
        trafficker_id: data.trafficker_id,
        frequency_caps: frequency_caps
      } as Campaing

      return success('', campaing)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function update (campaing: CampaingDataUpdate, token: string) {
  try {
    const response = await AxiosPatch(ROUTES.CAMPAING_ROUTE + '/' + campaing.id, campaing, token)

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

      let campaing = {
        id: data.id,
        name: data.name,
        budget: data.budget,
        daily_budget: data.daily_budget,
        start_date: data.start_date,
        end_date: data.end_date,
        active: data.active,
        alternative_id: data.alternative_id,
        external_id: data.external_id,
        spend: data.spend,
        automatic_allocation: data.automatic_allocation,
        kpi_objective: data.kpi_objective,
        cpm_bid: data.cpm_bid,
        target_ecpc: data.target_ecpc,
        target_ctr: data.target_ctr,
        target_vcr: data.target_vcr,
        created_by: data.created_by,
        updated_by: data.updated_by,
        deleted_by: data.deleted_by,
        created_at: data.created_at,
        updated_at: data.updated_at,
        deleted_at: data.deleted_at,
        account_id: data.account_id,
        advertiser_id: data.advertiser_id,
        budget_type_id: data.budget_type_id,
        currency_id: data.currency_id,
        timezone_id: data.timezone_id,
        optimization_strategy_id: data.optimization_strategy_id,
        strategy_id: data.strategy_id,
        campaign_pacing_id: data.campaign_pacing_id,
        kpi_campaign_id: data.kpi_campaign_id,
        trafficker_id: data.trafficker_id,
        frequency_caps: frequency_caps
      } as Campaing

      return success('', campaing)
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
    const response = await AxiosPut(ROUTES.CAMPAING_ROUTE + '/' + id + '/set/' + active, {}, token)

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
    const response = await AxiosGet(ROUTES.CAMPAING_ROUTE + '/' + id, token)

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

      let campaing = {
        id: data.id,
        name: data.name,
        budget: data.budget,
        daily_budget: data.daily_budget,
        start_date: data.start_date,
        end_date: data.end_date,
        active: data.active,
        alternative_id: data.alternative_id,
        external_id: data.external_id,
        spend: data.spend,
        automatic_allocation: data.automatic_allocation,
        kpi_objective: data.kpi_objective,
        cpm_bid: data.cpm_bid,
        target_ecpc: data.target_ecpc,
        target_ctr: data.target_ctr,
        target_vcr: data.target_vcr,
        created_by: data.created_by,
        updated_by: data.updated_by,
        deleted_by: data.deleted_by,
        created_at: data.created_at,
        updated_at: data.updated_at,
        deleted_at: data.deleted_at,
        account_id: data.account_id,
        advertiser_id: data.advertiser_id,
        budget_type_id: data.budget_type_id,
        currency_id: data.currency_id,
        timezone_id: data.timezone_id,
        optimization_strategy_id: data.optimization_strategy_id,
        strategy_id: data.strategy_id,
        campaign_pacing_id: data.campaign_pacing_id,
        kpi_campaign_id: data.kpi_campaign_id,
        trafficker_id: data.trafficker_id,
        frequency_caps: frequency_caps,
        budget_type: {
          id: data.budget_type.id,
          description: data.budget_type.description
        },
        currency: {
          id: data.currency.id,
          name: data.currency.name
        },
        advertiser: {
          id: data.advertiser.id,
          name: data.advertiser.name
        },
        timezone: {
          id: data.timezone.id,
          name: data.timezone.name
        },
        optimization_strategy: {
          id: data.optimization_strategy.id,
          description: data.optimization_strategy.description
        },
        strategy: {
          id: data.strategy.id,
          description: data.strategy.description
        },
        campaign_pacing: {
          id: data.campaign_pacing.id,
          description: data.campaign_pacing.description
        },
        kpi_campaign: {
          id: data.kpi_campaign.id,
          description: data.kpi_campaign.description
        },
        trafficker: {
          id: data.trafficker.id,
          name: data.trafficker.name,
          last_name: data.trafficker.last_name
        }
      } as Campaing

      return success('', campaing)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function all (token: string, filters?: CampaingFilters, options?: CampaingOptions) {
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
    const response = await AxiosGet(ROUTES.CAMPAING_ROUTE + url, token)

    const campaings = [] as any

    if (response.success) {
      forEach(response, function (value, key) {
        const campaing = {
          id: value.id,
          name: value.name,
          budget: value.budget,
          daily_budget: value.daily_budget,
          start_date: value.start_date,
          end_date: value.end_date,
          active: value.active,
          alternative_id: value.alternative_id,
          external_id: value.external_id,
          spend: value.spend,
          automatic_allocation: value.automatic_allocation,
          kpi_objective: value.kpi_objective,
          cpm_bid: value.cpm_bid,
          target_ecpc: value.target_ecpc,
          target_ctr: value.target_ctr,
          target_vcr: value.target_vcr,
          created_by: value.created_by,
          updated_by: value.updated_by,
          deleted_by: value.deleted_by,
          created_at: value.created_at,
          updated_at: value.updated_at,
          deleted_at: value.deleted_at,
          account_id: value.account_id,
          advertiser_id: value.advertiser_id,
          budget_type_id: value.budget_type_id,
          currency_id: value.currency_id,
          timezone_id: value.timezone_id,
          optimization_strategy_id: value.optimization_strategy_id,
          strategy_id: value.strategy_id,
          campaign_pacing_id: value.campaign_pacing_id,
          kpi_campaign_id: value.kpi_campaign_id,
          trafficker_id: value.trafficker_id
        } as Campaing

        campaings.push(campaing)
      })

      return success('', campaings)
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function paginated (token: string, paginated: CampaingPaginated, filters?: CampaingFilters, options?: CampaingOptions) {
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
    const response = await AxiosGet(ROUTES.CAMPAING_ROUTE + url, token)

    const campaings = [] as any

    if (response.success) {
      let data = response.content.data

      forEach(data, function (value, key) {
        const campaing = {
          id: value.id,
          name: value.name,
          budget: value.budget,
          daily_budget: value.daily_budget,
          start_date: value.start_date,
          end_date: value.end_date,
          active: value.active,
          alternative_id: value.alternative_id,
          external_id: value.external_id,
          spend: value.spend,
          automatic_allocation: value.automatic_allocation,
          kpi_objective: value.kpi_objective,
          cpm_bid: value.cpm_bid,
          target_ecpc: value.target_ecpc,
          target_ctr: value.target_ctr,
          target_vcr: value.target_vcr,
          created_by: value.created_by,
          updated_by: value.updated_by,
          deleted_by: value.deleted_by,
          created_at: value.created_at,
          updated_at: value.updated_at,
          deleted_at: value.deleted_at,
          account_id: value.account_id,
          advertiser_id: value.advertiser_id,
          budget_type_id: value.budget_type_id,
          currency_id: value.currency_id,
          timezone_id: value.timezone_id,
          optimization_strategy_id: value.optimization_strategy_id,
          strategy_id: value.strategy_id,
          campaign_pacing_id: value.campaign_pacing_id,
          kpi_campaign_id: value.kpi_campaign_id,
          trafficker_id: value.trafficker_id
        } as Campaing

        campaings.push(campaing)
      })

      return success('', {
        page: paginated.page,
        campaings
      })
    }

    console.log('ERROR: ', response)

    return error(response.message, response.errors)
  } catch (err) {
    console.log('EXCEPTION: ', err)
    return error(GetMessage(err), GetErrors(err))
  }
}

export async function list (token: string, filters?: CampaingFilters, options?: CampaingOptions) {
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
    const response = await AxiosGet(ROUTES.CAMPAING_ROUTE + url, token)

    const list = [] as any

    if (response.success) {
      let data = response.content

      forEach(data, function (value, key) {
        const item = {
          id: parseInt(key),
          value: value
        } as CampaingList

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

function getFilters (filters: CampaingFilters): string {
  let filter = ''

  const name = (isUndefined(filters.name)) ? '' : filters.name
  const active = (isUndefined(filters.active)) ? '' : filters.active
  const automatic_allocation = (isUndefined(filters.automatic_allocation)) ? '' : filters.automatic_allocation
  const alternative_id = (isUndefined(filters.alternative_id)) ? '' : filters.alternative_id
  const advertiser_name = (isUndefined(filters.advertiser) || isUndefined(filters.advertiser.name)) ? '' : filters.advertiser.name
  const currency_name = (isUndefined(filters.currency) || isUndefined(filters.currency.name)) ? '' : filters.currency.name
  const timezone_name = (isUndefined(filters.timezone) || isUndefined(filters.timezone.name)) ? '' : filters.timezone.name
  const trafficker_name = (isUndefined(filters.trafficker) || isUndefined(filters.trafficker.name)) ? '' : filters.trafficker.name
  const budget_type = (isUndefined(filters.budget_type) || isUndefined(filters.budget_type.description)) ? '' : filters.budget_type.description
  const optimization_strategy = (isUndefined(filters.optimization_strategy) || isUndefined(filters.optimization_strategy.description)) ? '' : filters.optimization_strategy.description
  const strategy = (isUndefined(filters.strategy) || isUndefined(filters.strategy.description)) ? '' : filters.strategy.description
  const campaign_pacing = (isUndefined(filters.campaign_pacing) || isUndefined(filters.campaign_pacing.description)) ? '' : filters.campaign_pacing.description
  const kpi_campaign = (isUndefined(filters.kpi_campaign) || isUndefined(filters.kpi_campaign.description)) ? '' : filters.kpi_campaign.description

  filter += 'filters[name]=' + name + '&filters[active]=' + active + '&filters[automatic_allocation]=' + automatic_allocation + '&filters[alternative_id]=' + alternative_id + '&filters[advertiser.name]=' + advertiser_name + '&filters[currency.name]=' + currency_name + '&filters[timezone.name]=' + timezone_name + '&filters[trafficker.name]=' + trafficker_name + '&filters[budget_type.description]=' + budget_type + '&filters[optimization_strategy.description]=' + optimization_strategy + '&filters[strategy.description]=' + strategy + '&filters[campaign_pacing.description]=' + campaign_pacing + '&filters[kpi_campaign.description]=' + kpi_campaign

  return filter
}

function getOptions (options: CampaingOptions, mode: string, paginated?: CampaingPaginated): string {
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
