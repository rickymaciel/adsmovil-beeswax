import { Profile } from '@/interfaces/user'
import { AxiosPost, ResponseDataContent } from '@/services/axios-service'
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
    const content = ResponseDataContent(response)

    const profile: Profile = {} as Profile

    if (!isEmpty(content) && !isUndefined(content)) {
        profile.id = content.id || 'N/A'
        profile.account_id = content.account_id || 'N/A'
        profile.first_name = content.name || 'N/A'
        profile.last_name = content.last_name || 'N/A'
        profile.email = content.email || 'N/A'
        profile.avatar = content.avatar || 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460'

    }

    return profile
}

export default new ProfileService()
