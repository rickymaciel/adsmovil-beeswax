import { AxiosPost } from '@/services/axios-service'

export const LIST_ITEM_ROUTE = '/api/custom_list_items/upload'

class ListItemService {
    async upload(listItem: any) {
        try {
            const response = await AxiosPost(LIST_ITEM_ROUTE, listItem)
            console.log('ListItemService:upload: ', { response: response })

            if (response.status < 200 && response.status > 300) {
                return null
            }

            return response.data.response
        } catch (error) {
            console.error('ListItemService:upload', { error: error })
        }
    }
}

export default new ListItemService()
