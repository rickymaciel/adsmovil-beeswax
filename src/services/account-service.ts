import { AxiosGet } from '@/services/axios-service'

export const ACCOUNT_ROUTE = '/api/account'

class AccountService {
    async account() {
        try {
            return AxiosGet(ACCOUNT_ROUTE)
        } catch (error) {
            console.error('AccountService:account', { error: error })
        }
    }
}

export default new AccountService()
