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
  console.log(`
  Found ${svgFiles.length} SVG icons in ${srcDir}, ranging from:
    "${svgFiles[0]}"
    to
    "${svgFiles[svgFiles.length - 1]}"
  `);
  return Promise.all(svgFiles.map(fileName => getStats(fileName)));
};
