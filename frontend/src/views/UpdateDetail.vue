<template>
  <div class="detail-layout">
    <BasicInfoCard />
    <UpdateCard />
    <div class="command-titile">评论区</div>
    <el-card class="command-input-form">
      <div class="input-button-box">
        <el-input
          placeholder="在这里输入你想对博主说的话吧！"
          style="height: 60px"
        />
        <div class="button-group">
          <el-button type="info">取消</el-button>
          <el-button type="primary">发送</el-button>
        </div>
      </div>
    </el-card>
    <el-card class="comment-card">
      <div class="comment-content">
        <div class="comment-text">
          <p>
            这是一条很精彩的评论内容呀，这里可以写很长很长的一段话来展示具体评论内容，看看排版效果如何等等。
          </p>
        </div>
        <el-divider />
        <div class="comment-footer">
          <div class="comment-user">用户小明</div>
          <div class="comment-action">
            <el-icon class="blue-icon" @click="handleClick">
              <ChatSquare />
            </el-icon>
            <span class="blue-text" @click="handleClick">评论</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import UpdateCard from '@/components/UpdateCard.vue';
import BasicInfoCard from '@/components/BasicInfoCard.vue';
// import { ElDivider, ElIcon, ChatSquare } from 'element-plus';

const handleClick = () => {
  console.log('点击评论');
};
</script>

<style scoped>
.detail-layout {
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.command-titile {
  text-align: center;
}

.command-input-form {
  position: relative;
}

.input-button-box {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.el-input {
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.button-group el-button {
  margin-left: 10px;
}

.comment-card {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}

.comment-content {
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.comment-text {
  width: 60%;
}

.comment-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.comment-user {
  color: #606266;
}

.comment-action {
  display: flex;
  align-items: center;
  gap: 5px;
}

.blue-icon {
  color: #87cefa;
  cursor: pointer;
}

.blue-icon:hover {
  color: #007bff;
}

.blue-text {
  color: blue;
  cursor: pointer;
}

.blue-text:hover {
  color: #007bff;
}

.comment-card {
  border-left: 8px solid #87cefa;
}
</style>
