<template>
  <div class="login-page">
    <el-row>
      <el-col :span="16">
        <div class="left-intro"></div>
      </el-col>
      <el-col :span="8" class="right-login-container">
        <!-- 主标题 -->
        <h2 class="main-title">快来加入我们pp社区吧</h2>
        <!-- 副标题 -->
        <p class="sub-title">
          这里是一段关于平台的简单介绍文字，你可以在这里详细描述平台的功能、优势以及能为用户带来的价值等等。例如，我们提供了便捷的操作体验、丰富的资源内容以及安全可靠的数据保障等等，让您可以放心使用我们的服务。
        </p>
        <div class="right-login-box">
          <el-form
            ref="loginForm"
            :model="form"
            :rules="rules"
            label-position="inside"
          >
            <el-form-item prop="username">
              <el-input
                v-model="form.username"
                placeholder="请输入用户名"
                style="width: 100%"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                placeholder="请输入密码"
                type="password"
                style="width: 100%"
              ></el-input>
            </el-form-item>
            <!-- 提示词，这里先简单示例，实际中可根据验证等情况动态显示 -->
            <!-- <p class="prompt-text" v-if="showPrompt">密码错误！</p> -->
            <el-button type="primary" @click="submitForm" style="width: 100%"
              >登录</el-button
            >
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { login } from '@/api';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'; // 导入Vuex的useStore函数，用于获取store实例

const store = useStore();
const router = useRouter();
// 定义表单数据
const form = reactive({
  username: '',
  password: ''
});

// 定义表单验证规则
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        // 校验用户名是否为空白
        if (!value.trim()) {
          callback(new Error('用户名不能为空'));
          return;
        }
        // 校验用户名长度是否在2-10位之间
        if (value.length < 2 || value.length > 10) {
          callback(new Error('用户名长度在2-10位之间'));
          return;
        }
        // 校验用户名是否允许数字、字母和特殊字符
        const validChars =
          /^[a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\{\}\[\]\|\:\;\<\>\,\.\/\?\~]+$/;
        if (!validChars.test(value)) {
          callback(new Error('用户名只能包含数字、字母和部分特殊字符'));
          return;
        }
        callback();
      },
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        // 校验密码是否为空白
        if (!value.trim()) {
          callback(new Error('密码不能为空'));
          return;
        }
        // 校验密码长度是否在8-20位之间
        if (value.length < 8 || value.length > 20) {
          callback(new Error('密码长度需在8-20位之间'));
          return;
        }
        // 校验密码是否只包含数字和字母
        const validChars = /^[a-zA-Z0-9]+$/;
        if (!validChars.test(value)) {
          callback(new Error('密码只能包含数字和字母'));
          return;
        }
        callback();
      },
      trigger: 'blur'
    }
  ]
});

// 获取表单实例
const loginForm = ref(null);

// 用于控制提示词是否显示，实际中根据验证逻辑等来改变这个值
const showPrompt = ref(false);

// 提交表单方法
const submitForm = () => {
  loginForm.value.validate(async (valid) => {
    if (valid) {
      console.log(
        '表单提交成功，用户名：',
        form.username,
        '密码：',
        form.password
      );
      const data = {
        username: form.username,
        password: form.password
      };
      const res = await login(data);
      if (res.status === 0) {
        // 成功操作
        store.dispatch('setLoginStatus', true);
        ElMessage({
          message: '登录成功！正在跳转页面...',
          type: 'success',
          duration: 2000,
          onClose: () => {
            // 这里假设你有一个路由名为'login'的登录页面，你需要根据实际路由配置进行调整
            router.push({ name: 'ground' });
          }
        });
      } else if (res.status === 1) {
        // 失败操作
        ElMessage({
          message: `登录失败，${res.message}`,
          duration: 2000,
          type: 'error'
        });
      }
    } else {
      console.log('表单验证失败');
      // 假设验证失败时显示提示词，这里简单设置示例，可根据实际完善验证逻辑
      showPrompt.value = true;
    }
  });
};

// 重置表单方法
const resetForm = () => {
  form.username = '';
  form.password = '';
  loginForm.value.resetFields();
  showPrompt.value = false;
};
</script>

<style scoped>
.login-page {
  /* width: 800px; */
  /* margin: 100px auto; */
  height: calc(100vh - 60px);
  background: #f0f0f0;
  /* padding: 20px; */
}

.left-intro {
  padding: 20px;
  height: 100%;
  background: url(../assets/stu_background.png);
  /* background-position: -100px 0; */
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.right-login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
}

.right-login-box {
  width: 80%;
}

.main-title {
  text-align: center;
  margin-bottom: 10px;
}

.sub-title {
  text-align: center;
  color: #666;
}

.prompt-text {
  color: red;
  text-align: center;
}

.el-row {
  margin-bottom: 20px;
  height: 100%;
  overflow: hidden;
  background: ghostwhite;
}

.el-input,
.el-button {
  width: 100%;
}
</style>
