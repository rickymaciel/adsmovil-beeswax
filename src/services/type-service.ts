import { AxiosGet, GetData, GetErrors, GetMessage } from "./axios-service";

export const CUSTOM_LIST_TYPES_ROUTE = '/api/list/custom_list_types'

class TypeService {
    async list() {
        try {
            const response = await AxiosGet(CUSTOM_LIST_TYPES_ROUTE)
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

export default new TypeService()
