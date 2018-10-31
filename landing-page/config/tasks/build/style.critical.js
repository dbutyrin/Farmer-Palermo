'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpIf = require('gulp-if');
const cssmin = require('gulp-clean-css');
const prefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat-util');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');

const config = require('@@gc/config');
const nodeEnv = require('@@gc/tasks/nodeEnv');

module.exports = function () {
  return gulp.src(config.path.src.style.critical)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['node_modules']
    }))
    .pipe(prefixer({
      cascade: false
    }))
    .pipe(gulpIf(nodeEnv.current === 'production', cssmin()))
    .pipe(concat.header('<style>'))
    .pipe(concat.footer('</style>'))
    .pipe(rename({
      prefix: '_',
      suffix: '-css',
      extname: '.html'
    }))
    .pipe(gulpIf(nodeEnv.current === 'development', sourcemaps.write()))
    .pipe(gulp.dest(config.path.build.style.critical))
    .pipe(browserSync.reload({
      stream: true
    }));
};
