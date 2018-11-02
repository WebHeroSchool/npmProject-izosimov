const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', () => {
    gulp.src('scripts.js').pipe(babel({presets: ['@babel/env']})).pipe(gulp.dest('build/scripts'));
});

gulp.task('build-css', () => {
    gulp.src('styles.css').pipe(gulp.dest('build/styles'));
});
