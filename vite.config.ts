import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/japan/edu/api": {
        target: "http://52.53.242.81:7088",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
