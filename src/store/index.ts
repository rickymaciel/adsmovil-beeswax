import Vue from 'vue'
import Vuex from 'vuex'

import AuthService, { ProviderToken } from '@/services/auth-service'
import ProfileService, { ProviderProfile } from '@/services/profile-service'
import PermissionService, { PermissionProfile } from '@/services/permission-service'
import AdvertiserService from '@/services/advertiser-service'
import { Credential } from '@/interfaces/credential'
import { Advertiser, AdvertiserFilters, AdvertiserOptions, ResultPaginate } from '@/interfaces/advertiser'
import { isNull, isUndefined } from 'lodash'

const token = localStorage.getItem('token') || ''

Vue.use(Vuex)

export default new Vuex.Store({
    state: () => ({}),
    mutations: {},
    actions: {},
    modules: {
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
                        console.log('@Action:logIn', { response: response })
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
                        console.log('@Action:signOff', { response: response })
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
                        console.log('@Action:fetchProfile', { response: response })
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
                        console.log('@Action:fetchPermissions', { response: response })
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
                result_paginate: {} as ResultPaginate
            }),
            mutations: {
                SET_RESULT_PAGINATED(state, _result_paginate: ResultPaginate) {
                    state.result_paginate = _result_paginate
                },
                DEL_RESULT_PAGINATED(state) {
                    state.result_paginate = {} as ResultPaginate
                },
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
                        console.log('@Action:getAll', { response: response })
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
            }
        },
    }
})
