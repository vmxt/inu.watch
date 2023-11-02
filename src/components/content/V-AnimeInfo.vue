<template>
  <div v-if="anime" class="max-w-screen-2xl mx-auto p-6">
    <template v-if="!isLoading">
      <div class="mx-auto md:grid md:grid-cols-1 lg:grid-cols-3 md:gap-2 animated"
        :class="{ 'animated-fade-in': !loading }">
        <div class="overflow-hidden col-span-2">

          <div class="relative w-full">
            <video ref="videoElement" id="video-element" class="video-js w-full h-full md:h-140 z-10 py-1 px-2" controls
              preload="auto" width="800" height="500" :poster="anime.cover" data-setup="{}" />
          </div>

          <div class="pt-5">
            <div v-if="showNotification"
              class="flex items-center p-3 mb-4 text-sm rounded-lg bg-dark-300 border border-dark-50 ml-2">
              <div i-streamline-emojis-bell class="animated animated-swing animated-infinite px-3" />
              If the server doesn't work please try other providers below.
              <div class="flex-grow"></div>
              <div i-carbon-close-large @click="closeNotification" class="close-button cursor-pointer hover:text-white" />
            </div>
          </div>

          <div class="flex items-center">
            <div class="px-2">
              Episodes:
              <select v-model="selectedRange" @change="updateDisplayedEpisodes" class="btn px-2 py-1">
                <option v-for="range in episodeRanges" :key="range" :value="range">
                  {{ range }}
                </option>
              </select>
            </div>

            <div class="flex py-2 items-center">
              <div class="px-2">Provider:</div>
              <select v-model="provider" @change="updateProvider" class="btn px-2 py-1">
                <option value="gogoanime">Server 1</option>
                <option value="zoro">Server 2</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-6 md:grid-cols-9 lg:grid-cols-11 xl:grid-cols-12 gap-1 px-5">
            <div v-for="(episode, index) in displayedEpisodes" :key="index" :class="[
              'text-xs',
              'text-center',
              'bg-dark-200',
              'p-2',
              'hover:bg-dark-50',
              'cursor-pointer',
              { 'active-episode': episode === activeEpisode }
            ]" @click="selectEpisode(episode)">
              <p>{{ episode.number }}</p>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="flex-col md:flex-row lg:items-start">
            <div class="items-center justify-center mx-auto text-center">
              <img :src="anime.image" draggable="false" class="w-75 pt-5 object-cover mb-4 md:mr-4 px-2" />
            </div>
            <div class="w-full">
              <div class="flex items-center">
                <h1 class="text-2xl font-bold mr-2 w-80">
                  {{ anime.title?.english || anime.title?.userPreferred || anime.title?.romaji }}
                </h1>
              </div>
              <div class="description-container w-75">
                <p class="text-sm" :class="{ truncate: !showFullDescription }"
                  v-html="parseDescription(anime.description)"></p>
              </div>
              <span v-if="anime.description.length > 150 && !this.showFullDescription"
                class="font-bold cursor-pointer hover:underline" @click="this.showFullDescription = true">
                View more
              </span>
              <span v-if="this.showFullDescription" class="font-bold cursor-pointer hover:underline"
                @click="this.showFullDescription = false">
                View less
              </span>
              <div class="items-center mt-3">
                <div class="flex items-center">
                  <div i-carbon-star-filled class="mr-1 py-2" />
                  <span>{{ (anime.rating / 10).toFixed(1) }}</span>
                </div>
                <p class="text-sm mr-2">Studio: {{ anime.studios[0] }}</p>
                <p class="text-sm mr-2">Type: {{ anime.type }}</p>
                <p class="text-sm mr-2">Country: {{ anime.countryOfOrigin }}</p>
                <p class="text-sm mr-2">Genre: {{ anime.genres.join(', ') }}</p>
                <p class="text-sm mr-2">Premiered: {{ anime.season }} {{ anime.releaseDate }}</p>
                <p class="text-sm mr-2">
                  Date Aired: {{ anime.startDate.year }}-{{ anime.startDate.month }}-{{
                    anime.startDate.day
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="anime && anime.recommendations" class="max-w-screen-2xl mx-auto p-6">
        <h2 class="text-2xl font-semibold mb-4">You may also like</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2">
          <div v-for="recommendation in anime.recommendations.slice(0, 6)" :key="recommendation.id"
            class="card border border-dark-50 rounded-lg" @click="goToRecommendation(recommendation.id)"
            style="cursor: pointer">
            <img :src="recommendation.image" :alt="recommendation.title.userPreferred" draggable="false"
              class="w-full h-60 md:h-80 object-cover" />
            <div class="p-4">
              <h3 class="font-semibold truncate">
                {{ recommendation.title?.userPreferred || recommendation.title?.english }}
              </h3>
              <p class="text-gray-500 text-sm">Type: {{ recommendation.type }}</p>
              <div class="flex items-center">
                <div i-carbon-star-filled class="mr-1 py-2" />
                <span class="text-gray-500">{{ (recommendation.rating / 10).toFixed(1) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <VSpinner />
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default {
  data() {
    return {
      isLoading: true,
      anime: null,
      selectedRange: '1-100',
      perPage: 100,
      provider: 'gogoanime',
      showFullDescription: false,
      selectedEpisode: null,
      selectedEpisodeUrl: '',
      activeEpisode: null,
      videoPlaying: false,
      showNotification: true
    }
  },
  computed: {
    displayedEpisodes() {
      if (this.anime) {
        const [start, end] = this.selectedRange.split('-').map(Number)
        return this.anime.episodes.slice(start - 1, end)
      }
      return []
    },
    episodeRanges() {
      if (this.anime) {
        const totalEpisodes = this.anime.episodes.length
        const maxPerPage = this.perPage
        const rangeCount = Math.ceil(totalEpisodes / maxPerPage)
        return Array.from({ length: rangeCount }, (_, index) => {
          const start = index * maxPerPage + 1
          const end = Math.min((index + 1) * maxPerPage, totalEpisodes)
          return `${start}-${end}`
        })
      }
      return []
    }
  },
  watch: {
    provider: {
      handler: 'updateProvider',
      immediate: true
    },
    '$route.params.id': 'updateProvider'
  },
  methods: {
    parseDescription(description) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(description, 'text/html')
      return doc.body.innerHTML
    },
    async updateProvider() {
      this.isLoading = true
      const id = this.$route.params.id
      const provider = this.provider

      try {
        const response = await axios.get(
          `https://animeden-api.vercel.app/meta/anilist/info/${id}?provider=${provider}`
        )

        this.anime = response.data
        if (this.episodeRanges.length > 0) {
          this.selectedRange = this.episodeRanges[0]
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    async fetchEpisodeUrl(episodeId) {
      try {
        let url
        if (this.provider === 'zoro') {
          const response = await axios.get(`https://assaload-api.vercel.app/anime/zoro${episodeId}`)
          url = response.data.sources[0].url
        } else if (this.provider === 'gogoanime') {
          const response = await axios.get(`https://api.consumet.org/anime/gogoanime${episodeId}`)
          url = response.data.sources[0].url
        }

        this.selectedEpisodeUrl = url
      } catch (error) {
        console.error(error)
      }
    },
    async selectEpisode(episode) {
      this.activeEpisode = episode
      try {
        const response = await axios.get(
          `https://animeden-api.vercel.app/anime/gogoanime/watch/${episode.id.replace(/^\//, '')}`
        )

        const sources = response.data.sources
        const defaultSource = sources.find((source) => source.quality === 'default')

        if (defaultSource) {
          this.selectedEpisodeUrl = defaultSource.url

          const video = document.getElementById('video-element')
          const player = videojs(video)
          player.src(this.selectedEpisodeUrl)
        }
      } catch (error) {
        console.error(error)
      }
    },
    closeNotification() {
      this.showNotification = false;
    },
    goToRecommendation(id) {
      this.$router.push(`/anime/${id}`)
      window.scrollTo(0, 0)
    },
    created() {
      this.updateProvider()

      if (this.displayedEpisodes.length > 0) {
        this.selectedEpisode = this.displayedEpisodes[0]
        this.fetchEpisodeUrl(this.selectedEpisode.id)
      }
    }
  }
}
</script>

<style scoped>
.active-episode {
  background-color: rgba(34, 34, 34, var(--un-bg-opacity));
  color: rgba(254, 215, 170);
}

.truncate {
  max-height: 150px;
  overflow: hidden;
  position: relative;
}

.truncate::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), white 80%);
  pointer-events: none;
}

.description-container {
  max-height: 250px;
  overflow-y: auto;
  position: relative;
}

.truncate {
  max-height: 150px;
  overflow: hidden;
  position: relative;
}

.truncate::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  background: linear-gradient(to right, rgba(255, 255, 255, 0), white 80%);
  pointer-events: none;
}

.description-container {
  max-height: 250px;
  overflow-y: auto;
  position: relative;
}
</style>
