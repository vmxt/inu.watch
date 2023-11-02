<template>
  <div class="recent-anime max-w-screen-xl px-5 py-5 mx-auto">
    <template v-if="!isLoading">
      <div class="flex">
        <h1 class="text-xl py-5">Discover Anime {{ getTypeLabel(type) }}</h1>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 animated"
        :class="{ 'animated-fade-in': !loading }">
        <RouterLink :to="'/anime/' + anime.id" v-for="anime in animeList" :key="anime.id"
          class="card border border-dark-50">
          <img :src="anime.image" :alt="anime.title" draggable="false" class="w-full h-60 md:h-80 object-cover" />
          <div class="p-4">
            <h3 class="font-semibold truncate">
              {{ anime.title?.english || anime.title?.userPreferred }}
            </h3>
            <p class="text-sm">Type: {{ anime.type }}</p>
            <div class="flex items-center">
              <div i-carbon-star-filled class="mr-1 py-2" />
              <span>{{ (anime.rating / 10).toFixed(1) }}</span>
            </div>
          </div>
        </RouterLink>
      </div>
      <div class="flex justify-center py-5">
        <button @click="previousPage" :disabled="page === 1"
          :class="{ 'btn': true, 'border': true, 'border-dark-300': true, 'bg-dark-50 hover:bg-dark-50': page === 1, 'mr-2': true, 'disabled:opacity-50': page === 1 }">Previous
          Page</button>
        <button @click="nextPage" :disabled="page === totalPages"
          :class="{ 'btn': true, 'border': true, 'border-dark-300': true, 'bg-dark-50 hover:bg-dark-50': page === totalPages, 'ml-2': true, 'disabled:opacity-50': page === totalPages }">Next
          Page</button>
      </div>
    </template>
    <template v-else>
      <VSpinner />
    </template>
  </div>
</template>

<script>
import axios from 'axios';

function getFormatParam(type) {
  const formatMap = {
    'Movies': 'MOVIE',
    'TV Series': 'TV',
    'OVAs': 'OVA',
    'ONAs': 'ONA',
    'Specials': 'SPECIAL'
  };

  return formatMap[type] || type;
}

export default {
  data() {
    return {
      animeList: [],
      isLoading: false,
      page: 1,
      type: this.$route.params.type,
      totalPages: null,
    };
  },
  methods: {
    getTypeLabel(type) {
      const typeMap = {
        'TV': 'TV Series',
        'TV_SHORT': 'TV Series',
        'OVA': 'OVAs',
        'ONA': 'ONAs',
        'MOVIE': 'Movies',
        'SPECIAL': 'Specials'
      };

      return typeMap[type] || type;
    },
    async fetchAnimeList() {
      const perPage = 50;
      const status = 'FINISHED';

      try {
        this.isLoading = true;
        const { data } = await axios.get(`https://animeden-api.vercel.app/meta/anilist/advanced-search`, {
          params: { page: this.page, perPage, status, format: getFormatParam(this.type) }
        });

        if (data.pageInfo) {
          this.totalPages = data.pageInfo.lastPage;
        }

        this.animeList = data.results;
      } catch (err) {
        console.error(err.message);
      } finally {
        this.isLoading = false;
      }
    },
    nextPage() {
      this.page++;
      this.fetchAnimeList();
    },
    previousPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchAnimeList();
      }
    },
  },
  async created() {
    await this.fetchAnimeList();
  },
  watch: {
    $route(to, from) {
      if (to.params.type !== from.params.type) {
        this.type = to.params.type;
        this.fetchAnimeList();
      }
    }
  }
};
</script>
