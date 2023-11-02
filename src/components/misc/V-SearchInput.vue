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
      @input="handleSearch"
      @keyup.esc="closeDropdown"
    />

    <div
      v-show="searchStore.searchResults.length > 0 && searchStore.searchQuery"
      class="absolute mt-2 w-full bg-dark border-dark-300 rounded-lg shadow-lg p-2"
    >
      <ul class="list-none p-0 m-0">
        <RouterLink
          v-for="result in searchStore.searchResults"
          :to="'/anime/' + result.id"
          :key="result.id"
          class="block py-2 px-3 hover:bg-dark-200 hover:text-orange-200 cursor-pointer truncate"
          @click="handleResultClick"
        >
          {{ result.title?.english || result.title?.userPreferred }}
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

    const handleSearch = async () => {
      const query = searchStore.searchQuery
      await searchStore.handleSearch(query)
    }

    const closeDropdown = () => {
      searchStore.closeDropdown()
    }

    const handleResultClick = () => {
      searchStore.handleResultClick()
    }

    return {
      searchStore,
      handleSearch,
      closeDropdown,
      handleResultClick
    }
  }
}
</script>
