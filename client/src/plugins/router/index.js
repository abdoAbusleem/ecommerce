import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../store/modules/auth';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {
            breadcramps: [
                {
                    id: 1,
                    name: 'home'
                }
            ],
            notRequiresAuth: true
        }
    },
    {
        path: '/product-details/:id',
        name: 'product-details',
        component: () => import('@/views/product-details.vue'),
        meta: {
            breadcramps: [
                {
                    id: 1,
                    name: 'home'
                },
                {
                    id: 2,
                    name: 'product-details'
                },
            ],
            notRequiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        meta: {
            notRequiresAuth: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/views/register.vue'),
        meta: {
            notRequiresAuth: true
        }
    },
]



const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: (to, from, savedPosition) => {
        if (to.hash) return { selector: to.hash }
        if (savedPosition) return savedPosition

        return { top: 0 }
    },
})

router.beforeEach((to, from, next) => {
    const store = auth()

    if (to.meta.notRequiresAuth) {
        if (store.isLoggedIn && (to.name === 'login' || to.name === 'register')) {
            return next({ name: 'home' })
        }

        return next()
    }
    else {
        if (store.isLoggedIn) {
            return next()
        }
        return next({ name: 'login' })
    }

}
)


export default router