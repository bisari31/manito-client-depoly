import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react(), svgr()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_SERVER_URL,
          // secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
          changeOrigin: true,
        },
      },
    },
  };
});
