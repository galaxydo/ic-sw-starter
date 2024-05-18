import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: '../../.env' });

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sw: resolve(__dirname, 'src/index.tsx'),
        may16: resolve(__dirname, 'src/may16.ts'),
        // htmx: resolve(__dirname, 'src/htmx.min.js')
      },
      output: {
        entryFileNames(chunk) {
          if (chunk.name === 'sw') {
            return 'galaxy-service-worker.js'
          } else if (chunk.name == 'may16') {
            return 'may16.js'
          } else {
            return 'assets/[name]-[hash].js'
          }
        }
      }
    },
    // emptyOutDir: false,
  },
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(
          new URL("../declarations", import.meta.url)
        ),
      },
      {
        find: "@assets",
        replacement: "/dist/assets",
      },
      {
        find: "@",
        replacement: fileURLToPath(
          new URL("./src/", import.meta.url)
        ),
      }
    ],
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  publicDir: "assets",
  plugins: [
    environment({
      CANISTER_ID_MAY16_GALAXY_FRONTEND: undefined,
      CANISTER_ID_MAY16_GALAXY_BACKEND: undefined,
      CANISTER_ID_INTERNET_IDENTITY: undefined,
    }),
  ],
});
