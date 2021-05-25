import { Notification, MessageTypes } from "../interfaces/proccess";
import i18n from '@/plugins/i18n';
const NOTFOUNDMESSAGE = "Object not found or not active";
class NotificationService {
    /**
     * Success
     * @param params // { customMessage, to }
     * @returns 
     */
    async SuccessNotification(params: { to: any; }) {
        return {
            message: i18n.t(MessageTypes.SUCCESS),
            type: MessageTypes.SUCCESS,
            to: params.to,
            show: true
        } as Notification
    }

    /**
     * Error
     * @param params // { customMessage, type, to }
     * @returns 
     */
    async ErrorNotification(params: { customMessage: any; to: any; }) {
        console.log('ErrorNotification', {
            message: getMessage(params.customMessage)
        });
        return {
            message: getMessage(params.customMessage),
            type: MessageTypes.ERROR,
            to: params.to,
            show: true
        } as Notification
    }
}

export function getMessage(customMessage: string) {
    return customMessage === NOTFOUNDMESSAGE ? i18n.t(MessageTypes.NOTFOUND) : i18n.t(MessageTypes.FAILED)
}

export default new NotificationService()
