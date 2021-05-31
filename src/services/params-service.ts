import { isObject } from "lodash";

class ParamService {

    async getParams(paginated?: {}, filters?: {}, options?: {}) {
        console.log('ParamService::getParams', {
            paginated: paginated,
            filters: filters,
            options: options
        })
        var params = {};
        if (
            isObject(paginated) &&
            Object.entries(paginated).length
        ) {
            params["paginated"] = paginated;
        }
        if (isObject(filters) && Object.entries(filters).length) {
            params["filters"] = filters;
        }
        if (isObject(options) && Object.entries(options).length) {
            params["options"] = options;
        }
        return params;
    }
}

export default new ParamService()
