import { AxiosGet, GetData, GetErrors, GetMessage } from '@/services/axios-service'

export const CUSTOM_LIST_EXCHANGE_ROUTE = '/api/list/custom_list_exchanges'

class CustomListExchangeService {
    async all() {
        try {
            const response = await AxiosGet(`${CUSTOM_LIST_EXCHANGE_ROUTE}`);
            return Promise.resolve({success: response?.data?.success ? true : false, data: GetData(response)});
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }
}

export default new CustomListExchangeService()