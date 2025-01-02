<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
  >
    <!-- <el-menu-item index="/">首页</el-menu-item> -->
    <el-menu-item index="/login" v-if="!store.getters.isLoggedIn"
      >登录</el-menu-item
    >
    <el-menu-item index="/register" v-if="!store.getters.isLoggedIn"
      >注册</el-menu-item
    >
    <el-menu-item index="/ground" v-if="store.getters.isLoggedIn"
      >首页</el-menu-item
    >
    <el-menu-item index="/information" v-if="store.getters.isLoggedIn"
      >消息</el-menu-item
    >
    <!-- <el-menu-item index="/upload" v-if="store.getters.isLoggedIn"
      >上传页</el-menu-item
    > -->
  </el-menu>
</template>

<script setup>
import { ref, onMounted, computed, onUpdated } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();

// 当前激活的菜单项索引
const activeIndex = ref('/');
const ifLogin2 = ref(true);
const router = useRouter();

onMounted(() => {
  const token = JSON.parse(localStorage.getItem('userInfo'));
  if (token) ifLogin2.value = true;
});

const ifLogin = computed(() => {
  return store.getters.isLoggedIn;
});

// 菜单项点击处理函数
const handleSelect = (index) => {
  // 这里可以根据索引进行路由跳转等操作，此处仅作示例
  activeIndex.value = index;
  router.push(index);
};
</script>

<style scoped>
.el-menu {
  border-bottom: 1px solid #e4e7ed;
}
</style>
