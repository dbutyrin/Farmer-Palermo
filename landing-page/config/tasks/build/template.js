'use strict';

const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');

const config = require('@@gc/config');

module.exports = function (done) {
  gulp.src(config.path.src.template.pages)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: config.path.src.template.includes
    }))
    .pipe(gulp.dest(config.path.build.template))
    .pipe(browserSync.reload({
      stream: true
    }));
  done();
};
