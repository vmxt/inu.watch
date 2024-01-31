<template>
  <div class="relative mt-4 md:mt-0">
    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
      <div i-carbon-search />
    </span>

    <input
      type="text"
      id="search-navbar"
      class="block w-full p-2 pl-10 text-sm border-dark-100 border bg-dark"
      placeholder="Search Anime..."
      v-model="searchStore.searchQuery"
      @input="handleSearchDebounced"
      @keyup.esc="closeDropdown"
    />

    <div
      v-if="searchStore.loading"
      class="absolute inset-0 flex items-center justify-center bg-dark-500"
    >
      <div i-svg-spinners-3-dots-bounce />
    </div>

    <div
      v-if="!searchStore.loading && searchStore.searchResults.length > 0 && searchStore.searchQuery"
      class="absolute mt-2 w-full bg-dark-500 border border-dark-300 rounded-lg shadow-lg p-2"
    >
      <ul class="list-none p-0 m-0">
        <RouterLink
          v-for="result in searchStore.searchResults.slice(0, 5)"
          :to="'/anime/' + result.id"
          :key="result.id"
          class="flex items-center py-2 px-3 hover:bg-dark-200 hover:text-orange-200 cursor-pointer truncate"
          @click="handleResultClick"
        >
          <div class="flex-shrink-0 w-15 h-20 mr-3">
            <img
              v-if="result.image"
              :src="result.image"
              alt="Anime Poster"
              class="w-full h-full object-cover rounded"
            />
          </div>
          <span class="flex-grow truncate">{{
            result.title?.english || result.title?.userPreferred
          }}</span>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>

<script>
import { useSearchStore } from '@/stores/searchStore'

export default {
  setup() {
    const searchStore = useSearchStore()

    let timeoutId = null

    const handleSearch = async () => {
      searchStore.loading = true

      if (searchStore.searchQuery.trim() === '') {
        searchStore.closeDropdown()
        searchStore.loading = false
        return
      }

      try {
        const query = searchStore.searchQuery
        const response = await fetch(`${import.meta.env.VITE_API_URL}/meta/anilist/${query}`)
        const data = await response.json()
        searchStore.searchResults = data.results
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        searchStore.loading = false
      }
    }

    const handleSearchDebounced = () => {
      clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        handleSearch()
      }, 500)

      if (searchStore.searchQuery.trim() === '') {
        clearTimeout(timeoutId)
        searchStore.closeDropdown()
      }
    }

    const closeDropdown = () => {
      searchStore.closeDropdown()
    }

    const handleResultClick = () => {
      searchStore.handleResultClick()
    }

    return {
      searchStore,
      handleSearchDebounced,
      closeDropdown,
      handleResultClick
    }
  }
}
</script>
