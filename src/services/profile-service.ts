import { Profile } from '@/interfaces/user'
import { AxiosPost, GetData } from '@/services/axios-service'
import { isEmpty, isUndefined } from 'lodash'
import { AxiosResponse } from 'axios'

export const PROFILE_ROUTE = '/api/auth/me'

class ProfileService {
    async profile() {
        return AxiosPost(PROFILE_ROUTE, null)
    }
}

/**
 * Util: get profile
 * @param response
 */
export function ProviderProfile(response: AxiosResponse<any>) {
    const data = GetData(response)

    const profile: Profile = {} as Profile

    if (!isEmpty(data) && !isUndefined(data)) {
        profile.id = data.id || 'N/A'
        profile.account_id = data.account_id || 'N/A'
        profile.first_name = data.name || 'N/A'
        profile.last_name = data.last_name || 'N/A'
        profile.email = data.email || 'N/A'
        profile.avatar = data.avatar || 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460'

    }

    return profile
}

export default new ProfileService()
