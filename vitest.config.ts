import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["packages/*/src/**/*.test.{ts,tsx}"],
    css: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["packages/*/src/**/*.{ts,tsx}"],
      exclude: [
        "packages/*/src/**/*.test.{ts,tsx}",
        "packages/*/src/**/*.types.ts",
        "packages/*/src/index.ts",
      ],
    },
  },
});
