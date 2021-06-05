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

    //locale = window.navigator.language || window.browserLanguage || window.userLanguage

    locale = parseLocale(locale)

    return locale
}

function parseLocale(locale: string) {
    let pl = 'en'

    if (locale.startsWith('es')) {
        pl = 'es'
    }

    if (locale.startsWith('pt')) {
        pl = 'pt'
    }

    return pl
}

export default getLocale()
