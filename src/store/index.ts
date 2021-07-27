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
import LineItemService from '@/services/line-item-service'
import CreativeService from '@/services/creative-service'
import TargetingService from '@/services/targeting-service'

import { Credential } from '@/interfaces/credential'
import { Advertiser, AdvertiserDataCreate, AdvertiserDataUpdate, AdvertiserList, Category, ResultPaginate } from '@/interfaces/advertiser'
import { MessageTypes, Notification } from '@/interfaces/proccess'
import { isArray, isEmpty, isNull, isUndefined } from 'lodash'
import { CustomList, CustomListDataCreate, List, Type } from '@/interfaces/custom_list'
import { ResultPaginate as UserResultPaginate, UserDataCreate, User } from '@/interfaces/user'

import { getCreativeTypeByTemplateId, resolveList, resolveListParams, resolveTemplates } from '../utils/resolveObjectArray'
import { Campaign, CampaignDataCreate, CampaingList } from '@/interfaces/campaign'
import { Modifier, ModifierList, ModifierFilters, ModifierOptions, ModifierDataCreate, ModifierDataUpdate } from '@/interfaces/modifier'
import notificationService from '@/services/notification-service'
import { ListItemFilters, ListItemOptions } from '@/interfaces/list_items'
import { AxiosError } from 'axios'
import { LineItem, LineItemDataCreate, LineItemFilters, LineItemOptions } from '@/interfaces/line_item';
import lineItemTypeService from '@/services/line-item-type-service';
import { UserDataUpdate } from '../interfaces/user';
import { TagCheck } from '@/interfaces/creative';
import ListService from '@/services/list-service';
import { AssociationDataCreate } from '@/interfaces/creativeAssociation';
import { AppSite } from '@/interfaces/appSite';

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
                loading: false, // loading page
                loading_field: false, // loading for inputs
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
                SET_LOADING_FIELD(state, _loading_field = false) {
                    state.loading_field = _loading_field;
                },
                SET_NOTIFICATION(state, _notification: Notification = { message: "", type: "", title: "", btn_text: "", show: false }) {
                    state.notification = _notification;
                },
                SET_ERRORS(state, _errors: Object = {}) {
                    console.log("SET_ERRORS", { _errors: _errors })
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
                        commit('SET_LOADING')
                        return await Promise.reject()
                    }
                },
                async setLoadingField({ commit }, loading: Boolean) {
                    try {
                        commit('SET_LOADING_FIELD', loading)
                        return await Promise.resolve()
                    } catch (error) {
                        commit('SET_LOADING_FIELD')
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
                async init({ }, initData: any) {
                    try {
                        const response = await AuthService.init(initData)
                        CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('init.messages.success'),
                                btn_text: 'Go to Login',
                                to: "Login"
                            } as Notification
                        );
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
                async forgotPassword({ }, { email }) {
                    try {
                        const response = await AuthService.forgotPassword(email)
                        CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t("forgotPassword.messages.success"),
                                btn_text: i18n.t("continue"),
                            } as Notification
                        );
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
                async resetPassword({ }, { email, password, password_confirmation, token }) {
                    try {
                        const response = await AuthService.resetPassword({
                            email,
                            password,
                            password_confirmation,
                            token
                        });
                        CreateNotification(this.dispatch, {
                            type: MessageTypes.SUCCESS,
                            title: i18n.t('title-success'),
                            message: i18n.t('passwordReset.messages.success'),
                            btn_text: i18n.t("continue"),
                        } as Notification);
                    }
                    catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
                async logIn({ commit }, credential: Credential) {
                    try {
                        const response = await AuthService.login(credential)
                        commit('SET_TOKEN', response.token)
                        return await Promise.resolve(response)
                    } catch (error) {
                        commit('SET_TOKEN')
                        CatcherError(this.dispatch, error);
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
                        CatcherError(this.dispatch, error);
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
                async download({ }, params) {
                    try {
                        await AdvertiserService.download(params)
                        return await Promise.resolve({})
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

                async list({ commit }, filters) {
                    try {
                        const response = await AdvertiserService.list(filters);
                        commit('SET_ADVERTISERS_LIST', resolveList(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async all({ commit }) {
                    try {
                        const response = await AdvertiserService.all(undefined, { order: 'asc', sort: 'name' })
                        commit('SET_ADVERTISERS_LIST', response)
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
                budget_types: [
                    {
                        id: 1,
                        value: "New"
                    },
                    {
                        id: 2,
                        value: "Existing"
                    },
                ],
                campaigns_pacing: [],
                optimization_strategies: [],
                kpi_campaigns: [],
                strategies: [],
                unit_times: [],
                creative_weighting_methods: [],
                line_item_types: [],
                bid_strategy_list: [],
                lines_pacing_list: [],
                bidding_shadings_list: [],
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
                SET_BIDDING_SHADING_LIST(state, _bidding_shadings_list: CustomList = {} as CustomList) {
                    state.bidding_shadings_list = _bidding_shadings_list;
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
                SET_CREATIVE_WEIGHTING_METHODS(state, _creative_weighting_methods: [] = []) {
                    state.creative_weighting_methods = _creative_weighting_methods;
                },
                SET_LINE_ITEM_TYPES(state, _line_item_types: List[]) {
                    state.line_item_types = _line_item_types;
                },
                SET_BID_STRATEGY_LIST(state, _bid_strategy_list: List[]) {
                    state.bid_strategy_list = _bid_strategy_list;
                },
                SET_LINE_PACING_LIST(state, _lines_pacing_list: List[]) {
                    state.lines_pacing_list = _lines_pacing_list;
                },
            },
            getters: {},
            actions: {

                async paginated({ commit }, params) {
                    try {
                        const response = await CustomListService.paginated(params)
                        commit('SET_RESULT_PAGINATED', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async download({ }, params) {
                    try {
                        await CustomListService.download(params)
                        return await Promise.resolve({})
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async create({ commit }, customList: CustomListDataCreate) {
                    try {
                        const response = await CustomListService.create(customList);
                        commit('SET_CUSTOM_LIST', response)
                        CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('success'),
                                btn_text: i18n.t('continue'),
                                to: {
                                    name: "CustomListEdit",
                                    params: { id: response.id }
                                }
                            } as Notification
                        );

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

                async update({ commit }, updates) {
                    try {
                        const response = await CustomListService.update(updates);
                        commit('SET_CUSTOM_LIST', response)

                        CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('success'),
                                btn_text: i18n.t('continue'),
                            } as Notification
                        );

                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async uploadItems({ }, params) {
                    try {
                        const response = await CustomListService.uploadItems(params.payload, params.function);

                        CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('success'),
                                btn_text: i18n.t('continue'),
                            } as Notification
                        );

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

                async getLineItemTypes({ commit }) {
                    try {
                        const response: List[] = await lineItemTypeService.list()
                        commit('SET_LINE_ITEM_TYPES', resolveList(response))
                        return await Promise.resolve(resolveList(response))
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async getBidStrategies({ commit }) {
                    try {
                        const response: List[] = await CustomListService.bidStrategyList()
                        commit('SET_BID_STRATEGY_LIST', resolveList(response))
                        return await Promise.resolve(resolveList(response))
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async getLinesPacing({ commit }) {
                    try {
                        const response: List[] = await CustomListService.linePacingList()
                        commit('SET_LINE_PACING_LIST', resolveList(response))
                        return await Promise.resolve(resolveList(response))
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async getBiddingShadings({ commit }) {
                    try {
                        const response: List[] = await CustomListService.biddingShadingList()
                        commit('SET_BIDDING_SHADING_LIST', resolveList(response))
                        return await Promise.resolve(resolveList(response))
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

                async getCreativeWeightingMethods({ commit }) {
                    try {
                        const response = await CustomListService.CreativeWeightingMethods()
                        commit('SET_CREATIVE_WEIGHTING_METHODS', resolveList(response))

                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
            }
        },
        list_item: {
            namespaced: true,
            state: () => ({
                item: {} as any,
                items: [] as any[],
                entities: [] as any[],
                result_paginate: {} as ResultPaginate,
            }),
            mutations: {
                SET_RESULT_PAGINATED(state, _result_paginate: ResultPaginate = {} as ResultPaginate) {
                    state.result_paginate = _result_paginate
                },
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

                async paginated({ commit }, params) {
                    try {
                        const response = await ListItemService.paginated(params)
                        commit('SET_RESULT_PAGINATED', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async delete({ }, id) {
                    try {
                        const response = await ListItemService.delete(id);
                        return await Promise.resolve(true);
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async uploadFile({ }, upload: any) {
                    try {
                        const response = await ListItemService.upload(upload)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "" });
                        return await Promise.reject(error)
                    }
                },

                async create({ commit }, params: { listItem: any, customListType: string }) {
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

                async update({ commit }, params: { listItem: any, customListType: string }) {
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
                                        list_item: {
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
                                const customListExchange = await CustomListExchangeService.all();
                                entities.forEach(item => {

                                    let parameters: String[] = [];
                                    if (Array.isArray(item.list_item)) {
                                        parameters = item?.list_item[0].toString().split("/");
                                    }
                                    else {
                                        parameters = item?.list_item?.split("/");
                                    }

                                    let type = customListExchange?.data.find(t => t.abbreviation == parameters[0]);
                                    if (parameters?.length == 2 && type) {
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
        user: {
            namespaced: true,
            state: () => ({
                result_paginate: {} as UserResultPaginate,
                users: [],
                user: {} as User,
                roles: []
            }),
            mutations: {
                SET_RESULT_PAGINATED(state, _result_paginate: UserResultPaginate) {
                    state.result_paginate = _result_paginate
                },
                SET_USERS(state, _users = []) {
                    state.users = _users;
                },
                SET_USER(state, _user: User = {} as User) {
                    state.user = _user
                },
                SET_ROLES(state, _roles = []) {
                    state.roles = _roles;
                }
            },
            getters: {
            },
            actions: {

                async paginated({ commit }, params) {
                    try {
                        const response = await UserService.paginated(params)
                        commit('SET_RESULT_PAGINATED', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async download({ }, params) {
                    try {
                        await UserService.download(params)
                        return await Promise.resolve({})
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async list({ commit }, params) {
                    try {
                        const response = await UserService.list(params.filters, params.options);
                        commit('SET_USERS', resolveList(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async listRoles({ commit }) {
                    try {
                        const response = await UserService.listRoles();
                        commit('SET_ROLES', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async create({ }, user: UserDataCreate) {
                    try {
                        const response = await UserService.create(user);
                        CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('success'),
                                btn_text: i18n.t('continue'),
                                to: "UsersIndex"
                            } as Notification
                        );
                        return Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return Promise.reject(error)
                    }
                },

                async update({ commit }, params: { user: UserDataUpdate, id: number }) {
                    try {
                        const response = await UserService.update(params.user, params.id);
                        commit('SET_USER', response);
                        CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('success'),
                                btn_text: i18n.t('continue'),
                                to: "UsersIndex"
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
                        const response = await UserService.show(id);
                        commit('SET_USER', response);
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
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
                campaigns_list: [] as CampaingList[],
            }),
            mutations: {
                SET_CAMPAIGN(state, _campaign: Campaign = {} as Campaign) {
                    state.campaign = _campaign
                },
                SET_RESULT_PAGINATED(state, _result_paginate: ResultPaginate = {} as ResultPaginate) {
                    state.result_paginate = _result_paginate
                },
                SET_RESULT_LIST(state, _result_list: CampaingList[] = [] as CampaingList[]) {
                    state.campaigns_list = _result_list
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

                async download({ }, params) {
                    try {
                        await CampaignService.download(params)
                        return await Promise.resolve({})
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async list({ commit }, params) {
                    try {
                        const response = await CampaignService.list(params?.filters, params?.options)
                        const values = resolveList(response);
                        commit('SET_RESULT_LIST', values)
                        return await Promise.resolve(resolveList(values))
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async getById({ commit }, id: number) {
                    try {
                        const response = await CampaignService.show(id);
                        commit('SET_CAMPAIGN', response);
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "" });
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
                async paginated({ commit }, params) {
                    try {
                        const response = await ModifierService.paginated(params?.paginated, params?.filters, params?.options)
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
                        if (response?.success) {
                            let list: any[] = [];
                            response?.data.map(e => {
                                list.push({
                                    id: e.id,
                                    abbreviation: e.abbreviation,
                                    description: e.description,
                                })
                            });
                            commit('SET_ENTITIES', list);
                        } else { commit('SET_ENTITIES'); }
                        return await Promise.resolve(response?.data);
                    } catch (error) {
                        commit('SET_ENTITIES')
                        return await Promise.reject(error)
                    }
                },
            }
        },
        line_item: {
            namespaced: true,
            state: () => ({
                result_paginate: {} as ResultPaginate,
                lineItems: [] as LineItem[],
                lineItem: {} as LineItem,
                lineItem_list: [] as LineItem[],
            }),
            mutations: {
                SET_RESULT_PAGINATED(state, _result_paginate: ResultPaginate = {} as ResultPaginate) {
                    state.result_paginate = _result_paginate
                },
                SET_LINE_ITEM(state, _lineItem: LineItem = {} as LineItem) {
                    state.lineItem = _lineItem
                },
                SET_LINE_ITEMS(state, _lineItems: LineItem[] = [] as LineItem[]) {
                    state.lineItems = _lineItems
                },
                SET_LINE_ITEM_LIST(state, _line_item_list: LineItem[] = [] as LineItem[]) {
                    state.lineItem_list = _line_item_list
                }
            },
            getters: {
                result_paginate(state): ResultPaginate {
                    return state.result_paginate
                },
            },
            actions: {
                async create({ commit }, lineItem: LineItemDataCreate) {
                    try {
                        const response = await LineItemService.create(lineItem);
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
                        commit('SET_LINE_ITEM', response);
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async show({ commit }, id: number) {
                    try {
                        let response = await LineItemService.show(id);
                        if (response?.campaign?.id) {
                            const aux_campaign = await CampaignService.show(response?.campaign?.id);
                            response.campaign = aux_campaign;
                        }
                        commit('SET_LINE_ITEM', response);
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "lineItemList" });
                        return await Promise.reject(error)
                    }
                },

                async update({ commit }, params: { lineItem: LineItemDataCreate, id: number }) {
                    try {
                        const response = await LineItemService.update(params.lineItem, params.id);
                        commit('SET_LINE_ITEM', response);
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "lineItemList" });
                        return await Promise.reject(error)
                    }
                },

                async paginated({ commit }, params) {
                    try {
                        const response = await LineItemService.paginated(params?.paginated, params?.filters, params?.options)
                        commit('SET_RESULT_PAGINATED', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async list({ commit }, payload: { filters: LineItemFilters, options: LineItemOptions }) {
                    try {
                        const response = await LineItemService.list(payload.filters, payload.options)
                        commit('SET_LINE_ITEM_LIST', resolveList(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async all({ commit }, params: { filters: LineItemFilters, options: LineItemOptions }) {
                    try {
                        const response = await LineItemService.all(params)
                        commit('SET_LINE_ITEMS', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async activate({  }, id: number) {
                    try {
                        let response = await LineItemService.changeStatus({id: id, active: true});
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "" });
                        return await Promise.reject(error)
                    }
                },
            }
        },
        line_item_type: {
            namespaced: true,
            state: () => ({
                line_item_type_list: [],
            }),
            mutations: {
                SET_TYPE_LIST(state, _types: [] = []) {
                    state.line_item_type_list = _types
                }
            },
            getters: {},
            actions: {
                async list({ commit }, payload: { filters: any, options: any }) {
                    try {
                        const response = [
                            {
                                id: 1,
                                name: "Line Item Type 1"
                            },
                            {
                                id: 2,
                                name: "Line Item Type 2"
                            },
                            {
                                id: 3,
                                name: "Line Item Type 3"
                            }
                        ]
                        commit('SET_TYPE_LIST', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
            }
        },
        creative: {
            namespaced: true,
            state: () => ({
                result_paginate: {} as ResultPaginate,
                creative: null,
                asset: {},
                responseTemplates: {},
                creative_sizes: [],
                creative_templates: [],
                creative_types: [],
                advertiser_categories: [],
                mime_types: [],
                creative_rules: [],
                expandable_types: [],
                expandable_directions: [],
                in_banner_videos: [],
                vendors: [],
                addons: [],
                assets: [],
                creatives: [],
            }),
            mutations: {
                SET_RESULT_PAGINATED(state, _result_paginate: ResultPaginate = {} as ResultPaginate) {
                    state.result_paginate = _result_paginate
                },
                SET_CREATIVE(state, _creative = null) {
                    state.creative = _creative;
                },
                PUSH_LINE_ASSOCIATION(state, _line_association = null) {
                    state.creative.line_associations.push(_line_association);
                },
                SET_CREATIVE_SIZES(state, _sizes) {
                    state.creative_sizes = _sizes
                },
                SET_CREATIVE_TEMPLATES(state, _templates) {
                    state.creative_templates = _templates
                },
                SET_CREATIVE_TYPES(state, _types) {
                    state.creative_types = _types
                },
                SET_ADVERTISER_CATEGORIES(state, _categories) {
                    state.advertiser_categories = _categories
                },
                SET_RESPONSE_TEMPLATES(state, _templates) {
                    state.responseTemplates = _templates
                },
                SET_CREATIVE_TYPE_ID(state, _creative_type_id) {
                    state.creative.creative_type_id = _creative_type_id
                },
                SET_MIME_TYPES(state, _mime_types) {
                    state.mime_types = _mime_types
                },
                SET_CREATIVE_RULES(state, _creative_rules) {
                    state.creative_rules = _creative_rules
                },
                SET_Expandable_TYPES(state, _expandable_types) {
                    state.expandable_types = _expandable_types
                },
                SET_Expandable_DIRECTIONS(state, _expandable_directions) {
                    state.expandable_directions = _expandable_directions
                },
                SET_IN_BANNER_VIDEOS(state, _in_banner_videos) {
                    state.in_banner_videos = _in_banner_videos
                },
                SET_VENDORS(state, _vendors) {
                    state.vendors = _vendors
                },
                SET_ADDONS(state, _addons) {
                    state.addons = _addons
                },
                SET_ASSETS(state, _assets) {
                    state.assets = _assets
                },
                SET_ASSET(state, _asset) {
                    state.asset = _asset
                },
                SET_CREATIVE_LIST(state, _list: []) {
                    state.creatives = _list
                },
            },
            getters: {
            },
            actions: {

                /**
                 * GET AUXILIARY METHODS
                 */
                async creativeSizes({ commit }) {
                    try {
                        const response = await CreativeService.creativeSizes()
                        commit('SET_CREATIVE_SIZES', resolveListParams(response, "id", "name"))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async creativeTemplates({ commit, state }) {
                    try {
                        const response = await CreativeService.creativeTemplates()
                        commit('SET_RESPONSE_TEMPLATES', response)
                        commit('SET_CREATIVE_TEMPLATES', resolveTemplates(response, state.creative_types))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async creativeTypes({ commit }) {
                    try {
                        const response = await CreativeService.creativeTypes()
                        commit('SET_CREATIVE_TYPES', resolveListParams(response, "id", "description"))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async advertiserCategories({ commit }) {
                    try {
                        const response = await CreativeService.advertiserCategories()
                        commit('SET_ADVERTISER_CATEGORIES', resolveListParams(response, "id", "name"))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async getCreativeTypeByTemplateId({ }, params: { creativeTypes: Array<any>, creative_template_id: Number }) {
                    try {
                        if (isEmpty(params.creativeTypes) && params.creative_template_id < 1) return await Promise.resolve();
                        const response = getCreativeTypeByTemplateId(params.creativeTypes, params.creative_template_id)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async mimeTypes({ commit }) {
                    try {
                        const response = await CreativeService.mimeTypes()
                        commit('SET_MIME_TYPES', resolveListParams(response, "id", "description"))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async creativeRules({ commit }) {
                    try {
                        const response = await CreativeService.creativeRules()
                        commit('SET_CREATIVE_RULES', resolveListParams(response, "id", "description"))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
                async expandableTypes({ commit }) {
                    try {
                        const response = await CreativeService.expandableTypes()
                        commit('SET_Expandable_TYPES', resolveListParams(response, "id", "description"))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
                async expandableDirections({ commit }) {
                    try {
                        const response = await CreativeService.expandableDirections()
                        commit('SET_Expandable_DIRECTIONS', resolveListParams(response, "id", "description"))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async inBannerVideos({ commit }) {
                    try {
                        const response = await CreativeService.inBannerVideos()
                        commit('SET_IN_BANNER_VIDEOS', resolveListParams(response, "id", "description"))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async vendors({ commit }) {
                    try {
                        const response = await CreativeService.vendors()
                        commit('SET_VENDORS', resolveListParams(response, "id", "description"))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async addons({ commit }) {
                    try {
                        const response = await CreativeService.addons()
                        commit('SET_ADDONS', resolveList(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async assets({ commit }) {
                    try {
                        const response = await CreativeService.assets()
                        commit('SET_ASSETS', resolveList(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async creativeAssets({ commit }, params) {
                    try {
                        const response = await CreativeService.creativeAssets(params)
                        commit('SET_ASSET', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async CreateNewCreative({ commit }, params: { continue: Boolean, creative: any }) {
                    try {
                        const response = await CreativeService.CreateNewCreative(params.creative)
                        commit('SET_CREATIVE', response)
                        CreateNotification(
                            this.dispatch,
                            {
                                type: MessageTypes.SUCCESS,
                                title: i18n.t('title-success'),
                                message: i18n.t('success'),
                                btn_text: params.continue ? i18n.t('continue') : i18n.t('close'),
                                to: params.continue ? "" : "CreativesIndex"
                            } as Notification
                        );
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async validateTag({ commit }, tag: TagCheck) {
                    try {
                        const response = await CreativeService.validateTag(tag)
                        commit('SET_ASSET', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
                async associateLineItem({ commit }, association: AssociationDataCreate) {
                    try {
                        console.log("--- associateLineItem(association)", association);
                        const response = await CreativeService.associateLineItem(association)
                        console.log("--- associateLineItem::response", response);
                        commit('PUSH_LINE_ASSOCIATION', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
                async paginated({ commit }, params) {
                    try {
                        const response = await CreativeService.paginated(params?.filters, params?.options, params?.paginated);
                        commit('SET_RESULT_PAGINATED', response)
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async list({ commit }) {
                    try {
                        const response = await CreativeService.list()
                        if( isArray(response) ){
                            commit('SET_CREATIVE_LIST', resolveListParams(response))
                        }else{
                            commit('SET_CREATIVE_LIST', resolveList(response))
                        }
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },

                async show({ commit }, id: number) {
                    try {
                        const response = await CreativeService.show(id);
                        commit('SET_CREATIVE', response);
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error, { to: "" });
                        return await Promise.reject(error)
                    }
                },
            }
        },
        targeting: {
            namespaced: true,
            state: () => ({
                app_sites: [] as Array<AppSite>
            }),
            mutations: {
                SET_APP_SITES(state, _app_sites: Array<AppSite>) {
                    state.app_sites = _app_sites;
                },
            },
            getters: {
            },
            actions: {
                async getTargetingKeys({ }) {
                    try {
                        const response = await TargetingService.getTargetingKeys()
                        console.log('@Actions::getTargetingKeys', {
                            response: response
                        });
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
                async getAppSitesByKey({ commit }, params: { key: String, object?: { key: String, value: String } }) {
                    try {
                        const response = await TargetingService.getAppSitesByKey(params.key)
                        return await Promise.resolve(resolveListParams(response, params.object?.key || 'external_id', params.object?.value || 'name'))
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
                async getAppNameByAtribute({ commit }, params) {
                    try {
                        const response = await TargetingService.getAppNameByAtribute(params.term, params.by_attribute)
                        return await Promise.resolve(resolveListParams(response, 'id', 'app_name'))
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
                async getSearchByTerm({ commit }, params: { key: string, term: string, object?: { key: string, value: string } }) {
                    try {
                        const response = await TargetingService.getSearchByTerm(params)
                        return await Promise.resolve(resolveListParams(response, params.object?.key || 'external_id', params.object?.value || 'name'))
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
                async getSitesByAtribute({ commit }, params) {
                    try {
                        const response = await TargetingService.getSitesByAtribute(params.term, params.by_attribute)
                        return await Promise.resolve(resolveListParams(response, 'site_id', 'site_id'))
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
                async create({ commit }, targeting) {
                    try {
                        const response = await TargetingService.create(targeting)
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
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                },
            }
        },
        lists: {
            namespaced: true,
            state: () => ({
                custom_list_exchanges: [],
                budget_types: [],
            }),
            mutations: {
                SET_CUSTOM_LIST_EXCHANGES(state, custom_list_exchanges: [] = []) {
                    state.custom_list_exchanges = custom_list_exchanges;
                },
                SET_BUDGET_TYPES(state, budget_types: [] = []) {
                    state.budget_types = budget_types;
                },
            },
            getters: {},
            actions: {
                async getList({ commit }, payload) {
                    try {
                        const response = await ListService.getList(payload.list_name);
                        if (payload.action) {
                            commit(payload.action, response);
                        }
                        return await Promise.resolve(response)
                    } catch (error) {
                        CatcherError(this.dispatch, error);
                        return await Promise.reject(error)
                    }
                }
            }
        }
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
    dispatch('proccess/setLoading', false, { root: true });
    console.error("CatcherError", {
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
