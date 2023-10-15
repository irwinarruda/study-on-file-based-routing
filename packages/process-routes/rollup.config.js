import { defineConfig } from "rollup";
import typescript from "rollup-plugin-typescript2";
import PackageJson from "./package.json" assert { type: "json" };

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      dir: "dist",
      sourcemap: false,
      banner: "#!/usr/bin/env node",
    },
  ],
  external: ["fs/promises", ...Object.keys(PackageJson.dependencies)],
  plugins: [typescript()],
});
