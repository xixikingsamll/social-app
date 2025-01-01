<template>
  <el-card class="dynamic-card" @click="GoToChat(props.information.chat_id)">
    <div class="card-top">
      <div class="card-top-left">
        <el-avatar
          :size="50"
          :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        />
        <div class="card-top-info">
          <div class="card-top-info-name">{{ props.information.user.username }}</div>
          <div class="card-top-info-time">{{ props.information.last_message === null ? '快来和我聊天吧！' : format(new Date(props.information.last_message.sent_at), 'yyyy-MM-dd hh:mm:ss') }}</div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <p class="card-text">{{ props.information.last_message === null ? '' : props.information.last_message.content }}</p>
    </div>
  </el-card>
</template>

<script setup>
import { format } from 'date-fns'
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({
  information: {
    type: Object,
    default: () => {
      return {
        avatar,
        postDate,
        username,
        content,
        likeCount,
        dislikeCount
      }
    }
  }
})
const avatar =
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
const postDate = '一天前';
const username = '@limingye';
const content = '@limingye：这是一条动态评论内容，这里可以写很多内容来展示。';
const likeCount = 10;
const dislikeCount = 5;

const GoToChat = (id) => {
  router.push(`/chat/${id}`)
}
</script>

<style scoped>
.dynamic-card {
  padding: 10px 0;
  margin: 40px 0;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-top-left {
  display: flex;
  align-items: center;
}

.card-top-info {
  margin-left: 10px;
}

.card-top-info-name {
  font-size: 1.5rem;
  font-weight: bold;
}

.card-top-right {
  cursor: pointer;
}

.more-icon {
  transform: rotate(90deg);
}

.card-content {
  margin-top: 20px;
}

.card-bottom {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.card-bottom-left {
  display: flex;
  align-items: center;
}

.card-bottom-left.el-icon {
  margin-right: 5px;
}

.card-bottom-right {
  display: flex;
  align-items: center;
}

.card-bottom-right.el-icon {
  margin-right: 5px;
}

.icon-button {
  margin: 0 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.diancai {
  margin: 0 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.thumb-icon {
  height: 20px;
  margin-right: 4px;
}
</style>
