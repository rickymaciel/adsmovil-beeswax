import i18n from '@/plugins/i18n';
import moment from 'moment-timezone';

const FILE_MAX_FILE = 2000000;
const MAX_LENGTH = 255;
const MIN_LENGTH = 2;

export function isRequired(v: any) {
    return Boolean(v) || i18n.t("fieldRequired")
}

export function isMustValidated(v: any) {
    return Boolean(v) || i18n.t("must-be-validated")
}

export function isNumber(v: any) {
    return !isNaN(v) || i18n.t("must-be-numeric")
}

export function isEmail(v: any) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(v).toLowerCase()) || i18n.t("invalid-email");
}

export function isMinPassword(v: any) {
    return (v && v.length >= 8) || i18n.t("minLength", { min: 8 })
}

export function isMinLength(v: any) {
    return (v && v.length >= MIN_LENGTH) || i18n.t("minLength", { min: MIN_LENGTH })
}

export function isMaxLength(v: any) {
    return (v && v.length <= MAX_LENGTH) || i18n.t("maxLength", { max: MAX_LENGTH })
}

export function isFileMaxSize(v: any) {
    return (v && v.size <= FILE_MAX_FILE) || i18n.t("file-max-size", { max: (FILE_MAX_FILE / 1000000) })
}

export function isDomain(v: any) {
    return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:?#[\]@!\$&'\(\)\*\+,;=.]+(?<!\/)$/gim.test(v) || i18n.t("domain");
}

export function isBeforeToday(v: any) {
    return moment(v).isBefore(moment()) || i18n.t("min-todate")
}

export function isAfterToday(v: any) {
    return moment(v).isAfter(moment()) || i18n.t("min-todate")
}

export function isAfterCompare(v: any, compareDate: any) {
    return moment(v).isAfter(moment(compareDate)) || i18n.t("must-after-start")
}

export function isValidUrl(v: any) {
    if (v === "") return false;
    return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gim.test(v) || i18n.t("domain")
}

export function isUploaded(v: any) {
    return !(v instanceof File) || i18n.t("uploaded")
}

/**
 * static function
 * @param v 
 * @returns 
 */
export function isUrl(v: any) {
    return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gim.test(v)
}