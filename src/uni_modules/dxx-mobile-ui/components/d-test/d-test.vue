<template>
  <view class="content">{{ title }}, 我是d-test组件 </view>
</template>
<script lang="ts">
export default {
  name: "d-test",
};
</script>
<script setup lang="ts">
import { ref } from "vue";
import type { EEE } from "./type.sfc";
const title = ref("Hello");

const emits = defineEmits<EEE>();
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
