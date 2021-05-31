import { Notification, MessageTypes } from "../interfaces/proccess";
import i18n from '@/plugins/i18n';
const NOTFOUNDMESSAGE = "Object not found or not active";
class NotificationService {
    /**
     * Success
     * @param params // { customMessage, to }
     * @returns 
     */
    async SuccessNotification(params: { to: string; title?: string; btn_text?: string; }) {
        return {
            title: params.title,
            message: i18n.t(MessageTypes.SUCCESS),
            type: MessageTypes.SUCCESS,
            to: params.to,
            btn_text: params.btn_text,
            show: true
        } as Notification
    }

    /**
     * Default Notification
     * @param params
     * @returns 
     */
    async CreateNotification(params: Notification) {
        return {
            title: params.title,
            message: params.message === "Unauthorized" ? i18n.t("Unauthorized") : params.message,
            type: params.type,
            to: params.to,
            btn_text: params.btn_text,
            show: true
        } as Notification
    }
}

export function getMessage(customMessage: string) {
    if (!customMessage) return i18n.t(MessageTypes.FAILED);
    return customMessage === NOTFOUNDMESSAGE ? i18n.t(MessageTypes.NOTFOUND) : customMessage
}

export default new NotificationService()
