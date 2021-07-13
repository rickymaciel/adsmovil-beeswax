import { TagCheck } from '@/interfaces/creative';
import { AssociationDataCreate } from '@/interfaces/creativeAssociation';
import { ImageDataCreate } from '@/interfaces/creativeBannerImage';
import { AxiosGet, AxiosPost, GetData, GetErrors, GetMessage } from './axios-service';

export const CREATIVE_SIZES_ROUTE = '/api/list/creative_sizes'
export const CREATIVE_TEMPLATES_ROUTE = '/api/list/creative_templates'
export const CREATIVE_TYPES_ROUTE = '/api/list/creative_types'
export const CREATIVE_CATEGORIES_ROUTE = '/api/list/advertiser_categories'
export const CREATIVE_MIME_TYPES_ROUTE = '/api/list/mime_types'
export const CREATIVE_CREATIVE_RULES_ROUTE = '/api/list/creative_rules'
export const CREATIVE_EXPANDABLE_TYPES = '/api/list/expandable_types'
export const CREATIVE_EXPANDABLE_DIRECTIONS = '/api/list/expandable_directions'
export const CREATIVE_IN_BANNER_VIDEOS = '/api/list/inbanner_videos'
export const CREATIVE_VENDORS = '/api/list/creative_vendors'
export const CREATIVE_ADDONS = '/api/creative_addons'
export const CREATIVE_ASSETS = '/api/creative_assets'
export const CREATIVES = '/api/creatives'
export const CREATIVE_TAG_ROUTE = 'api/creatives/check_tag'
export const CREATIVE_ASSOCIATE_ROUTE = 'api/creative_line_associations'

class CreativeService {

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
            const response = await AxiosGet(`${CREATIVE_CREATIVE_RULES_ROUTE}?mode=list`);
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
            console
            return Promise.resolve(GetData(response));
        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async assets() {
        try {
            const response = await AxiosGet(`${CREATIVE_ASSETS}?mode=list`);
            console
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


    async show(id: number) {
        try {
            const response = await AxiosGet(`${CREATIVES}/${id}`);
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
            console.log("CreativeService::associateLineItem", { response: response });
            return Promise.resolve(GetData(response));
        } catch (error) {
            console.error("CreativeService::associateLineItem", { error: error });
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }
}

export default new CreativeService()
