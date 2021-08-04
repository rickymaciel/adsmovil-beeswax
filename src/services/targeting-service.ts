import { AppName, AppSite, Site } from "@/interfaces/appSite";
import { Targeting, TargetingDataCreate } from "@/interfaces/targeting";
import { mappingTargetingKeys } from "@/utils/resolveObjectArray";
import { isEmpty } from "lodash";
import { AxiosGet, AxiosPost, GetData, GetErrors, GetMessage } from "./axios-service";

const ROUTES = require('../api/routes').APP_SITE
const ROUTES_CUSTOM_LIST = require('../api/routes').CUSTOM_LIST
const ROUTES_TARGETING = require('../api/routes').TARGETING
const ROUTES_GEO = require('../api/routes').GEO
const ROUTES_EXCHANGE = require('../api/routes').EXCHANGE

class TargetingService {

    async create(targeting: TargetingDataCreate) {
        try {
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
     * getTargetingKeys
     * @returns 
     */
    async getTargetingKeys() {
        try {
            const response = await AxiosGet(`${ROUTES_TARGETING.TARGETING_KEY_ROUTE}?mode=all`);
            const data = GetData(response);
            const targeting_keys = mappingTargetingKeys(data)
            return Promise.resolve(targeting_keys as Array<any>);

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
     * getSearchByTerm
     * @param params 
     * @returns 
     */
    async getSearchByTerm(params: { key: any; term: any; object?: { key: String; value: String; } | undefined; by_attribute?: any; }) {
        try {

            let url = await this.getUrlByKey(params.key) + '?term=' + params.term;

            if (params.by_attribute) {
                url = url.concat('&by_attribute=' + params.by_attribute);
            }

            const response = await AxiosGet(url);

            return Promise.resolve(GetData(response) as Array<any>);

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
    
    async getTargetingPredicates() {
        try {
            const response = await AxiosGet(ROUTES_TARGETING.TARGETING_PREDICATE_ROUTE)
            return Promise.resolve(GetData(response));

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

            /**
             * app_site
             */
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

            /**
             * geo
             */
            case 'city':
                url = ROUTES_GEO.CITY_ROUTE
                break

            case 'country':
                url = ROUTES_GEO.COUNTRY_ROUTE
                break

            case 'region':
                url = ROUTES_GEO.REGION_ROUTE
                break

            case 'lat_long_list':
                url = ROUTES_GEO.LAT_LONG_ROUTE
                break

            /**
             * exchange
             */
            case 'inventory_source':
                url = ROUTES_EXCHANGE.INVENTORY_SOURCE_ROUTE
                break

            case 'auction_type':
                url = ROUTES_EXCHANGE.AUCTION_TYPE_ROUTE
                break
        }

        return url
    }
}

export default new TargetingService()
