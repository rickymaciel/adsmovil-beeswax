import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        dark: false,
        options: { customProperties: true },
        themes: {
            light: {
                primary: '#3A4972',
                secondary: '#9E2272',
                accent: '#00A2D8'
            },
            dark: {
                primary: colors.grey.base
            }
        }
    }
})
