import { build } from 'bun';
import { pluginVue3 } from 'bun-plugin-vue3';

await build({
  entrypoints: ['frontend/index.html'],
  outdir: '../build',
  minify: true,
  sourcemap: 'inline',
  plugins: [pluginVue3({
    isProduction: false,
  })],
});
