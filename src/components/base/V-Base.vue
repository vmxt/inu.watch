<template>
  <div class="flex justify-center items-left h-screen basepage">
    <div class="max-w-lg p-6 rounded-lg shadow-lg">
      <div class="flex py-5 items-center justify-center">
        <div
          i-icon-park-solid-dog
          class="self-center text-5xl font-semibold whitespace-nowrap text-orange-100 mr-5"
        />
      </div>
      <div class="mb-4">
        <VSearchInput />
      </div>
      <div class="mb-4">
        <RouterLink
          to="/home"
          type="button"
          class="btn text-sm focus:outline-none btn border border-dark-300 bg-dark"
          >Go to Homepage
        </RouterLink>
      </div>
      <div class="mb-6">
        <h2 class="text-xl font-bold">No Ads just Anime</h2>
        <p>
          Inu offers an ad-free experience, solely dedicated to anime. With its straightforward yet
          feature-packed interface, extensive library, and frequent updates, it's the go-to site for
          streaming anime for free online.
        </p>
      </div>
      <div class="mb-6">
        <h2 class="text-xl font-bold">All-in-One Features</h2>
        <p>
          Inu is equipped with all the essential features that anime lovers crave. From a vast anime
          library to advanced functionalities, Inu offers everything you need for an immersive
          streaming experience. Enjoy a wide selection of anime series, genres, and episodes, all
          conveniently accessible within a single platform.
        </p>
      </div>
      <div class="mb-6">
        <h2 class="text-xl font-bold">Hourly Content Updates</h2>
        <p class="pb-10">
          Inu ensures that anime fans never miss out on the latest episodes and series. The
          platform's dedication to providing up-to-date content is evident through its hourly
          updates. Discover new episodes, catch up on recent releases, and explore trending anime
          series, all available for streaming at your convenience.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.basepage {
  overflow-x: hidden;
}
</style>
