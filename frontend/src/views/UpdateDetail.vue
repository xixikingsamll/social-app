<template>
  <div class="detail-layout">
    <BasicInfoCard :user="authorData" show-button="true" />
    <DynamicCard :post="postData" :author="authorData" />
    <div class="command-titile">评论区</div>
    <el-card class="command-input-form">
      <div class="input-button-box">
        <el-input
          v-model="commentContent"
          placeholder="在这里输入评论吧！"
          style="height: 60px"
        />
        <div class="button-group">
          <el-button type="info" @click="cancelComment">取消</el-button>
          <el-button type="primary" @click="submitCommentFn">发送</el-button>
        </div>
      </div>
    </el-card>
    <template v-if="commentData && commentData.length > 0">
      <el-card
        class="comment-card"
        v-for="(comment, index) in commentData"
        :key="index"
      >
        <div class="comment-content">
          <div class="comment-text">
            <p>
              {{ comment.content }}
            </p>
          </div>
          <el-divider />
          <div class="comment-footer">
            <div class="comment-user">
              <el-avatar
                :size="30"
                :src="
                  comment.commenter.avatar
                    ? comment.commenter.avatar
                    : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
                "
              />
              {{ comment.commenter.username }}
            </div>
            <div class="comment-action">
              <el-icon class="blue-icon" @click="handleClick">
                <ChatSquare />
              </el-icon>
              <span class="blue-text" @click="handleClick">评论</span>
            </div>
          </div>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script setup>
import UpdateCard from '@/components/UpdateCard.vue';
import BasicInfoCard from '@/components/BasicInfoCard.vue';
import DynamicCard from '@/components/DynamicCard.vue';
import { useRoute } from 'vue-router';
import { getPostDetail, submitComment } from '@/api';
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';

const route = useRoute();
const post_id = route.params.id;
const postData = ref({});
const authorData = ref({});
const commentData = ref([]);
const commentContent = ref('');

onMounted(async () => {
  const { author, comments, post } = await getPostDetail({ id: post_id });
  postData.value = post;
  authorData.value = author;
  commentData.value = comments;
});

const handleClick = () => {
  console.log('点击评论');
};

const cancelComment = () => {
  commentContent.value = '';
};

const submitCommentFn = async () => {
  if (commentContent.value.trim() === '') {
    ElMessage({
      message: '评论内容不能为空哦，请输入评论后再发送',
      type: 'warning'
    });
    return;
  }
  try {
    const { user_id } = JSON.parse(localStorage.getItem('userInfo'));
    const params = {
      id: user_id,
      content: commentContent.value,
      postid: post_id
    };
    const res = await submitComment(params);

    if (res.success) {
      ElMessage({
        message: '评论发送成功，感谢你的参与！',
        type: 'success'
      });
      commentContent.value = ''; // 发送成功后清空输入框内容
      window.location.reload();
    } else {
      ElMessage({
        message: `评论发送失败：${res.message}`,
        type: 'error'
      });
    }
  } catch (error) {
    console.error('提交评论时出现错误：', error);
    ElMessage({
      message: '提交评论时出现异常，请稍后再试',
      type: 'error'
    });
  }
};
</script>

<style scoped>
.detail-layout {
  padding: 20px 10%;
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
  margin: 10px 0;
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
  color: #87cefa;
  cursor: pointer;
}

.blue-text:hover {
  color: #007bff;
}

.comment-card {
  border-left: 8px solid #87cefa;
}

.comment-user {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
