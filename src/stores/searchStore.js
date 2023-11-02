import { defineStore } from 'pinia'

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
        const response = await fetch(`https://animeden-api.vercel.app/meta/anilist/${query}`)
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
