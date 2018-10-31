'use strict';

const nodePath = require('path');
const del = require('del');

const helpers = {
  toObject(paths) {
    const result = {};

    paths.forEach(function (path) {
      result[path.split('/').slice(-1)[0].split('.')[0]] = path;
    });

    return result;
  },
  removeDeletedFile(filePath) {
    const filePathFromSrc = nodePath.relative(nodePath.resolve('src'), filePath);
    // Concatenating the 'build' absolute path used by gulp.dist in the scripts task
    const distFilePath = nodePath.resolve('dist', filePathFromSrc);
    del.sync(distFilePath);
  }
};

module.exports = helpers;
