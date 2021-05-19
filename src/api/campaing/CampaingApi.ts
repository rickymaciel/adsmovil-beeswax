import {
  Campaing,
  CampaingDataCreate,
  CampaingDataUpdate,
  CampaingFilters,
  CampaingList,
  CampaingOptions,
  CampaingPaginated, FrecuencyCaps
} from '@/interfaces/campaing'
import { CAMPAING_ROUTE, AxiosPost, AxiosPatch, AxiosGet, AxiosPut } from '@/api/AxiosService'
import { forEach, isEmpty, isUndefined } from 'lodash'

export async function create (campaing: CampaingDataCreate, token: string) {
  try {
    const response = await AxiosPost(CAMPAING_ROUTE, campaing, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      let frequency_caps = [] as any

      forEach(response.frequency_caps, function (value, key) {
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

      return {
        id: response.id,
        name: response.name,
        budget: response.budget,
        daily_budget: response.daily_budget,
        start_date: response.start_date,
        end_date: response.end_date,
        active: response.active,
        alternative_id: response.alternative_id,
        external_id: response.external_id,
        spend: response.spend,
        automatic_allocation: response.automatic_allocation,
        kpi_objective: response.kpi_objective,
        cpm_bid: response.cpm_bid,
        target_ecpc: response.target_ecpc,
        target_ctr: response.target_ctr,
        target_vcr: response.target_vcr,
        created_by: response.created_by,
        updated_by: response.updated_by,
        deleted_by: response.deleted_by,
        created_at: response.created_at,
        updated_at: response.updated_at,
        deleted_at: response.deleted_at,
        account_id: response.account_id,
        advertiser_id: response.advertiser_id,
        budget_type_id: response.budget_type_id,
        currency_id: response.currency_id,
        timezone_id: response.timezone_id,
        optimization_strategy_id: response.optimization_strategy_id,
        strategy_id: response.strategy_id,
        campaign_pacing_id: response.campaign_pacing_id,
        kpi_campaign_id: response.kpi_campaign_id,
        trafficker_id: response.trafficker_id,
        frequency_caps: frequency_caps
      } as Campaing
    }

    console.log('ERROR: ', response)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function update (campaing: CampaingDataUpdate, token: string) {
  try {
    const response = await AxiosPatch(CAMPAING_ROUTE + '/' + campaing.id, campaing, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      let frequency_caps = [] as any

      forEach(response.frequency_caps, function (value, key) {
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

      return {
        id: response.id,
        name: response.name,
        budget: response.budget,
        daily_budget: response.daily_budget,
        start_date: response.start_date,
        end_date: response.end_date,
        active: response.active,
        alternative_id: response.alternative_id,
        external_id: response.external_id,
        spend: response.spend,
        automatic_allocation: response.automatic_allocation,
        kpi_objective: response.kpi_objective,
        cpm_bid: response.cpm_bid,
        target_ecpc: response.target_ecpc,
        target_ctr: response.target_ctr,
        target_vcr: response.target_vcr,
        created_by: response.created_by,
        updated_by: response.updated_by,
        deleted_by: response.deleted_by,
        created_at: response.created_at,
        updated_at: response.updated_at,
        deleted_at: response.deleted_at,
        account_id: response.account_id,
        advertiser_id: response.advertiser_id,
        budget_type_id: response.budget_type_id,
        currency_id: response.currency_id,
        timezone_id: response.timezone_id,
        optimization_strategy_id: response.optimization_strategy_id,
        strategy_id: response.strategy_id,
        campaign_pacing_id: response.campaign_pacing_id,
        kpi_campaign_id: response.kpi_campaign_id,
        trafficker_id: response.trafficker_id,
        frequency_caps: frequency_caps
      } as Campaing
    }

    console.log('ERROR: ', response)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
  }
}

export async function changeStatus (id: number, status: boolean, token: string) {
  try {
    const active = status ? 1 : 0
    const response = await AxiosPut(CAMPAING_ROUTE + '/' + id + '/set/' + active, {}, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      return true
    }

    console.log('ERROR: ', response.message)

    return false
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return false
  }
}

export async function show (id: number, token: string) {
  try {
    const response = await AxiosGet(CAMPAING_ROUTE + '/' + id, token)

    if (!isEmpty(response) && !isUndefined(response.id)) {
      let frequency_caps = [] as any

      forEach(response.frequency_caps, function (value, key) {
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

      return {
        id: response.id,
        name: response.name,
        budget: response.budget,
        daily_budget: response.daily_budget,
        start_date: response.start_date,
        end_date: response.end_date,
        active: response.active,
        alternative_id: response.alternative_id,
        external_id: response.external_id,
        spend: response.spend,
        automatic_allocation: response.automatic_allocation,
        kpi_objective: response.kpi_objective,
        cpm_bid: response.cpm_bid,
        target_ecpc: response.target_ecpc,
        target_ctr: response.target_ctr,
        target_vcr: response.target_vcr,
        created_by: response.created_by,
        updated_by: response.updated_by,
        deleted_by: response.deleted_by,
        created_at: response.created_at,
        updated_at: response.updated_at,
        deleted_at: response.deleted_at,
        account_id: response.account_id,
        advertiser_id: response.advertiser_id,
        budget_type_id: response.budget_type_id,
        currency_id: response.currency_id,
        timezone_id: response.timezone_id,
        optimization_strategy_id: response.optimization_strategy_id,
        strategy_id: response.strategy_id,
        campaign_pacing_id: response.campaign_pacing_id,
        kpi_campaign_id: response.kpi_campaign_id,
        trafficker_id: response.trafficker_id,
        frequency_caps: frequency_caps,
        budget_type: {
          id: response.budget_type.id,
          description: response.budget_type.description
        },
        currency: {
          id: response.currency.id,
          name: response.currency.name
        },
        advertiser: {
          id: response.advertiser.id,
          name: response.advertiser.name
        },
        timezone: {
          id: response.timezone.id,
          name: response.timezone.name
        },
        optimization_strategy: {
          id: response.optimization_strategy.id,
          description: response.optimization_strategy.description
        },
        strategy: {
          id: response.strategy.id,
          description: response.strategy.description
        },
        campaign_pacing: {
          id: response.campaign_pacing.id,
          description: response.campaign_pacing.description
        },
        kpi_campaign: {
          id: response.kpi_campaign.id,
          description: response.kpi_campaign.description
        },
        trafficker: {
          id: response.trafficker.id,
          name: response.trafficker.name,
          last_name: response.trafficker.last_name
        }
      } as Campaing
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
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
    const response = await AxiosGet(CAMPAING_ROUTE + url, token)

    const campaings = [] as any

    if (!isEmpty(response) && response.length > 0) {
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

      return campaings
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
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
    const response = await AxiosGet(CAMPAING_ROUTE + url, token)

    const campaings = [] as any

    if (!isEmpty(response) && !isUndefined(response.data) && response.data.length > 0) {
      forEach(response.data, function (value, key) {
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

      return {
        page: paginated.page,
        campaings
      }
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
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
    const response = await AxiosGet(CAMPAING_ROUTE + url, token)

    const list = [] as any

    if (!isEmpty(response)) {
      forEach(response, function (value, key) {
        const item = {
          id: parseInt(key),
          value: value
        } as CampaingList

        list.push(item)
      })

      return list
    }

    console.log('ERROR: ', response.message)

    return null
  } catch (error) {
    console.log('EXCEPTION: ', error)
    return null
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
