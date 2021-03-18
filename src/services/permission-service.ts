import { AxiosGet, ResponseDataContent } from '@/services/axios-service'
import { AxiosResponse } from 'axios'

export const PERMISSION_ROUTE = '/api/auth/permissions'

class PermissionService {
    async permissions() {
        return AxiosGet(PERMISSION_ROUTE)
    }
}

/**
 * Util: get permissions
 * @param response
 */
export function PermissionProfile(response: AxiosResponse<any>) {
    return ResponseDataContent(response)
}

export default new PermissionService()
