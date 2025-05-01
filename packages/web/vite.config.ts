import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import { livestoreDevtoolsPlugin } from "@livestore/devtools-vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tailwindcss(),
    livestoreDevtoolsPlugin({ schemaPath: "../shared/schema.ts" }),
  ],
  optimizeDeps: {
    exclude: ["@livestore/wa-sqlite"], // Needed until https://github.com/vitejs/vite/issues/8427 is resolved
  },
});
