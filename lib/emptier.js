const { copy, emptyDir } = require('fs-extra');

const { buildDir, distDir } = require('./paths');

(async () => Promise.all([emptyDir(buildDir), emptyDir(distDir)]))();
