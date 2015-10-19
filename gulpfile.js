var gulp   = require('gulp'),
    babel  = require('gulp-babel'),
    eslint = require('gulp-eslint');

gulp.task('es6to5', function() {
  return gulp.src('./src/*')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
  return gulp.src('./src/*')
    .pipe(eslint({
      "extends" : "eslint:recommended",
      "rules" : {
        "valid-jsdoc"    : 1,
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('watch', function() {
  gulp.watch('./src/*', ['lint', 'es6to5']);
});

gulp.task('default', ['watch']);
