import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const _dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(_dirname, "src") },
      {
        find: "@components",
        replacement: path.resolve(_dirname, "src/components"),
      },
      { find: "@assets", replacement: path.resolve(_dirname, "src/assets") },
      { find: "@helpers", replacement: path.resolve(_dirname, "src/helpers") },
      // "@components": path.resolve(__dirname, "./src/components"),
      // "@assets": path.resolve(__dirname, "./src/assets"),
    ],
  },
});
