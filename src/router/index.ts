import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/query',
            name: 'query',
            component: () => import('../views/QueryExample.vue')
        },
        {
            path: '/components',
            name: 'components',
            component: () => import('../views/ComponentsView.vue')
        },
        {
            path: '/features',
            name: 'features',
            component: () => import('../views/FeaturesView.vue')
        },
        {
            path: '/kanban',
            name: 'kanban',
            component: () => import('../views/KanbanView.vue')
        },
        {
            path: '/forms',
            component: () => import('../views/forms/FormsLayout.vue'),
            children: [
                {
                    path: '',
                    redirect: '/forms/login'
                },
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('../views/forms/LoginForm.vue')
                },
                {
                    path: 'register',
                    name: 'register',
                    component: () => import('../views/forms/RegisterForm.vue')
                },
                {
                    path: 'contact',
                    name: 'contact',
                    component: () => import('../views/forms/ContactForm.vue')
                }
            ]
        }
    ]
})

export default router
