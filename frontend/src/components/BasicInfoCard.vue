<template>
  <el-card class="person-top-card">
    <div class="person-avatar">
      <el-avatar
        :size="150"
        :src="
          user.avatar
            ? user.avatar
            : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
        "
        @click="handleClickAvatar"
      />
    </div>
    <el-button
      @click="GoToChat"
      v-if="changeName && isShowPersonalButton"
      type="warning"
      >私信</el-button
    >
    <div class="person-name" v-else>{{ user.username }}</div>
    <el-divider />
    <div v-if="showButton">
      <el-button @click="GoToPerson">查看个人主页</el-button>
      <el-button @click="GoToChat" v-if="isShowMessageButton" type="warning"
        >私信</el-button
      >
    </div>
    <div v-else>
      <div class="person-tumb">点赞数(200)</div>
      <el-divider />
      <div class="person-introduce">简介：一个爱分享的</div>
    </div>
    <div class="dynamic-button">
      <el-button type="warning" @click="GoToUpload"> 发动态 </el-button>
    </div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { createChat, getChatId } from '@/api';
import { ElMessage } from 'element-plus';
// 这里暂时没有接收外部props等逻辑，后续若要让组件更灵活可添加
// 比如接收头像地址、用户名、点赞数、简介等信息作为props传入
const props = defineProps({
  user: {
    type: Object,
    default: {
      username: '未命名'
    }
  },
  clickAvatar: {
    type: Function,
    default: () => {}
  },
  showButton: {
    type: Boolean,
    default: false
  },
  changeName: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();

const { user_id: shabiId } = JSON.parse(localStorage.getItem('userInfo'));

const isShowMessageButton = computed(() => {
  const userid = props.user.user_id || props.user.id;
  return !(userid === shabiId);
});

const isShowPersonalButton = computed(() => {
  const userid = props.user.user_id || props.user.id;
  return !(userid === shabiId);
});

const handleClickAvatar = () => {
  props.clickAvatar();
};

const GoToChat = async () => {
  const userid = props.user.user_id || props.user.id;
  createChat({
    userIds: [userid, shabiId],
    title: ''
  })
    .then((res) => {
      router.push(`/chat/${res.data.chatId}`);
    })
    .catch(async (err) => {
      const res = await getChatId({
        userIds: [userid, shabiId]
      });
      router.push(`/chat/${res.data.chatId}`);
    });
};

const GoToPerson = () => {
  const userid = props.user.user_id || props.user.id;
  router.push(`/personal/${userid}`);
};

const GoToUpload = () => {
  router.push(`/upload`);
};
</script>

<style scoped>
.person-top-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.person-avatar {
  margin: 10px 0;
}

.dynamic-button {
  margin-top: 20px;
}
</style>
