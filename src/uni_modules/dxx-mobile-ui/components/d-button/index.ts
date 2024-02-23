import { ref } from "vue";
import type DButton from "./index.vue";

const getDButtonRef = () => ref<InstanceType<typeof DButton> | null>(null);

export { getDButtonRef };

export default { name: "DButton", title: "按钮组件" };
