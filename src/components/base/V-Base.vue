<template>
  <div class="flex justify-center items-left h-screen basepage">
    <div class="max-w-lg p-6 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-4 text-center">The simplest way to watch anime.</h1>
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
        <h2 class="text-xl font-bold">Watch Anime Online Free</h2>
        <p>
          If you're searching for a website to watch anime online free with a simple yet
          feature-rich interface, a vast database, and hourly updates, look no further than Inu.
          Especially if you were a fan of AnimixPlay, you definitely can't afford to miss out on
          Inu.
        </p>
      </div>
      <div class="mb-6">
        <h2 class="text-xl font-bold">Familiar and Intuitive Interface:</h2>
        <p>
          Inu takes inspiration from the popular AnimixPlay platform, boasting a simple,
          minimalistic interface that ensures a seamless browsing experience. The website's clean
          design and intuitive layout allow users to easily navigate and discover their favorite
          anime series effortlessly.
        </p>
      </div>
      <div class="mb-6">
        <h2 class="text-xl font-bold">All-in-One Features:</h2>
        <p>
          Inu is equipped with all the essential features that anime lovers crave. From a vast anime
          library to advanced functionalities, Inu offers everything you need for an immersive
          streaming experience. Enjoy a wide selection of anime series, genres, and episodes, all
          conveniently accessible within a single platform.
        </p>
      </div>
      <div class="mb-6">
        <h2 class="text-xl font-bold">Hourly Content Updates:</h2>
        <p>
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
