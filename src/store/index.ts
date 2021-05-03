import Vue from 'vue'
import Vuex from 'vuex'

import AuthService, { ProviderToken } from '@/services/auth-service'
import ProfileService, { ProviderProfile } from '@/services/profile-service'
import PermissionService, { PermissionProfile } from '@/services/permission-service'
import AdvertiserService from '@/services/advertiser-service'
import CustomListService from '@/services/custom-list-service'
import ListItemService from '@/services/list-item-service'
import { Credential } from '@/interfaces/credential'
import { Advertiser, AdvertiserDataCreate, AdvertiserDataUpdate, AdvertiserFilters, AdvertiserOptions, Category, ResultPaginate } from '@/interfaces/advertiser'
import { Notification } from '@/interfaces/proccess'
import { isNull, isUndefined } from 'lodash'
import { CustomList, CustomListFilters, CustomListOptions, CustomListPaginated, CustomListResultPaginate } from '@/interfaces/custom_list'

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
                advertiser: {} as Advertiser
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
                }
            }
        },
        custom_list: {
            namespaced: true,
            state: () => ({
                custom_list_result_paginate: {} as CustomListResultPaginate,
                custom_list: {} as CustomList
            }),
            mutations: {
                SET_CUSTOM_LIST_RESULT_PAGINATED(state, _custom_list_result_paginate: CustomListResultPaginate) {
                    state.custom_list_result_paginate = _custom_list_result_paginate
                },
                DEL_CUSTOM_LIST_RESULT_PAGINATED(state) {
                    state.custom_list_result_paginate = {} as CustomListResultPaginate
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
                        console.log('getPaginated', { response: response });
                        if (!isUndefined(response) && !isNull(response)) {
                            console.log('getPaginated::SET_CUSTOM_LIST_RESULT_PAGINATED', { response: response });
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
    }
})
