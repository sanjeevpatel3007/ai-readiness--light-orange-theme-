import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "./", // REQUIRED for Vercel static deploy
    plugins: [react()],
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    build: {
      outDir: "dist",
    },
    define: {
      // expose env to frontend
      "import.meta.env.VITE_GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./"),
      },
    },
  };
});
