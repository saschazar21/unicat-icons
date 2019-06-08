// @ts-nocheck
const svgoConfig = require('./.svgo.json');

const nativeTemplate = require('./templates/native');
const sketchappTemplate = require('./templates/sketchapp');
const webTemplate = require('./templates/web');

const tpl = {
  native: nativeTemplate,
  sketchapp: sketchappTemplate,
  web: webTemplate,
};

module.exports = {
  dimensions: false,
  ext: 'tsx',
  native: process.env.TARGET !== 'web',
  plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
  svgoConfig,
  template: tpl[process.env.TARGET],
};
