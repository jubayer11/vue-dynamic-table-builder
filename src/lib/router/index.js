import { createRouter, createWebHistory } from 'vue-router'
import Home from '@demo/pages/index.vue'


const routes = [
    { path: '/', redirect: '/home' },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/details/:id',
        name: 'Details',
        component: { template: '<div>Details for ID: {{ $route.params.id }}</div>' }
    }
]

const router = createRouter({
    history: createWebHistory('/vue-dynamic-table-builder/'),
    routes
})

export default router
