<template>
  <el-row class="ground-contain">
    <el-col class="content-layout" :span="18">
      <div class="content-top">
        <!-- 分段控制器 -->
        <el-segmented v-model="value" :options="tabOptions">
          <template #default="{ item }">
            <div class="segmented-box">
              <!-- <el-icon> </el-icon> -->
              <span>{{ item.label }}</span>
            </div>
          </template>
        </el-segmented>
      </div>
      <div class="content-main">
        <UpdateCard
          v-for="(item, index) in postLists"
          :key="index"
          :post="item"
        />
      </div>
    </el-col>
    <el-col class="person-information-layout" :span="6">
      <div class="person-top">
        <BasicInfoCard
          :user="user"
          :clickAvatar="clickAvatar"
          :show-button="true"
        />
      </div>
      <!-- <div class="person-bottom">
        <el-card class="person-bottom-card">
          <div class="person-comment">
            <div class="person-comment-username">
              <el-icon><Star /></el-icon>
              用户吴彦祖
            </div>
            <el-divider />
            <div class="person-comment-usercommant">
              <ul>
                <li>这个人是一个非常好的傻逼</li>
                <li>我想踹死他</li>
              </ul>
            </div>
          </div>
          <div class="person-comment">
            <div class="person-comment-username">
              <el-icon><Star /></el-icon>用户吴彦祖2
            </div>
            <el-divider />
            <div class="person-comment-usercommant">
              <ul>
                <li>这个人是一个非常好的傻逼</li>
                <li>我想踹死他</li>
              </ul>
            </div>
          </div>
        </el-card>
      </div> -->
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UpdateCard from '@/components/UpdateCard.vue';
import BasicInfoCard from '@/components/BasicInfoCard.vue';
import { getPostsList } from '@/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const { user_id } = JSON.parse(localStorage.getItem('userInfo'));

onMounted(async () => {
  const res = await getPostsList({
    id: user_id
  });
  postLists.value = res.data.posts;
  user.value = res.data.user;
});

const value = ref('最新动态');
const postLists = ref([]);
const user = ref({});

const clickAvatar = () => {
  router.push(`/personal/${user_id}`);
};
</script>

<style scoped>
.ground-contain {
  height: 100%;
}

.content-layout {
  padding: 0 5%;
  height: 96%;
  overflow-y: auto;
}

.content-top {
  margin: 20px 0;
}

.content-main {
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.el-segmented {
  --el-segmented-item-selected-color: #fff;
  /* --el-segmented-item-selected-bg-color: #ffd100; */
  --el-border-radius-base: 16px;
}
.card-header {
  display: flex;
  justify-content: space-between;
}
.card-header .card-header-left {
  display: flex;
  gap: 10px;
}

.card-header-right-icon {
  transform: rotate(90deg);
}
.person-information-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.person-top {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 270px;
  margin-top: 30px;
}

.person-top-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* justify-content: flex-start; */
}
.person-avatar {
  margin: 10px 0;
}

.person-bottom {
  width: 270px;
  margin-top: 30px;
}

.person-comment-usercommant ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.person-comment-usercommant li {
  color: #87cefa; /* 设置字体颜色为蓝色 */
  padding: 8px 12px; /* 设置合适的内边距，这里上下8px，左右12px，你可以按需调整 */
  position: relative;
}

.person-comment-usercommant li::before {
  content: '•'; /* 使用实心圆点作为自定义的列表标点，你也可以换成其他符号如"👉"之类的 */
  color: #87cefa; /* 设置标点颜色为蓝色 */
  position: absolute;
  left: 0; /* 将标点定位到最左边，根据需要可调整 */
  top: 50%; /* 垂直方向居中，后续进行微调 */
  transform: translateY(-50%); /* 精确垂直居中，兼容性较好 */
}

.person-comment {
  margin-bottom: 50px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
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

.card-footer-tag {
  display: flex;
  gap: 16px;
}
.person-comment-username {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
