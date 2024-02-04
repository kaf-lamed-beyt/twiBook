import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@utils": path.resolve(__dirname, "src/utils/"),
        "@components": path.resolve(__dirname, "src/components/"),
      },
    },
    plugins: [react()],
  };
});
