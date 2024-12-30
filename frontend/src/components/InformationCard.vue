<template>
  <el-card class="dynamic-card">
    <div class="card-top">
      <div class="card-top-left">
        <el-avatar
          :size="50"
          :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        />
        <div class="card-top-info">
          <div class="card-top-info-name">{{ username }}</div>
          <div class="card-top-info-time">{{ postDate }}</div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <p class="card-text">{{ content }}</p>
    </div>
  </el-card>
</template>

<script setup>
const avatar =
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
const postDate = '一天前';
const username = '@limingye';
const content = '@limingye：这是一条动态评论内容，这里可以写很多内容来展示。';
const likeCount = 10;
const dislikeCount = 5;
</script>

<style scoped>
.dynamic-card {
  padding: 10px 0;
  margin: 40px 0;
  /* width: 1200px; */
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
