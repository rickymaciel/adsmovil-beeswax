import i18n from '@/plugins/i18n';

//const domainRegexp = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gim;
const domainRegexp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gim;
// const appbundleRegexp = /^(ttx|at|om|adf|ame|aul|aol|apl|axo|bch|vdo|ctx|cri|dm|dtm|emx|eri|svr|adx|im|ie|inm|ia|is|mm|mp|lkq|ox|oz|px|pm|pp|ro|ra|rtk|rp|sm|sas|sx|sps|stv|syn|tm|uty|unr|vrv|anx|mo|yoc|six|kar|ydl|ss|ap|trl)\/[_A-z0-9]*((-|\.)*[_A-z0-9])*$/i;

export function isRequired(v: any) {
    return Boolean(v) || i18n.t("fieldRequired")
}

export function isNumber(v: any) {
    return !isNaN(v) || i18n.t("must-be-numeric")
}

export function isMinLength(v: any) {
    return (v && v.length >= 2) || i18n.t("minLength", { max: 2 })
}

export function isMaxLength(v: any) {
    return (v && v.length <= 255) || i18n.t("maxLength", { max: 255 })
}

export function isDomain(v: any) {
    return domainRegexp.test(v) || i18n.t("domain")
}