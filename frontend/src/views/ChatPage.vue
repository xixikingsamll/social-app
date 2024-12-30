<template>
  <div class="chat-container">
    <div class="chat-top" @click="handleClick">
      <ChatStatusCard />
    </div>
    <div class="chat-content">
      <div class="chat-other-history chat-history">
        <el-avatar
          :size="40"
          :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        />
        <ChatBubble sender="other" />
      </div>
      <div class="chat-self-history chat-history">
        <ChatBubble sender="self" />
        <el-avatar
          :size="40"
          :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        />
      </div>
      <div class="chat-self-history chat-history">
        <ChatBubble sender="self" />
        <el-avatar
          :size="40"
          :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        />
      </div>
      <div class="chat-self-history chat-history">
        <ChatBubble sender="self" />
        <el-avatar
          :size="40"
          :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        />
      </div>
    </div>
    <div class="chat-bottom-bar">
      <div class="incon-button">
        <el-icon><Paperclip /></el-icon>
      </div>
      <el-input
        class="chat-bottom-bar-input"
        v-model="input"
        :input-style="{ background: 'transparent' }"
        placeholder="请输入你的信息"
      />
      <div class="chat-bottom-bar-right">
        <div class="incon-button">
          <el-icon><Microphone /></el-icon>
        </div>
        <div class="incon-button">
          <el-icon><Position /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChatStatusCard from '@/components/ChatStatusCard.vue';
import ChatBubble from '@/components/ChatBubble.vue';
const input = ref('');
</script>

<style scoped>
.chat-container {
  position: relative;
  background-color: #fafafa;
}

.chat-top {
  /* position: fixed; */
  position: absolute;
  width: 100%;
}

.chat-content {
  height: calc(100vh - 60px);
  box-sizing: border-box;
  padding-top: 78px;
  /* padding-bottom: 50px; */
  padding-right: 10px;
  padding-left: 10px;
}

.chat-history {
  display: flex;
  gap: 10px;
  margin: 16px 0;
}

.chat-self-history {
  justify-content: end;
}

.chat-bottom-bar {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 50px;
  background-color: #f6f6f6;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.incon-button {
  font-size: 28px;
  margin: 8px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.chat-bottom-bar-right {
  display: flex;
  margin-right: 30px;
}
</style>
