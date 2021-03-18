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
        meta: { requiresAuth: true },
        beforeEnter(to, from, next) {
            console.log('admin:beforeEnter', {
                to: to,
                from: from,
                state: store.state,
                logguedin: store.state['auth'].loggedIn
            })
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
                component: () => import('@/views/Admin/Dashboard/Dashboard.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
