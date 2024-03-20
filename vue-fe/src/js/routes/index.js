import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from "../stores/authStore";
import ProductIndex from '@pages/Product/ProductIndex.vue';
import ProductCreate from '@pages/Product/ProductCreate.vue';
import LoginIndex from '@pages/Login/LoginIndex.vue';
import NotFound from '@pages/Errors/Page404.vue';
import AppLayout from '@layouts/AppLayout.vue';


const routes = [
    {
        path: '/login',
        name: 'Login',
        component: LoginIndex,
        meta: {
            requiresGuest: true,
        }
    },
    {
        path: '/',
        name: 'app',
        component: AppLayout,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: '/product',
                name: 'Product',
                component: ProductIndex
            },
            {
                path: '/product/create',
                name: 'ProductCreate',
                component: ProductCreate
            },
            {
                path: '/product/edit/:id?',
                name: 'ProductEdit',
                component: ProductCreate
            },
        ]
    },
    {
        path: '/:patMatch(.*)',
        name: 'NotFound',
        component: NotFound
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();
    if (to.meta.requiresAuth && !auth.userToken) {
        next({ name: 'Login' })
    } else if (to.meta.requiresGuest && auth.userToken) {
        next({name: 'Product' })
    }else{
        next();
    }
});

export default router;
