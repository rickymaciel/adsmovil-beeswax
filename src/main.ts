import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import i18n from '@/plugins/i18n'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import moment from 'moment';

moment.locale('es');

// import test_api from './api/test_methods_ts'
// test_api.data()

Vue.config.productionTip = false

Vue.prototype.moment = moment

Vue.filter('toSqlFormat', function (value: any) {
    if (value) {
        return moment(String(value)).format('YYYY-MM-DD HH:mm:ss')
    }
});

Vue.directive('numeric', {
    bind(el, binding, vnode) {
        el.addEventListener('keydown', (e) => {
            if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode === 65 && e.ctrlKey === true) ||
                // Allow: Ctrl+C
                (e.keyCode === 67 && e.ctrlKey === true) ||
                // Allow: Ctrl+X
                (e.keyCode === 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault()
            }
        })
    }
});

new Vue({
    i18n,
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
