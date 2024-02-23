<template>
  <button class="content">{{ title }}</button>
</template>
<script lang="ts">
export default {
  name: "d-button",
};
</script>
<script setup lang="ts">
import { ref } from "vue";
const title = ref("打开");
</script>

<style>
.content {
  font-size: 36rpx;
  color: pink;
}
</style>
