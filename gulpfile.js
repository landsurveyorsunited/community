const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
var htmlbeautify = require('gulp-html-beautify');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    //return gulp.src([/*'node_modules/bootstrap/scss/bootstrap.scss', */ 'src/scss/*.scss'])
    return gulp.src([/*'node_modules/bootstrap/scss/bootstrap.scss', */ 'src/assets/scss/style.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/assets/css/theme/"))
        .pipe(browserSync.stream());
});

// Move JS Files to src/js
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/assets/js"))
        .pipe(browserSync.stream());
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch([/*'node_modules/bootstrap/scss/bootstrap.scss',*/ 'src/assets/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Move Fonts to src/fonts
gulp.task('fonts', function() {
  return gulp.src(['node_modules/font-awesome/fonts/*', 'node_modules/material-design-icons/iconfont/*'] )
    .pipe(gulp.dest('src/assets/fonts'))
})

// Move Font Awesome CSS to src/css
gulp.task('fa', function() {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest('src/assets/css/'))
})

gulp.task('htmlbeautify', function() {
  var options = {
     'indent_size': 2
  };
  gulp.src('src/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('./public/'))
});

gulp.task('default', [ 'js','serve', 'fa', 'fonts', 'htmlbeautify']);
