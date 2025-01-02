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
    <div class="person-name">{{ user.username }}</div>
    <el-divider />
    <div class="person-tumb">点赞数(200)</div>
    <el-divider />
    <div class="person-introduce">简介：一个爱分享的</div>
  </el-card>
</template>

<script setup>
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
  }
});

const handleClickAvatar = () => {
  props.clickAvatar();
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
</style>
