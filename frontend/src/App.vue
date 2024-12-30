<template>
  <div>
    <Navbar />
    <div id="main-contain">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  height: 100vh;
}
#main-contain {
  height: calc(100vh - 60px);
  /* background: red; */
}
</style>
