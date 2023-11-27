<template>
  <div class="recent-anime max-w-screen-xl px-5 py-5 mx-auto">
    <template v-if="isLoading">
      <VSpinner />
    </template>
    <template v-else>
      <div class="flex">
        <h1 class="text-xl py-5">Recent Anime</h1>
      </div>
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 animated"
        :class="{ 'animated-fade-in': !loading }"
      >
        <RouterLink
          :to="'/anime/' + anime.id"
          v-for="anime in animeList"
          :key="anime.id"
          class="card border border-dark-50 rounded-lg relative overflow-hidden group"
        >
          <div class="relative">
            <img
              :src="anime.image"
              :alt="anime.title"
              draggable="false"
              class="w-full h-60 md:h-80 object-cover transition-opacity duration-300"
            />
            <div
              class="absolute h-[102%] inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"
            ></div>
          </div>
          <div
            class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:animated hover:animated-fade-in"
          >
            <div i-carbon-play-filled class="text-white text-7xl" style="margin-top: -1em" />
          </div>
          <div class="p-4">
            <h3 class="font-semibold truncate">
              {{ anime.title?.english || anime.title?.userPreferred || anime.title?.romaji }}
            </h3>
            <p class="text-sm">Type: {{ anime.type }}</p>
            <p class="text-sm text-orange-300 underline">{{ anime.episodeTitle }}</p>
          </div>
        </RouterLink>
      </div>

      <div class="flex justify-center py-5">
        <button
          @click="previousPage"
          :disabled="page === 1"
          :class="{
            btn: true,
            border: true,
            'border-dark-300': true,
            'bg-dark-50 hover:bg-dark-50': page === 1,
            'mr-2': true,
            'disabled:opacity-50': page === 1
          }"
        >
          Previous Page
        </button>
        <button
          @click="nextPage"
          :disabled="page === totalPages"
          :class="{
            btn: true,
            border: true,
            'border-dark-300': true,
            'bg-dark-50 hover:bg-dark-50': page === totalPages,
            'ml-2': true,
            'disabled:opacity-50': page === totalPages
          }"
        >
          Next Page
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      animeList: [],
      isLoading: false,
      page: 1,
      totalPages: null
    }
  },
  async created() {
    const page = 1
    const perPage = 48
    const year = new Date().getFullYear()
    const status = 'FINISHED'

    try {
      this.isLoading = true
      const { data } = await axios.get(
        `https://inu-api-roan.vercel.app/meta/anilist/recent-episodes`,
        {
          params: { page, perPage, year, status }
        }
      )
      this.animeList = data.results
    } catch (err) {
      console.error(err.message)
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    async fetchAnimeList() {
      const perPage = 48

      try {
        this.isLoading = true
        const { data } = await axios.get(
          `https://inu-api-roan.vercel.app/meta/anilist/recent-episodes`,
          {
            params: { page: this.page, perPage }
          }
        )
        this.animeList = data.results
        if (data.pageInfo && data.pageInfo.lastPage) {
          this.totalPages = data.pageInfo.lastPage
        } else {
          this.totalPages = null
        }
      } catch (err) {
        console.error(err.message)
      } finally {
        this.isLoading = false
      }
    },
    nextPage() {
      this.page++
      this.fetchAnimeList()
    },
    previousPage() {
      if (this.page > 1) {
        this.page--
        this.fetchAnimeList()
      }
    }
  }
}
</script>
