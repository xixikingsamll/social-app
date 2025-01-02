<template>
  <div class="container">
    <el-row class="info-row">
      <el-col :span="4">
        <BasicInfoCard :user="userInfo" :changeName="true" />
      </el-col>
      <el-col :span="18">
        <el-card class="info-card">
          <div class="info-item">
            <span class="info-label">用户名:</span>
            <span
              class="info-value"
              @click="ifEditable && showDialog('username')"
              >{{ userInfo.username }}</span
            >
          </div>
        </el-card>
        <el-card class="info-card">
          <div class="info-item">
            <span class="info-label">手机号:</span>
            <span
              class="info-value"
              @click="ifEditable && showDialog('phone')"
              >{{ userInfo.phone ? userInfo.phone : '未绑定' }}</span
            >
          </div>
        </el-card>
        <el-card class="info-card">
          <div class="info-item">
            <span class="info-label"> 邮 箱:</span>
            <span
              class="info-value"
              @click="ifEditable && showDialog('email')"
              >{{ userInfo.email ? userInfo.email : '未绑定' }}</span
            >
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="dynamic-row">
      <el-col :span="24">
        <h2 class="dynamic-title">个人动态:</h2>
        <template v-if="posts && posts.length > 0">
          <UpdateCard
            v-for="(post, index) in posts"
            :key="index"
            :post="{
              ...post,
              username: userInfo.username,
              avatar: userInfo.avatar
            }"
          />
        </template>
        <template v-else>
          <h4>暂未发布动态, 点击发布动态</h4>
        </template>
        <!-- <DynamicCard />
        <DynamicCard /> -->
      </el-col>
    </el-row>

    <el-dialog v-model="dialogShow" title="修改个人信息">
      <el-form
        :model="formData"
        :rules="rules"
        ref="editForm"
        label-width="120px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="formData.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="formData.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            v-model="formData.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogShow = false">取消</el-button>
          <el-button type="primary" @click="submitEdit">提交修改</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import BasicInfoCard from '@/components/BasicInfoCard.vue';
import UpdateCard from '@/components/UpdateCard.vue';
import DynamicCard from '@/components/DynamicCard.vue';
import { getUserInfo } from '@/api/modules/user';
import { updateUserInfo } from '@/api/modules/user';
import { getPersonDetail } from '@/api/index';
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';

const route = useRoute();
const user_id = route.params.id;
onMounted(async () => {
  const { user_id: user } = JSON.parse(localStorage.getItem('userInfo'));
  const userRes2 = await getUserInfo({ id: user_id });
  const userRes = await getPersonDetail({ id: user_id });
  userInfo.value = userRes.data.user;
  posts.value = userRes.data.posts;
  console.log('userRes2', userRes2);
  // 初始化表单数据，将当前用户信息填充到表单中，方便用户修改
  if (user == user_id) {
    console.log('进入？？');
    const shabiUser = JSON.parse(localStorage.getItem('userInfo'));
    ifEditable.value = true;
    userInfo.value = { ...userInfo.value, ...shabiUser };
    formData.value = { ...formData.value, ...shabiUser };
  }
});

// 用于控制对话框显示隐藏
const dialogShow = ref(false);
// 控制是否可以修改
const ifEditable = ref(false);
// 存储表单数据
const formData = ref({
  id: '',
  username: '',
  phone: '',
  email: ''
});
// 存储用户信息
const userInfo = ref({});
const posts = ref({});
// 表单验证规则
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
    // 可根据实际需求添加更多用户名的详细验证规则，比如长度、格式等
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' }
    // 可根据实际需求添加更多用户名的详细验证规则，比如长度、格式等
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error('邮箱格式不正确'));
        }
      },
      trigger: 'blur'
    }
  ]
});
// 获取表单实例
const editForm = ref(null);

const showDialog = (field) => {
  if (field === 'username') {
    formData.value.username = userInfo.value.username;
  } else if (field === 'phone') {
    // 如果点击手机号，这里可以根据需求决定是否跳转到手机号绑定等相关页面，此处暂不做复杂处理，仅打开dialog
    // 你可以添加相应逻辑，比如触发手机号绑定相关的方法等
    formData.value.phone = userInfo.value.phone;
  } else if (field === 'email') {
    formData.value.email = userInfo.value.email;
  }
  dialogShow.value = true;
};

const submitEdit = async () => {
  try {
    // 进行表单验证
    await editForm.value.validate();
    // 调用接口更新用户信息，这里假设updateUserInfo函数接收一个包含更新后信息的对象作为参数
    const res = await updateUserInfo(formData.value);
    if (res.status === 0) {
      ElMessage({
        message: '用户信息修改成功',
        type: 'success'
      });
      // 更新本地存储的用户信息（这里简单覆盖，实际可能需要更细致的处理）
      const user = JSON.parse(localStorage.getItem('userInfo'));
      user.email = formData.value.email;
      user.phone = formData.value.phone;
      localStorage.setItem('userInfo', JSON.stringify(user));
      dialogShow.value = false;
      window.location.reload();
    } else {
      ElMessage({
        message: `用户信息修改失败：${res.message}`,
        type: 'error'
      });
    }
  } catch (error) {
    console.error('提交修改时表单验证失败或其他错误：', error);
    ElMessage({
      message: '提交修改时出现错误，请检查输入内容',
      type: 'error'
    });
  }
};
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
