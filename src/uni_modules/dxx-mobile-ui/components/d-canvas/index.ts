import { ref } from "vue";
import type DCanvas from "./d-canvas.vue";

/** 获取组件实例 */
const getDCanvasRef = () => ref<InstanceType<typeof DCanvas> | null>(null);

export { getDCanvasRef };

export default { name: "DCanvas", title: "canvas" };
