const globby = require("globby");
const {
  copy,
  emptyDir,
  ensureDir,
  writeFile
} = require("fs-extra");
const {
  basename,
  resolve
} = require("path");
const pascalCase = require("pascal-case");

const template = require("./next/template");

const pageRoot = resolve(__dirname, "../pages");
const svgRoot = resolve(__dirname, "../dist/web");
const templateRoot = resolve(__dirname, "./next");

const fileList = ["../README.md", "../CHANGELOG.md", "../LICENSE.md"];
const linkList = [];

const emptier = async () => emptyDir(pageRoot);

const copier = async () => {
  await ensureDir(pageRoot)
    .then(() =>
      globby(resolve(templateRoot), {
        expandDirectories: {
          extensions: ["ts", "tsx"]
        }
      })
    )
    .then(files =>
      Promise.all(
        files.map(file => copy(file, resolve(pageRoot, basename(file))))
      )
    );

  await Promise.all(fileList.map(async f => {
    try {
      const fileName = basename(resolve(__dirname, f));
      await copy(resolve(__dirname, f), resolve(pageRoot, fileName))
        .then(
          () => console.log(`${resolve(pageRoot, f)} successfully copied!`),
        )
        .then(() => linkList.push(basename(fileName, '.md')));
      console.log(linkList);
    } catch (e) {
      console.log(
        `${resolve(
          __dirname,
          f
        )} could not be copied, please check if it's there...`
      );
      console.error(e);
    }
  }));

  try {
    if (linkList.length === 0) {
      throw new Error('paths.json contains no entries!');
    }
    await writeFile(resolve(pageRoot, './paths.json'), JSON.stringify(linkList));
  } catch (e) {
    console.error(`paths.json could not be created! Paths contains: ${linkList.length ? linkList.join(', '): 'nothing'}`);
  }
};

const reader = async () => {
  console.log(`Looking for SVG definitions in ${svgRoot}...`);
  const svgIcons = await globby(`${svgRoot}/**/*.ts`);

  if (!svgIcons.length) {
    throw new Error("No SVG icons found!! Aborting...");
  }

  return svgIcons.map(svg => `${pascalCase(basename(svg, ".d.ts"))}Icon`);
};

const executor = async icons => {
  const tpl = template(icons);

  return writeFile(resolve(pageRoot, "./index.tsx"), tpl);
};

(async () =>
  emptier()
  .then(copier)
  .then(reader)
  .then(executor))();