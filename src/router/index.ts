import { createRouter, createWebHistory } from 'vue-router'

import DebugView from '@/views/DebugView.vue'
import HomeView from '@/views/HomeView.vue'
import ProjectCaseStudyView from '@/views/ProjectCaseStudyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/projects/:projectId', name: 'project-case-study', component: ProjectCaseStudyView },
    { path: '/debug', name: 'debug', component: DebugView },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }

    return { top: 0 }
  },
})

export default router
