<template>
  <d-test></d-test>

  <view class="tips">----------------------2.28更新----------------------</view>

  <view :style="{ fontSize: '16px', color: '#212121', padding: '24rpx' }">
    组件示例页面导航
  </view>
  <view class="pages" v-for="(item, index) in navList">
    <view class="page-title">{{ item.title }}</view>
    <view v-for="(child, index) in item.children" @click="goPage(child.page)">
      <text>{{ child.name }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
const navList = ref([
  {
    title: "测试组件",
    open: false,
    children: [
      {
        name: "d-button 按钮",
        page: "/uni_modules/dxx-mobile-ui/components/d-button/d-button",
      },
      {
        name: "d-test 测试组件",
        page: "/uni_modules/dxx-mobile-ui/components/d-test/d-test",
      },
    ],
  },
  {
    title: "画布",
    open: false,
    children: [
      {
        name: "d-canvas canvas",
        page: "/uni_modules/dxx-mobile-ui/components/d-canvas/demos/demo1",
      },
    ],
  },
]);
// 若要跳转，须在pages.json中配置
const goPage = (url: string) => {
  uni.navigateTo({
    url,
  });
};
</script>

<style scoped lang="scss">
.tips {
  font-size: 12px;
  color: pink;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.pages {
  background-color: #ecf5ff;
  color: #409eff;
  margin-bottom: 10px;
  border-radius: 4px;
  .page-title {
    color: black;
  }
}
</style>
