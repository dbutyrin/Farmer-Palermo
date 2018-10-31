# Installation

First [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

###There is an instruction to setup project

1 Once git is installed on your OS please open terminal, then open folder where you want project to be downloaded and type:
  
```bash
git clone 
```
2 To download dependencies please type command:
```bash
npm install
```

3 Then, you have two ways to continue setup your project:

3.1 If you need to open project in your browser and watching for changing files, please type **one** of the following commands:

If ```gulp``` doesn\`t work find gulp global and remove them and install ```gulp-cli``` :
 
```bash
whereis gulp
gulp: /usr/local/bin/gulp /usr/share/man/man1/gulp.1

sudo rm -Rf /usr/local/bin/gulp
sudo rm -Rf /usr/share/man/man1/gulp.1

npm install --global gulp-cli
 
```   
3.1.1 For development build (css and js with sourcemaps) type:
```bash
gulp dev
``` 
3.1.2 For production build (css and js without sourcemaps) type:
```bash
gulp
```

3.1.3 Once gulp tasks are done, browsersync will open local server and an index page in your default browser.

**Or**:

3.2 If you only need to have build files, please type **one** of the following commands:

3.2.1 For development build (css and js with sourcemaps) type:
```bash
gulp build-dev
```
3.2.2 For production build (css and js without sourcemaps) type:
```bash
gulp build
```
3.2.3 Once gulp tasks are done, you can get your files in 'build' directory;

#### License  

ISC © [Alex Tykhonenko](mailto:alevettih@gmail.com)
