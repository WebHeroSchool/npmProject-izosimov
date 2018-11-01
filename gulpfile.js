const gulp = require('gulp');

gulp.task('build', () => {
    gulp.src('styles.css').pipe(gulp.dest('build/styles'));
    gulp.src('scripts.js').pipe(gulp.dest('build/scripts'));
});
