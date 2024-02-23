import { ref } from "vue";
import type DTest from "./d-test.vue";

const getDTestRef = () => ref<InstanceType<typeof DTest> | null>(null);

export { getDTestRef };

export default { name: "DTest", title: "测试组件" };
