import { AxiosGet } from "./axios-service";

export const CUSTOM_LIST_TYPES_ROUTE = '/api/list/custom_list_types'

class TypeService {
    async list() {
        try {
            const response = await AxiosGet(CUSTOM_LIST_TYPES_ROUTE)
            console.log('TypeService::AxiosGet: ', { response: response })

            if (response.status < 200 && response.status > 300) {
                return null;
            }

            return response.data.response;

        } catch (error) {
            console.error('TypeService:list', { error: error })
        }
    }
}

export default new TypeService()
