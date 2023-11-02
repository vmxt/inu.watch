<template>
  <footer class="bg-dark shadow dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm sm:text-center"
        >© {{ new Date().getFullYear() }}
        <RouterLink to="/home" class="hover:underline">Inu™</RouterLink>. All Rights Reserved.
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
        <li>
          <RouterLink to="/about" class="mr-4 hover:underline md:mr-6">About</RouterLink>
        </li>
        <li>
          <RouterLink to="/faq" class="mr-4 hover:underline md:mr-6">FAQ</RouterLink>
        </li>
        <li>
          <RouterLink to="/privacy-policy" class="mr-4 hover:underline md:mr-6"
            >Privacy Policy</RouterLink
          >
        </li>
        <li>
          <a
            href="https://raw.githubusercontent.com/consumet/consumet.ts/master/LICENSE"
            target="_blank"
            class="hover:underline"
            >Licensing</a
          >
        </li>
      </ul>
    </div>
  </footer>
</template>
