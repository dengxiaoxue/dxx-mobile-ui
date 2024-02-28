<template>
  <view class="demo-canvas">
    <view :style="canvasStyle" class="canvas-wrap">
      <d-canvas
        v-model:canvas="CanvasRef"
        :options="options"
        @selection-updated="updated"
        @selection-cleared="cleared"
        @selection-long-tap="longTap"
        @imgs-first-onload="() => imgOnload('img-first-onload')"
        @on-ready="getJSON"
        :isRenderImage="isRenderImage"
        @on-render-image-sucess="sucess"
        @on-render-image-cancel="cancel"
        centerContent
      ></d-canvas>
    </view>
    <view class="buttons-wrap">
      <view class="buttons">
        <button @click="zoomIn">放大</button>
        <button @click="zoomOut">缩小</button>
        <button @click="zoomToFit">重置</button>
        <button @click="clear">清空</button>
        <button @click="deleteItem">删除选中</button>
      </view>
      <view>当前选中的对象id: {{ currentSelectId }}</view>
      <view class="buttons">
        <button @click="clearRoutes">删路线</button>
        <button @click="drawRoutes">画路线</button>
        <button @click="() => drawPoint('point')">画节点</button>
        <button @click="deletePoint">删节点</button>
      </view>
      <view class="buttons">
        <button @click="() => drawPoint('Polyline')">Polyline</button>
        <button @click="() => drawPoint('Edge')">Edge</button>
        <button @click="() => drawPoint('text')">Text</button>
        <button @click="() => redraw(300, 250)">减</button>
        <button @click="() => redraw(350, 350)">加</button>
        <button @click="() => redraw(300, 300)">复原</button>
      </view>
      <view class="buttons">
        <button @click="getChildren">获取所有子对象</button>
        <button @click="loadjson2">fromJSON</button>
        <button @click="open">打开抽屉</button>
      </view>
      <view class="buttons">
        <button @click="hide">隐藏节点</button>
        <button @click="show">显示节点</button>
      </view>
      <!-- <das-drawer v-model="show4" mode="top">
        <view @click.stop="show4 = false" class="box">canvas 在微信小程序中为原生组件,层级高于前端组件,解决 canvas 层级过高无法覆盖,参考demo-"打开抽屉"的例子</view>
      </das-drawer> -->
    </view>
    <view>canvas组件更新如下: </view>
    <view>
      1.支持fromjson的时候就传入$routes进行路线绘制, 数据结构详见mock数据 json3
    </view>
    <view>2.该组件同时支持 app、H5、微信小程序</view>
    <view>3.优化了小程序canvas层级过高的问题</view>
    <view>4.删除了isInvisible属性</view>
    <view>5.fromJSON的差异: 在小程序端为异步绘制, 在app端为同步绘制</view>
    <view>
      6.删除了'imgs-onload' 'imgs-cache-onload'事件,
      仅保留'imgs-first-onload'事件, 且该事件仅小程序支持
    </view>
    <view>7.新增了redraw方法, canvas尺寸变化时的重绘方法</view>
    <view>================2024.2.27更新=================</view>
    <view>1.支持剪裁掉超出底图的部分, 默认剪裁</view>
  </view>
</template>

<script setup lang="ts">
import { json2, json3, json, routes } from "./mock";
import { ref, watch, computed, nextTick } from "vue";
import type {
  Options,
  ItemType,
  CanvasObjectType,
} from "@/uni_modules/dxx-mobile-ui/components/d-canvas/type.sfc";

const show4 = ref<boolean>(false);
const options = ref<Options>({
  strokeWidth: 1,
});
const CanvasRef = ref<CanvasObjectType | null>(null);

const currentSelectId = ref("");
const isRenderImage = ref(false); // 小程序解决canvas层级过高的方案（生成图片）
const canvasHeight = ref(300);
const canvasWidth = ref(300);
const canvasStyle = computed(() => {
  return {
    width: canvasWidth.value + "px",
    height: canvasHeight.value + "px",
  };
});
const redraw = async (width: any, height: any) => {
  canvasWidth.value = width;
  canvasHeight.value = height;
  await CanvasRef.value?.redraw();
};

// 该事件仅微信小程序会触发
// 由于小程序绘制图片是异步的，因此当所有图片都加载完成时会触发该事件
// app绘制图片是同步的
const imgOnload = (type: any) => {
  console.log("imgOnload", type);
  drawRoutes();
};

// loadJson
let timer: any = null;
const getJSON = () => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    console.log("getJSON");

    const time1 = new Date().getTime();

    CanvasRef.value?.fromJSON(json2); // app端为同步绘制，小程序为异步绘制(主要是绘制图片是异步的)

    const time2 = new Date().getTime();
    console.log("time2 - time1 = ", time2 - time1);

    // #ifdef H5 || APP-PLUS
    drawRoutes();
    // #endif
  }, 500);
};

const loadjson2 = () => {
  CanvasRef.value?.fromJSON(json2);
};

// 点击节点-根据业务自己处理
// item：canvas子对象
// 触发该事件后会调用ctx.draw(), 因此直接修改canvas子对象属性视图可以更新
const updated = (item: ItemType) => {
  console.log("选中元素：", item);
  // 工位
  if (item.data.$_type === "work") {
    item.style.img = item.data.icons.selectedIcon; // 修改icon
  }
  // 障碍物
  if (item.data.$_type === "barrier") {
    item.style.fill = "green";
  }
  // 起点
  if (item.data.$_type === "start-point") {
  }
  // 路线节点
  if (item.data.$_type === "path") {
    item.style.fill = "pink";
  }
  currentSelectId.value = item.id;
};
const cleared = (item: ItemType) => {
  console.log("取消选中：", item);
  currentSelectId.value = "";
};
const longTap = (item: ItemType) => {
  console.log("长按事件：", item);
};

// 删除节点
const deleteItem = () => {
  if (!currentSelectId.value) {
    return;
  }
  CanvasRef.value?.removeNode(currentSelectId.value);
  currentSelectId.value = "";
};

// 重置画布（恢复到第一次fromjson绘制的状态）
const zoomToFit = () => {
  CanvasRef.value?.zoomToFit();
};
// 放大
const zoomIn = () => {
  CanvasRef.value?.zoomIn();
};
// 缩小
const zoomOut = () => {
  CanvasRef.value?.zoomOut();
};
// 清除画布，并清空子对象
const clear = () => {
  CanvasRef.value?.clear();
};
// 清除路线
const clearRoutes = () => {
  CanvasRef.value?.clearRoutes();
};
// 绘制路线
// 现支持fromjson()的时候将路线放入json数据里，统一进行绘制，数据结构见mock数据里的json3
const drawRoutes = () => {
  CanvasRef.value?.drawRoute(routes.route, "red");
};
// 获取所有canvas子对象
const getChildren = () => {
  console.log("所有canvas子对象: ", CanvasRef.value?.children);
};

// 绘制节点
const drawPoint = (type?: "text" | "Edge" | "Polyline" | "point") => {
  if (!type) type = "point";
  const offsetX = json2.backgroundConfig.position.x;
  const offsetY = json2.backgroundConfig.position.y;
  if (type === "point") {
    const opt = {
      id: "pointtttt",
      zIndex: 0,
      points: [{ x: 470, y: 200 }], // 左上角坐标
      style: {
        width: 50,
        height: 50,
        img: "https://test29.rd.chn-das.com/oss/resource/workspace/start.png",
      },
      angle: 0,
    };
    CanvasRef.value?.addPoint(opt);
  }
  if (type === "Polyline") {
    const opt = {
      id: "Polylineeee",
      zIndex: 0,
      points: [
        { x: 500, y: 200 },
        { x: 550, y: 300 },
        { x: 500, y: 550 },
      ],
      style: {
        strokeWidth: 1,
        stroke: "black",
        fill: "#fff",
      },
    };
    CanvasRef.value?.addPolyline(opt);
  }
  if (type === "Edge") {
    const opt = {
      id: "Edgeeeee",
      zIndex: 0,
      points: [
        { x: 520, y: 520 },
        { x: 630, y: 530 },
        { x: 740, y: 430 },
      ],
      style: { strokeWidth: 1, stroke: "red" },
    };
    CanvasRef.value?.addEdge(opt);
  }
  if (type === "text") {
    const opt = {
      id: "textttttt",
      text: "我是文字",
      points: [{ x: 970, y: 320 }], // 左上角坐标
      style: { fill: "red" },
    };
    CanvasRef.value?.addText(opt);
  }
};
// 删除节点
const deletePoint = () => {
  CanvasRef.value?.removeNode("pointtttt");
};
const hide = () => {
  CanvasRef.value?.hide(["1725403677302837248", "1725403677156036608"]);
};
const show = () => {
  CanvasRef.value?.show(["1725403677302837248", "1725403677156036608"]);
};

// 小程序-弹窗时canvas层级过高的解决方案 - 此为优化过后的版本，效果看上去流程了很多
const open = () => {
  // #ifdef MP-WEIXIN
  isRenderImage.value = true; // 打开之前先将canvas转为图片-转成功后会触发'on-render-image-sucess'事件
  // #endif

  // #ifdef H5 || APP-PLUS
  show4.value = true; // 打开抽屉
  // #endif
};
const sucess = () => {
  console.log("小程序: canvas转图片成功");
  show4.value = true; // 打开抽屉
};
const cancel = () => {
  console.log("小程序: 取消canvas转图片成功");
};
watch(
  () => show4.value,
  (val) => {
    if (!val) {
      // #ifdef MP-WEIXIN
      setTimeout(() => {
        // 在合适的时机取消
        isRenderImage.value = false;
      }, 300);
      // #endif
    }
  }
);
</script>

<style scoped>
.demo-canvas {
  height: 430px;
  background: #e7f1e0;
  font-size: 12px;
  border: 1px solid pink;
}
.canvas-wrap {
  border: 1px solid red;
  position: relative;
}
.buttons {
  display: flex;
  justify-content: space-around;
  margin: 10px;
}
button {
  font-size: 12px;
}
.buttons-wrap {
  background-color: #fff;
}
.box {
  height: 200px;
  background-color: #fff;
}
</style>
