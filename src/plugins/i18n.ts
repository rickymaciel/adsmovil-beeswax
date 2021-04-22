import Vue from 'vue'
import VueI18n from 'vue-i18n'
import getLocale from '@/utils/Locale'

import _en from "@/plugins/langs/en.json";
import _es from "@/plugins/langs/es.json";
import _pt from "@/plugins/langs/pt.json";

Vue.use(VueI18n)

const messages = {
    en: _en,
    es: _es,
    pt: _pt
}

const i18n = new VueI18n({
    locale: getLocale, // set locale
    fallbackLocale: 'en', // set fallback locale
    messages // set locale messages
})

export default i18n
