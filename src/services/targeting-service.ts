import { AppName, AppSite, Site } from "@/interfaces/appSite";
import { Targeting, TargetingDataCreate } from "@/interfaces/targeting";
import { isEmpty } from "lodash";
import { AxiosGet, AxiosPost, GetData, GetErrors, GetMessage } from "./axios-service";

const ROUTES = require('../api/routes').APP_SITE
const ROUTES_CUSTOM_LIST = require('../api/routes').CUSTOM_LIST
const ROUTES_TARGETING = require('../api/routes').TARGETING

class TargetingService {

    async create(targeting: TargetingDataCreate) {
        try {
            console.log("TargetingService::create", { targeting });
            if (isEmpty(targeting.targeting_terms)) return Promise.reject({
                success: false,
                message: 'Targeting empty',
                errors: []
            });
            const response = await AxiosPost(ROUTES_TARGETING.TARGETING_ROUTE, targeting)
            return Promise.resolve(GetData(response) as Array<Targeting>);

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    /**
     * getAppSitesByKey
     * @param key 
     * @returns 
     */
    async getAppSitesByKey(key: String) {
        try {
            console.log("TargetingService::getAppSitesByKey", { key, url: await this.getUrlByKey(key) });
            const response = await AxiosGet(await this.getUrlByKey(key))
            return Promise.resolve(GetData(response) as Array<AppSite>);

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    /**
     * getAppNameByAtribute
     * @param term 
     * @param by_attribute 
     * @returns 
     */
    async getAppNameByAtribute(term: String, by_attribute: String) {
        try {
            const url = ROUTES.APP_NAME_ROUTE + '?term=' + term + '&by_attribute=' + by_attribute;
            const response = await AxiosGet(url)
            return Promise.resolve(GetData(response) as Array<AppName>);

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    /**
     * getSitesByAtribute
     * @param term 
     * @param by_attribute 
     * @returns 
     */
    async getSitesByAtribute(term: String, by_attribute: String) {
        try {
            const url = ROUTES.SITE_ROUTE + '?term=' + term + '&by_attribute=' + by_attribute;
            const response = await AxiosGet(url)
            return Promise.resolve(GetData(response) as Array<Site>);

        } catch (error) {
            return Promise.reject({
                success: false,
                message: GetMessage(error),
                errors: GetErrors(error)
            });
        }
    }

    async getUrlByKey(key: String) {
        let url = ''

        switch (key) {
            case 'app_bundle_list':
                url = ROUTES.APP_BUNDLE_LIST_ROUTE
                break
            case 'app_id_list':
                url = ROUTES.APP_ID_ROUTE
                break
            case 'deal_id':
                url = ROUTES_CUSTOM_LIST.CUSTOM_LIST_EXCHANGE_ROUTE
                //url = ROUTES.DEAL_ID_ROUTE
                break
            case 'deal_id_list':
                url = ROUTES.DEAL_ID_LIST_ROUTE
                break
            case 'domain_list':
                url = ROUTES.DOMAIN_ROUTE
                break
            case 'placement_id':
                url = ROUTES.PLACEMENT_ROUTE
                break
            case 'placement_list':
                url = ROUTES.PLACEMENT_ROUTE
                break
            case 'publisher_id':
                url = ROUTES.PUBLISER_ID_ROUTE
                break
            case 'publisher_id_list':
                url = ROUTES.PUBLISER_ID_LIST_ROUTE
                break
            case 'site_list':
                url = ROUTES.SITE_LIST_ROUTE
                break
        }

        return url
    }
}

export default new TargetingService()
