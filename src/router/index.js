import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import ChatView from '@/views/ChatView.vue'
import ConversationView from '@/views/ConversationView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');

      if (!token) {
        return next('/login')
      }
      
      return next()
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');

      if (token) {
        return next('/')
      }

      return next()
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'))

      if (!token) {
        return next('/login')
      }

      if (user?.privillege_level < 3) {
        return next('/')
      } 

      return next()
    }
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');

      if (!token) {
        return next('/login')
      }
      
      return next()
    }

  },
  {
    path: '/conversation/:id',
    name: 'conversation',
    component: ConversationView,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token');

      if (!token) {
        return next('/login')
      }
      
      return next()
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
