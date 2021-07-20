import { AxiosGet, GetData, GetErrors, GetMessage } from '@/services/axios-service';

const LIST_ROUTE = '/api/list'

class ListService {
    
    async getList(path: string) {
        try {
            const response = await AxiosGet(`${LIST_ROUTE}/custom_list_exchanges`);
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

export default new ListService();