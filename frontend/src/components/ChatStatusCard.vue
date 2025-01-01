<template>
  <div class="chat-status-card">
    <div class="left-box">
      <el-avatar
        :size="50"
        :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
      />
      <div>
        <h3>{{ props.userInfo.username }}</h3>
        <p>上次更新在 {{ format(new Date(), 'yyyy-MM-dd HH:mm:ss') }}</p>
      </div>
    </div>
    <div class="right-box">
      <div class="icon-button">
        <el-icon><VideoCamera /></el-icon>
      </div>
      <div class="icon-button">
        <el-icon><Phone /></el-icon>
      </div>
      <div class="icon-button">
        <el-icon><More /></el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { format } from 'date-fns';
const props = defineProps({
  userInfo: Object
});
</script>

<style scoped>
.chat-status-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background-color: #f6f6f6;
}

.left-box {
  display: flex;
  gap: 16px;
}

.right-box {
  display: flex;
  gap: 30px;
}

.icon-button {
  cursor: pointer;
  font-size: 40px;
}
</style>
