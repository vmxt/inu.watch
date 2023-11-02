<template>
  <VNavbar />
  <VCarousel />
  <TabGroup>
    <TabList class="flex grid justify-center gap-5">
      <Tab
        class="watch_btn border border-dark-200"
        :class="{ 'text-orange-200': activeTab === 0 }"
        @click="changeTab(0)"
      >
        Top Anime</Tab
      >
      <Tab
        class="watch_btn border border-dark-200"
        :class="{ 'text-orange-200': activeTab === 1 }"
        @click="changeTab(1)"
      >
        Popular Anime</Tab
      >
      <Tab
        class="watch_btn border border-dark-200"
        :class="{ 'text-orange-200': activeTab === 2 }"
        @click="changeTab(2)"
      >
        Trending Anime</Tab
      >
    </TabList>
    <TabPanels>
      <TabPanel>
        <VTopAnime />
      </TabPanel>
      <TabPanel>
        <VPopularAnime />
      </TabPanel>
      <TabPanel>
        <VTrendingAnime />
      </TabPanel>
    </TabPanels>
  </TabGroup>
  <VFooter />
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

let activeTab = 0

function changeTab(tabIndex) {
  activeTab = tabIndex
}
</script>
