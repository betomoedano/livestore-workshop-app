import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react(), tailwindcss()],
  optimizeDeps: {
    exclude: ["@livestore/wa-sqlite"], // Needed until https://github.com/vitejs/vite/issues/8427 is resolved
  },
});
