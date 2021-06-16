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
                beforeEnter(to, from, next) {
                    if (store.state['auth'].loggedIn) {
                        next('/admin/campaigns/index')
                    } else {
                        next('/auth/login')
                    }
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
                        name: 'AdvertisersIndex',
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
                            breadcrumb: "Create New Advertiser"
                        },
                    },
                    {
                        path: 'edit/:id',
                        name: 'AdvertiserEdit',
                        component: () => import('@/views/Admin/Advertisers/Edit/edit.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Edit Advertiser"
                        },
                    }
                ]
            },
            {
                path: 'custom_lists',
                name: 'CustomList',
                component: () => import('@/views/Admin/CustomList/index.vue'),
                meta: {
                    requiresAuth: true,
                    breadcrumb: "Custom List"
                },
                children: [
                    {
                        path: 'index',
                        name: 'CustomListIndex',
                        component: () => import('@/views/Admin/CustomList/List/index.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "List of custom lists"
                        },
                    },
                    {
                        path: 'create',
                        name: 'CustomListCreate',
                        component: () => import('@/views/Admin/CustomList/Create/create.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Create New Custom List"
                        },
                    },
                    {
                        path: 'show/:id',
                        name: 'CustomListShow',
                        component: () => import('@/views/Admin/CustomList/Show/show.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Add List Items"
                        },
                    },
                    {
                        path: 'edit/:id',
                        name: 'ListsEdit',
                        //component: () => import('@/views/Admin/CustomList/Edit/edit.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Edit Custom List"
                        },
                    }
                ]
            },
            {
                path: 'modifiers',
                name: 'Modifiers',
                component: () => import('@/views/Admin/Modifiers/index.vue'),
                meta: {
                    requiresAuth: true,
                    breadcrumb: "Modifiers"
                },
                children: [
                    {
                        path: 'index',
                        name: 'ModifiersList',
                        component: () => import('@/views/Admin/Modifiers/List/index.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Modifiers List"
                        },
                    },
                    /*{
                        path: 'create',
                        name: 'ModifiersCreate',
                        component: () => import('@/views/Admin/Modifiers/Create/create.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Create new Modifier"
                        },
                    },
                    {
                        path: 'edit/:id',
                        name: 'ModifiersEdit',
                        component: () => import('@/views/Admin/Modifiers/Edit/edit.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Edit Modifier"
                        },
                    }*/
                ]
            },
            {
                path: 'campaigns',
                name: 'Campaigns',
                component: () => import('@/views/Admin/Campaigns/index.vue'),
                meta: {
                    requiresAuth: true,
                    breadcrumb: "Campaigns"
                },
                children: [
                    {
                        path: 'index',
                        name: 'CampaignsIndex',
                        component: () => import('@/views/Admin/Campaigns/List/index.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Campaigns List"
                        },
                    },
                    {
                        path: 'create',
                        name: 'CampaignCreate',
                        component: () => import('@/views/Admin/Campaigns/Create/create.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Create New Campaign"
                        },
                    },
                    // {
                    //     path: 'show/:id',
                    //     name: 'CampaignsShow',
                    //     component: () => import('@/views/Admin/Campaigns/Show/show.vue'),
                    //     meta: {
                    //         requiresAuth: true,
                    //         breadcrumb: "Add list items"
                    //     },
                    // },
                    {
                        path: 'edit/:id',
                        name: 'CampaignEdit',
                        component: () => import('@/views/Admin/Campaigns/Edit/edit.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "edit-campaign"
                        },
                    }
                ]
            },
            {
                path: 'lineitem',
                name: 'LineItem',
                component: () => import('@/views/Admin/LineItem/index.vue'),
                meta: {
                    requiresAuth: true,
                    breadcrumb: "Line Item List"
                },
                children: [
                    {
                        path: 'index',
                        name: 'lineItemList',
                        component: () => import('@/views/Admin/LineItem/List/index.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Line Item List"
                        },
                    },
                    {
                        path: 'create',
                        name: 'LineItemCreate',
                        component: () => import('@/views/Admin/LineItem/Create/create.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Create New Line Item"
                        },
                    },
                ]
            },
            {
                path: 'creatives',
                name: 'creatives',
                component: () => import('@/views/Admin/Creatives/index.vue'),
                meta: {
                    requiresAuth: true,
                    breadcrumb: "Creatives"
                },
                children: [
                    {
                        path: 'index',
                        name: 'CreativesIndex',
                        component: () => import('@/views/Admin/Creatives/List/index.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Creatives List"
                        },
                    },
                    {
                        path: 'create',
                        name: 'CreativesCreate',
                        component: () => import('@/views/Admin/Creatives/Create/create.vue'),
                        meta: {
                            requiresAuth: true,
                            breadcrumb: "Create New Creative"
                        },
                    },
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