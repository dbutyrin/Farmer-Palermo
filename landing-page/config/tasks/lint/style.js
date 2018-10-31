'use strict';

const gulp = require('gulp');
const styleLint = require('gulp-stylelint');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const config = require('@@gc/config');

module.exports = function (done) {
  gulp.src(config.path.lint.style, {since: gulp.lastRun('lint:style')})
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(styleLint({
      failAfterError: true,
      syntax: 'scss',
      fix: true,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
  done();
};
