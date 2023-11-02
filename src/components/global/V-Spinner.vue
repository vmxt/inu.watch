<template>
  <div v-if="showOverlay" class="overlay">
    <div class="spinner">
      <div i-svg-spinners-3-dots-bounce class="text-7xl" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showOverlay: true
    }
  }
}
</script>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  z-index: 100;
  align-items: center;
}

.spinner {
  width: 100px;
  height: 100px;
}
</style>
