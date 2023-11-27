import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('@/components/404/V-NotFound.vue'),
      meta: {
        title: 'Inu - Not Found'
      }
    },
    {
      path: '/',
      name: 'base',
      component: () => import('@/views/BaseView.vue'),
      meta: {
        title: 'Inu - Home'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: 'Inu - Watch Anime Online for Free'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/Footer/AboutView.vue'),
      meta: {
        title: 'Inu - About'
      }
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('@/views/Footer/FaqView.vue'),
      meta: {
        title: 'Inu - FAQ'
      }
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('@/views/Footer/PrivacyPolicyView.vue'),
      meta: {
        title: 'Inu - Privacy Policy'
      }
    },
    {
      path: '/recent',
      name: 'recent',
      component: () => import('@/views/RecentAnimeView.vue'),
      meta: {
        title: 'Inu - Recent Anime'
      }
    },
    {
      path: '/type/:type',
      name: 'types',
      component: () => import('@/views/AnimeTypesView.vue'),
      meta: {
        title: 'Inu - Types'
      }
    },
    {
      path: '/genre/:genre',
      name: 'genre',
      component: () => import('@/views/AnimeGenreView.vue'),
      meta: {
        title: 'Inu - Genre'
      }
    },
    {
      path: '/anime/:id',
      name: 'anime-info',
      component: () => import('@/views/AnimeInfoView.vue'),
      meta: {
        title: ''
      },
      beforeEnter: async (to, from, next) => {
        try {
          const response = await axios.get(
            `https://inu-api-roan.vercel.app/meta/anilist/info/${to.params.id}`
          )
          const animeInfo = response.data

          const title =
            animeInfo.title.romaji || animeInfo.title.userPreferred || animeInfo.title.english

          if (title) {
            to.meta.title = title
          }

          next()
        } catch (error) {
          console.error(error)
          next()
        }
      }
    }
  ]
})

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = `Anime - ${to.meta.title}`
  } else {
    document.title = 'Inu - Anime'
  }
})

export default router
