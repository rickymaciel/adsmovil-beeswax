import { login, logout, initialize, profile, forgot, reset, permissions } from './auth/AuthApi'
//import { create, update, remove, show, all, list, paginated, resendEmail } from './user/UserApi'
//import { create, update, changeStatus, show, all, list, paginated, categories } from './advertiser/AdvertiserApi'
//import { create, update, changeStatus, show, all, paginated, list } from './custom_list/CustomListAPI'
import { create, update, changeStatus, all, paginated, list, deleted, clear } from './custom_list/items/ListItemsAPI'
//import { list } from './timezone/timezoneAPI'
//import { list } from './currency/CurrencyAPI'
//import { list } from './custom_list/ExchangesAPI'
//import { list } from './custom_list/TypeAPI'
import { UserInit } from '@/interfaces/user'

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
/* const test_create_user = {
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
} */
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
        name: 'CUSTOM LIST APP BUNDLE',
        custom_list_type_id: 1
      }, value)

      console.log('CUSTOM LIST', data_custom_list)

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
        id: 2,
        name: 'CUSTOM LIST TEST_1',
        custom_list_type_id: 3
      }, value)

      console.log('CUSTOM LIST', data_custom_list)

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
      // const data_custom_list = await paginated(value, { page: 3, limit: 25 }, { name: 'test' }, { sort: 'name', order: 'asc' })
      // const data_custom_list = await list(value, {}, { sort: 'name', order: 'asc' })
      const data_custom_list = await show(63, value)

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
const test_list_item_create = {
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
}
/* -------- END LIST ITEM -------- */

export default test_list_item_clear
