<template>
  <div class="container">
    <form class="form">
      <div class="form-header">
        <span class="form-title">主题</span>
        <span class="selected-count">{{ selectedTags.length }} / 30</span>
      </div>
      <el-select
        v-model="selectedTags"
        multiple
        style="width: 100%; margin-bottom: 20px"
      >
        <el-option v-for="tag in tags" :key="tag" :label="tag">{{
          tag
        }}</el-option>
      </el-select>
      <div class="form-item">
        <span class="form-label">内容</span>
        <el-input placeholder="请输入内容" :rows="7" type="textarea"></el-input>
      </div>
      <div class="form-footer">
        <el-button type="primary">选择图片</el-button>
        <div>
          <el-button type="info">保存草稿</el-button>
          <el-button type="warning">发布</el-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 模拟的主题标签列表，你可以替换为真实从接口获取的数据等
const tags = [
  '主题1',
  '主题2',
  '主题3',
  '主题4',
  '主题5',
  '主题6',
  '主题7',
  '主题8',
  '主题9',
  '主题10',
  '主题11',
  '主题12',
  '主题13',
  '主题14',
  '主题15',
  '主题16',
  '主题17',
  '主题18',
  '主题19',
  '主题20',
  '主题21',
  '主题22',
  '主题23',
  '主题24',
  '主题25',
  '主题26',
  '主题27',
  '主题28',
  '主题29',
  '主题30'
];
const selectedTags = ref([]);
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #808080;
}

.form {
  width: 70%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.form-title {
  font-weight: bold;
}

.selected-count {
  color: #666;
}

.form-item {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 5px;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-footer el-button {
  flex: 1;
  margin: 0 5px;
}
</style>
