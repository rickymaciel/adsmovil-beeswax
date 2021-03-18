import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import i18n from '@/plugins/i18n'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

// import test_api from './api/test_methods_ts'
// test_api.data()

Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
