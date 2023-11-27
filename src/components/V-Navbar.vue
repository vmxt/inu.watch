<template>
  <nav class="relative border-dark-300 border-b bg-dark-800 dark:bg-gray-800">
    <div class="container px-6 py-3 mx-auto md:flex">
      <div class="flex items-center justify-between">
        <RouterLink to="/home">
          <div
            i-icon-park-solid-dog
            class="self-center text-5xl font-semibold whitespace-nowrap text-orange-100 hover:text-orange-200 dark:text-white"
          />
        </RouterLink>

        <div class="flex md:hidden">
          <button @click="isOpen = !isOpen" type="button" class="" aria-label="toggle menu">
            <div i-carbon-menu v-if="!isOpen" class="text-3xl hover:text-orange-200" />
            <div i-carbon-close-large v-if="isOpen" class="text-3xl hover:text-orange-200" />
          </button>
        </div>
      </div>

      <div
        :class="[isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full']"
        class="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-dark-800 dark:bg-gray-800 md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between"
      >
        <div class="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0">
          <div class="flex flex-col px-2 -mx-2 md:flex-row md:py-0">
            <div class="relative">
              <RouterLink to="/recent">
                <button
                  class="px-2.5 uppercase py-2 uppercase transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-dark-200 hover:text-orange-200 dark:hover:bg-gray-200 md:mx-2"
                >
                  Recent
                </button>
              </RouterLink>
            </div>
          </div>

          <div class="relative" @click.stop="toggleGenreDropdown">
            <button
              class="px-2.5 uppercase py-2 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-dark-200 hover:text-orange-200 dark:hover:bg-gray-200 md:mx-2"
            >
              Genres
            </button>

            <div
              v-if="isOpenGenres"
              class="absolute w-full md:w-100 z-10 mt-2 bg-dark-600 border border-dark-300 rounded-lg shadow-lg p-2 grid grid-cols-3 gap-2"
            >
              <RouterLink
                v-for="genre in genres"
                :key="genre.id"
                :to="'/genre/' + genre.name"
                class="px-3 py-2 hover:bg-dark-200 hover:text-orange-200 cursor-pointer rounded-lg"
              >
                {{ genre.name }}
              </RouterLink>
            </div>
          </div>
          <div class="relative" @click.stop="toggleTypeDropdown">
            <button
              class="px-2.5 uppercase py-2 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-dark-200 hover:text-orange-200 dark:hover:bg-gray-200 md:mx-2"
            >
              Types
            </button>
            <div
              v-if="isOpenTypes"
              class="absolute w-full md:w-30 z-10 mt-2 bg-dark-600 border border-dark-300 rounded-lg shadow-lg p-2"
            >
              <RouterLink
                v-for="type in types"
                :key="type.param"
                :to="'/type/' + type.param"
                class="block px-3 py-2 hover:bg-dark-200 hover:text-orange-200 cursor-pointer rounded-lg"
              >
                {{ type.label }}
              </RouterLink>
            </div>
          </div>
        </div>
        <VSearchInput class="w-full md:w-100" />
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      isOpenGenres: false,
      searchQuery: '',
      genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Adventure' },
        { id: 3, name: 'Comedy' },
        { id: 4, name: 'Drama' },
        { id: 5, name: 'Fantasy' },
        { id: 6, name: 'Horror' },
        { id: 7, name: 'Mecha' },
        { id: 8, name: 'Music' },
        { id: 9, name: 'Mystery' },
        { id: 10, name: 'Psychological' },
        { id: 11, name: 'Romance' },
        { id: 12, name: 'Sci-Fi' },
        { id: 13, name: 'Slice of Life' },
        { id: 14, name: 'Sports' },
        { id: 15, name: 'Supernatural' },
        { id: 16, name: 'Thriller' }
      ],
      isOpenTypes: false,
      types: [
        { label: 'Movies', param: 'MOVIE' },
        { label: 'TV Series', param: 'TV' },
        { label: 'TV Short', param: 'TV_SHORT' },
        { label: 'OVAs', param: 'OVA' },
        { label: 'ONAs', param: 'ONA' },
        { label: 'Specials', param: 'SPECIAL' },
        { label: 'Music', param: 'MUSIC' }
      ],
      searchResults: []
    }
  },
  methods: {
    beforeRouteUpdate(to, next) {
      if (to.path === '/anime/random') {
        this.$router.go(0)
      }
      next()
    },
    toggleGenreDropdown() {
      this.isOpenGenres = !this.isOpenGenres
      if (this.isOpenGenres && this.isOpenTypes) {
        this.isOpenTypes = false
      }
    },
    toggleTypeDropdown() {
      this.isOpenTypes = !this.isOpenTypes
      if (this.isOpenTypes && this.isOpenGenres) {
        this.isOpenGenres = false
      }
    },
    async handleSearch() {
      const query = document.getElementById('search-navbar').value
      try {
        const response = await fetch(`https://inu-api-roan.vercel.app/meta/anilist/${query}`)
        const data = await response.json()
        this.searchResults = data.results
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async handleTypeChange() {
      const type = this.$route.params.type

      try {
        const response = await fetch(`https://inu-api-roan.vercel.app/meta/anilist/${type}`)
        const data = await response.json()
        this.searchResults = data.results
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  },
  watch: {
    watch: {
      $route(to) {
        if (to.path === '/anime') {
          this.handleSearch()
        } else if (to.path.startsWith('/type/')) {
          this.handleTypeChange()
        }
      }
    }
  }
}
</script>
