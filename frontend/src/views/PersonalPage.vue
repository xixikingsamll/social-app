<template>
  <div class="container">
    <el-row class="info-row">
      <el-col :span="4">
        <BasicInfoCard />
      </el-col>
      <el-col :span="18">
        <el-card class="info-card">
          <div class="info-item">
            <span class="info-label">用户名:</span>
            <span class="info-value">张三</span>
          </div>
        </el-card>
        <el-card class="info-card">
          <div class="info-item">
            <span class="info-label">手机号:</span>
            <span class="info-value">150XXXXXX </span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="dynamic-row">
      <el-col :span="24">
        <h2 class="dynamic-title">个人动态:</h2>
        <DynamicCard />
        <DynamicCard />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// import { ElCard, ElDivider } from 'element-plus';
import BasicInfoCard from '@/components/BasicInfoCard.vue';
import DynamicCard from '@/components/DynamicCard.vue';
</script>

<style scoped>
.container {
  padding: 20px;
  /* width: 100%; */
}

.info-row {
  margin-bottom: 20px;
  width: 100%;
}

.info-card {
  width: 100%;
  padding: 20px;
  margin-bottom: 20px;
  margin-left: 40px;
}

.info-item {
  margin-bottom: 10px;
}

.info-label {
  display: inline-block;
  width: 80px;
}

.dynamic-row {
  margin-top: 20px;
  width: 100%;
}

.dynamic-title {
  margin-bottom: 10px;
}
</style>
