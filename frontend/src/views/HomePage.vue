<template>
  <div class="home" @click="handleClick">
    Home
    {{ a }}
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '@/api';
import { useRouter } from 'vue-router';
import { getChatId } from '@/api';

const router = useRouter();

const a = ref(0);
const handleClick = async () => {
  const res = await getChatId({
    userIds: [9, 11]
  });
  console.log('获取id', res);
};

const data = {
  username: 'admin1',
  password: 'password'
};
const handleLogin = async () => {
  const res = await login(data);
  console.log('from home :', res);
  if (res.status === 0) {
    console.log('成功操作', res.message);
  } else if (res.status === 1) {
    console.log('失败操作', res.message);
  }
};
// handleLogin();
</script>
