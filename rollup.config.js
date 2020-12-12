import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

const SOURCE = 'src/hardtack.js';

export default [
  {
    input: SOURCE,
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'esm',
      },
    ],
    plugins: [babel()],
  },
  {
    input: SOURCE,
    output: {
      file: 'dist/hardtack.min.js',
      format: 'umd',
      name: pkg.name,
    },
    plugins: [babel(), uglify()],
  },
];
