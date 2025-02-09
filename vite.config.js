import { defineConfig } from 'vite';
import { resolve } from 'path';
import inspect from 'vite-plugin-inspect';
import handlebars from 'vite-plugin-handlebars';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

export default defineConfig({
  root,
  publicDir: '../public',

  server: {
    port: 7777,
    host: true,
    open: '',
  },

  preview: {
    port: 9999,
    open: 'index.html',
  },

  plugins: [
    inspect(),
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
  ],

  build: {
    outDir,
    emptyOutDir: true,
    minify: false,

    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        faq: resolve(root, 'faq.html'),
        contacts: resolve(root, 'contacts.html'),

        ext: resolve(root, 'knowledge-base/ext.html'),
        update: resolve(root, 'knowledge-base/update.html'),
        zstore: resolve(root, 'knowledge-base/zstore.html'),
        zstoredoc: resolve(root, 'knowledge-base/zstoredoc.html'),
        zstoreusage: resolve(root, 'knowledge-base/zstoreusage.html'),

        frm: resolve(root, 'other-projects/frm.html'),
        notty: resolve(root, 'other-projects/notty.html'),
        ppo: resolve(root, 'other-projects/ppo.html'),
        zdb: resolve(root, 'other-projects/zdb.html'),
      },

      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/img/[name]-[hash][extname]';
          }

          if (/\.css$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]';
          }

          if (/\.(ttf|woff|woff2|eot)$/.test(name ?? '')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }

          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
});
