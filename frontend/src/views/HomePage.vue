<template>
  <div class="home" @click="handleClick">
    Home
    {{ a }}
  </div>
</template>

<script setup>
import { ref } from 'vue';
const a = ref(0);
const handleClick = () => {
  console.log('asdas');
  a.value++;
};
</script>
