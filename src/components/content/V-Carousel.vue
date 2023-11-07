<template>
  <div class="v-carousel pb-10">
    <template v-if="isLoading">
      <VSpinner />
    </template>
    <template v-else>
      <div class="animated" :class="{ 'animated-fade-in': !loading }">
        <swiper
          v-if="results.length > 0"
          :spaceBetween="30"
          :centeredSlides="true"
          :autoplay="{
            delay: 5000,
            disableOnInteraction: false
          }"
          :pagination="{ type: 'progressbar' }"
          :modules="modules"
          :loop="true"
        >
          <swiper-slide v-for="result in results" :key="result.id">
            <div class="slide-content relative cursor-grab">
              <div class="w-2/3 p-4 h-auto flex flex-col md:h-[30rem] md:justify-end">
                <h1 class="py-2 text-lg md:text-3xl lg:text-5xl font-bold truncate z-100">
                  {{ result.title?.english || result.title?.userPreferred }}
                </h1>
                <h1 class="text-sm md:text-2xl font-semibold mb-2 truncate z-100">
                  {{ result.genres.join(', ') }}
                </h1>
                <div class="flex items-center py-1 z-100">
                  <h1 class="text-sm mr-2">{{ result.type }}</h1>
                  <div i-carbon-hd-filled class="text-2xl mr-2" />
                  <div i-carbon-closed-caption-filled class="text-2xl mr-2" />
                  <h1 class="text-sm">{{ result.releaseDate }}</h1>
                </div>

                <RouterLink :to="`/anime/${result.id}`" class="text-sm w-10 font-bold z-100">
                  <button class="flex items-center watch_btn">
                    <div i-carbon-play-filled-alt class="text-xl mr-2" />
                    Watch Now
                  </button>
                </RouterLink>
              </div>
              <div class="w-full h-full absolute right-0 top-0">
                <img
                  :src="result.cover"
                  class="h-[30vh] md:h-full w-full object-cover opacity-40"
                />
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </template>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/pagination'

import { Autoplay, Pagination } from 'swiper/modules'

export default {
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const modules = [Autoplay, Pagination]
    const results = ref([])
    const loading = ref(true)

    async function fetchResults() {
      try {
        loading.value = true
        const response = await axios.get('https://animeden-api.vercel.app/meta/anilist/trending', {
          params: {
            page: 17,
            perPage: 20
          }
        })
        results.value = response.data.results
      } catch (err) {
        throw new Error(err.message)
      } finally {
        loading.value = false
      }
    }

    fetchResults()

    return {
      modules,
      results,
      loading
    }
  }
}
</script>

<style scoped>
::v-deep .swiper-pagination-progressbar-fill {
  background-color: rgba(254, 215, 170) !important;
}
</style>
