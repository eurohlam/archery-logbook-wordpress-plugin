const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

gulp.task('build-js', function() {
  return gulp.src([
    'js/archerylogbook/functions/common.js',
    'js/archerylogbook/events/formHandlers.js',
    'js/archerylogbook/functions/archers.js',
    'js/archerylogbook/functions/bows.js',
    'js/archerylogbook/functions/rounds.js',
    'js/archerylogbook/functions/competitions.js',
    'js/archerylogbook/functions/progress.js'
  ])
  // Remove IIFE opening from each file (matches at start of file)
  .pipe(replace(/^\(function\(jQuery\)\s*\{?\s*\n?/m, ''))
  // Remove IIFE closing from each file - matches }) //jQuery at end of file
  .pipe(replace(/\}\s*\)\s*\/\/jQuery\s*$/m, ''))
  // Concatenate all files
  .pipe(concat('archerylogbook.bundle.js', {
    newLine: '\n'
  }))
  // Wrap entire bundle in one IIFE - add opening at start
  .pipe(replace(/^/, '(function(jQuery) {\n\n'))
  // Add closing at end
  .pipe(replace(/$/, '\n\n})(jQuery);'))
  .pipe(gulp.dest('js'))
  .pipe(rename('archerylogbook.bundle.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('js'));
});

gulp.task('watch', function() {
  gulp.watch('js/archerylogbook/**/*.js', gulp.series('build-js'));
});

gulp.task('default', gulp.series('build-js'));