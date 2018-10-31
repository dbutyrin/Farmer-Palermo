'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');

const config = require('@@gc/config');

module.exports = function (done) {
  gulp.src(config.path.src.php)
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(gulp.dest(config.path.build.php))
    .pipe(browserSync.reload({
      stream: true
    }));
  done();
};
