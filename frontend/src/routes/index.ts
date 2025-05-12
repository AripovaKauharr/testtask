import { createRouter, createWebHistory, RouteRecordRaw,  } from 'vue-router';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import LoginPage from '../modules/auth/views/LoginPage.vue';
import DashboardPage from '../modules/dashboard/views/DashboardPage.vue';
import DetailsPage from '../modules/details/views/DetailsPage.vue';
import UsersPage from '../modules/users/views/UsersPage.vue';
import { getToken } from '../modules/auth/service';

const routes: RouteRecordRaw[]  = [
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'dashboard',
        component: DashboardPage,
        meta: { requiresAuth: true }
      },
      {
        path: 'details',
        component: DetailsPage,
        meta: { requiresAuth: true }
      },
      {
        path: 'users',
        component: UsersPage,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/login'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = getToken();

  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else if (to.path === '/login' && token) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;
