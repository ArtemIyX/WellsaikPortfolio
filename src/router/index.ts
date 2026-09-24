import { createRouter, createWebHistory } from 'vue-router'

import DebugView from '@/views/DebugView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/debug', name: 'debug', component: DebugView },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash }

    return { top: 0 }
  },
})

export default router
