// gulp・glupのツールを読み込んで変数に代入
var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

// 対象ブラウザ
var AUTOPREFIXER_BROWSERS = [
  'ie >= 9',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4'
];

// gulp.taskにsassのタスクを追加
gulp.task('sass', function() {
  return gulp.src('./gulp/css/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css/'));
});

// gulp.taskに画像圧縮のタスクを追加
gulp.task('images', function() {
  return gulp.src('gulp/images/**/*')
    .pipe(imagemin({
      optimizationLevel: 5
    }))
    .pipe(gulp.dest('dist/images/'));
});

// gulp.taskにHTML用タスクを追加
gulp.task('html', function() {
  return gulp.src('gulp/**/*.html')
    .pipe(gulp.dest('dist/'));
});

// sassとimages を watch に追加
gulp.task('watch', function() {
  gulp.watch(['gulp/images/**/*'], ['images']);
  gulp.watch('./gulp/css/**/*.scss', ['sass']);
  gulp.watch('./gulp/**/*.html', ['html']);
});

// gulpのdefaultのタスクに watch images sass を追加
gulp.task('default', ['watch','images','sass','html']);
