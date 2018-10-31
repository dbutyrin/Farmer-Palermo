'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const imageMin = require('gulp-imagemin');
const imageMinPngQuant = require('imagemin-pngquant');
const imageMinZopfli = require('imagemin-zopfli');
const imageMinMozJpeg = require('imagemin-mozjpeg');
const imageMinGifLossy = require('imagemin-giflossy');
const browserSync = require('browser-sync');

const config = require('@@gc/config');

module.exports = function (done) {
  gulp.src(config.path.src.image)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(imageMin([
      imageMinPngQuant({
        speed: 1,
        quality: 70
      }),
      imageMinZopfli({
        more: true
      }),
      imageMinGifLossy({
        optimizationLevel: 3,
        optimize: 3,
        lossy: 2
      }),
      imageMin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      }),
      imageMinMozJpeg({
        progressive: true,
        quality: 70
      })
    ], {
      verbose: true
    }))
    .pipe(gulp.dest(config.path.build.image))
    .pipe(browserSync.reload({
      stream: true
    }));
  done();
};
