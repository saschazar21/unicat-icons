const {
  ensureDir,
  writeFile
} = require('fs-extra');
const {
  resolve
} = require('path');
const {
  default: svgr
} = require('@svgr/core');
const pascalCase = require('pascal-case');
const paramCase = require('param-case');

const svgrConfig = require('../.svgrrc');
const {
  buildDir
} = require('./paths');
const read = require('./reader');

const writeIndex = async (iconPaths) => writeFile(`${buildDir}/${process.env.TARGET === 'web' ? 'index' : process.env.TARGET}.ts`, iconPaths.join('\n'));

const writeIcon = async ({
    name,
    contents
  }) => ensureDir(resolve(buildDir, process.env.TARGET))
  .then(() => svgr(contents, svgrConfig, {
    componentName: `${pascalCase(name)}Icon`
  }))
  .then(jsx => writeFile(`${resolve(buildDir, process.env.TARGET, `${paramCase(name)}.tsx`)}`, jsx));

module.exports = async () => {
  const icons = await read();
  const iconPaths = icons.map(({
    name
  }) => `export { default as ${pascalCase(name)}Icon } from './${process.env.TARGET}/${paramCase(name)}'`);

  await writeIndex(iconPaths);
  return Promise.all(icons.map(writeIcon));
}