import { account, forgot, initialize, login, logout, permissions, profile, reset } from './auth/AuthApi'
//import { create, remove, resendEmail, show, update } from './user/UserApi'
//import { create, update, changeStatus, show, all, list, paginated, categories } from './advertiser/AdvertiserApi'
//import { create, update, changeStatus, show, all, paginated, list } from './custom_list/CustomListAPI'
//import { create, update, changeStatus, all, paginated, list, deleted, clear, loadItems } from './custom_list/items/ListItemsAPI'
//import { create, update, show, all, paginated, list, modules, types } from './modifiers/ModifierApi'
//import { create, all, paginated, list, show, changeStatus, update } from './campaing/CampaingApi'
//import { all, changeStatus, create, list, paginated, show, update } from './line_items/LineItemsApi'
//import { create, update } from '@/api/creatives/banner/ImageApi'
//import { create, update } from '@/api/creatives/banner/JsTagApi'
//import { create, update } from '@/api/creatives/banner/IframeTagApi'
//import { create, update } from '@/api/creatives/banner/MraidTagApi'
//import { create, update } from '@/api/creatives/banner/Html5Api'
//import { create, update } from '@/api/creatives/video/VastInlineApi'
//import { create, update } from '@/api/creatives/video/VastWrapper'
//import { all, paginated, list } from '@/api/creatives/CreativeApi'
//import { create, update, show, all, paginated, list } from '@/api/creatives/AddonApi'
import { all, paginated, list } from '@/api/creatives/AssetApi'
//import { create, deleted } from '@/api/creatives/AssociateApi'
//import { all, paginated, list, show } from '@/api/targeting/KeyApi'
//import { create, all, paginated, list, show, update } from '@/api/targeting/TargetingApi'
import { UserInit } from '@/interfaces/user'
//import { check } from './creatives/TagApi'
//import { adPositions, appInventory, interstitialTypes, inventorySources, dealIdList, placementId, siteId, publisherId } from '@/api/inventory/InventoryApi'
//import { domainList } from '@/api/domain/DomainApi'
//import { creativeSize } from '@/api/ad_size/AdSizeApi'
//import { countries, lat_long, locationTypes, regions } from '@/api/geo/GeoApi'
//import { CampaingDataCreate, CampaingDataUpdate } from '@/interfaces/campaing'
//import { FrecuencyCaps, FrecuencyCapsDataCreate } from '@/interfaces/frecuency_caps'
//import { LineItemDataCreate, LineItemDataUpdate } from '@/interfaces/line_item'
//import { list } from './timezone/timezoneAPI'
//import { list } from './currency/CurrencyAPI'
//import { list } from './custom_list/ExchangesAPI'
//import { list } from './custom_list/TypeAPI'
//import { list } from './unit_time/UnitTimeApi'
//import { list } from './budget/BudgetApi'
//import { list } from './kpi/KpiCampaingApi'
//import { list } from './strategies/OptimizationApi'
//import { list } from './strategies/StrategyApi'
//import { pacingCampaing, pacingLine } from './pacing/PacingApi'
//import { list } from '@/api/bid/ShadingApi'
//import { list } from '@/api/bid/StrategyApi'
//import { list } from '@/api/bid/RatesApi'
//import { list } from '@/api/line_items/TypeApi'
//import { list } from '@/api/creatives/MethodApi'
//import { list } from '@/api/creatives/TypeApi'
//import { list } from '@/api/creatives/TemplateApi'
//import { list } from '@/api/creatives/VendorApi'
//import { list } from '@/api/creatives/RuleApi'
//import { list } from '@/api/creatives/MimeApi'
//import { types, direction } from '@/api/creatives/ExpandableApi'
//import { inBanner, apis } from '@/api/creatives/VideoApi'
//import { appNames, appSites, sites } from '@/api/app_site/AppSiteApi'
//import { inventorySources, auctionTypes } from '@/api/exchange/ExchangeApi'
//import { list } from '@/api/targeting/PredicateApi'
//import { list } from '@/api/targeting/LocationTypeApi'
//import { list } from '@/api/targeting/ModuleApi'
//import { enviroments } from '@/api/enviroment/EnviromentApi'
//import { browsers, browserVersions, deviceModels, deviceScreenSize, operatingSystemVersion, platforms } from '@/api/platform/PlatformApi'
//import { contents } from '@/api/content/ContentApi'

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
      console.log('PROFILE', data_profile)
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
/*const test_list_item_loadItems = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const items = [
        {
          id: null,
          custom_list_id: 42,
          list_item: 'app_bundle_5',
          name: 'app_bundle_5',
          value: 5
        },
        {
          id: null,
          custom_list_id: 42,
          list_item: 'app_bundle_6',
          name: 'app_bundle_6',
          value: 6
        }
      ]

      const data_list_item = await loadItems(items, 'app_bundle', value)

      console.log('CUSTOM LIST LOAD', data_list_item)

      return data_list_item
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_list_item_create = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_list_item = await create({custom_list_id: 44, list_item: 'ttx/list_item_6', name: 'name_app_id'}, 'app_id', value)
      //const data_list_item = await create({custom_list_id: 42,list_item: 'app_bundle_create',name: 'app_bundle_create',value: 7}, 'app_bundle', value)
      //const data_list_item = await create({custom_list_id: 386,list_item: {'lat': -29.4169856,'long': -59.9623159,'radius_km': 0.5},name: 'name_lat_long'}, 'lat_long', value)

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
/*const test_pacing_campain = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      console.log('TOKEN',token)
      resolve(token)
    }).then(async value => {
      const data_pacing = await pacingCampaing(value)

      console.log('PACING CAMPAIN', data_pacing)

      return data_pacing
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_pacing_line = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_pacing = await pacingLine(value)

      console.log('PACING LINE', data_pacing)

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
      // const data_geo = await lat_long(value)
      const data_geo = await locationTypes(value)

      console.log('GEO', data_geo)

      return data_geo
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END GEO -------- */

/* -------- BEGIN APP SITE -------- */
/*const test_app_site = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      // const data_app_site = await appSites('app_name', value)
      // const data_app_site = await sites('test', 'site_name', value)
      const data_app_site = await appNames('test', 'app_name', value)

      console.log('APP SITE', data_app_site)

      return data_app_site
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END APP SITE -------- */

/* -------- BEGIN EXCHANGE -------- */
/*const test_exchange = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_exchange = await auctionTypes(value)
      // const data_exchange = await inventorySources(value)

      console.log('EXCHANGE', data_exchange)

      return data_exchange
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END EXCHANGE -------- */

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
/*const test_inventory = {
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
}*/

/*
const test_inventory_app = {
  
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const auction = 'auction_type'
      const environment = 'environment_types'
      const interstitial_flags = 'interstitial'
      const videos_apis = 'video_api'
      //const data_inventory = await appInventory(auction, value)
      //const data_inventory = await appInventory(environment, value)
      //const data_inventory = await appInventory(interstitial_flags, value)
      const data_inventory = await appInventory(videos_apis, value)
      console.log('INVENTORY APP', data_inventory)

      return data_inventory
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}
*/
/*
const test_interstitial_types = {
  
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_inventory = await interstitialTypes(value)
      console.log('INTERSTITIAL_TYPES', data_inventory)

      return data_inventory
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}
*/
/*
const test_inventorySources = {
  
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_inventory = await inventorySources(value)
      console.log('INVENTORY_SOURCES', data_inventory)

      return data_inventory
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}
*/
/*
const test_dealIdList = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_inventory = await dealIdList(value)
      console.log('INVENTORY_DEAL_ID_LIST', data_inventory)
      return data_inventory
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}
*/
/*
const test_placementId = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_inventory = await placementId(value)
      console.log('INVENTORY_PLACEMENTID', data_inventory)
      return data_inventory
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}
*/
/*
const test_publisherId = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_inventory = await placementId(value)
      console.log('INVENTORY_PUBLISHER_ID', data_inventory)
      return data_inventory
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}
*/
/*
const test_siteId = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_inventory = await siteId(value)
      console.log('INVENTORY_SITE_ID', data_inventory)
      return data_inventory
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}
*/
/* -------- END INVENTORY -------- */

/* -------- BEGIN BID -------- */
/* const test_bid_shading = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_shading = await list(value)

      console.log('SHADING', data_shading)

      return data_shading
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_bid_strategy = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_strategy = await list(value)

      console.log('BID STRATEGY', data_strategy)

      return data_strategy
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_bid_rates = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_rate = await list(value)

      console.log('BID RATES', data_rate)

      return data_rate
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END BID -------- */

/* -------- BEGIN LINE ITEMS -------- */
/*const test_line_items_type = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_line = await list(value)

      console.log('LINE ITEM TYPES', data_line)

      return data_line
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_line_items_create = {
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

      const line = {
        advertiser_id: 44,
        campaign_id: 38,
        name: 'Line Item Test',
        budget: 59.59,
        daily_budget: 59,
        start_date: '2021-06-24 08:00:00',
        end_date: '2021-06-28 08:30:00',
        active: false,
        alternative_id: '',
        bid_strategy_id: 25,
        strategy_id: 9,
        line_pacing_id: 12,
        line_item_type_id: 22,
        bid_shading_id: 19,
        creative_method_id: 26,
        fix_cpm: 22.1,
        cpm_bid: 1.5,
        target_ecpc: 51.2,
        target_ctr: 0.1,
        target_vcr: 0.3,
        frequency_caps: [fc]
      } as LineItemDataCreate

      const data_line = await create(line, value)

      console.log('LINE ITEM CREATE', data_line)

      return data_line
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_line_items_update = {
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

      const line = {
        id: 1,
        name: 'Line Item Test',
        start_date: '2021-06-16 08:00:00',
        end_date: '2021-06-30 20:00:00',
        active: false,
        alternative_id: '1990',
        frequency_caps: [fc]
      } as LineItemDataUpdate

      const data_line = await update(line, value)

      console.log('LINE ITEM UPDATE', data_line)

      return data_line
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_get_line_items = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      // const data_line_items = await all(value, {}, { sort: 'name', order: 'asc' })
      // const data_line_items = await paginated(value, { page: 1, limit: 15 }, { name: 'test' }, { sort: 'name', order: 'asc' })
      // const data_line_items = await list(value, {}, { sort: 'name', order: 'asc' })
      const data_line_items = await show(1, value)

      console.log('LINE ITEMS', data_line_items)

      return data_line_items
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_change_status_line_items = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const change = await changeStatus(6, false, value)

      console.log('CHANGE STATUS', change)

      return change
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}*/
/* -------- END LINE ITEMS -------- */

/* -------- BEGIN CREATIVES -------- */
/*const test_creative_method = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_creative = await list(value)

      console.log('CREATIVE METHOD', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_creative_types = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_creative = await list(value)

      console.log('CREATIVE TYPES', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_creative_templates = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_creative = await list(value)

      console.log('CREATIVE TEMPLATE', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_creative_vendor = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_creative = await list(value)

      console.log('CREATIVE VENDORS', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_creative_rule = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_creative = await list(value)

      console.log('CREATIVE RULES', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_creative_mime_types = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_creative = await list(value)

      console.log('CREATIVE MIME TYPES', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_creative_expandable_types = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_creative = await types(value)

      console.log('CREATIVE EXPANDABLE TYPES', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_creative_expandable_directions = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_creative = await direction(value)

      console.log('CREATIVE EXPANDABLE DIRECTIONS', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_creative_inbanner = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_creative = await inBanner(value)

      console.log('CREATIVE IN BANNER VIDEOS', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_creative_apis = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_creative = await apis(value)

      console.log('CREATIVE VIDEO APIS', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_creative_check_tag = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const tag = {
        creative_rule_id: 616,
        creative_content_tag: '<ins data-dcm-placement=\\"\\"/>'
      }

      const data_creative = await check(tag, value)

      console.log('CREATIVE TAGS', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_create_creative_image = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data = {
        creative_type_id: 600,
        creative_template_id: 1,
        name: 'Test ADS_BEESWAX_7',
        secure: false,
        creative_advertiser: {
          advertiser_id: 14,
          category_id: 6,
          domain: 'https://advertiserpolaco.com',
          app_bundle: 'com.adsmovil.PicoPlaca'
        },
        creative_ad_content: {
          primary_asset_id: 36,
          click_url: 'http://adsmovil.com/click_url'
        },
        creative_exchange_options: {
          appnexus_submit: false,
          landing_page_url: 'http://adsmovil.com',
          vendors: [649, 650, 651]
        },
        creative_addon_settings: {
          addons: [1],
          pixels: ['https://adsmovil.com/pixels/pixel1.js', 'https://adsmovil.com/pixels/pixel2.js'],
          scripts: ['https://adsmovil.com/scripts/script1.js', 'https://adsmovil.com/scripts/script2.js']
        }
      }

      const data_creative = await create(data, value)

      console.log('CREATIVE IMAGE', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_update_creative_image = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data = {
        id: 36,
        name: 'Creative Image Update',
        secure: true,
        creative_advertiser: {
          category_id: 6,
          domain: 'https://image.com',
          app_bundle: 'com.adsmovil.Image'
        },
        creative_ad_content: {
          primary_asset_id: 36,
          click_url: 'http://adsmovil.com/click_url/image'
        },
        creative_exchange_options: {
          appnexus_submit: true,
          landing_page_url: 'http://adsmovil.com/image',
          vendors: [649, 650, 651]
        },
        creative_addon_settings: {
          //addons: [1],
          pixels: ['https://adsmovil.com/pixels/pixel1.js', 'https://adsmovil.com/pixels/pixel2.js'],
          scripts: ['https://adsmovil.com/scripts/script1.js', 'https://adsmovil.com/scripts/script2.js']
        }
      }

      const data_creative = await update(data, value)

      console.log('CREATIVE IMAGE', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_create_creative_jstag = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data = {
        creative_type_id: 600,
        creative_template_id: 4,
        name: 'Test ADS_BEESWAX_2 Js Tag',
        secure: false,
        start_date: '2021-06-26 00:00:00',
        end_date: '2021-06-30 00:00:00',
        creative_advertiser: {
          advertiser_id: 14,
          category_id: 6,
          domain: 'https://advertiserpolaco.com',
          app_bundle: 'com.adsmovil.PicoPlaca'
        },
        creative_ad_content: {
          creative_rule_id: 617,
          tag: '<ins data-dcm-placement=""/>'
        },
        creative_attributes: {
          width: 320,
          height: 50,
          mime_type_id: 630,
          expandable_type_id: 639,
          expandable_directions: [1817],
          responsive: true,
          in_banner_video_id: 619
        },
        creative_exchange_options: {
          thumbnail_id: 36,
          appnexus_submit: false,
          landing_page_url: 'http://adsmovil.com',
          vendors: [649, 650, 651]
        },
        creative_addon_settings: {
          addons: [1],
          pixels: ['https://adsmovil.com/pixels/pixel1.js', 'https://adsmovil.com/pixels/pixel2.js'],
          scripts: ['https://adsmovil.com/scripts/script1.js', 'https://adsmovil.com/scripts/script2.js']
        }
      }

      const data_creative = await create(data, value)

      console.log('CREATIVE JS TAG', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_update_creative_jstag = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data = {
        id: 12,
        name: 'Creative Js Tag',
        secure: true,
        start_date: '2021-06-26 00:00:00',
        end_date: '2021-06-30 00:00:00',
        creative_advertiser: {
          category_id: 6,
          domain: 'https://jstag.com',
          app_bundle: 'com.adsmovil.JsTag'
        },
        creative_ad_content: {
          creative_rule_id: 617,
          tag: '<ins data-dcm-placement=""/>'
        },
        creative_attributes: {
          width: 320,
          height: 50,
          mime_type_id: 630,
          expandable_type_id: 639,
          expandable_directions: [1817],
          responsive: true,
          in_banner_video_id: 619
        },
        creative_exchange_options: {
          thumbnail_id: 36,
          appnexus_submit: false,
          landing_page_url: 'http://adsmovil.com',
          vendors: [649, 650, 651]
        },
        creative_addon_settings: {
          //addons: [1],
          pixels: ['https://adsmovil.com/pixels/jstag.js', 'https://adsmovil.com/pixels/jstag.js'],
          scripts: ['https://adsmovil.com/scripts/jstag.js', 'https://adsmovil.com/scripts/jstag.js']
        }
      }

      const data_creative = await update(data, value)

      console.log('CREATIVE JS TAG', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_create_creative_iframetag = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data = {
        creative_type_id: 600,
        creative_template_id: 5,
        name: 'Test ADS_BEESWAX_2 Iframe Tag',
        secure: false,
        start_date: '2021-06-24 00:00:00',
        end_date: '2021-06-30 00:00:00',
        creative_advertiser: {
          advertiser_id: 14,
          category_id: 6,
          domain: 'https://advertiserpolaco.com',
          app_bundle: 'com.adsmovil.PicoPlaca'
        },
        creative_ad_content: {
          creative_rule_id: 617,
          tag: '<ins data-dcm-placement=""/>'
        },
        creative_attributes: {
          width: 320,
          height: 50,
          mime_type_id: 630,
          expandable_type_id: 642,
          expandable_directions: [1821, 1822],
          responsive: false,
          in_banner_video_id: 620
        },
        creative_exchange_options: {
          thumbnail_id: 36,
          appnexus_submit: false,
          landing_page_url: 'http://adsmovil.com',
          vendors: [649, 650, 651]
        },
        creative_addon_settings: {
          addons: [1],
          pixels: ['https://adsmovil.com/pixels/pixel1.js', 'https://adsmovil.com/pixels/pixel2.js'],
          scripts: ['https://adsmovil.com/scripts/script1.js', 'https://adsmovil.com/scripts/script2.js']
        }
      }

      const data_creative = await create(data, value)

      console.log('CREATIVE IFRAME TAG', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_update_creative_iframetag = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data = {
        id: 15,
        name: 'Update Iframe Tag',
        secure: false,
        start_date: '2021-06-24 00:00:00',
        end_date: '2021-06-30 00:00:00',
        creative_advertiser: {
          category_id: 6,
          domain: 'https://advertiserupdate.com',
          app_bundle: 'com.adsmovil.JsTag'
        },
        creative_ad_content: {
          creative_rule_id: 616,
          tag: '<ins data-dcm-placement=""/>'
        },
        creative_attributes: {
          width: 320,
          height: 50,
          mime_type_id: 630,
          expandable_type_id: 642,
          expandable_directions: [1821, 1822],
          responsive: false,
          in_banner_video_id: 620
        },
        creative_exchange_options: {
          thumbnail_id: 36,
          appnexus_submit: false,
          landing_page_url: 'http://adsmovil.com/update',
          vendors: [649, 650, 651]
        },
        creative_addon_settings: {
          //addons: [1],
          pixels: ['https://adsmovil.com/pixels/pixel1.js', 'https://adsmovil.com/pixels/pixel2.js'],
          scripts: ['https://adsmovil.com/scripts/script1.js', 'https://adsmovil.com/scripts/script2.js']
        }
      }

      const data_creative = await update(data, value)

      console.log('CREATIVE IFRAME TAG', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_create_creative_mraidtag = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data = {
        creative_type_id: 600,
        creative_template_id: 13,
        name: 'Test ADS_BEESWAX_1 Mraid Tag',
        secure: true,
        start_date: '2021-06-24 00:00:00',
        end_date: '2021-06-30 00:00:00',
        creative_advertiser: {
          advertiser_id: 14,
          category_id: 6,
          domain: 'https://advertiserpolaco.com',
          app_bundle: 'com.adsmovil.PicoPlaca'
        },
        creative_ad_content: {
          creative_rule_id: 617,
          tag: '<ins data-dcm-placement=""/>'
        },
        creative_attributes: {
          width: 320,
          height: 50,
          mime_type_id: 630,
          expandable_type_id: 642,
          expandable_directions: [1822],
          responsive: false,
          in_banner_video_id: 620
        },
        creative_exchange_options: {
          thumbnail_id: 36,
          appnexus_submit: true,
          landing_page_url: 'http://adsmovil.com',
          vendors: [649, 650, 651]
        },
        creative_addon_settings: {
          addons: [1],
          pixels: ['https://adsmovil.com/pixels/pixel1.js', 'https://adsmovil.com/pixels/pixel2.js'],
          scripts: ['https://adsmovil.com/scripts/script1.js', 'https://adsmovil.com/scripts/script2.js']
        }
      }

      const data_creative = await create(data, value)

      console.log('CREATIVE MRAID TAG', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_update_creative_mraidtag = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data = {
        id: 18,
        name: 'Update Mraid Tag',
        secure: true,
        start_date: '2021-06-24 00:00:00',
        end_date: '2021-06-30 00:00:00',
        creative_advertiser: {
          category_id: 6,
          domain: 'https://advertiser.com',
          app_bundle: 'com.adsmovil.MraidTag'
        },
        creative_ad_content: {
          creative_rule_id: 617,
          tag: '<ins data-dcm-placement=""/>'
        },
        creative_attributes: {
          width: 320,
          height: 50,
          mime_type_id: 630,
          expandable_type_id: 642,
          expandable_directions: [1822],
          responsive: false,
          in_banner_video_id: 620
        },
        creative_exchange_options: {
          thumbnail_id: 36,
          appnexus_submit: true,
          landing_page_url: 'http://adsmovilupdate.com',
          vendors: [649, 650, 651]
        },
        creative_addon_settings: {
          //addons: [1],
          pixels: ['https://adsmovil.com/pixels/pixel1.js', 'https://adsmovil.com/pixels/pixel2.js'],
          scripts: ['https://adsmovil.com/scripts/script1.js', 'https://adsmovil.com/scripts/script2.js']
        }
      }

      const data_creative = await update(data, value)

      console.log('CREATIVE MRAID TAG', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_create_creative_html5 = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data = {
        creative_type_id: 600,
        creative_template_id: 21,
        name: 'Test ADS_BEESWAX_1 HTML5',
        secure: true,
        start_date: '2021-06-24 00:00:00',
        end_date: '2021-06-30 00:00:00',
        creative_advertiser: {
          advertiser_id: 14,
          category_id: 6,
          domain: 'https://advertiserpolaco.com',
          app_bundle: 'com.adsmovil.PicoPlaca'
        },
        creative_ad_content: {
          primary_asset_id: 42
        },
        creative_attributes: {
          width: 320,
          height: 50,
          mime_type_id: 630,
          expandable_type_id: 642,
          expandable_directions: [1822],
          responsive: false,
          in_banner_video_id: 620
        },
        creative_exchange_options: {
          thumbnail_id: 36,
          appnexus_submit: true,
          landing_page_url: 'http://adsmovil.com',
          vendors: [649, 650, 651]
        },
        creative_addon_settings: {
          addons: [1],
          pixels: ['https://adsmovil.com/pixels/pixel1.js', 'https://adsmovil.com/pixels/pixel2.js'],
          scripts: ['https://adsmovil.com/scripts/script1.js', 'https://adsmovil.com/scripts/script2.js']
        }
      }

      const data_creative = await create(data, value)

      console.log('CREATIVE HTML5', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_update_creative_html5 = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data = {
        id: 29,
        name: 'Update HTML5',
        secure: true,
        start_date: '2021-06-24 00:00:00',
        end_date: '2021-06-30 00:00:00',
        creative_advertiser: {
          category_id: 6,
          domain: 'https://advertiserupdae.com',
          app_bundle: 'com.adsmovil.HTML5'
        },
        creative_ad_content: {
          primary_asset_id: 42
        },
        creative_attributes: {
          width: 320,
          height: 50,
          mime_type_id: 630,
          expandable_type_id: 642,
          expandable_directions: [1822],
          responsive: true,
          in_banner_video_id: 620
        },
        creative_exchange_options: {
          thumbnail_id: 36,
          appnexus_submit: false,
          landing_page_url: 'http://adsmovil.com',
          vendors: [649, 650, 651]
        },
        creative_addon_settings: {
          //addons: [1],
          pixels: ['https://adsmovil.com/pixels/pixel1.js', 'https://adsmovil.com/pixels/pixel2.js'],
          scripts: ['https://adsmovil.com/scripts/script1.js', 'https://adsmovil.com/scripts/script2.js']
        }
      }

      const data_creative = await update(data, value)

      console.log('CREATIVE HTML5', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_create_creative_vast_inline = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data = {
        creative_type_id: 601,
        creative_template_id: 3,
        name: 'Test ADS_BEESWAX_1 Vast Inline',
        secure: true,
        start_date: '2021-06-24 00:00:00',
        end_date: '2021-06-30 00:00:00',
        active: false,
        creative_advertiser: {
          advertiser_id: 2,
          category_id: 2,
          domain: 'advertiser2.html5.com',
          app_bundle: 'com.adsmovil.html5.Advertiser2'
        },
        creative_ad_content: {
          primary_asset_id: 23,
          title: 'VAST INLINE',
          click_url: 'http://adsmovil.com/vast/click-url',
          video_duration: 30,
          companion_size_id: 3,
          companion_html: '<html></html>'
        },
        creative_attributes: {
          skippable: true,
          skip_offset: '00:00:10'
        },
        creative_exchange_options: {
          appnexus_submit: true,
          landing_page_url: 'http://adsmovil.com',
          vendors: [649, 650, 651]
        },
        creative_addon_settings: {
          addons: [6],
          pixels: ['https://adsmovil.com/pixels/pixel1.js', 'https://adsmovil.com/pixels/pixel2.js'],
          scripts: ['https://adsmovil.com/scripts/script1.js', 'https://adsmovil.com/scripts/script2.js'],
          click_trackers: ['https://adsmovil.com/tracker1.js', 'https://adsmovil.com/tracker2.js'],
          vast_events: [
            {
              event: 'start',
              url: 'https://adsmovil.com/start'
            },
            {
              event: 'firstQuartile',
              url: 'https://adsmovil.com/firstQuartile'
            }
          ],
          progress_events: [
            {
              time: '00:00:10',
              url: 'https://adsmovil.com/time/10'
            },
            {
              time: '00:00:20',
              url: 'https://adsmovil.com/time/20'
            }
          ]
        }
      }

      const data_creative = await create(data, value)

      console.log('CREATIVE VAST INLINE', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_update_creative_vast_inline = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data = {
        id: 31,
        name: 'Update Vast Inline',
        secure: true,
        start_date: '2021-06-24 00:00:00',
        end_date: '2021-06-30 00:00:00',
        active: false,
        creative_advertiser: {
          category_id: 2,
          domain: 'advertiser.vastinline.com',
          app_bundle: 'com.adsmovil.VastInline'
        },
        creative_ad_content: {
          primary_asset_id: 23,
          title: 'VAST INLINE',
          click_url: 'http://adsmovil.com/vast/update',
          video_duration: 30,
          companion_size_id: 3,
          companion_html: '<html></html>'
        },
        creative_attributes: {
          skippable: true,
          skip_offset: '00:00:10'
        },
        creative_exchange_options: {
          appnexus_submit: true,
          landing_page_url: 'http://adsmovil.com',
          vendors: [649, 650, 651]
        },
        creative_addon_settings: {
          //addons: [6],
          pixels: ['https://adsmovil.com/pixels/vastinline.js', 'https://adsmovil.com/pixels/vastinline.js'],
          scripts: ['https://adsmovil.com/scripts/vastinline.js', 'https://adsmovil.com/scripts/vastinline.js'],
          click_trackers: ['https://adsmovil.com/vastinline.js', 'https://adsmovil.com/vastinline.js'],
          vast_events: [
            {
              event: 'start',
              url: 'https://adsmovil.com/start'
            },
            {
              event: 'firstQuartile',
              url: 'https://adsmovil.com/firstQuartile'
            }
          ],
          progress_events: [
            {
              time: '00:00:10',
              url: 'https://adsmovil.com/time/10'
            },
            {
              time: '00:00:20',
              url: 'https://adsmovil.com/time/20'
            }
          ]
        }
      }

      const data_creative = await update(data, value)

      console.log('CREATIVE VAST INLINE', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_create_creative_vast_wrapper = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data = {
        creative_type_id: 601,
        creative_template_id: 6,
        name: 'Test ADS_BEESWAX_1 Vast Wrapper',
        secure: true,
        start_date: '2021-06-24 00:00:00',
        end_date: '2021-06-30 00:00:00',
        active: false,
        creative_advertiser: {
          advertiser_id: 2,
          category_id: 2,
          domain: 'advertiser2.html5.com',
          app_bundle: 'com.adsmovil.html5.Advertiser2'
        },
        creative_ad_content: {
          tag: '<tag/>',
          video_duration: 30
        },
        creative_attributes: {
          video_mime_types: [635, 637, 638],
          video_api_id: 124,
          video_bit_rates: [644, 646],
          skippable: true,
          skip_offset: '00:00:10',
          moat_inapp_viewability: true
        },
        creative_exchange_options: {
          appnexus_submit: true,
          landing_page_url: 'http://adsmovil.com',
          vendors: [649, 650, 651]
        },
        creative_addon_settings: {
          addons: [6],
          pixels: ['https://adsmovil.com/pixels/pixel1.js', 'https://adsmovil.com/pixels/pixel2.js'],
          scripts: ['https://adsmovil.com/scripts/script1.js', 'https://adsmovil.com/scripts/script2.js'],
          click_trackers: ['https://adsmovil.com/tracker1.js', 'https://adsmovil.com/tracker2.js'],
          vast_events: [
            {
              event: 'start',
              url: 'https://adsmovil.com/start'
            },
            {
              event: 'firstQuartile',
              url: 'https://adsmovil.com/firstQuartile'
            }
          ],
          progress_events: [
            {
              time: '00:00:10',
              url: 'https://adsmovil.com/time/10'
            },
            {
              time: '00:00:20',
              url: 'https://adsmovil.com/time/20'
            }
          ]
        }
      }

      const data_creative = await create(data, value)

      console.log('CREATIVE VAST WRAPPER', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_update_creative_vast_wrapper = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data = {
        id: 34,
        name: 'Update Vast Wrapper',
        secure: false,
        start_date: '2021-06-01 00:00:00',
        end_date: '2021-06-30 00:00:00',
        active: false,
        creative_advertiser: {
          category_id: 2,
          domain: 'advertiser.vastwrapper.com',
          app_bundle: 'com.adsmovil.vastwrapper'
        },
        creative_ad_content: {
          tag: '<tag/>',
          video_duration: 15
        },
        creative_attributes: {
          video_mime_types: [635, 637, 638],
          video_api_id: 124,
          video_bit_rates: [644, 646],
          skippable: false,
          skip_offset: '00:00:10',
          moat_inapp_viewability: false
        },
        creative_exchange_options: {
          appnexus_submit: false,
          landing_page_url: 'http://adsmovil.com/vastwrapper',
          vendors: [649, 650, 651]
        },
        creative_addon_settings: {
          //addons: [6],
          pixels: ['https://adsmovil.com/pixels/pixel1.js', 'https://adsmovil.com/pixels/pixel2.js'],
          scripts: ['https://adsmovil.com/scripts/script1.js', 'https://adsmovil.com/scripts/script2.js'],
          click_trackers: ['https://adsmovil.com/tracker1.js', 'https://adsmovil.com/tracker2.js'],
          vast_events: [
            {
              event: 'start',
              url: 'https://adsmovil.com/start'
            },
            {
              event: 'firstQuartile',
              url: 'https://adsmovil.com/firstQuartile'
            }
          ],
          progress_events: [
            {
              time: '00:00:10',
              url: 'https://adsmovil.com/time/10'
            },
            {
              time: '00:00:20',
              url: 'https://adsmovil.com/time/20'
            }
          ]
        }
      }

      const data_creative = await update(data, value)

      console.log('CREATIVE VAST WRAPPER', data_creative)

      return data_creative
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_get_creatives = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      // const data_creatives = await all(value,{}, { sort: 'name', order: 'asc' })
      const data_creatives = await paginated(value, { page: 1, limit: 15 }, { name: 'polaco' }, { sort: 'name', order: 'asc' })
      // const data_creatives = await list(value, {}, { sort: 'name', order: 'asc' })
      // const data_creatives = await show(59, value)

      console.log('CRATIVES', data_creatives)

      return data_creatives
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_create_association = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_association = await create({
        creative_id: 24,
        line_item_id: 24,
        start_date: '2021-06-30 00:00:00',
        end_date: '2021-07-02 23:59:59',
        active: true
      }, value)

      console.log('CREATE ASSOCIATION', data_association)

      return data_association
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_delete_association = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const eliminar = await deleted(45, value)

      console.log('DELETE ASSOCIATION', eliminar)

      return eliminar
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}
*/
const test_get_creatives_assets = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      // const data_creatives = await all(value,{}, { sort: 'name', order: 'asc' })
      // const data_creatives = await paginated(value, { page: 1, limit: 15 }, { name: 'banner' }, { sort: 'name', order: 'asc' })
      const data_creatives = await list(value, {}, { sort: 'name', order: 'asc' })
      // const data_creatives = await show(59, value)

      console.log('CRATIVES ASSETS', data_creatives)

      return data_creatives
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}
/* -------- END CREATIVES -------- */

/* -------- BEGIN CREATIVES ADDONS -------- */
/*
const test_create_addons = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const addon = {
        name: 'ADDONS ADS MOVIL',
        alternative_id: 1991,
        addon_type_id: 625,
        creative_type_id: 21,
        advertiser_id: 13,
        //vendor_id: 10,
        include_default: true,
        url: 'https://adsmovil.com',
        secure: true,
        active: true,
        //cpm_cost: 0.5
      }

      const data_addon = await create(addon, value)

      console.log('CREATE ADDON', data_addon)

      return data_addon
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_update_addons = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const addon = {
        id: 4,
        name: 'Addons update polack',
        //alternative_id: 2021,
        addon_type_id: 625,
        //creative_type_id: 21,
        //advertiser_id: 13,
        include_default: false,
        url: 'https://adsmovil.com',
        secure: false,
        active: false,
        //vendor_id?: number,
        //cpm_cost?: number
      }

      const data_addon = await update(addon, value)

      console.log('CREATE ADDON', data_addon)

      return data_addon
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return false
    })
  }
}

const test_get_addons = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      // const data_creatives = await all(value,{}, { sort: 'name', order: 'asc' })
      // const data_creatives = await paginated(value, { page: 1, limit: 15 }, { name: 'polaco' }, { sort: 'name', order: 'asc' })
      // const data_creatives = await list(value, {}, { sort: 'name', order: 'asc' })
      const data_creatives = await show(1, value)

      console.log('CRATIVES ADDONS', data_creatives)

      return data_creatives
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}
*/
/* -------- END CREATIVES ADDONS -------- */

/* -------- BEGIN TARGETING -------- */

/* 
const test_targeting_predicates = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_targeting_predicates = await list(value)

      console.log('TARGETING PREDICATES', data_targeting_predicates)

      return data_targeting_predicates
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_targeting_location_types = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_targeting_lt = await list(value)

      console.log('TARGETING LOCATION TYPES', data_targeting_lt)

      return data_targeting_lt
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_targeting_modules = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_targeting_modules = await list(value)

      console.log('TARGETING MODULES', data_targeting_modules)

      return data_targeting_modules
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_targeting_keys = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      // const data_targeting_keys = await all(value, {}, { sort: 'name', order: 'asc' })
      // const data_targeting_keys = await paginated(value, { page: 1, limit: 15 }, { name: 'app_bundle_list' }, { sort: 'name', order: 'asc' })
      // const data_targeting_keys = await list(value, {}, { sort: 'name', order: 'asc' })
      const data_targeting_keys = await show(1, value)

      console.log('TARGETING KEYS', data_targeting_keys)

      return data_targeting_keys
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_create_targeting = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const term = [
        {
          value: '2785610',
          targeting_key_id: 13,
          targeting_predicate_id: 1823
        },
        {
          value: '2801314',
          targeting_key_id: 13,
          targeting_predicate_id: 1823
        }
      ]

      const data = {
        line_item_id: 22,
        active: true,
        targeting_terms: term
      }

      const data_targeting = await create(data, value)

      console.log('TARGETING', data_targeting)

      return data_targeting
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_update_targeting = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const term = [
        {
          value: '2785610',
          targeting_key_id: 13,
          targeting_predicate_id: 1823
        },
        {
          value: '2801314',
          targeting_key_id: 13,
          targeting_predicate_id: 1823
        }
      ]

      const data = {
        id: 1,
        active: false,
        targeting_terms: term
      }

      const data_targeting = await update(data, value)

      console.log('TARGETING UPDATE', data_targeting)

      return data_targeting
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}

const test_targeting = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      // const data_targeting = await all(value, {}, { sort: 'name', order: 'asc' })
      // const data_targeting = await paginated(value, { page: 1, limit: 15 }, { active: true }, { sort: 'name', order: 'asc' })
      // const data_targeting = await list(value, {}, { sort: 'name', order: 'asc' })
      const data_targeting = await show(1, value)

      console.log('TARGETING', data_targeting)

      return data_targeting
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END TARGETING -------- */

/* -------- BEGIN ENVIROMENT -------- */
/*const test_enviroment = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_enviroments = await enviroments('environment_type', value)

      console.log('ENVIROMENT', data_enviroments)

      return data_enviroments
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END ENVIROMENT -------- */

/* -------- BEGIN PLATFORM -------- */
/*const test_platform = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      // const data_platform = await browsers(value)
      // const data_platform = await browserVersions(value)
      // const data_platform = await deviceModels(value)
      // const data_platform = await deviceScreenSize(value)
      const data_platform = await operatingSystemVersion(value)
      // const data_platform = await platforms('operating_system', value)

      console.log('PLATFORM', data_platform)

      return data_platform
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END PLATFORM -------- */

/* -------- BEGIN CONTENT -------- */
/*const test_content = {
  data: function () {
    const promise = new Promise<any>((resolve, reject) => {
      const token = test_login.data()
      resolve(token)
    }).then(async value => {
      const data_content = await contents('language', value)

      console.log('CONTENT', data_content)

      return data_content
    }).catch(error => {
      console.log('EXCEPTION: ', error)
      return null
    })
  }
}*/
/* -------- END CONTENT -------- */

export default test_get_creatives_assets 