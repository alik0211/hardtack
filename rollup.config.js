import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

export default {
  input: 'src/hardtack.js',
  output: {
    file: pkg.main,
    format: 'umd',
    name: pkg.name,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
};
