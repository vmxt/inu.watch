import { defineStore } from 'pinia'

import.meta.env.VITE_API_URL

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    isOpen: false,
    searchQuery: '',
    searchResults: []
  }),
  actions: {
    async handleSearch(query) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/meta/anilist/${query}`)
        const data = await response.json()
        this.searchResults = data.results
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    closeDropdown() {
      this.searchResults = []
    },
    handleResultClick() {
      this.searchQuery = ''
      this.closeDropdown()
    }
  }
})
