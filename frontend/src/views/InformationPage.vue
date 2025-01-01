<template>
  <div class="info-container">
    <div class="info-top-box">
      <h1>信息列表</h1>
      <el-icon class="info-top-icon"><Bell /></el-icon>
    </div>

    <div>
      <InformationCard v-for="item in informationList" :key="item.chat_id" :information="item"/>
    </div>
  </div>
</template>

<script setup>
import InformationCard from '@/components/InformationCard.vue';
import { getInformationList } from '@/api';
import { onMounted, reactive } from 'vue';

const informationList = reactive([])

onMounted(async () => {
  const { user_id } = JSON.parse(localStorage.getItem('userInfo'))
  const data = { "id": user_id }

  await getInformationList(data).then((res) => {
    informationList.push(...res.data.chats)
  })
})
</script>

<style scoped>
.info-container {
  padding: 30px 5%;
  display: flex;
  flex-direction: column;
}

.info-top-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-top-icon {
  margin-left: 5px;
  font-size: 28px;
}
</style>
