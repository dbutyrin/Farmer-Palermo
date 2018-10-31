'use strict';

const config = require('@@gc/config');
const browserSync = require('browser-sync');

module.exports = function (done) {
  browserSync({
    server: {
      baseDir: `${config.baseFolders.dist}`
    },
    host: 'localhost',
    port: 3000
  });
  done();
};
