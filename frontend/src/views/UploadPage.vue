<template>
  <div class="container">
    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-header">
        <div class="form-title">主题</div>
        <el-input
          v-model="formData.title"
          placeholder="请输入主题"
          :rules="titleRules"
        ></el-input>
      </div>

      <div class="form-item">
        <span class="form-label">内容</span>
        <el-input
          v-model="formData.content"
          placeholder="请输入内容"
          :rows="7"
          type="textarea"
          :rules="contentRules"
        ></el-input>
      </div>
      <div class="form-footer">
        <el-button type="primary">选择图片</el-button>
        <div>
          <el-button type="info" @click="handleSaveDraft">保存草稿</el-button>
          <el-button type="warning" @click="handlePublish">发布</el-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { sendPost } from '@/api';
import dayjs from 'dayjs';

onMounted(() => {
  const draft = JSON.parse(localStorage.getItem('draft'));
  if (draft) {
    formData.value = draft;
  }
});

// 存储表单数据
const formData = ref({
  title: '',
  content: ''
});

// 主题的表单验证规则
const titleRules = reactive([
  { required: true, message: '主题不能为空', trigger: 'blur' }
  // 可根据实际需求添加更多验证规则，比如长度限制等
]);

// 内容的表单验证规则
const contentRules = reactive([
  { required: true, message: '主题不能为空', trigger: 'blur' }
  // 可根据实际需求添加更多验证规则，比如长度限制等
]);

const handleSaveDraft = () => {
  try {
    const validateResult = validateForm();
    if (validateResult) {
      localStorage.setItem('draft', JSON.stringify(formData.value));
      ElMessage({
        message: '草稿保存成功',
        type: 'success',
        duration: 1000
      });
    } else {
      ElMessage({
        message: '保存草稿时表单验证失败，请检查输入内容',
        type: 'error',
        duration: 1000
      });
    }
  } catch (error) {
    console.error('保存草稿时出现错误：', error);
    ElMessage({
      message: '保存草稿时出现错误，请检查输入内容',
      duration: 1000
    });
  }
};

const handlePublish = async () => {
  try {
    await validateForm();
    const { user_id } = JSON.parse(localStorage.getItem('userInfo'));
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    console.log('timestamp', timestamp);

    const res = await sendPost({
      id: user_id,
      timestamp,
      ...formData.value
    });
    if (res.success) {
      ElMessage({
        message: `${res.message}`,
        type: 'success',
        duration: 2000
      });
      // 发布成功后可根据需求清空表单数据，方便下次发布
      formData.value.title = '';
      formData.value.content = '';
    } else {
      ElMessage({
        message: `发布失败：${res.message}`,
        type: 'error',
        duration: 2000
      });
    }
  } catch (error) {
    console.error('发布时表单验证失败或出现其他错误：');
    ElMessage({
      message: '发布时出现错误，请检查输入内容',
      type: 'error',
      duration: 2000
    });
  }
};

const validateForm = () => {
  return new Promise((resolve, reject) => {
    // 获取表单实例，这里假设表单的ref名为form
    const form = document.querySelector('form');
    if (form.checkValidity()) {
      resolve(true);
    } else {
      form.reportValidity();
      resolve(false);
    }
  });
};

const handleSubmit = async (e) => {
  await handlePublish();
};
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
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.form-title {
  font-weight: bold;
  margin-bottom: 10px;
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
