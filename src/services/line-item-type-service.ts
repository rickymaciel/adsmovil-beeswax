import { AxiosGet, GetData, GetErrors, GetMessage } from "./axios-service";

export const LINE_ITEM_TYPE_ROUTE = '/api/list/line_items_types'

class LineItemTypeService {
    async list() {
        try {
            const response = await AxiosGet(LINE_ITEM_TYPE_ROUTE)
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

export default new LineItemTypeService()