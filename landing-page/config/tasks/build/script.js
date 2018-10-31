'use strict';

const gulp = require('gulp');
const glob = require('glob');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const config = require('@@gc/config');
const nodeEnv = require('@@gc/tasks/nodeEnv');
const helpers = require('@@gc/helpers');

module.exports = function (done) {
  gulp.src(config.path.src.script)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(webpackStream({
      mode: nodeEnv.current,
      entry: helpers.toObject(glob.sync(config.path.src.script)),
      output: {
        filename: "[name].js"
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
          }
        ]
      },
      externals: {
        jquery: '$'
      }
    }, webpack))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulpIf(nodeEnv.current === 'production', uglify()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulpIf(nodeEnv.current === 'development', sourcemaps.write()))
    .pipe(gulp.dest(config.path.build.script))
    .pipe(browserSync.reload({
      stream: true
    }));
  done();
};
