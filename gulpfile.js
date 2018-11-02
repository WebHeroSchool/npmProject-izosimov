const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano')

gulp.task('build-js', () => {
    gulp.src('scripts/*.js')
        .pipe(concat('index.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/scripts'));
});

gulp.task('build-css', () => {
    gulp.src('styles/*.css')
        .pipe(concat('index.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('build/styles'));
});

gulp.task('build', ['build-js', 'build-css']);
