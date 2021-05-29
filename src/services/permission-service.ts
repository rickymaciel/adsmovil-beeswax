import { AxiosGet, GetData, GetErrors, GetMessage } from '@/services/axios-service'
import { AxiosResponse } from 'axios'

export const PERMISSION_ROUTE = '/api/auth/permissions'

class PermissionService {
    async permissions() {
        try {
            const response = await AxiosGet(PERMISSION_ROUTE);
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
 * Util: get permissions
 * @param response
 */
export function PermissionProfile(response: AxiosResponse<any>) {
    return response.data?.permissions
}

export default new PermissionService()
