import { createRouter, createWebHistory } from 'vue-router'
import Home from '@demo/pages/index.vue'
import View from "@demo/pages/RichStatusView.vue";
import AllFeatureActionView from "@demo/pages/AllFeatureActionView.vue";


const routes = [
    { path: '/', redirect: '/home' },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/view/action',
        name: 'ViewAction',
        component:  View
    },
    {
        path: '/view/all-feature/action',
        name: 'ViewAllFeatureAction',
        component:  AllFeatureActionView
    }
]

const router = createRouter({
    history: createWebHistory('/vue-dynamic-table-builder/'),
    routes
})

export default router
