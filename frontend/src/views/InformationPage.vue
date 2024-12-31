<template>
  <div class="info-container">
    <div class="info-top-box">
      <h1>信息列表</h1>
      <el-icon class="info-top-icon"><Bell /></el-icon>
    </div>

    <div>
      <InformationCard />
      <InformationCard />
      <InformationCard />
      <InformationCard />
    </div>
  </div>
</template>

<script setup>
import InformationCard from '@/components/InformationCard.vue';
import { getInformationList } from '@/api';
import { onMounted, ref } from 'vue';

onMounted(async() => {
  const informationList = ref([])
  const {user_id}  = JSON.parse(localStorage.getItem('userInfo'))
  const data = {
    "id": user_id
  }
  await getInformationList(data).then((res) => {
    informationList.value = res.data
  })
  console.log(informationList.value)
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
