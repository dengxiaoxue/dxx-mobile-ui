import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import fs from "fs";
import path from "path";
import prettier from "prettier";
import decomment from "decomment";
import type { Plugin } from "vite";

// 支持在Vue SFC中引入外部类型定义
const vueSfcImportType = (): Plugin => {
  return {
    name: "vue-sfc-import-type",
    enforce: "pre",
    async transform(code, id) {
      // 不是vue文件 返回
      if (!/\.(vue)$/.test(id)) return;
      const typePath = path.resolve(id, "../type.sfc.ts");
      // 不存在type.sfc.ts文件 返回
      if (!fs.existsSync(typePath)) return;
      // 文件内容
      let typeFileContent = decomment(fs.readFileSync(typePath).toString());
      typeFileContent = await prettier.format(typeFileContent, {
        semi: true,
        parser: "typescript",
      });
      // 将文件内容去掉换行符 变成一行
      typeFileContent = typeFileContent.replace(/[\r\n]/g, "");
      // 替换的正则表达式
      const regex = /import .* from "\.\/type\.sfc"/g;
      // 将导入type.sfc的那一行进行替换
      const res = code.replace(regex, typeFileContent);
      return res;
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  return {
    plugins: [uni(), vueSfcImportType()],
  };
});
