import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path:'/launchPage',
    name:'LaunchPage',
    component:()=>import('@/pages/launchPage.vue')
  },
  {
    path:'/dashboard',
    name:'Dashboard',
    component:()=>import('@/pages/dashboard.vue')
  },
  {
    path:'/suspend',
    name:'Suspend',
    component:()=>import('@/pages/suspend.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
