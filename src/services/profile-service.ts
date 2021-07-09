import { Profile, Role, Account_scheme_1 } from '@/interfaces/user'
import { AxiosPost, GetData, GetErrors, GetMessage } from '@/services/axios-service'
import { isEmpty, isUndefined } from 'lodash'

export const PROFILE_ROUTE = '/api/auth/me'

class ProfileService {
    async profile() {
        try {
            const response = await AxiosPost(PROFILE_ROUTE, {});
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

/**
 * Util: get profile
 * @param response
 */
export function ProviderProfile(response: any) {

    const profile: Profile = {} as Profile

    if (!isEmpty(response) && !isUndefined(response)) {
        profile.id = response.id
        profile.account_id = response.account_id
        profile.name = response.name
        profile.last_name = response.last_name
        profile.email = response.email
        profile.accounts = response.accounts as Account_scheme_1[]
        profile.account = response.account as Account_scheme_1
        profile.roles = response.roles as Role[]
        profile.email = response.email
        profile['avatar'] = response.avatar || 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460'

    }

    return profile
}

export default new ProfileService()
