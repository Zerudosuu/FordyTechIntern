import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next/**"],
    coverage: {
      all: true,
      provider: "v8",
      reporter: ["lcov", "text-summary"],
    },
    setupFiles: ["./src/vitest-setup.ts"],
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
  resolve: { alias: { "@": "/src" } },
});
