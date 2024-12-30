<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <div class="card-header-left">
          <div class="avatar">
            <el-avatar
              :size="50"
              :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
            />
          </div>
          <div class="info">
            <div class="info-name">AAAA</div>
            <div class="info-status">5分钟之前</div>
          </div>
        </div>
        <div class="card-header-right">
          <el-icon class="card-header-right-icon"><MoreFilled /></el-icon>
        </div>
      </div>
    </template>
    <h3>主题1</h3>
    <span v-for="o in 6" :key="o" class="text item">
      {{ 'List item ' + o }}
    </span>
    <template #footer>
      <div class="card-footer">
        <div class="card-footer-tag">
          <el-tag type="info">Tag 1</el-tag>
          <el-tag type="info">Tag 2</el-tag>
          <el-tag type="info">Tag 3</el-tag>
        </div>
        <div class="card-footer-feedbackinfo">
          <div class="card-footer-feedbackinfo-icon">
            <el-icon><View /></el-icon>124
          </div>
          <div class="card-footer-feedbackinfo-icon">
            <el-icon><ChatSquare /></el-icon>101
          </div>
          <div class="card-footer-feedbackinfo-icon">
            <el-icon><Share /></el-icon>33
          </div>
        </div>
      </div>
    </template>
  </el-card>
</template>

<script setup>
// import { ElCard, ElAvatar, ElIcon, ElTag } from 'element-plus';
// import { MoreFilled, View, ChatSquare, Share } from '@element-plus/icons-vue';

// 这里可以定义组件接收的props，目前示例中暂未添加额外props，后续可按需扩展
// 比如可以接收头像地址、用户名、发布时间等信息作为props来让组件更灵活
</script>

<style scoped>
/* 这里可以添加组件内部的样式 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header-left {
  display: flex;
  align-items: center;
}

.avatar {
  margin-right: 10px;
}

.info {
  display: flex;
  flex-direction: column;
}

.info-name {
  font-weight: bold;
}

.card-header-right-icon {
  cursor: pointer;
  /* 可以添加一些交互样式，比如鼠标悬停改变颜色等，以下是简单示例 */
  transform: rotate(90deg);
  transition: color 0.3s ease;
}

.card-header-right-icon:hover {
  color: #007aff;
}

.text {
  display: block;
  margin-bottom: 5px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-footer-tag {
  display: flex;
  gap: 16px;
}

.card-footer-tag.el-tag {
  margin-right: 5px;
}

.card-footer-feedbackinfo {
  display: flex;
  gap: 20px;
}

.card-footer-feedbackinfo-icon {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
