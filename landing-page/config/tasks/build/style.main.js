'use strict';

const gulp = require('gulp');
const prefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');

const config = require('@@gc/config');
const nodeEnv = require('@@gc/tasks/nodeEnv');

module.exports = function (done) {
  gulp.src(config.path.src.style.main)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['node_modules']
    }))
    .pipe(prefixer({
      cascade: false
    }))
    .pipe(gulpIf(nodeEnv.current === 'production', cssmin()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulpIf(nodeEnv.current === 'development', sourcemaps.write()))
    .pipe(gulp.dest(config.path.build.style.main))
    .pipe(browserSync.reload({
      stream: true
    }));
  done();
};
