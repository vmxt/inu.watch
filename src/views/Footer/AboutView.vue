<template>
  <VNavbar />
  <section class="about">
    <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
      <h2 class="mb-8 text-4xl tracking-tight font-extrabold">About</h2>
      <div
        class="grid pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2"
      >
        <div>
          <div class="mb-10">
            <h3 class="flex items-center mb-4 text-lg font-medium dark:text-white">
              <div i-carbon-help-filled class="mr-2 w-5 h-5" />
              About Inu
            </h3>
            <p class="dark:text-gray-400">
              Inspired by the beloved
              <a
                href="https://anix.to"
                target="_blank"
                class="text-white font-medium hover:underline"
                >Anix</a
              >, this project, Inu, is born out of my deep affection for anime, my coding
              enthusiasm, and my thirst for knowledge. It's a platform that weaves these passions
              together in a manner that's both enjoyable and educational. I built this website as a
              coding practice exercise, aiming to master the Vue.js framework and learn the ropes of
              integrating REST APIs. It's all about hands-on learning and practical application of
              my coding skills.
            </p>
          </div>
          <div class="mb-10">
            <h3 class="flex items-center mb-4 text-lg font-medium dark:text-white">
              <div i-carbon-help-filled class="mr-2 w-5 h-5" />
              Purpose
            </h3>
            <p class="dark:text-gray-400">
              Inu is a platform designed for coding enthusiasts, especially those interested in
              working with REST APIs using Vue.js. The aim is to provide a fun and educational
              environment where users can explore the technical aspects of integrating APIs with
              Vue.js while using anime streaming data.
            </p>
          </div>
          <div class="mb-10">
            <h3 class="flex items-center mb-4 text-lg font-medium dark:text-white">
              <div i-carbon-help-filled class="mr-2 w-5 h-5" />
              Why Vue.js?
            </h3>
            <p class="dark:text-gray-400">
              I'm aware of the importance of well qualified support,
              <a
                href="https://vuejs.org/"
                class="text-white font-medium hover:underline"
                target="_blank"
                >Vue.js</a
              >
              was the perfect choice for Inu due to its simplicity, flexibility, and ease of
              integration. With the help of
              <a
                href="https://flowbite.com/"
                class="text-white font-medium hover:underline"
                target="_blank"
                >Flowbite</a
              >
              components, I've crafted a sleek and responsive user interface that enhances the
              overall experience.
            </p>
          </div>
          <div class="mb-10">
            <h3 class="flex items-center mb-4 text-lg font-medium dark:text-white">
              <div i-carbon-help-filled class="mr-2 w-5 h-5" />
              Third Party API
            </h3>
            <p class="dark:text-gray-400">
              Integrating third-party REST APIs has added a dynamic touch to Anix. I fetch real-time
              data such as series information, episode lists, and user reviews to make the
              experience rich and engaging.
            </p>
            <p class="py-2 dark:text-gray-400">
              Find out more information by
              <a
                href="https://raw.githubusercontent.com/consumet/consumet.ts/master/LICENSE"
                class="font-thin text-white hover:underline"
                >reading the license</a
              >.
            </p>
          </div>
        </div>
        <div>
          <div class="mb-10">
            <h3 class="flex items-center mb-4 text-lg font-medium dark:text-white">
              <div i-carbon-help-filled class="mr-2 w-5 h-5" />
              Under development
            </h3>
            <p class="dark:text-gray-400">
              Above all, Inu is a labor of love for anime. It's a platform created by a fan, for
              fans, and I'm constantly working to improve it. However, please bear with it as the
              website is still in development and may have some bugs. If you encounter any issues,
              kindly report them to us. Your contributions and feedback are highly valued. Let's
              make Inu even better together!
            </p>
          </div>
          <div class="mb-10">
            <h3 class="flex items-center mb-4 text-lg font-medium dark:text-white">
              <div i-carbon-help-filled class="mr-2 w-5 h-5" />
              What UI did you use?
            </h3>
            <p class="dark:text-gray-400">
              I use
              <a
                href="https://unocss.dev"
                class="font-medium text-white dark:text-primary-500 hover:underline"
                target="_blank"
                >UnoCSS</a
              >
              because it's fast and easy to use it's similar to
              <a
                href="https://tailwindcss.com"
                target="_blank"
                class="text-white font-medium hover:underline"
                >TailwindCSS</a
              >
              since you can use it's components. This is the best modern UI in web-apps.
            </p>
            <p class="dark:text-gray-400 py-2">
              I use icons from this website check it out:
              <a
                href="https://icones.js.org"
                target="_blank"
                class="text-white font-medium hover:underline"
                >Icones</a
              >
              it is an open-source also similar to Iconify. also simple and easy to import icons by
              this preset
              <a
                href="https://unocss.dev/presets/icons"
                target="_blank"
                class="text-white font-medium hover:underline"
                >@unocss/preset-icons.</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <VFooter />
</template>
