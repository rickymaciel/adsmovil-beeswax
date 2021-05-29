import { AxiosGet, GetData, GetErrors, GetMessage } from '@/services/axios-service'

export const ACCOUNT_ROUTE = '/api/account'

class AccountService {
    async account() {
        try {
            const response = await AxiosGet(ACCOUNT_ROUTE)
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }
}

export default new AccountService()
