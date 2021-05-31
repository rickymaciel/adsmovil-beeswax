import { Profile } from '@/interfaces/user'
import { AxiosPost, GetData, GetErrors, GetMessage } from '@/services/axios-service'
import { isEmpty, isUndefined } from 'lodash'
import { AxiosResponse } from 'axios'

export const PROFILE_ROUTE = '/api/auth/me'

class ProfileService {
    async profile() {
        try {
            const response = await AxiosPost(PROFILE_ROUTE, {});
            console.log("@Actions:profile", { response: response });
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
        profile.first_name = response.name
        profile.last_name = response.last_name
        profile.email = response.email
        profile.avatar = response.avatar || 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460'

    }

    return profile
}

export default new ProfileService()
