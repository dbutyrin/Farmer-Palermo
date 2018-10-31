'use strict';

const del = require('del');
const config = require('@@gc/config');

module.exports = function () {
  return del(config.path.clean).then(paths => console.log(`Deleted files and folders:\n${paths.join('\n')}`));
};
