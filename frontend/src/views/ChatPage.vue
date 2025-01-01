<template>
  <div class="chat-container">
    <div class="chat-top" @click="handleClick">
      <ChatStatusCard :userInfo="userInfo" />
    </div>
    <div class="chat-content" ref="messageContainer">
      <div
        v-for="item in messageList"
        :class="[
          item.senderId === userId ? 'chat-self-history' : 'chat-other-history',
          'chat-history'
        ]"
        :key="item.messageId"
      >
        <div
          :style="{
            display: 'flex',
            flexDirection: item.senderId === userId ? 'row-reverse' : 'row',
            gap: '10px'
          }"
        >
          <el-avatar
            :size="40"
            :src="
              item.senderId === userId ? userList[0].avatar : userList[1].avatar
            "
          />
          <ChatBubble
            :sender="item.senderId === userId ? 'self' : 'other'"
            :message="item.content"
          />
        </div>
      </div>
      <div
        v-for="item in newMessageList"
        :class="[
          item.userId === userId ? 'chat-self-history' : 'chat-other-history',
          'chat-history'
        ]"
      >
        <div
          :style="{
            display: 'flex',
            flexDirection: item.userId === userId ? 'row-reverse' : 'row',
            gap: '10px'
          }"
        >
          <el-avatar
            :size="40"
            :src="
              item.userId === userId ? userList[0].avatar : userList[1].avatar
            "
          />
          <ChatBubble
            :sender="item.userId === userId ? 'self' : 'other'"
            :message="item.content"
          />
        </div>
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
        <div class="incon-button" @click="sendMessage">
          <el-icon><Position /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue';
import ChatStatusCard from '@/components/ChatStatusCard.vue';
import ChatBubble from '@/components/ChatBubble.vue';
import { useRoute } from 'vue-router';
import { getChatList } from '@/api';
const router = useRoute();
const chatID = router.params.id;
const userId = Number(JSON.parse(localStorage.getItem('userInfo')).user_id);
const messageContainer = ref(null); // 获取消息盒子
const messageList = reactive([]);
const newMessageList = reactive([]);
const userList = reactive([]);
const input = ref('');
const userInfo = ref('');
let ws = null;

// 开启实时通信
const connectWs = () => {
  ws = new WebSocket('ws://localhost:8082');
  ws.onopen = () => {
    console.log('WebSocket 连接已建立');

    // 发送订阅请求,订阅了之后后端才会认定该用户为在线用户
    const subscribeMessage = {
      type: 'subscribe',
      userId: userId
    };
    ws.send(JSON.stringify(subscribeMessage));
  };

  ws.onmessage = (event) => {
    let data = JSON.parse(event.data);
    data.userId = JSON.parse(event.data).senderId + 1;
    newMessageList.push(data);
    nextTick(() => {
      scrollToBottom();
    });
  };

  ws.onerror = (error) => {
    console.error('WebSocket 错误: ', error);
  };

  ws.onclose = () => {
    console.log('WebSocket 连接关闭');
  };
};

// 发消息
const sendMessage = () => {
  if (ws && ws.readyState === WebSocket.OPEN && input.value) {
    let data = {
      type: 'send_message',
      chatId: Number(chatID),
      content: input.value,
      userId: userId
    };
    ws.send(JSON.stringify(data));
    input.value = '';
    newMessageList.push(data);
    nextTick(() => {
      scrollToBottom();
    });
  } else {
    window.alert('发送失败');
  }
};

// 滚动盒子到底部,展示最新的消息
const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

onMounted(async () => {
  connectWs();
  const data = {
    chatid: chatID
  };
  await getChatList(data).then((res) => {
    messageList.push(...res.messages);
    // 按时间排序
    messageList.sort(
      (a, b) =>
        new Date(new Date(a.timestamp).toLocaleString()) -
        new Date(new Date(b.timestamp).toLocaleString())
    );
    userList.push(...res.chat.users);
    if (res.chat.users[0].id === userId) {
      userInfo.value = res.chat.users[1];
    } else {
      userInfo.value = res.chat.users[0];
    }
  });
  nextTick(() => {
    scrollToBottom();
  });
});

onBeforeUnmount(() => {
  if (ws) {
    ws.close();
  }
});
</script>

<style scoped>
.chat-container {
  position: relative;
  background-color: #fafafa;
}

.chat-top {
  position: absolute;
  width: 100%;
}

.chat-content {
  height: calc(100vh - 60px);
  box-sizing: border-box;
  padding-top: 78px;
  padding-right: 10px;
  padding-left: 10px;
  padding-bottom: 60px;
  overflow-y: scroll;
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
