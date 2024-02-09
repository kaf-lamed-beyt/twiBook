import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

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
        "@pages": path.resolve(__dirname, "src/pages"),
        "@components": path.resolve(__dirname, "src/components/"),
        "@dashboard-components/": path.resolve(
          __dirname,
          "src/pages/dashboard/components/"
        ),
        "@context": path.resolve(__dirname, "src/context"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@externals": path.resolve(__dirname, "src/externals"),
      },
    },
    plugins: [react()],

    // to solve the preocess.env issues when i try using my connection string
    // passed to the postgres function
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: "globalThis",
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
          }),
        ],
      },
    },
  };
});
