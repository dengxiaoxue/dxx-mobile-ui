<template>
  <view class="canvas-wrap" :id="`canvaswrap${props.id}`">
    <canvas
      v-show="elBgIdShowOne"
      type="2d"
      :canvas-id="props.id"
      :id="props.id"
      class="canvas"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      @longtap="longtap"
    >
    </canvas>
    <img
      v-show="elBgIdShowTwo"
      :src="elBgIdUrl"
      mode="widthFix"
      class="image-render"
    />
  </view>
</template>
<script lang="ts">
export default {
  name: "d-canvas",
};
</script>
<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useCanvas } from "./hooks/use-canvas";
import type { Options, Emits } from "./type.sfc";

interface CanvasProps {
  /**canvas绘制对象 */
  canvas: any;
  /**canvasId, 默认firstCanvas */
  id?: string; // canvas-id
  /**canvas配置项 */
  options?: Options;
  // #ifdef MP-WEIXIN
  /**是否渲染成图片-仅微信小程序支持 */
  isRenderImage?: boolean;
  // #endif
  /**是否以背景图居中 */
  centerContent?: boolean;
  /**是否允许拖动和缩放 */
  isEnablePanScale?: boolean;
  /**线条宽度 */
  strokeWidth?: number;
}

const props = withDefaults(defineProps<CanvasProps>(), {
  isEnablePanScale: true,
  id: "firstCanvas",
});

const emits = defineEmits<Emits>();

const { initCanvas, touchstart, touchmove, touchend, longtap, canvasDraw } =
  useCanvas({
    props,
    emits,
  });

// 下面是小程序解决canvas层级过高的方案（生成图片）
const elBgIdShowOne = ref(true);
const elBgIdShowTwo = ref(false);
const elBgIdUrl = ref<any>("");
let showTimer: any = null;
const renderToImage = async () => {
  const tempFilePath = await canvasDraw.value?.renderImage();
  elBgIdShowTwo.value = true;
  if (showTimer) clearTimeout(showTimer);
  showTimer = setTimeout(() => {
    elBgIdShowOne.value = false;
    // 隐藏成功-抛出事件
    emits("on-render-image-sucess");
  }, 100);
  elBgIdUrl.value = tempFilePath;
};
const renderToCanvas = () => {
  elBgIdUrl.value = "";
  elBgIdShowOne.value = true;
  elBgIdShowTwo.value = false;
  emits("on-render-image-cancel");
};
// #ifdef MP-WEIXIN
watch(
  () => props.isRenderImage,
  (val) => {
    if (val) renderToImage();
    if (!val) renderToCanvas();
  },
  {
    immediate: true,
  }
);
// #endif

onMounted(() => {
  initCanvas();
});
</script>
<style lang="scss" scoped>
.canvas-wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
.canvas {
  width: 100%;
  height: 100%;
}
.image-render {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
