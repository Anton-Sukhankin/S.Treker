import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@s-tracker/ui': fileURLToPath(new URL('../src/ui/components/index.js', import.meta.url)),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 4175,
  },
  preview: {
    host: '127.0.0.1',
    port: 4176,
  },
  build: {
    rollupOptions: {
      input: {
        hub: fileURLToPath(new URL('./index.html', import.meta.url)),
        tasks: fileURLToPath(new URL('./tasks/index.html', import.meta.url)),
        documents: fileURLToPath(new URL('./documents/index.html', import.meta.url)),
        documentTemplates: fileURLToPath(new URL('./document-templates/index.html', import.meta.url)),
      },
    },
  },
});
