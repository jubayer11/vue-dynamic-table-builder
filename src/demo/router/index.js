import { createRouter, createWebHistory } from 'vue-router'
import Demo from '@demo/views/demo/pages/index.vue'
import View from "@demo/views/demo/pages/RichStatusView.vue";
import AllFeatureActionView from "@demo/views/demo/pages/AllFeatureActionView.vue";
import Documentation from "@demo/views/docs/pages/index.vue"

const routes = [
    { path: '/', redirect: '/demo' },
    {
        path: '/demo',
        name: 'Demo',
        component: Demo
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
    },

    //documentation route
    {
        path: '/docs',
        name: 'Documentation',
        component:  Documentation
    }

]

const router = createRouter({
    history: createWebHistory('/vue-dynamic-table-builder/'),
    routes
})

export default router
