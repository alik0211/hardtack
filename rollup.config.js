import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

const SOURCE = 'src/hardtack.js';

export default [
  {
    input: SOURCE,
    output: {
      file: pkg.main,
      format: 'cjs',
    },
    plugins: [babel()],
  },
  {
    input: SOURCE,
    output: {
      file: 'dist/hardtack.min.js',
      format: 'iife',
      name: pkg.name,
    },
    plugins: [babel(), uglify()],
  },
];
