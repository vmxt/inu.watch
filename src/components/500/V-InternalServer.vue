<template>
  <section class="flex items-center justify-center max-w-screen min-h-screen-md">
    <div class="text-center">
      <h1
        class="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500"
      >
        500
      </h1>
      <p class="mb-4 text-lg font-light dark:text-gray-400">
        Internal Service Error could occur. So we'll get to work on it.
      </p>
      <div class="mb-4">
        <RouterLink
          to="/home"
          type="button"
          class="btn text-sm focus:outline-none btn border border-dark-300 bg-dark"
        >
          Back to Homepage
        </RouterLink>
      </div>
    </div>
  </section>
</template>
