import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    external: ["react", "react-dom"],
    treeshake: true,
    sourcemap: true,
  },
  {
    entry: ["src/cli.ts"],
    format: ["esm"],
    clean: false,
    outExtension: () => ({ js: ".js" }),
    banner: { js: "#!/usr/bin/env node" },
    sourcemap: false,
  },
]);
