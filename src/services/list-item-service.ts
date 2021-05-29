import { AxiosPost, GetData, GetErrors, GetMessage } from '@/services/axios-service'

export const LIST_ITEM_ROUTE = '/api/custom_list_items/upload'

class ListItemService {
    async upload(listItem: any) {
        try {
            const response = await AxiosPost(LIST_ITEM_ROUTE, listItem)
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

export default new ListItemService()
