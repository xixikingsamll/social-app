import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,    
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
    
  },
  {
    path: '/information',
    name: 'information',
    component: () => import('@/views/InformationPage.vue'),
        meta:{
      requiresAuth:true
    }

  },
  {
    path: '/ground',
    name: 'ground',
    component: () => import('@/views/GroundPage.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/UpdateDetail.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/personal/:id',
    name: 'personal',
    component: () => import('@/views/PersonalPage.vue'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/chat/:id',
    name: 'chat',
    component: () => import('@/views/ChatPage.vue'),
        meta:{
      requiresAuth:true
    }
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('@/views/UploadPage.vue'),
        meta:{
      requiresAuth:true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token = JSON.parse(localStorage.getItem('userInfo'));
  if (to.meta.requiresAuth &&!token) {
    // 如果要访问的路由需要认证，且用户没有token，则跳转到登录页面
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
