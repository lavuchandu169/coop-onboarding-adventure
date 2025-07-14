import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Check if local certificates exist
  const keyPath = path.resolve(__dirname, 'certs/localhost-key.pem');
  const certPath = path.resolve(__dirname, 'certs/localhost.pem');
  
  const httpsConfig = fs.existsSync(keyPath) && fs.existsSync(certPath) 
    ? {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      }
    : {
        key: undefined,
        cert: undefined,
      };

  return {
    base: '/',
    server: {
      host: "::",
      port: 8080,
      https: httpsConfig,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@radix-ui/react-toast', '@radix-ui/react-dialog'],
          },
        },
      },
    },
  };
});