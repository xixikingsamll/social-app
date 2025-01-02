<template>
  <el-card class="dynamic-card">
    <div class="card-top">
      <div class="card-top-left">
        <el-avatar
          :size="50"
          :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
        />
        <div class="card-top-info">
          <div class="card-top-info-name">{{ author.username }}</div>
          <div class="card-top-info-time">
            {{ getTimeDiff(post.timestamp) }}
          </div>
        </div>
      </div>
      <div class="card-top-right">
        <el-icon class="more-icon"><MoreFilled /></el-icon>
      </div>
    </div>
    <div class="card-content">
      <h3>{{ post.title }}</h3>
      <p class="card-text">{{ post.content }}</p>
    </div>
    <el-divider />
    <div class="card-bottom">
      <div class="card-bottom-left">
        <div class="dianzan icon-button" @click="handleLikes">
          <img src="../assets/dianzan.png" alt="赞" class="thumb-icon" />
          <span class="like-count">{{ post.likes }}</span>
        </div>
        <!-- <div class="diancai icon-button">
          <img src="../assets/diancai.png" alt="踩" class="thumb-icon" />
          <span class="dislike-count">{{ dislikeCount }}</span>
        </div> -->
      </div>
      <div class="card-bottom-right">
        <div class="icon-button">
          <el-icon class="reply-icon"><ChatSquare /></el-icon>
          <span class="reply-text">回复</span>
        </div>
        <div class="icon-button">
          <el-icon class="expand-icon"><ArrowDown /></el-icon>
          <span class="expand-text">展开所有评论</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { getTimeDiff } from '@/util';
import { likePost } from '@/api';
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps({
  post: {
    type: Object,
    default: {}
  },
  author: {
    type: Object,
    default: {}
  }
});

const isLiked = ref(false);

const handleLikes = async () => {
  // 如果未点赞，调用点赞接口
  try {
    const { user_id } = JSON.parse(localStorage.getItem('userInfo'));
    const res = await likePost({
      id: user_id,
      postid: props.post.id
    }); // 假设接口需要传入文章ID，根据实际调整
    if (res.success) {
      ElMessage({
        message: '点赞成功',
        type: 'success'
      });
      window.location.reload();
      // post.value.likes++; // 点赞数加1
      // isLiked.value = true; // 更新点赞状态
    } else {
      ElMessage({
        message: `点赞失败：${res.message}`,
        type: 'error'
      });
    }
  } catch (error) {
    console.log('点赞时出现错误：', error);
    ElMessage({
      message: `点赞失败：你已经点赞过啦`,
      type: 'error'
    });
  }
};
</script>

<style scoped>
.dynamic-card {
  padding: 10px 0;
  margin: 20px 0;
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
