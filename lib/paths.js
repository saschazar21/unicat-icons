const {
  resolve
} = require('path');


module.exports = {
  buildDir: resolve(__dirname, '../build'),
  distDir: resolve(__dirname, '../dist'),
  srcDir: resolve(__dirname, '../src'),
};