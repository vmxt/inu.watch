<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const rerenderKey = ref(0)
const route = useRoute()

watch(route, () => {
  rerenderKey.value += 1
})
</script>

<template>
  <RouterView :key="rerenderKey" />
</template>
