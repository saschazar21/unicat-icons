const globby = require('globby');
const {
  copy,
  emptyDir,
  ensureDir,
  writeFile
} = require('fs-extra');
const {
  basename,
  resolve
} = require('path');
const pascalCase = require('pascal-case');

const template = require('./next/template');

const pageRoot = resolve(__dirname, '../pages');
const svgRoot = resolve(__dirname, '../dist/web');
const templateRoot = resolve(__dirname, './next');

const fileList = [
  '../README.md',
  '../CHANGELOG.md',
  '../LICENSE.md',
];

const emptier = async () => emptyDir(pageRoot);

const copier = async () => {
  await ensureDir(pageRoot).then(() => copy(resolve(templateRoot, './_app.tsx'), pageRoot));

  fileList.forEach(async f => {
    try {
      await copy(resolve(__dirname, f), pageRoot)
        .then(() => `${resolve(pageRoot, f)} successfully copied!`);
    } catch (e) {
      console.log(`${resolve(__dirname, f)} could not be copied, please check if it's there...`);
      console.error(e);
    }
  });
}

const reader = async () => {
  console.log(`Looking for SVG definitions in ${svgRoot}...`);
  const svgIcons = await globby(`${svgRoot}/**/*.ts`);

  if (!svgIcons.length) {
    throw new Error('No SVG icons found!! Aborting...');
  }

  return svgIcons.map(svg => `${pascalCase(basename(svg, '.d.ts'))}Icon`);
}

const executor = async icons => {
  const tpl = template(icons);

  return writeFile(resolve(pageRoot, './index.tsx'), tpl);
}

(async () => emptier()
  .then(copier)
  .then(reader)
  .then(executor))();