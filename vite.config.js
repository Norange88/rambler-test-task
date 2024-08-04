import injectHTML from 'vite-plugin-html-inject';
import glsl from 'vite-plugin-glsl';

export default {
  root: 'src/',
  publicDir: '../static/',
  base: './',
  server: {
    host: true,
  },
  plugins: [injectHTML(), glsl()],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
  },
};
