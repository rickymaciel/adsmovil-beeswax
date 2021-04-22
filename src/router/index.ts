import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store/index'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [

    /**
   * Root
   */
    {
        path: '/',
        name: 'Root',
        beforeEnter(to, from, next) {
            console.log('root:beforeEnter', {
                to: to,
                from: from,
                state: store.state,
                logguedin: store.state['auth'].loggedIn
            })
            if (!store.state['auth'].loggedIn) {
                next('/auth/login')
            } else {
                next('/admin/dashboard')
            }
        }
    },

    /**
   * Auth
   */
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('@/views/Layouts/Auth.vue'),
        beforeEnter(to, from, next) {
            console.log('auth:beforeEnter', {
                to: to,
                from: from,
                state: store.state,
                logguedin: store.state['auth'].loggedIn
            })
            if (!store.state['auth'].loggedIn) {
                next()
            } else {
                next('/admin/dashboard')
            }
        },
        children: [
            {
                path: 'login',
                name: 'Login',
                component: () => import('@/views/Login/Login.vue')
            },
            {
                path: 'forgot-password',
                name: 'ForgotPassword',
                component: () => import('@/views/ForgotPassword/index.vue')
            }
        ]
    },

    /**
   * Admin
   */
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/Layouts/Admin.vue'),
        meta: {
            requiresAuth: true,
            breadcrumb: "Dashboard"
        },
        beforeEnter(to, from, next) {
            if (store.state['auth'].loggedIn) {
                next()
            } else {
                next('/auth/login')
            }
        },
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/Admin/Dashboard/Dashboard.vue'),
                meta: {
                    requiresAuth: true,
                    breadcrumb: "Dashboard"
                },
            },
            {
                path: 'advertisers',
                name: 'Advertisers',
                component: () => import('@/views/Admin/Advertisers/index.vue'),
                meta: {
                    requiresAuth: true,
                    breadcrumb: "Advertisers"
                },
                children: [
                    {
                        path: 'index',
                        name: 'AdvertisersList',
                        component: () => import('@/views/Admin/Advertisers/List/index.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Advertisers List"
                        },
                    },
                    {
                        path: 'create',
                        name: 'AdvertiserCreate',
                        component: () => import('@/views/Admin/Advertisers/Create/create.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Create new advertiser"
                        },
                    },
                    {
                        path: 'edit/:id',
                        name: 'AdvertiserEdit',
                        component: () => import('@/views/Admin/Advertisers/Edit/edit.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Edit advertiser"
                        },
                    }
                ]
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
