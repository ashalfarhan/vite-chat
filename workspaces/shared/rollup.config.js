import { defineConfig } from 'rollup'
import { terser } from 'rollup-plugin-terser'
import ts from 'rollup-plugin-ts'

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      exports: 'auto',
    },
    {
      file: 'dist/esm/index.js',
      format: 'module',
    },
  ],
  plugins: [ts(), terser()],
})
