import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:5000",
    },

  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@admin": path.resolve(__dirname, "src/admin"),
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@services": path.resolve(__dirname, "src/services"),
    },
  },
});
