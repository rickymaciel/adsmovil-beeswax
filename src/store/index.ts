import Vue from 'vue'
import Vuex, { Dispatch } from 'vuex'
import i18n from '@/plugins/i18n';

import AuthService from '@/services/auth-service'
import ProfileService, { ProviderProfile } from '@/services/profile-service'
import PermissionService, { PermissionProfile } from '@/services/permission-service'
import AdvertiserService from '@/services/advertiser-service'
import CustomListService from '@/services/custom-list-service'
import ListItemService from '@/services/list-item-service'
import TypeService from '@/services/type-service'
import AccountService from '@/services/account-service'
import UserService from '@/services/user-service'
import CampaignService from '@/services/campaign-service'
import ModifierService from '@/services/modifier-service'
import CustomListExchangeService from '@/services/custom-list-exchange-service'

import { Credential } from '@/interfaces/credential'
import { Advertiser, AdvertiserDataCreate, AdvertiserDataUpdate, AdvertiserFilters, AdvertiserList, AdvertiserOptions, Category, ResultPaginate } from '@/interfaces/advertiser'
import { MessageTypes, Notification } from '@/interfaces/proccess'
import { isNull, isUndefined } from 'lodash'
import { CustomList, CustomListDataCreate, CustomListFilters, CustomListOptions, CustomListPaginated, CustomListResultPaginate, List, Type } from '@/interfaces/custom_list'

import { resolveList } from '../utils/resolveObjectArray'
import { Campaign, CampaignDataCreate } from '@/interfaces/campaign'
import { Modifier, ModifierList, ModifierFilters, ModifierOptions, ModifierDataCreate, ModifierDataUpdate } from '@/interfaces/modifier'
import notificationService from '@/services/notification-service'
import { ListItemDataCreate, ListItemDataUpdate, ListItemFilters, ListItemOptions } from '@/interfaces/list_items'
import { AxiosError } from 'axios'

/**
 * Hard Code Account
 */
export interface Account {
    id: number,
    name: string,
    currency: {
        id: number,
        key: string,
        name: string,
        glyph: string,
        emoji_flag: string
    },
    timezone: {
        id: number,
        name: string
    }
}

const token = localStorage.getItem('token') || ''

Vue.use(Vuex)

export default new Vuex.Store({
    state: () => ({}),
    mutations: {},
    actions: {},
    modules: {
        proccess: {
            namespaced: true,
            state: () => ({
                loading: false,
                errors: {},
                notification: {
                    message: "",
                    type: "",
                    title: "",
                    show: false,
                    btn_text: "",
                    to: undefined
                } as Notification,
            }),
            mutations: {
                SET_LOADING(state, _loading = false) {
                    state.loading = _loading;
                },
                SET_NOTIFICATION(state, _notification: Notification = { message: "", type: "", title: "", btn_text: "", show: false }) {
                    state.notification = _notification;
                },
                SET_ERRORS(state, _errors: Object = {}) {
                    state.errors = _errors;
                },
            },
            getters: {
                loading(state) {
                    return state.loading
                },
                notification(state) {
                    return state.notification
                },
            },
            actions: {
                async setLoading({ commit }, loading: Boolean) {
                    try {
                        commit('SET_LOADING', loading)
                        return await Promise.resolve()
                    } catch (error) {
                        commit('SET_TOKEN')
                        return await Promise.reject()
                    }
                },
                async setNotification({ commit }, notification: Notification) {
                    try {
                        commit('SET_NOTIFICATION', notification)
                        return await Promise.resolve()
                    } catch (error) {
                        commit('SET_NOTIFICATION')
                        return await Promise.reject()
                    }
                },
                async setErrors({ commit }, errors: Object = {}) {
                    try {
                        commit('SET_ERRORS', errors)
                        return await Promise.resolve()
                    } catch (error) {
                        commit('SET_ERRORS')
                        return await Promise.reject()
                    }
                },
            }
        },
        auth: {
            namespaced: true,
            state: () => ({
                loggedIn: Boolean(token),
                token: token
            }),
            mutations: {
                SET_TOKEN(state, _token = '') {
                    state.token = _token
                    state.loggedIn = Boolean(_token)
                },
            },
            getters: {
                token(state) {
                    return state.token
                },
            },
            actions: {
                async logIn({ commit }, credential: Credential) {
                    try {
                        const response = await AuthService.login(credential)
                        console.log("@@Actions:logIn", { response: response });
                        commit('SET_TOKEN', response.token)
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error("@@Actions:logIn", { error: error });
                        commit('SET_TOKEN')
                        CatcherError(this.dispatch, error, { to: "Root" });
                        return await Promise.reject(error)
                    }
                },
                async signOff({ commit }) {
                    try {
                        const response = await AuthService.logout()
                        commit('SET_TOKEN')
                        localStorage.clear()
                        window.location.href = '/'
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "Root" });
                        return await Promise.reject(error)
                    }
                }
            }
        },
        profile: {
            namespaced: true,
            state: () => ({
                profile: null
            }),
            mutations: {
                SET_PROFILE(state, _profile = null) {
                    state.profile = _profile
                },
            },
            getters: {
                profile(state) {
                    return state.profile
                },
            },
            actions: {
                async fetchProfile({ commit }) {
                    try {
                        const response = await ProfileService.profile()
                        commit('SET_PROFILE', ProviderProfile(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "Root" });
                        return await Promise.reject(error)
                    }
                }
            }
        },
        permissions: {
            namespaced: true,
            state: () => ({
                permissions: []
            }),
            mutations: {
                SET_PERMISSIONS(state, _permissions = []) {
                    state.permissions = _permissions
                },
            },
            getters: {
                permissions(state) {
                    return state.permissions
                },
            },
            actions: {
                async fetchPermissions({ commit }) {
                    try {
                        const response = await PermissionService.permissions()
                        commit('SET_PERMISSIONS', PermissionProfile(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "Root" });
                        return await Promise.reject(error)
                    }
                }
            }
        },
        advertiser: {
            namespaced: true,
            state: () => ({
                result_paginate: {} as ResultPaginate,
                categories: [] as Category[],
                advertiser: {} as Advertiser,
                advertisers: [] as Advertiser[],
                advertisers_list: [] as AdvertiserList[]
            }),
            mutations: {
                SET_RESULT_PAGINATED(state, _result_paginate: ResultPaginate = {} as ResultPaginate) {
                    state.result_paginate = _result_paginate
                },
                SET_CATEGORIES(state, _categories: Category[] = []) {
                    state.categories = _categories
                },
                SET_ADVERTISER(state, _advertiser: Advertiser = {} as Advertiser) {
                    state.advertiser = _advertiser
                },
                SET_ADVERTISERS(state, _advertisers: Advertiser[] = [] as Advertiser[]) {
                    state.advertisers = _advertisers
                },
                SET_ADVERTISERS_LIST(state, _advertisers_list: AdvertiserList[] = [] as AdvertiserList[]) {
                    state.advertisers_list = _advertisers_list
                },
            },
            getters: {
                result_paginate(state): ResultPaginate {
                    return state.result_paginate
                },
            },
            actions: {
                async paginated({ commit }, params) {
                    try {
                        const response = await AdvertiserService.paginated(params)
                        commit('SET_RESULT_PAGINATED', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async getCategories({ commit }) {
                    try {
                        const response = await AdvertiserService.categories();
                        commit('SET_CATEGORIES', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async create({ }, advertiser: AdvertiserDataCreate) {
                    try {
                        const response = await AdvertiserService.create(advertiser);
                        CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('success'),
                                btn_text: i18n.t('continue'),
                                to: "AdvertisersIndex"
                            } as Notification
                        );
                        return Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return Promise.reject(error)
                    }
                },

                async update({ commit }, params: { advertiser: AdvertiserDataUpdate, id: number }) {
                    try {
                        const response = await AdvertiserService.update(params.advertiser, params.id);
                        commit('SET_ADVERTISER', response);
                        CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('success'),
                                btn_text: i18n.t('continue'),
                                to: "AdvertisersIndex"
                            } as Notification
                        );
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async show({ commit }, id: number) {
                    try {
                        const response = await AdvertiserService.show(id);
                        commit('SET_ADVERTISER', response);
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "AdvertisersIndex" });
                        return await Promise.reject(error)
                    }
                },

                async list({ commit }, payload: { filters: AdvertiserFilters, options: AdvertiserOptions }) {
                    try {
                        const response = await AdvertiserService.list(payload.filters, payload.options)
                        commit('SET_ADVERTISERS_LIST', resolveList(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
            }
        },
        custom_list: {
            namespaced: true,
            state: () => ({
                result_paginate: {} as ResultPaginate,
                custom_list: {} as CustomList,
                types: [] as List[],
                model_view: "" as String,
                budget_types: [],
                campaigns_pacing: [],
                optimization_strategies: [],
                kpi_campaigns: [],
                strategies: [],
                unit_times: []
            }),
            mutations: {
                SET_RESULT_PAGINATED(state, _result_paginate: ResultPaginate = {} as ResultPaginate) {
                    state.result_paginate = _result_paginate
                },
                SET_TYPES(state, _types: List[]) {
                    state.types = _types;
                },
                SET_MODEL_VIEW(state, _modelView: String = "") {
                    state.model_view = _modelView;
                },
                SET_CUSTOM_LIST(state, _custom_list: CustomList = {} as CustomList) {
                    state.custom_list = _custom_list;
                },
                SET_BUDGET_TYPES(state, _budget_types: [] = []) {
                    state.budget_types = _budget_types;
                },
                SET_CAMPAIGNS_PACING(state, _campaigns_pacing: [] = []) {
                    state.campaigns_pacing = _campaigns_pacing;
                },
                SET_OPTIMIZATION_STRATEGIES(state, _optimization_strategies: [] = []) {
                    state.optimization_strategies = _optimization_strategies;
                },
                SET_KPI_CAMPAIGNS(state, _kpi_campaigns: [] = []) {
                    state.kpi_campaigns = _kpi_campaigns;
                },
                SET_STRATEGIES(state, _strategies: [] = []) {
                    state.strategies = _strategies;
                },
                SET_UNIT_TIMES(state, _unit_times: [] = []) {
                    state.unit_times = _unit_times;
                },
            },
            getters: {},
            actions: {

                async paginated({ commit }, paginated: CustomListPaginated, filters?: CustomListFilters, options?: CustomListOptions) {
                    try {
                        const response = await CustomListService.paginated(paginated, filters, options)
                        commit('SET_RESULT_PAGINATED', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async getTypes({ commit }) {
                    try {
                        const response: List[] = await TypeService.list()
                        commit('SET_TYPES', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
                async getViewByTypeSelected({ commit }, type: Type) {
                    try {
                        const response = await CustomListService.getViewByTypeSelected(type);
                        commit('SET_MODEL_VIEW', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
                async createCustomList({ commit }, customList: CustomListDataCreate) {
                    try {
                        const response = await CustomListService.create(customList);
                        commit('SET_CUSTOM_LIST', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
                async show({ commit }, id: Number) {
                    try {
                        const response = await CustomListService.show(id);
                        commit('SET_CUSTOM_LIST', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "CustomListIndex" });
                        return await Promise.reject(error)
                    }
                },

                async getBudgetTypes({ commit }) {
                    try {
                        const response = await CustomListService.budgetTypes()
                        commit('SET_BUDGET_TYPES', resolveList(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async getCampaignPacing({ commit }) {
                    try {
                        const response = await CustomListService.campaignPacing()
                        commit('SET_CAMPAIGNS_PACING', resolveList(response))

                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async getOptimizationStrategies({ commit }) {
                    try {
                        const response = await CustomListService.optimizationStrategies()
                        commit('SET_OPTIMIZATION_STRATEGIES', resolveList(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async getKpiCampaigns({ commit }) {
                    try {
                        const response = await CustomListService.kpiCampaigns()
                        commit('SET_KPI_CAMPAIGNS', resolveList(response))

                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async getStrategies({ commit }) {
                    try {
                        const response = await CustomListService.strategies()
                        commit('SET_STRATEGIES', resolveList(response))

                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async getUnitTimes({ commit }) {
                    try {
                        const response = await CustomListService.unitTimes()
                        commit('SET_UNIT_TIMES', resolveList(response))

                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
            }
        },
        listItem: {
            namespaced: true,
            state: () => ({
                item: {} as any,
                items: [] as any[],
                entities: [] as any[],
            }),
            mutations: {
                SET_ITEM(state, _item: any = {} as any) {
                    state.item = _item;
                },
                SET_ITEM_LIST(state, _items_list: [] = []) {
                    state.items = _items_list;
                },
                SET_ALL_ENTITIES(state, _entities: [] = []) {
                    state.entities = _entities;
                },
            },
            getters: {},
            actions: {
                async uploadFile({ commit }, upload: any) {
                    try {
                        const response = await ListItemService.upload(upload)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "" });
                        return await Promise.reject(error)
                    }
                },
                
                async create({ commit }, params: {listItem: any, customListType: string}) {
                //dejamos de usar el parametro customListType por sugerencia de Ricki
                //async create({ commit }, entity: ListItemDataCreate) {
                    try {
                        const response = await ListItemService.create(params?.listItem, params?.customListType);
                        commit('SET_ITEM', response);
                        /*CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('success'),
                                btn_text: i18n.t('continue'),
                                to: ""
                            } as Notification
                        );*/
                        return Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "" });
                        return Promise.reject(error)
                    }
                },

                async update({ commit }, params: {listItem: any, customListType: string}) {
                //dejamos de usar el parametro customListType por sugerencia de Ricki
                //async update({ commit }, entity: ListItemDataUpdate) {
                    try {
                        const response = await ListItemService.update(params?.listItem, params?.customListType);
                        commit('SET_ITEM', response);
                        /*CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('success'),
                                btn_text: i18n.t('continue'),
                                to: ""
                            } as Notification
                        );*/
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "" });
                        return await Promise.reject(error)
                    }
                },

                async show({ commit }, id: number) {
                    try {
                        const response = await ListItemService.show(id);
                        commit('SET_ITEM', response);
                        CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('success'),
                                btn_text: i18n.t('continue'),
                                to: ""
                            } as Notification
                        );
                        return await Promise.resolve(response)
                    } catch (error) {
                        commit('SET_ITEM');
                        CatcherError(this.dispatch, error, { to: "" });
                        return await Promise.reject(error)
                    }
                },

                async delete({ commit }, id: number) {
                    try {
                        /*const response = await ListItemService.delete(id);*/
                        commit('SET_ITEM');
                        CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('not-implemented-yet'),
                                btn_text: i18n.t('continue'),
                                to: ""
                            } as Notification
                        );
                        /*return await Promise.resolve(response)*/
                        return await Promise.resolve({success: true, id: id});
                    } catch (error) {
                        commit('SET_ITEM');
                        CatcherError(this.dispatch, error, { to: "" });
                        return await Promise.reject(error)
                    }
                },

                async list({ commit }, payload: { filters: ListItemFilters, options: ListItemOptions }) {
                    try {
                        const response = await ListItemService.list(payload.filters, payload.options);
                        commit('SET_ITEM_LIST', resolveList(response));
                        CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('success'),
                                btn_text: i18n.t('continue'),
                                to: ""
                            } as Notification
                        );
                        return await Promise.resolve(response);
                    } catch (error) {
                        commit('SET_ITEM_LIST')
                        CatcherError(this.dispatch, error, { to: "" });
                        return await Promise.reject(error)
                    }
                },
                async getAllByCustomId({ commit }, customList: any) {
                    try {
                        const entities = await ListItemService.getAllByCustomId(customList?.id);

                        let response: any[] = [];
                        const modelView = await CustomListService.getViewByTypeSelectedById(customList?.custom_list_type_id);
                        switch (modelView) {
                            case "ModelOne":
                                entities.forEach(item => {
                                    let r = {
                                        id: item?.id,
                                        list_item: Array.isArray(item.list_item) ? item?.list_item[0].toString() : item?.list_item,
                                        value: item?.value,
                                        name: item?.name,
                                        actions: item?.actions ? item?.actions : [],
                                        active: item?.active,
                                    };
                                    response.push(r);
                                });
                                break;
                            case "ModelTwo":
                                entities.forEach(item => {
                                    let r = {
                                        id: item?.id,
                                        list_item :{
                                            lat: item?.list_item?.lat,
                                            long: item?.list_item?.long,
                                            radius_km: item?.list_item?.radius_km,
                                        },
                                        value: item?.value,
                                        name: item?.name,
                                        actions: item?.actions ? item?.actions : [],
                                        active: item?.active,
                                    };
                                    response.push(r);
                                });
                                break;
                            case "ModelTree":
                                const customListExchange  = await CustomListExchangeService.all();
                                entities.forEach(item => {

                                    let parameters: String[] = [];
                                    if( Array.isArray(item.list_item) ){
                                        parameters = item?.list_item[0].toString().split("/");}
                                    else{
                                        parameters = item?.list_item?.split("/");}

                                    let type = customListExchange?.data.find(t => t.abbreviation == parameters[0]);
                                    if( parameters?.length == 2 && type ){
                                        let r = {
                                            id: item?.id,
                                            list_item_prefix: type.id,
                                            list_item_prefix_text: parameters[0],
                                            list_item_value: parameters[1],
                                            value: item?.value,
                                            name: item?.name,
                                            actions: item?.actions ? item?.actions : [],
                                            active: item?.active,
                                        };
                                        response.push(r);
                                    }
                                });
                                break;
                        }
                        commit('SET_ALL_ENTITIES', response);
                        return await Promise.resolve(response);
                    } catch (error) {
                        commit('SET_ALL_ENTITIES')
                        return await Promise.reject(error)
                    }
                },
            }
        },
        account: {
            namespaced: true,
            state: () => ({
                result_paginate: {} as ResultPaginate,
                account: {} as Category,
            }),
            mutations: {
                SET_RESULT_PAGINATED(state, _result_paginate: ResultPaginate) {
                    state.result_paginate = _result_paginate
                },
                SET_ACCOUNT(state, _account: Account = {} as Account) {
                    state.account = _account
                }
            },
            getters: {
                result_paginate(state): ResultPaginate {
                    return state.result_paginate
                },
            },
            actions: {
                async getAccount({ commit }) {
                    try {
                        const response = await AccountService.account()
                        commit('SET_ACCOUNT', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "Dashboard" });
                        return await Promise.reject(error)
                    }
                },
            }
        },
        users: {
            namespaced: true,
            state: () => ({
                custom_list_result_paginate: {} as CustomListResultPaginate,
                users: [],
            }),
            mutations: {
                SET_CUSTOM_LIST_RESULT_PAGINATED(state, _custom_list_result_paginate: CustomListResultPaginate) {
                    state.custom_list_result_paginate = _custom_list_result_paginate
                },
                SET_USERS(state, _users = []) {
                    state.users = _users;
                },
            },
            getters: {
            },
            actions: {
                async getUsers({ commit }, params) {
                    try {
                        const response = await UserService.list(params.filters, params.options);
                        commit('SET_USERS', resolveList(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "AdvertisersIndex" });
                        return await Promise.reject(error)
                    }
                },
            }
        },
        campaign: {
            namespaced: true,
            state: () => ({
                result_paginate: {} as ResultPaginate,
                campaign: {} as Campaign,
                campaigns: [] as Campaign[],
            }),
            mutations: {
                SET_CAMPAIGN(state, _campaign: Campaign = {} as Campaign) {
                    state.campaign = _campaign
                },
                SET_RESULT_PAGINATED(state, _result_paginate: ResultPaginate = {} as ResultPaginate) {
                    state.result_paginate = _result_paginate
                },
            },
            getters: {
            },
            actions: {

                async create({ }, campaign: CampaignDataCreate) {
                    try {
                        const response = await CampaignService.create(campaign)
                        CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('success'),
                                btn_text: i18n.t('continue'),
                                to: "CampaignsIndex"
                            } as Notification
                        );
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async update({ commit }, campaign: Campaign) {
                    try {
                        const response = await CampaignService.update(campaign)
                        commit('SET_CAMPAIGN', response);
                        CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('success'),
                                btn_text: i18n.t('continue'),
                                to: "CampaignsIndex"
                            } as Notification
                        );
                        return await Promise.resolve(response)

                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async show({ commit }, id: number) {
                    try {
                        const response = await CampaignService.show(id);
                        commit('SET_CAMPAIGN', response);
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "CampaignsIndex" });
                        return await Promise.reject(error)
                    }
                },
                async paginated({ commit }, params) {
                    try {
                        const response = await CampaignService.paginated(params)
                        commit('SET_RESULT_PAGINATED', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
            }
        },
        modifier: {
            namespaced: true,
            state: () => ({
                result_paginate: {} as ResultPaginate,
                modifiers: [] as Modifier[],
                modifier: {} as Modifier,
                modifiers_list: [] as Modifier[],
            }),
            mutations: {
                SET_RESULT_PAGINATED(state, _result_paginate: ResultPaginate = {} as ResultPaginate) {
                    state.result_paginate = _result_paginate
                },
                SET_MODIFIER(state, _modifier: Modifier = {} as Modifier) {
                    state.modifier = _modifier
                },
                SET_MODIFIERS(state, _modifiers: Modifier[] = [] as Modifier[]) {
                    state.modifiers = _modifiers
                },
                SET_MODIFIERS_LIST(state, _modifiers_list: ModifierList[] = [] as ModifierList[]) {
                    state.modifiers_list = _modifiers_list
                }
            },
            getters: {
                result_paginate(state): ResultPaginate {
                    return state.result_paginate
                },
            },
            actions: {
                async paginated({ commit }, filters?: ModifierFilters, options?: ModifierOptions) {
                    try {
                        const response = await ModifierService.paginated(filters, options)
                        commit('SET_RESULT_PAGINATED', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async createModifier({ commit }, modifier: ModifierDataCreate) {
                    try {
                        const response = await ModifierService.create(modifier)
                        commit('SET_MODIFIER', response);
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async showModifier({ commit }, id: number) {
                    try {
                        const response = await ModifierService.show(id);
                        commit('SET_MODIFIER', response);
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "ModifiersIndex" });
                        return await Promise.reject(error)
                    }
                },

                async updateModifier({ commit }, params: { modifier: ModifierDataUpdate, id: number }) {
                    try {
                        const response = await ModifierService.update(params.modifier, params.id);
                        commit('SET_MODIFIER', response);
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "ModifiersIndex" });
                        return await Promise.reject(error)
                    }
                },

                async list({ commit }, payload: { filters: ModifierFilters, options: ModifierOptions }) {
                    try {

                        const response = await ModifierService.list(payload.filters, payload.options)
                        commit('SET_MODIFIERS_LIST', resolveList(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
            }
        },
        customListExchange: {
            namespaced: true,
            state: () => ({
                entities: [] as any[],
            }),
            mutations: {
                SET_ENTITIES(state, _entities: [] = []) {
                    state.entities = _entities;
                },
            },
            getters: {},
            actions: {
                async all({ commit }) {
                    try {
                        const response = await CustomListExchangeService.all();
                        if( response?.success ){
                            let list: any[] = [];
                            response?.data.map( e => {
                                list.push({
                                    id: e.id,
                                    abbreviation: e.abbreviation,
                                    description: e.description,
                                })
                            });
                            commit('SET_ENTITIES', list);
                        }else{commit('SET_ENTITIES');}
                        return await Promise.resolve(response?.data);
                    } catch (error) {
                        commit('SET_ENTITIES')
                        return await Promise.reject(error)
                    }
                },
            }
        },
    }
})

/**
 * Create Notification
 * @param dispatch 
 * @param params 
 */
export async function CreateNotification(dispatch: Dispatch, params: Notification) {
    dispatch("proccess/setNotification", await notificationService.CreateNotification(params), { root: true });
};

/**
 * Validation Errors
 * @param dispatch 
 * @param error 
 */
export function Errors(dispatch: Dispatch, error: any) {
    if (!isUndefined(error.errors) && !isNull(error.errors) && typeof error.errors === 'object' && Object.entries(error.errors).length > 0) {
        dispatch('proccess/setErrors', error.errors, { root: true });
    }
}

/**
 * CatcherError
 * @param dispatch 
 * @param error AxiosError
 * @param params { to?: string }
 */
export function CatcherError(dispatch: Dispatch, error: AxiosError, params?: { to?: string }) {
    console.log("CatcherError", {
        error: error,
        params: params
    });
    Errors(dispatch, error);
    CreateNotification(dispatch, {
        type: MessageTypes.ERROR,
        title: i18n.t('title-failed'),
        message: error.message,
        to: params?.to,
        btn_text: isUndefined(params?.to) ? i18n.t(MessageTypes.TRYAGAIN) : i18n.t(MessageTypes.CONTINUE)
    } as Notification);
}
