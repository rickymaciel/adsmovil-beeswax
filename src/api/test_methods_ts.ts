import { initialize, login, logout, permissions, profile } from './auth/AuthApi'
// import { create, update, remove, show, all, list, paginated, resendEmail } from './user/UserApi'
//import { create, update, changeStatus, show, all, list, paginated, categories } from './advertiser/AdvertiserApi'
//import { list } from './timezone/timezoneAPI'
import { list } from './currency/CurrencyAPI'
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
        name: 'test_advertiser_3',
        category_id: 3,
        domain: 'test-advertiser-3.com',
        app_bundle: 'com.adsmovil.PicoPlaca',
        active: false
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
        id: 12,
        name: 'test_advertiser_4',
        category_id: 246,
        domain: 'domain.com',
        app_bundle: 'com.domainadvertiser.AdvTest',
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
      const change = await changeStatus(12, true, value)

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
      const data_advertiser = await show(12, value)

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
const test_currency = {
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
}
/* -------- END CURRENCY -------- */

export default test_currency
