import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [{
  path: '/',
  name: 'Main',
  component: () => import('../../views/MainView.vue'),
}, {
  path: '/signIn',
  name: 'SignIn',
  component: () => import('../../views/LoginView.vue'),
}, {
  path: '/signUp',
  name: 'SignUp',
  component: () => import('../../views/RegisterView.vue'),
}, {
  path: '/signUp',
  name: 'SignUp',
  component: () => import('../../views/RegisterView.vue'),
}, {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('../../views/NotFoundView.vue'),
}];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
