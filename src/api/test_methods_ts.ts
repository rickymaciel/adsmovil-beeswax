import { account, forgot, initialize, login, logout, permissions, profile, reset } from './auth/AuthApi'
//import { create, remove, resendEmail, show, update } from './user/UserApi'
//import { create, update, changeStatus, show, all, list, paginated, categories } from './advertiser/AdvertiserApi'
//import { create, update, changeStatus, show, all, paginated, list } from './custom_list/CustomListAPI'
//import { create, update, changeStatus, all, paginated, list, deleted, clear } from './custom_list/items/ListItemsAPI'
//import { create, update, show, all, paginated, list, modules, types } from './modifiers/ModifierApi'
//import { create, all, paginated, list, show, changeStatus, update } from './campaing/CampaingApi'
import { UserInit } from '@/interfaces/user'
import { adPositions } from '@/api/inventory/InventoryApi'
//import { domainList } from '@/api/domain/DomainApi'
//import { creativeSize } from '@/api/ad_size/AdSizeApi'
//import { countries, lat_long, regions } from '@/api/geo/GeoApi'
//import { CampaingDataCreate, CampaingDataUpdate, FrecuencyCapsDataCreate } from '../interfaces/campaing'
//import { list } from './timezone/timezoneAPI'
//import { list } from './currency/CurrencyAPI'
//import { list } from './custom_list/ExchangesAPI'
//import { list } from './custom_list/TypeAPI'
//import { list } from './unit_time/UnitTimeApi'
//import { list } from './budget/BudgetApi'
//import { list } from './kpi/KpiCampaingApi'
//import { list } from './strategies/OptimizationApi'
//import { list } from './strategies/StrategyApi'
//import { list } from './pacing/PacingApi'

/* -------- BEGIN AUTH -------- */
const test_login = {
  data: async function () {
    const data_login = await login({
      email: 'luciano@adsmovil.com',
      password: 'Chaicu777'
    })

    return data_login?.token
  }
}

const test_logout = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_logout = await logout(value)
      return true
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_profile = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_profile = await profile(value)
      return data_profile
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_account = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_account = await account(value)
      console.log('ACCOUNT', data_account)
      return data_account
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_initialize = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_profile = await initialize({
        email: 'mef_l@hotmail.com',
        password: '12345678',
        password_confirmation: '12345678',
        name: 'Marcos Esteban',
        last_name: 'Ferreyra'
      } as UserInit, '62eeb259c56a3600e87a36f50811e25f053938f5fb4dbd23b11e61fd1bf50494', value)

      return data_profile
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_forgot_password = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_forgot = await forgot('mef_l@hotmail.com', value)
      console.log('DATA FORGOT', data_forgot)
      return data_forgot
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_reset_password = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_reset = await reset({
        email: 'mef_l@hotmail.com',
        password: '12345678',
        password_confirmation: '12345678',
        token: '60dabfb8cc7abcb5859eba2f41d4cf52d91d9137c1be6f96121cdc31d7672653'
      }, value)
      console.log('DATA RESET', data_reset)
      return data_reset
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_permissions = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_permissions = await permissions(value)
      console.log('DATA PERMISSIONS', data_permissions)
      return data_permissions
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}
/* -------- END AUTH -------- */

/* -------- BEGIN USER -------- */
/*const test_create_user = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_user = await create({
        email: 'test1@test.com',
        role_id: 3
      }, value)

      console.log('USER', data_user)

      return data_user
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_update_user = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_user = await update({
        id: 4,
        name: 'Marcos Esteban',
        last_name: 'Ferreyra'
      }, value)

      console.log('UPDATED', data_user)

      return data_user
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_get_users = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      // const data_user = await all(value, {}, { sort: 'name', order: 'asc' })
      // const data_user = await paginated(value, { page: 1, limit: 15 }, { first_name: 'Marcos' },{ sort: 'name', order: 'asc' })
      // const data_user = await list(value, {}, { sort: 'name', order: 'asc' })
      const data_user = await show(2, value)

      console.log('USERS', data_user)

      return data_user
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_resend_email = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const resend_email = await resendEmail(22, value)

      if (resend_email) {
        console.log('EMAIL ENVIADO')
      } else {
        console.log('EMAIL NO ENVIADO')
      }

      return resend_email
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_remove_user = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const deleted = await remove(22, value)

      console.log('DELETED', deleted)

      if (deleted) {
        console.log('ELIMINADO')
      } else {
        console.log('NO ELIMINADO')
      }

      return deleted
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}*/
/* -------- END USER -------- */

/* -------- BEGIN ADVERTISER -------- */
/*const test_create_advertiser = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_advertiser = await create({
        name: 'test_advertiser_6',
        category_id: 5,
        domain: 'test-advertiser-6.com',
        app_bundle: 'com.adsmovil.PicoPlaca',
        active: true
      }, value)

      console.log('ADVERTISER', data_advertiser)

      return data_advertiser
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_update_advertiser = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_advertiser = await update({
        id: 65,
        name: 'test_advertiser_6',
        category_id: 3,
        domain: 'test-advertiser-6.com',
        app_bundle: 'com.test-advertiser.test',
        active: false
      }, value)

      console.log('UPDATED', data_advertiser)

      return data_advertiser
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_change_status_advertiser = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const change = await changeStatus(12, false, value)

      console.log('CHANGE STATUS', change)

      return change
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_get_advertisers = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      // const data_advertiser = await all(value, {}, { sort: 'name', order: 'asc' })
      // const data_advertiser = await paginated(value, { page: 1, limit: 15 }, { name: 'advertiser' }, { sort: 'name', order: 'asc' })
      // const data_advertiser = await list(value, {}, { sort: 'name', order: 'asc' })
      const data_advertiser = await show(59, value)

      console.log('ADVERTISERS', data_advertiser)

      return data_advertiser
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_categories = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_categories = await categories(value)

      console.log('CATEGORIES', data_categories)

      return data_categories
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END ADVERTISER -------- */

/* -------- BEGIN TIMEZONE -------- */
/*const test_timezone = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_timezones = await list(value)

      console.log('TIMEZONE', data_timezones)

      return data_timezones
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END TIMEZONE -------- */

/* -------- BEGIN CURRENCY -------- */
/*const test_currency = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_currency = await list(value)

      console.log('CURRENCIES', data_currency)

      return data_currency
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END CURRENCY -------- */

/* -------- BEGIN CUSTOM LIST -------- */
/*const test_custom_list_exchanges = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_exchange = await list(value)

      console.log('EXCHANGES', data_exchange)

      return data_exchange
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_custom_list_types = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_types = await list(value)

      console.log('TYPES', data_types)

      return data_types
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_custom_list_create = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_custom_list = await create({
        name: 'CUSTOM LIST APP BUNDLE 1',
        custom_list_type_id: 1
      }, value)

      console.log('CUSTOM LIST CREATE', data_custom_list)

      return data_custom_list
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_custom_list_update = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_custom_list = await update({
        id: 13,
        name: 'CUSTOM LIST TEST_1',
        custom_list_type_id: 3
      }, value)

      console.log('CUSTOM LIST UPDATE', data_custom_list)

      return data_custom_list
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_custom_list_change_status = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const change = await changeStatus(2, true, value)

      console.log('CHANGE STATUS', change)

      return change
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_get_custom_list = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      // const data_custom_list = await all(value, {}, { sort: 'name', order: 'asc' })
      // const data_custom_list = await paginated(value, { page: 1, limit: 25 }, { name: 'test' }, { sort: 'name', order: 'asc' })
      // const data_custom_list = await list(value, {}, { sort: 'name', order: 'asc' })
      const data_custom_list = await show(13, value)

      console.log('CUSTOM LIST', data_custom_list)

      return data_custom_list
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END CUSTOM LIST -------- */

/* -------- BEGIN LIST ITEM -------- */
/*const test_list_item_create = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      // const data_list_item = await create({custom_list_id: 44, list_item: 'ttx/list_item_6', name: 'name_app_id'}, 'app_id', value)
      const data_list_item = await create({
        custom_list_id: 386,
        list_item: {
          'lat': -29.4169856,
          'long': -59.9623159,
          'radius_km': 0.5
        },
        name: 'name_lat_long'
      }, 'lat_long', value)

      console.log('CUSTOM LIST', data_list_item)

      return data_list_item
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_list_item_update = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_list_item = await update({
        id: 12,
        name: 'update_name',
        value: 5,
        active: false
      }, value)

      console.log('CUSTOM LIST', data_list_item)

      return data_list_item
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_list_item_change_status = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const change = await changeStatus(7, false, value)

      console.log('CHANGE STATUS ITEM', change)

      return change
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_list_item_delete = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const eliminar = await deleted(11, value)

      console.log('DELETE ITEM', eliminar)

      return eliminar
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_list_item_clear = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const eliminar = await clear(13, value)

      console.log('CLEAR ITEM', eliminar)

      return eliminar
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_get_list_item = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_list_item = await all(value, {}, {
        sort: 'name',
        order: 'asc'
      })
      // const data_list_item = await paginated(value, { page: 1, limit: 25 }, { list_item: 'item' }, { sort: 'name', order: 'asc' })
      // const data_list_item = await list(value, {}, { sort: 'name', order: 'asc' })

      console.log('LIST ITEM', data_list_item)

      return data_list_item
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END LIST ITEM -------- */

/* -------- BEGIN MODIFIER -------- */
/*const test_modifier_create = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const term = {
        module_id: 83,
        key: 'country',
        value: 'USA',
        modifier: 1,
        matching_type_id: 97
      } as ModifierTermData

      const modifier = {
        name: 'Test modifier 1',
        advertiser_id: 3,
        alternative_id: 7,
        modifier_type_id: 95,
        terms: [term, term, term]
      } as ModifierDataCreate

      const data_modifier = await create(modifier, value)

      console.log('MODIFIER CREATE', data_modifier)

      return data_modifier
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_modifier_update = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const term = {
        module_id: 83,
        key: 'country',
        value: 'ABW',
        modifier: 2,
        matching_type_id: 97
      } as ModifierTermData

      const modifier = {
        id: 7,
        name: 'Modifier Polaco (update)',
        alternative_id: 8,
        terms: [term]
      } as ModifierDataUpdate

      const data_modifier = await update(modifier, value)

      console.log('MODIFIER UPDATE', data_modifier)

      return data_modifier
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_modifier_list = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      // const data_modifiers = await all(value, {}, { sort: 'name', order: 'asc'})
      // const data_modifiers = await paginated(value, { page: 1, limit: 25 }, { advertiser_id: 3 }, { sort: 'name', order: 'asc' })
      // const data_modifiers = await list(value, {}, {  sort: 'name', order: 'asc' })
      const data_modifiers = await show(5, value)

      console.log('MODIFIERS', data_modifiers)

      return data_modifiers
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_modifier_type = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_types = await types(value)

      console.log('MODIFIER TYPE', data_types)

      return data_types
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_modifier_module = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_modules = await modules(value)

      console.log('MODIFIER MODULE', data_modules)

      return data_modules
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_matching = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_matchings = await matchings(value)

      console.log('MATCHINGS', data_matchings)

      return data_matchings
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}*/
/* -------- END MODIFIER -------- */

/* -------- BEGIN UNIT TIME -------- */
/*const test_unit_times = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_unit_times = await list(value)

      console.log('UNIT TIMES', data_unit_times)

      return data_unit_times
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}*/
/* -------- END UNIT TIME -------- */

/* -------- BEGIN BUDGETS -------- */
/*const test_budget = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_budgets = await list(value)

      console.log('BUDGETS', data_budgets)

      return data_budgets
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}*/
/* -------- END BUDGETS -------- */

/* -------- BEGIN KPI -------- */
/*const test_kpi_campaing = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_kpi = await list(value)

      console.log('KPI CAMPAING', data_kpi)

      return data_kpi
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}*/
/* -------- END KPI -------- */

/* -------- BEGIN OPTIMIZATION STRATEGIES -------- */
/*const test_optimization = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_ops = await list(value)

      console.log('OPTIMIZATION', data_ops)

      return data_ops
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}*/
/* -------- END OPTIMIZATION STRATEGIES -------- */

/* -------- BEGIN STRATEGIES -------- */
/*const test_strategies = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_strategies = await list(value)

      console.log('STRATEGIES', data_strategies)

      return data_strategies
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}*/
/* -------- END STRATEGIES -------- */

/* -------- BEGIN PACING -------- */
/*const test_pacing = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_pacing = await list(value)

      console.log('PACING', data_pacing)

      return data_pacing
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}*/
/* -------- END PACING -------- */

/* -------- BEGIN CAMPAING -------- */
/*const test_create_campaing = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const fc = {
        impressions: 26,
        every_time: 4,
        unit_time_id: 5
      } as FrecuencyCapsDataCreate

      const campaing = {
        advertiser_id: 1,
        name: 'Campaign ADSMOVIL',
        budget: 100,
        daily_budget: 56,
        budget_type_id: 1,
        start_date: '2021-05-15 08:21:20',
        end_date: '2021-05-22 08:00:00',
        active: 1,
        alternative_id: '400',
        optimization_strategy_id: 8,
        strategy_id: 11,
        campaign_pacing_id: 13,
        kpi_campaign_id: 16,
        automatic_allocation: 1,
        kpi_objective: 22,
        cpm_bid: 50,
        target_ecpc: 50,
        target_ctr: 0.5,
        target_vcr: 0.5,
        trafficker_id: 2,
        frequency_caps: [fc]
      } as CampaingDataCreate

      const data_campaing = await create(campaing, value)

      console.log('CAMPAING CREATE', data_campaing)

      return data_campaing
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_update_campaing = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const fc = {
        impressions: 10,
        every_time: 3,
        unit_time_id: 3
      } as FrecuencyCapsDataCreate

      const campaing = {
        id: 12,
        name: 'Campaing POLACO',
        budget: 60,
        daily_budget: 36,
        start_date: '2021-05-26 09:00:00',
        end_date: '2021-05-28 07:30:00',
        alternative_id: '501',
        optimization_strategy_id: 8,
        strategy_id: 11,
        campaign_pacing_id: 13,
        kpi_campaign_id: 16,
        automatic_allocation: 1,
        kpi_objective: 22,
        cpm_bid: 50,
        target_ecpc: 50,
        target_ctr: 0.5,
        target_vcr: 0.5,
        trafficker_id: 2,
        active: true,
        frequency_caps: [fc]
      } as CampaingDataUpdate

      const data_campaing = await update(campaing, value)

      console.log('CAMPAING UPDATE', data_campaing)

      return data_campaing
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_get_campaing = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      // const data_campaing = await all(value, {}, { sort: 'name', order: 'asc' })
      // const data_campaing = await paginated(value, { page: 1, limit: 15 }, { name: 'Campaign ADSMOVI' }, { sort: 'name', order: 'asc' })
      // const data_campaing = await list(value, {}, { sort: 'name', order: 'asc' })
      const data_campaing = await show(12, value)

      console.log('CAMPAINGS', data_campaing)

      return data_campaing
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_change_status_campaing = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const change = await changeStatus(5, true, value)

      console.log('CHANGE STATUS CAMPAING', change)

      return change
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}*/
/* -------- END CAMPAING -------- */

/* -------- BEGIN GEO -------- */
/*const test_geo = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      // const data_geo = await countries(value)
      // const data_geo = await regions(value)
      const data_geo = await lat_long(value)

      console.log('GEO', data_geo)

      return data_geo
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END GEO -------- */

/* -------- BEGIN AD SIZE -------- */
/*const test_ad_size = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_ad_size = await creativeSize(value)

      console.log('AD SIZE', data_ad_size)

      return data_ad_size
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END AD SIZE -------- */

/* -------- BEGIN DOMAIN -------- */
/*const test_domain = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_domain = await domainList(value)

      console.log('DOMAIN', data_domain)

      return data_domain
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END DOMAIN -------- */

/* -------- BEGIN INVENTORY -------- */
const test_inventory = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_inventory = await adPositions(value)

      console.log('INVENTORY', data_inventory)

      return data_inventory
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}
/* -------- END INVENTORY -------- */

export default test_inventory
