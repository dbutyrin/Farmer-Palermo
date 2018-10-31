`use strict`;

const baseFolders = {
  src: `./src`,
  dist: `./dist`
};

module.exports = {
  baseFolders,
  path: {
    lint: {
      style: `${baseFolders.src}/**/*.scss`,
      script: `${baseFolders.src}/**/*.js`
    },
    build: {
      template: `${baseFolders.dist}/`,
      php: `${baseFolders.dist}/`,
      supportFiles: `${baseFolders.dist}/`,
      script: `${baseFolders.dist}/js/`,
      style: {
        critical: `${baseFolders.src}/includes/critical/`,
        main: `${baseFolders.dist}/css/`
      },
      image: `${baseFolders.dist}/images/`,
      fonts: `${baseFolders.dist}/fonts/`,
      svgSprite: {
        folder: `${baseFolders.src}/includes/`,
        file: `_svg-sprite.html`
      }
    },
    src: {
      template: {
        pages: `${baseFolders.src}/*.html`,
        includes: `./src/includes/`
      },
      php: `${baseFolders.src}/**/*.php`,
      supportFiles: `${baseFolders.src}/**/{.htaccess,browserconfig.xml,site.webmanifest}`,
      script: `./src/js/*.js`,
      style: {
        critical: `${baseFolders.src}/scss/*-critical.scss`,
        main: [`${baseFolders.src}/scss/*.scss`, `!${baseFolders.src}/scss/*-critical.scss`]
      },
      image: [`${baseFolders.src}/images/**/*.{png,gif,jpg,svg,webp,apng,ico}`, `!${baseFolders.src}/images/svg-sprite/*`],
      fonts: `${baseFolders.src}/fonts/**/*.{woff,woff2}`,
      svgSprite: `${baseFolders.src}/images/svg-sprite/*.svg`
    },
    watch: {
      template: `${baseFolders.src}/**/*.html`,
      php: `${baseFolders.src}/**/*.php`,
      supportFiles: `${baseFolders.src}/**/{.htaccess,browserconfig.xml,site.webmanifest}`,
      script: `${baseFolders.src}/js/**/*.js`,
      style: `${baseFolders.src}/scss/**/*.scss`,
      image: [`${baseFolders.src}/images/**/*.{png,gif,jpg,svg,webp,apng,ico}`, `!${baseFolders.src}/images/svg-sprite/`],
      fonts: `${baseFolders.src}/fonts/**/*.{woff,woff2}`,
      svgSprite: `${baseFolders.src}/images/svg-sprite/*.svg`
    },
    clean: [`${baseFolders.dist}/**`, `!${baseFolders.dist}/`]
  }
};
