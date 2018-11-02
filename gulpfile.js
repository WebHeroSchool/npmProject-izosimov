const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('build', () => {
    gulp.src('scripts/*.js')
        .pipe(sourcemaps.init())
            .pipe(concat('index.js'))
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/scripts'));
});

gulp.task('build-css', () => {
    gulp.src('styles/*.css')
        .pipe(sourcemaps.init())
            .pipe(concat('index.css'))
            .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/styles'));
});

gulp.task('default', ['build', 'build-css'])
