import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '@/plugins/i18n'

import AuthService, { ProviderToken } from '@/services/auth-service'
import ProfileService, { ProviderProfile } from '@/services/profile-service'
import PermissionService, { PermissionProfile } from '@/services/permission-service'
import AdvertiserService from '@/services/advertiser-service'
import CustomListService from '@/services/custom-list-service'
import ListItemService from '@/services/list-item-service'
import TypeService from '@/services/type-service'
import AccountService from '@/services/account-service'
import UserService from '@/services/user-service'
import CampaignService from '@/services/campaign-service'

import { Credential } from '@/interfaces/credential'
import { Advertiser, AdvertiserDataCreate, AdvertiserDataUpdate, AdvertiserFilters, AdvertiserList, AdvertiserOptions, Category, ResultPaginate } from '@/interfaces/advertiser'
import { Notification, MessageTypes } from '@/interfaces/proccess'
import { isNull, isUndefined } from 'lodash'
import { CustomList, CustomListDataCreate, CustomListFilters, CustomListOptions, CustomListPaginated, CustomListResultPaginate, List, Type } from '@/interfaces/custom_list'

import { resolveList } from '../utils/resolveObjectArray'
import { Campaign, CampaignDataCreate } from '@/interfaces/campaign'
import { ErrorDataMessage, HasError, HasSuccess, ResponseData, ResponseDataContent } from '@/services/axios-service'
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
                alertize: false,
                notification: {
                    message: "",
                    type: "success",
                    title: ""
                },
            }),
            mutations: {
                SET_LOADING(state, _loading = false) {
                    state.loading = _loading;
                },
                SET_NOTIFICATION(state, _notification: Notification = { message: "", type: "", title: "" }) {
                    state.notification = _notification;
                    state.alertize = Boolean(_notification.message)
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
                        console.error('@Action:setLoading.catch', { error: error })
                        commit('SET_TOKEN')
                        return await Promise.reject()
                    }
                },
                async setNotification({ commit }, notification: Notification) {
                    try {
                        console.log('@Action:setNotification', { notification: notification })
                        commit('SET_NOTIFICATION', notification)
                        return await Promise.resolve()
                    } catch (error) {
                        console.error('@Action:setNotification.catch', { error: error })
                        commit('SET_NOTIFICATION')
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
                        commit('SET_TOKEN', ProviderToken(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:logIn.catch', { error: error })
                        commit('SET_TOKEN')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:logIn.catch', { message: message_2 })
                        return await Promise.reject(message_2)
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
                        console.error('@Action:signOff.catch', { error: error })
                        commit('SET_TOKEN')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:signOff.catch', { message: message_2 })
                        return await Promise.reject(message_2)
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
                        console.error('@Action:fetchProfile.catch', { error: error })
                        commit('SET_PROFILE')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:fetchProfile.catch', { message: message_2 })
                        return await Promise.reject(message_2)
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
                        console.error('@Action:fetchPermissions.catch', { error: error })
                        commit('SET_PERMISSIONS')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:fetchPermissions.catch', { message: message_2 })
                        return await Promise.reject(message_2)
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
                SET_RESULT_PAGINATED(state, _result_paginate: ResultPaginate) {
                    state.result_paginate = _result_paginate
                },
                DEL_RESULT_PAGINATED(state) {
                    state.result_paginate = {} as ResultPaginate
                },
                SET_CATEGORIES(state, _categories: Category[]) {
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
                }
            },
            getters: {
                result_paginate(state): ResultPaginate {
                    return state.result_paginate
                },
            },
            actions: {
                async getAll({ commit }, filters?: AdvertiserFilters, options?: AdvertiserOptions) {
                    try {
                        const response = await AdvertiserService.all(filters, options)
                        if (!isUndefined(response) && !isNull(response)) {
                            commit('SET_RESULT_PAGINATED', response)
                        }
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:getAll.catch', { error: error })
                        commit('DEL_RESULT_PAGINATED')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:getAll.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },

                async getCategories({ commit }) {
                    try {
                        const response = await AdvertiserService.categories()
                        if (!isUndefined(response) && !isNull(response)) {
                            commit('SET_CATEGORIES', response.data.response)
                        }
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:getCategories.catch', { error: error })
                        commit('DEL_CATEGORIES')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:getCategories.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },

                async createAdvertiser({ commit }, advertiser: AdvertiserDataCreate) {
                    try {
                        const response = await AdvertiserService.create(advertiser)
                        if (!isUndefined(response) && !isNull(response)) {
                            commit('SET_ADVERTISER', response);
                        }
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:createAdvertiser.catch', { error: error })
                        commit('SET_ADVERTISER');
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:createAdvertiser.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },

                async showAdvertiser({ commit }, id: number) {
                    try {
                        const response = await AdvertiserService.show(id);
                        if (!isUndefined(response) && !isNull(response)) {
                            commit('SET_ADVERTISER', response);
                        }
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:showAdvertiser.catch', { error: error })
                        commit('SET_ADVERTISER');
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:showAdvertiser.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },

                async updateAdvertiser({ commit }, params: { advertiser: AdvertiserDataUpdate, id: number }) {
                    try {
                        const response = await AdvertiserService.update(params.advertiser, params.id);
                        if (!isUndefined(response) && !isNull(response)) {
                            commit('SET_ADVERTISER', response);
                        }
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:updateAdvertiser.catch', { error: error })
                        commit('SET_ADVERTISER');
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:updateAdvertiser.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },

                async list({ commit }, payload: { filters: AdvertiserFilters, options: AdvertiserOptions }) {
                    try {

                        const response = await AdvertiserService.list(payload.filters, payload.options)

                        if (isUndefined(response) || isNull(response)) {
                            return await Promise.reject({ message: 'No response' })
                        }

                        commit('SET_ADVERTISERS_LIST', resolveList(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:list.catch', { error: error })
                        commit('SET_ADVERTISERS_LIST')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:list.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },
            }
        },
        custom_list: {
            namespaced: true,
            state: () => ({
                custom_list_result_paginate: {} as CustomListResultPaginate,
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
                SET_CUSTOM_LIST_RESULT_PAGINATED(state, _custom_list_result_paginate: CustomListResultPaginate) {
                    state.custom_list_result_paginate = _custom_list_result_paginate
                },
                DEL_CUSTOM_LIST_RESULT_PAGINATED(state) {
                    state.custom_list_result_paginate = {} as CustomListResultPaginate
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
            getters: {
                custom_list_result_paginate(state): CustomListResultPaginate {
                    return state.custom_list_result_paginate
                },
            },
            actions: {
                async getPaginated({ commit }, paginated: CustomListPaginated, filters?: CustomListFilters, options?: CustomListOptions) {
                    try {
                        const response: CustomListResultPaginate = await CustomListService.paginated(paginated, filters, options)
                        if (!isUndefined(response) && !isNull(response)) {
                            commit('SET_CUSTOM_LIST_RESULT_PAGINATED', response)
                        }
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:getPaginated.catch', { error: error })
                        commit('DEL_CUSTOM_LIST_RESULT_PAGINATED')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:getPaginated.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },
                async getTypes({ commit }) {
                    try {
                        const response: List[] = await TypeService.list()
                        if (!isUndefined(response) && !isNull(response)) {
                            commit('SET_TYPES', response)
                        }
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:getTypes.catch', { error: error })
                        commit('SET_TYPES')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:getTypes.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },
                async getViewByTypeSelected({ commit }, type: Type) {
                    try {
                        const response = await CustomListService.getViewByTypeSelected(type);
                        if (!isUndefined(response) && !isNull(response)) {
                            commit('SET_MODEL_VIEW', response)
                        }
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:getViewByTypeSelected.catch', { error: error })
                        commit('SET_MODEL_VIEW')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:getViewByTypeSelected.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },
                async createCustomList({ commit }, customList: CustomListDataCreate) {
                    try {
                        const response = await CustomListService.create(customList);
                        if (!isUndefined(response) && !isNull(response)) {
                            commit('SET_CUSTOM_LIST', response)
                        }
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:createCustomList.catch', { error: error })
                        commit('SET_CUSTOM_LIST')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:createCustomList.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },
                async show({ commit }, id: Number) {
                    try {
                        const response = await CustomListService.show(id);
                        if (!isUndefined(response) && !isNull(response)) {
                            commit('SET_CUSTOM_LIST', response)
                        }
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:show.catch', { error: error })
                        commit('SET_CUSTOM_LIST')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:show.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },

                async getBudgetTypes({ commit }) {
                    try {
                        const response = await CustomListService.budgetTypes()

                        if (isUndefined(response) || isNull(response)) {
                            return await Promise.reject({ message: 'No response' })
                        }

                        commit('SET_BUDGET_TYPES', resolveList(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:getBudgetTypes.catch', { error: error })
                        commit('SET_BUDGET_TYPES')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:getBudgetTypes.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },

                async getCampaignPacing({ commit }) {
                    try {
                        const response = await CustomListService.campaignPacing()

                        if (isUndefined(response) || isNull(response)) {
                            return await Promise.reject({ message: 'No response' })
                        }

                        commit('SET_CAMPAIGNS_PACING', resolveList(response))

                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:getBudgetTypes.catch', { error: error })
                        commit('SET_CAMPAIGNS_PACING')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:getBudgetTypes.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },

                async getOptimizationStrategies({ commit }) {
                    try {
                        const response = await CustomListService.optimizationStrategies()

                        if (isUndefined(response) || isNull(response)) {
                            return await Promise.reject({ message: 'No response' })
                        }

                        commit('SET_OPTIMIZATION_STRATEGIES', resolveList(response))

                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:getOptimizationStrategies.catch', { error: error })
                        commit('SET_OPTIMIZATION_STRATEGIES')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:getOptimizationStrategies.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },

                async getKpiCampaigns({ commit }) {
                    try {
                        const response = await CustomListService.kpiCampaigns()

                        if (isUndefined(response) || isNull(response)) {
                            return await Promise.reject({ message: 'No response' })
                        }

                        commit('SET_KPI_CAMPAIGNS', resolveList(response))

                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:getKpiCampaigns.catch', { error: error })
                        commit('SET_KPI_CAMPAIGNS')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:getKpiCampaigns.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },

                async getStrategies({ commit }) {
                    try {
                        const response = await CustomListService.strategies()

                        if (isUndefined(response) || isNull(response)) {
                            return await Promise.reject({ message: 'No response' })
                        }

                        commit('SET_STRATEGIES', resolveList(response))

                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:getStrategies.catch', { error: error })
                        commit('SET_STRATEGIES')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:getStrategies.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },

                async getUnitTimes({ commit }) {
                    try {
                        const response = await CustomListService.unitTimes()

                        if (isUndefined(response) || isNull(response)) {
                            return await Promise.reject({ message: 'No response' })
                        }

                        commit('SET_UNIT_TIMES', resolveList(response))

                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:getUnitTimes.catch', { error: error })
                        commit('SET_UNIT_TIMES')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:getUnitTimes.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },
            }
        },
        listItem: {
            namespaced: true,
            actions: {
                async uploadFile({ commit }, upload: any) {
                    try {
                        const response = await ListItemService.upload(upload)
                        if (!isUndefined(response) && !isNull(response)) {
                            //commit('SET_ADVERTISER', response);
                        }
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:upload.catch', { error: error })
                        //commit('SET_ADVERTISER');
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:upload.catch', { message: message_2 })
                        return await Promise.reject(message_2)
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
                        if (!isUndefined(response) && !isNull(response)) {
                            commit('SET_ACCOUNT', response.data.response)
                        }
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:getAccount.catch', { error: error })
                        commit('SET_ACCOUNT')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:getAccount.catch', { message: message_2 })
                        return await Promise.reject(message_2)
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

                        if (isUndefined(response) || isNull(response)) {
                            return await Promise.reject({ message: 'No response' })
                        }

                        commit('SET_USERS', resolveList(response))
                        return await Promise.resolve(response)
                    } catch (error) {
                        console.error('@Action:getUsers.catch', { error: error })
                        commit('SET_USERS')
                        const message_2 = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        console.error('@Action:getUsers.catch', { message: message_2 })
                        return await Promise.reject(message_2)
                    }
                },
            }
        },
        campaign: {
            namespaced: true,
            state: () => ({
                campaign: null,
            }),
            mutations: {
                SET_CAMPAIGN(state, _campaign: Campaign = {} as Campaign) {
                    state.campaign = _campaign
                }
            },
            getters: {
            },
            actions: {
                async createCampaign({ commit }, campaign: CampaignDataCreate) {
                    try {
                        const response = await CampaignService.create(campaign)
                        if (!isUndefined(response) && !isNull(response)) {
                            return await Promise.resolve(response)
                        }
                        return await Promise.reject(response)
                    } catch (error) {
                        console.error('@Action:createCampaign.catch', { error: error })
                        var message = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        const errors = error.response.data.errors ? Array(error.response.data.errors).join(', ') : null;
                        if (errors) {
                            message = message.concat(`: ${errors}`);
                        }
                        console.error('@Action:createCampaign.catch', { message: message })

                        this.dispatch('proccess/setNotification', { message: message, type: MessageTypes.ERROR, title: "Error" } as Notification, { root: true })

                        return await Promise.reject({
                            status: false,
                            message: message,
                            errors: error.response.data.errors ? error.response.data.errors : []
                        })
                    }
                },

                async updateCampaign({ commit }, campaign: Campaign) {
                    try {
                        const response = await CampaignService.update(campaign)

                        console.log('updateCampaign', {
                            response: response,
                            campaign: campaign,
                            hasSuccess: HasSuccess(response),
                            hasError: HasError(response),
                            content: ResponseDataContent(response),
                        });

                        if (HasSuccess(response)) {
                            commit('SET_CAMPAIGN', ResponseDataContent(response));
                            this.dispatch('proccess/setNotification', { message: i18n.t('success'), type: MessageTypes.SUCCESS, title: i18n.t('title-success'), to: 'CampaignsIndex' } as Notification, { root: true })
                            return await Promise.resolve(ResponseDataContent(response))
                        }
                        return await Promise.reject(ErrorDataMessage(response))

                    } catch (error) {
                        console.error('@Action:updateCampaign.catch:::stringify', { error: JSON.stringify(error) })
                        var message = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        const errors = error.response.data.errors ? Array(error.response.data.errors).join(', ') : null;
                        console.log('@Action:updateCampaign.catch:::errors', { errors: errors })
                        if (errors) {
                            message = message.concat(`: ${errors}`);
                        }
                        console.error('@Action:updateCampaign.catch:::message', { message: message })

                        this.dispatch('proccess/setNotification', { message: message, type: MessageTypes.ERROR, title: "Error" } as Notification, { root: true })

                        return await Promise.reject({
                            status: false,
                            message: message,
                            errors: error.response.data.errors ? error.response.data.errors : []
                        })
                    }
                },

                async showCampaign({ commit }, id: number) {
                    try {
                        const response = await CampaignService.show(id);
                        if (HasSuccess(response)) {
                            commit('SET_CAMPAIGN', ResponseDataContent(response));
                            return await Promise.resolve(ResponseDataContent(response))
                        }
                        return await Promise.reject(ErrorDataMessage(response))
                    } catch (error) {
                        commit('SET_CAMPAIGN');
                        console.error('@Action:showCampaign.catch', { error: error })
                        var message = typeof undefined !== typeof error.response.data.message ? error.response.data.message : error.toString()
                        const errors = error.response.data.errors ? Array(error.response.data.errors).join(', ') : null;
                        if (errors) {
                            message = message.concat(`: ${errors}`);
                        }
                        console.error('@Action:showCampaign.catch', { message: message })

                        this.dispatch('proccess/setNotification', { message: message, type: MessageTypes.ERROR, title: "Error" } as Notification, { root: true })

                        return await Promise.reject({
                            status: false,
                            message: message,
                            errors: error.response.data.errors ? error.response.data.errors : []
                        })
                    }
                },
            }
        },
    }
})
