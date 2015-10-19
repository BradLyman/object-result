var gulp   = require('gulp'),
    babel  = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    flow   = require('gulp-flowtype');

gulp.task('lint', function() {
  return gulp.src('./src/*')
    .pipe(eslint({
      "extends" : "eslint:recommended",
      "ecmaFeatures" : {
        "blockBindings"  : true,
        "arrowFunctions" : true
      },
      "rules" : {
        "valid-jsdoc"          : 1,
        "space-after-keywords" : [2, "always"],
        "space-before-blocks"  : 2,
        "brace-style"          : [2, "stroustrup", { "allowSingleLine" : true}],
        "comma-dangle" : [2, "always"],
      },
      "env" : { "node" : true },
    }))
    .pipe(eslint.format('tap'));
});

gulp.task('watch', function() {
  gulp.watch('./src/*', ['lint']);
});

gulp.task('default', ['watch']);
