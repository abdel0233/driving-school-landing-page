import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    proxy: {
      "/api/webhook": {
        target: "https://automation-n8n.gln21u.easypanel.host",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/webhook/, "/webhook"),
        secure: true,
      },
      "/api/webhook-test": {
        target: "https://automation-n8n.gln21u.easypanel.host",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/webhook-test/, "/webhook-test"),
        secure: true,
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
