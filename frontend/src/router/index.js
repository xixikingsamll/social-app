import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/information',
    name: 'information',
    component: () => import('@/views/InformationPage.vue')

  },
  {
    path: '/ground',
    name: 'ground',
    component: () => import('@/views/GroundPage.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/UpdateDetail.vue')
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('@/views/PersonalPage.vue')
  },
  {
    path: '/chat/:id',
    name: 'chat',
    component: () => import('@/views/ChatPage.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/views/UploadPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
