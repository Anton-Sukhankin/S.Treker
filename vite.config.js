import { defineConfig } from 'vite';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

function fileProtocolBuildPlugin() {
  return {
    name: 'file-protocol-build',
    writeBundle() {
      const indexPath = resolve('dist/index.html');
      const html = readFileSync(indexPath, 'utf8')
        .replace(/<script type="module" crossorigin src="(\.\/assets\/[^"]+\.js)"><\/script>/, '<script defer src="$1"></script>')
        .replace(/<link rel="stylesheet" crossorigin href="(\.\/assets\/[^"]+\.css)">/, '<link rel="stylesheet" href="$1">');
      writeFileSync(indexPath, html);
    }
  };
}

export default defineConfig({
  base: './',
  plugins: [fileProtocolBuildPlugin()],
  server: {
    host: '127.0.0.1',
    port: 5173
  },
  preview: {
    host: '127.0.0.1',
    port: 4173
  }
});
