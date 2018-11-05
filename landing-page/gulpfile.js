'use strict';

require('module-alias/register');

const gulp = require('gulp');

const config = require('@@gc/config');
const helpers = require('@@gc/helpers');
const tasks = {
  nodeEnv: require('@@gc/tasks/nodeEnv'),
  clean: require('@@gc/tasks/clean'),
  webServer: require('@@gc/tasks/webServer'),
  lint: {
    script: require('@@gc/tasks/lint/script'),
    style: require('@@gc/tasks/lint/style')
  },
  build: {
    template: require('@@gc/tasks/build/template'),
    script: require('@@gc/tasks/build/script'),
    php: require('@@gc/tasks/build/php'),
    supportFiles: require('@@gc/tasks/build/supportFiles'),
    fonts: require('@@gc/tasks/build/fonts'),
    images: require('@@gc/tasks/build/images'),
    svgSprite: require('@@gc/tasks/build/svgSprite'),
    styleCritical: require('@@gc/tasks/build/style.critical'),
    styleMain: require('@@gc/tasks/build/style.main')
  }
};

gulp.task('set-env:dev', tasks.nodeEnv.set.dev);
gulp.task('set-env:prod', tasks.nodeEnv.set.prod);

gulp.task('lint:script', tasks.lint.script);
gulp.task('lint:style', tasks.lint.style);

gulp.task('build:template', tasks.build.template);
gulp.task('build:script', tasks.build.script);
gulp.task('build:php', tasks.build.php);
gulp.task('build:fonts', tasks.build.fonts);
gulp.task('build:support-files', tasks.build.supportFiles);
gulp.task('build:img', tasks.build.images);
gulp.task('build:svg-sprite', tasks.build.svgSprite);
gulp.task('build:style-critical', tasks.build.styleCritical);
gulp.task('build:style-main', tasks.build.styleMain);

gulp.task('clean', tasks.clean);
gulp.task('web-server', tasks.webServer);

gulp.task(
  'build:all:prod',
  gulp.series(
    'set-env:prod',
    gulp.parallel('lint:style', 'lint:script'),
    gulp.parallel('build:style-critical', 'build:style-main', 'build:script', 'build:svg-sprite'),
    gulp.parallel('build:template', 'build:php', 'build:fonts', 'build:support-files')
  )
);

gulp.task(
  'build:all:dev',
  gulp.series(
    'set-env:dev',
    gulp.parallel('lint:style', 'lint:script'),
    gulp.parallel('build:style-critical', 'build:style-main', 'build:script', 'build:svg-sprite'),
    gulp.parallel('build:template', 'build:php', 'build:fonts', 'build:support-files')
  )
);

gulp.task('watch', function () {
  gulp.watch(config.path.watch.template, gulp.series('build:template')).on('unlink', helpers.removeDeletedFile);
  gulp.watch(config.path.watch.php, gulp.series('build:php')).on('unlink', helpers.removeDeletedFile);
  gulp.watch(config.path.watch.supportFiles, gulp.series('build:support-files')).on('unlink', helpers.removeDeletedFile);
  gulp.watch(config.path.watch.style, gulp.series('lint:style', gulp.parallel('build:style-critical', 'build:style-main')));
  gulp.watch(config.path.watch.script, gulp.series('lint:script', 'build:script'));
  gulp.watch(config.path.watch.fonts, gulp.series('build:fonts')).on('unlink', helpers.removeDeletedFile);
  gulp.watch(config.path.watch.svgSprite, gulp.series('build:svg-sprite'));
});

gulp.task('dev', gulp.series('build:all:dev', gulp.parallel('web-server', 'watch')));

gulp.task('default', gulp.series('clean', 'build:all:prod', gulp.parallel('web-server', 'watch')));
