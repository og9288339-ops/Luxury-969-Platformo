import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Base path for deployment (Cloudflare Pages compatibility)
  base: './',
  
  // Build configuration for production optimization
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'ui-vendor': ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  
  // Dependency optimization for better performance
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
    ],
  },
  
  // Server configuration
  server: {
    port: 3000,
    host: true,
    open: true,
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});