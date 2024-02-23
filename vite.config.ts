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
      if (!/\.(vue)$/.test(id)) return;
      const typePath = path.resolve(id, "../type.sfc.ts");
      if (!fs.existsSync(typePath)) return;
      let typeFileContent = decomment(fs.readFileSync(typePath).toString());
      typeFileContent = await prettier.format(typeFileContent, {
        semi: true,
        parser: "typescript",
      });
      typeFileContent = typeFileContent.replace(/[\r\n]/g, "");
      const regex = /import .* from '\.\/type\.sfc'/g;
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
