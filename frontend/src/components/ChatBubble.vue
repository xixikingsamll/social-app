<template>
  <div
    :class="[
      'bubble-outer-container',
      props.sender === 'self' ? 'slef-bubble' : 'other-person-bubble'
    ]"
  >
    <div class="bubble-inner-container">
      {{ props.message }}
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
// 定义props，接收sender参数
const props = defineProps({
  sender: String,
  message: String
});
</script>

<style scoped>
.bubble-outer-container {
  display: inline-block;
  padding: 10px 16px;
}
.bubble-inner-container {
  display: flex;
  /* jus */
}

.other-person-bubble {
  background: #0f82ff;
  color: #fff;
  border-radius: 22px 22px;
  border-radius: 0px 22px 22px 22px;
}

.slef-bubble {
  background: #001835;
  color: #fff;
  /* border-radius: 22px 22px; */
  border-radius: 22px 22px 0px 22px;
  /* border-radius: 0px 22px 22px 22px; */
}
</style>
