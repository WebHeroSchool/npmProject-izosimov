const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('build', () => {
    gulp.src('styles.css').pipe(gulp.dest('build/styles'));
    gulp.src(['scripts.js', 'index.js'])
        .pipe(concat('index.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/scripts'));
});
