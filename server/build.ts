import { build } from 'bun';

await build({
  entrypoints: ['server/index.ts'],
  outdir: '../build/server',
  minify: true,
  target: 'bun',
});
