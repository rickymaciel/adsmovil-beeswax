import { resolveList, resolveListParams } from '@/utils/resolveObjectArray';
export const CREATIVE_ASSOCIATE_ROUTE = 'api/creative_line_associations'
import {
    CreativeFilters,
    CreativeOptions,
    CreativePaginated,
    TagCheck
} from "@/interfaces/creative";
import { AssociationDataCreate } from "@/interfaces/creativeAssociation";
import { ImageDataCreate } from "@/interfaces/creativeBannerImage";
import {
    AxiosDelete,
    AxiosGet,
    AxiosPatch,
    AxiosPost,
    GetData,
    GetErrors,
    GetMessage
} from "./axios-service";

export const CREATIVE_SIZES_ROUTE = "/api/list/creative_sizes";
export const CREATIVE_TEMPLATES_ROUTE = "/api/list/creative_templates";
export const CREATIVE_TYPES_ROUTE = "/api/list/creative_types";
export const CREATIVE_CATEGORIES_ROUTE = "/api/list/advertiser_categories";
export const CREATIVE_MIME_TYPES_ROUTE = "/api/list/mime_types";
export const CREATIVE_CREATIVE_RULES_ROUTE = "/api/list/creative_rules";
export const CREATIVE_EXPANDABLE_TYPES = "/api/list/expandable_types";
export const CREATIVE_EXPANDABLE_DIRECTIONS = "/api/list/expandable_directions";
export const CREATIVE_IN_BANNER_VIDEOS = "/api/list/inbanner_videos";
export const CREATIVE_VENDORS = "/api/list/creative_vendors";
export const CREATIVE_ADDONS = "/api/creative_addons";
export const CREATIVE_ASSETS = "/api/creative_assets";
export const ASSET_TYPES = "/api/list/asset_types";
export const CREATIVES = "/api/creatives";
export const CREATIVE_TAG_ROUTE = "api/creatives/check_tag";
import { isEmpty, isNull, isUndefined } from "lodash";

class CreativeService {
    async paginated(
        filters?: CreativeFilters,
        options?: CreativeOptions,
        paginated?: CreativePaginated
    ) {
        try {
            let filter = "";
            let option = "";

            if (!isUndefined(filters)) {
                filter = getFilters(filters);
            }

            if (!isUndefined(options)) {
                option += getOptions(options, "paginated", paginated);
            }

            const url = getURL(filter, option);
            const response = await AxiosGet(CREATIVES + url);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async list(filters?: CreativeFilters, options?: CreativeOptions) {
        try {
            //const response = await AxiosGet(`${CREATIVES}?mode=list&filters[active]=true`)
            const response = await AxiosGet(`${CREATIVES}?mode=list`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async creativeSizes() {
        try {
            const response = await AxiosGet(`${CREATIVE_SIZES_ROUTE}?mode=list`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async creativeTemplates() {
        try {
            const response = await AxiosGet(`${CREATIVE_TEMPLATES_ROUTE}?mode=list`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async creativeTypes() {
        try {
            const response = await AxiosGet(`${CREATIVE_TYPES_ROUTE}?mode=list`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async advertiserCategories() {
        try {
            const response = await AxiosGet(`${CREATIVE_CATEGORIES_ROUTE}?mode=list`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async mimeTypes() {
        try {
            const response = await AxiosGet(`${CREATIVE_MIME_TYPES_ROUTE}?mode=list`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async creativeRules() {
        try {
            const response = await AxiosGet(
                `${CREATIVE_CREATIVE_RULES_ROUTE}?mode=list`
            );
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async expandableTypes() {
        try {
            const response = await AxiosGet(`${CREATIVE_EXPANDABLE_TYPES}?mode=list`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async expandableDirections() {
        try {
            const response = await AxiosGet(`${CREATIVE_EXPANDABLE_TYPES}?mode=list`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async inBannerVideos() {
        try {
            const response = await AxiosGet(`${CREATIVE_IN_BANNER_VIDEOS}?mode=list`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async vendors() {
        try {
            const response = await AxiosGet(`${CREATIVE_VENDORS}?mode=list`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async addons() {
        try {
            const response = await AxiosGet(`${CREATIVE_ADDONS}?mode=list`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async assetTypes() {
        try {
            const response = await AxiosGet(`${ASSET_TYPES}`);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async assets(params: { filters?: CreativeFilters }) {
        try {
            let filter = "";

            if (!isUndefined(params.filters)) {
                filter = getFilters(params.filters);
            }

            const response = await AxiosGet(`${CREATIVE_ASSETS}?${filter}&mode=list`);
            console;
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async creativeAssets(params: any) {
        try {
            const response = await AxiosPost(`${CREATIVE_ASSETS}`, params, true);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async validateTag(tag: TagCheck) {
        try {
            const response = await AxiosPost(`${CREATIVE_TAG_ROUTE}`, tag);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    /**
     * Creative
     * @param params
     * @returns
     */
    async CreateNewCreative(params: any) {
        try {
            const response = await AxiosPost(`${CREATIVES}`, params);
            return Promise.resolve(GetData(response));
        } catch (error) {
            console.error("CreativeService::CreateNewCreative", { error: error });
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    /**
     * Creative
     * @param params
     * @returns
     */
     async UpdateCreative(params: any) {
        try {
            const response = await AxiosPatch(`${CREATIVES}`, params);
            return Promise.resolve(GetData(response));
        } catch (error) {
            console.error("CreativeService::CreateUpdateCreative", { error: error });
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async show(id: number) {
        try {
            console.log("--- CreativeService::show(id)", id);
            const response = await AxiosGet(`${CREATIVES}/${id}`);
            console.log("--- CreativeService::Response", response);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async associateLineItem(association: AssociationDataCreate) {
        try {
            const response = await AxiosPost(`${CREATIVE_ASSOCIATE_ROUTE}`, association);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async associateLineItemDelete(id: number) {
        try {
            const response = await AxiosDelete(CREATIVE_ASSOCIATE_ROUTE + '/' + id);
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async associateLineItemUpdate(association: any) {
        try {
            const response = await AxiosPatch(`${CREATIVE_ASSOCIATE_ROUTE}/${association.id}`, association);
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

/* function getFilters(filters: CreativeFilters): string {
    let filter = '';

    const external_id = (isUndefined(filters.external_id)) ? '' : filters.external_id
    if( !isUndefined(filters.external_id) ){filter += 'filters[external_id]=' + external_id}
    const alternative_id = (isUndefined(filters.alternative_id)) ? '' : filters.alternative_id
    if( !isUndefined(filters.alternative_id) ){filter += '&filters[alternative_id]=' + alternative_id}
    const name = (isUndefined(filters.name)) ? '' : filters.name
    if( !isUndefined(filters.name) ){filter += '&filters[name]=' + name}
    const model_type_id = (isUndefined(filters.model_type_id)) ? '' : filters.model_type_id
    if( !isUndefined(filters.model_type_id) ){filter += '&filters[model_type_id]=' + model_type_id}
    const active = (isUndefined(filters.active)) ? '' : filters.active ? '1' : '0'
    if( !isUndefined(filters.active) ){filter += '&filters[active]=' + active}
    const advertiser_id = (isUndefined(filters.advertiser_id)) ? '' : filters.advertiser_id
    if( !isUndefined(filters.advertiser_id) ){filter += '&filters[advertiser.id]=' + advertiser_id}
    const creative_type_id = (isUndefined(filters.creative_type_id)) ? '' : filters.creative_type_id
    if( !isUndefined(filters.creative_type_id) ){filter += '&filters[creative_type_id]=' + creative_type_id}
    
    return filter
} */
function hasData(data: any): Boolean {
    return !isUndefined(data) && !isNull(data);
}

function getFilters(filters: CreativeFilters): string {

    console.log('getFilters', { filters });

    let filter = "";

    const id = hasData(filters.id) ? filters.id : "";
    const name = hasData(filters.name) ? filters.name : "";
    const external_id = hasData(filters.external_id) ? filters.external_id : "";
    const creative_type_name = hasData(filters.creative_type_name) ? filters.creative_type_name : ""; // type
    const creative_size_name = hasData(filters.creative_size_name) ? filters.creative_size_name : ""; // size
    const alternative_id = hasData(filters.alternative_id) ? filters.alternative_id : "";
    const advertiser_id = hasData(filters.advertiser_id) ? filters.advertiser_id : "";
    const model_type_id = hasData(filters.model_type_id) ? filters.model_type_id : "";
    const asset_type_id = hasData(filters.asset_type_id) ? filters.asset_type_id : "";
    const active = hasData(filters.active) ? filters.active ? 1 : 0 : "";
    const creative_type_id = hasData(filters.creative_type_id) ? filters.creative_type_id : "";

    console.log('getFilters', { creative_type_name });

    filter +=
        "filters[id]=" + id +
        "&filters[name]=" + name +
        "&filters[external_id]=" + external_id +
        "&filters[creative_type.description]=" + creative_type_name +
        "&filters[creative_size.name]=" + creative_size_name +
        "&filters[alternative_id]=" + alternative_id +
        "&filters[advertiser.id]=" + advertiser_id +
        "&filters[advertiser_id]=" + advertiser_id +
        "&filters[model_type_id]=" + model_type_id +
        "&filters[asset_type_id]=" + asset_type_id +
        "&filters[creative_type_id]=" + creative_type_id +
        "&filters[active]=" + active;

    return filter;
}

function getOptions(
    options: CreativeOptions,
    mode: string,
    paginated?: CreativePaginated
): string {
    let option = "";

    const sort = isUndefined(options.sort) ? "" : options.sort;
    const order = isUndefined(options.order) ? "" : options.order;

    option += "sort=" + sort + "&order=" + order + "&mode=" + mode;

    if (mode == "paginated") {
        option += "&page=" + paginated?.page + "&limit=" + paginated?.limit;
    }

    return option;
}

function getURL(filters: string, options: string): string {
    let url = "";

    if (!isEmpty(filters) && !isEmpty(options)) {
        url = "?" + filters + "&" + options;
    } else if (!isEmpty(filters)) {
        url = "?" + filters;
    } else if (!isEmpty(options)) {
        url = "?" + options;
    }

    return url;
}

export default new CreativeService();
