import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["@livestore/wa-sqlite"], // Needed until https://github.com/vitejs/vite/issues/8427 is resolved
  },
});
