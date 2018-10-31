'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const imageMin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprites');
const browserSync = require('browser-sync');

const config = require('@@gc/config');

module.exports = function () {
  return gulp.src(config.path.src.svgSprite)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(imageMin([
      imageMin.svgo({
        plugins: [
          {removeViewBox: false},
          {removeTitle: false},
          {cleanupIDs: true}
        ]
      })
    ]))
    .pipe(svgSprite({
      mode: 'symbols',
      preview: false,
      svg: {
        symbols: config.path.build.svgSprite.file
      },
      transformData(data) {
        data.svg.map((item) => {
          item.data = item.data.replace(/id="([^"]+)"/gm, `id="${item.name}-$1"`); // change id attribute
          item.data = item.data.replace(/fill="url\(#([^"]+)\)"/gm, `fill="url(#${item.name}-$1)"`); // change id in fill attribute
          item.data = item.data.replace(/mask="url\(#([^"]+)\)"/gm, `mask="url(#${item.name}-$1)"`); // change id in mask attribute
          item.data = item.data.replace(/filter="url\(#([^"]+)\)"/gm, `filter="url(#${item.name}-$1)"`); // change id in filter attribute
          item.data = item.data.replace(`id="${item.name}-${item.name}"`, `id="${item.name}-$1"`); // replace double id for the symbol tag
          return item;
        });
        return data; // modify the data and return it
      }
    }))
    .pipe(gulp.dest(config.path.build.svgSprite.folder))
    .pipe(browserSync.reload({
      stream: true
    }));
};
