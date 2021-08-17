import { AppName, AppSite, Site } from "@/interfaces/appSite";
import { Targeting, TargetingDataCreate } from "@/interfaces/targeting";
import { mappingTargetingKeys } from "@/utils/resolveObjectArray";
import { isEmpty } from "lodash";
import { AxiosGet, AxiosPost, GetData, GetErrors, GetMessage } from "./axios-service";

const { APP_SITE, CUSTOM_LIST, TARGETING, GEO, EXCHANGE, ENVIROMENT, PLATFORM } = require('../api/routes');

class TargetingService {

    async create(targeting: TargetingDataCreate) {
        try {
            if (isEmpty(targeting.targeting_terms)) return Promise.reject({
                success: false,
                message: 'Targeting empty',
                errors: []
            });
            const response = await AxiosPost(TARGETING.TARGETING_ROUTE, targeting)
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
            const response = await AxiosGet(`${TARGETING.TARGETING_KEY_ROUTE}?mode=all`);
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
     * getTargetingKey
     * @param key 
     * @returns 
     */
    async getTargetingKey(key: String) {
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
            const url = APP_SITE.APP_NAME_ROUTE + '?term=' + term + '&by_attribute=' + by_attribute;
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
            const url = APP_SITE.SITE_ROUTE + '?term=' + term + '&by_attribute=' + by_attribute;
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
            const response = await AxiosGet(TARGETING.TARGETING_PREDICATE_ROUTE)
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
                url = APP_SITE.APP_BUNDLE_LIST_ROUTE
                break
            case 'app_id_list':
                url = APP_SITE.APP_ID_ROUTE
                break
            case 'deal_id':
                url = CUSTOM_LIST.CUSTOM_LIST_EXCHANGE_ROUTE
                //url = ROUTES.DEAL_ID_ROUTE
                break
            case 'deal_id_list':
                url = APP_SITE.DEAL_ID_LIST_ROUTE
                break
            case 'domain_list':
                url = APP_SITE.DOMAIN_ROUTE
                break
            case 'placement_id':
                url = APP_SITE.PLACEMENT_ROUTE
                break
            case 'placement_list':
                url = APP_SITE.PLACEMENT_ROUTE
                break
            case 'publisher_id':
                url = APP_SITE.PUBLISER_ID_ROUTE
                break
            case 'publisher_id_list':
                url = APP_SITE.PUBLISER_ID_LIST_ROUTE
                break
            case 'site_list':
                url = APP_SITE.SITE_LIST_ROUTE
                break

            /**
             * geo
             */
            case 'city':
                url = GEO.CITY_ROUTE
                break

            case 'country':
                url = GEO.COUNTRY_ROUTE
                break

            case 'region':
                url = GEO.REGION_ROUTE
                break

            case 'lat_long_list':
                url = GEO.LAT_LONG_ROUTE
                break

            /**
             * exchange
             */
            case 'inventory_source':
                url = EXCHANGE.INVENTORY_SOURCE_ROUTE
                break

            case 'auction_type':
                url = EXCHANGE.AUCTION_TYPE_ROUTE
                break

            /**
             * environment
             */
            case 'environment_type':
                url = ENVIROMENT.ENVIROMENT_TYPE_ROUTE
                break

            case 'topframe':
                url = ENVIROMENT.ENVIROMENT_TPFRAME_ROUTE
                break

            case 'video_api':
                url = ENVIROMENT.ENVIROMENT_VIDEO_ROUTE
                break

            /**
             * platform
             */
            case 'browser':
                url = PLATFORM.PLATFORM_BROWSER_ROUTE
                break

            case 'browser_version':
                url = PLATFORM.PLATFORM_BROWSER_VERSION_ROUTE
                break

            case 'carrier':
                url = PLATFORM.PLATFORM_CARRIER_ROUTE
                break

            case 'device_type':
                url = PLATFORM.PLATFORM_DEVICE_TYPE_ROUTE
                break

            case 'device_make':
                url = PLATFORM.PLATFORM_DEVICE_MAKE_ROUTE
                break

            case 'device_model':
                url = PLATFORM.PLATFORM_DEVICE_MODEL_ROUTE
                break

            case 'device_screen_size':
                url = PLATFORM.PLATFORM_DEVICE_SCREEN_SIZE_ROUTE
                break

            case 'operating_system':
                url = PLATFORM.PLATFORM_OPERATING_SYSTEM_ROUTE
                break

            case 'operating_system_version':
                url = PLATFORM.PLATFORM_OPERATING_SYSTEM_VERSION_ROUTE
                break
        }

        return url
    }
}

export default new TargetingService()
