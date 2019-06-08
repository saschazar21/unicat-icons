import { resolve } from 'path';
import builtins from 'builtin-modules';
import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';
import nodeResolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

const { buildDir, distDir } = require('./lib/paths');

const distFile = file => resolve(distDir, `./${file}`);

const fileName = `./${process.env.TARGET === 'web' ? 'index' : process.env.TARGET}`;

const external = [
  ...builtins,
  'react',
  'classnames',
  'react-native',
  'react-native-svg',
  'react-sketchapp',
];

const globals = {
  classnames: 'classnames',
  react: 'React',
  'react-native-svg': 'Svg',
  'react-sketchapp': 'sketchSvg',
};

const base = {
  external,
  input: resolve(buildDir, `${fileName}.ts`),
  plugins: [
    nodeResolve(),
    commonjs({
      include: /node_modules/,
    }),
    typescript(),
    babel({ extensions: ['.ts', '.tsx'] }),
    postcss({
      minimize: true,
      modules: {
        generateScopedName: '[name]__[local]___[md5:hash:hex:4]',
      },
      plugins: [autoprefixer()],
    }),
  ],
};

const prodBase = {
  ...base,
  plugins: [...base.plugins, terser(), filesize()],
};

export default [
  {
    ...base,
    output: [
      {
        file: distFile(`${fileName}.js`),
        format: 'cjs',
        globals,
      },
      {
        file: distFile(`${fileName}.es.js`),
        format: 'es',
        globals,
      },
      {
        file: distFile(`${fileName}.umd.js`),
        format: 'umd',
        globals,
        name: `${pkg.name} v${parseInt(pkg.version, 10)}`,
      },
    ],
  },
  {
    ...prodBase,
    output: [
      {
        file: distFile(`${fileName}.min.js`),
        format: 'cjs',
        globals,
      },
      {
        file: distFile(`${fileName}.es.min.js`),
        format: 'es',
        globals,
      },
      {
        file: distFile(`${fileName}.umd.min.js`),
        format: 'umd',
        globals,
        name: `${pkg.name} v${parseInt(pkg.version, 10)}`,
      },
    ],
  },
];
