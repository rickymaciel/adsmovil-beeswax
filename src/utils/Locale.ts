import { isUndefined } from 'lodash'

declare global {
    interface Window {
        // IE navigator lanuage settings (non-standard)
        userLanguage: string;
        browserLanguage: string;
    }
}

export function getLocale(): string {
    let locale = 'en'

    if (isUndefined(window) || isUndefined(window.navigator)) {
        return locale
    }

    locale = window.navigator.language || window.browserLanguage || window.userLanguage

    locale = parseLocale(locale)

    return locale
}

function parseLocale(locale: string) {
    let pl = 'en'

    // let en = ['en', 'en-US', 'en-EG', 'en-AU', 'en-GB', 'en-CA', 'en-NZ', 'en-IE', 'en-ZA', 'en-JM', 'en-BZ', 'en-TT']
    // const es = ['es', 'es-AR', 'es-GT', 'es-CR', 'es-PA', 'es-DO', 'es-MX', 'es-VE', 'es-CO', 'es-PE', 'es-EC', 'es-CL', 'es-UY', 'es-PY', 'es-BO', 'es-SV', 'es-HN', 'es-NI', 'es-PR', 'es-419']
    // const pt = ['pt', 'pt-BR']

    // if (es.includes(locale)) {
    //     pl = 'es'
    // } else if (pt.includes(locale)) {
    //     pl = 'pt'
    // }

    if (locale.startsWith('es')) {
        pl = 'es'
    }

    if (locale.startsWith('pt')) {
        pl = 'pt'
    }
    console.log('parseLocale', { locale: locale, pl: pl })

    return pl
}

export default getLocale()
