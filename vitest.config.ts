import { loadEnvFile } from "node:process";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

loadEnvFile(); // Load enviroment file using node native

export default defineConfig({
  plugins: [tsconfigPaths()],
});
