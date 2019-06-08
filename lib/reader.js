const globby = require('globby');
const { readFile } = require('fs-extra');

const { srcDir } = require('./paths');

const getStats = async fileName => {
  const name = fileName.split('/').pop().split('.').shift();
  const contents = await readFile(fileName);
  
  return {
    contents,
    name,
  };
};

module.exports = async () => {
  const svgFiles = await globby(`${srcDir}/**/*.svg`);
  if (!svgFiles.length) {
    throw new Error(`No SVG files found in ${srcDir}! Aborting...`);
  }
  return Promise.all(svgFiles.map(fileName => getStats(fileName)));
};
