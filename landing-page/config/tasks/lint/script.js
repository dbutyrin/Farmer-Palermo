'use strict';

const gulp = require('gulp');
const esLint = require('gulp-eslint');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const config = require('@@gc/config');

module.exports = function (done) {
  gulp.src(config.path.lint.script, {since: gulp.lastRun('lint:script')})
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(esLint({fix: true}))
    .pipe(esLint.format())
    .pipe(esLint.failAfterError());
  done();
};
