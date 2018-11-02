const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const paths = {
    src: {
        scripts: 'scripts/*.js',
        styles: 'styles/*.css'
    },
    build: {
        scripts: 'build/scripts',
        styles: 'build/styles'
    },
    buildNames: {
        scripts: 'scripts.min.js',
        styles: 'styles.min.css'
    }
}

gulp.task('build-js', () => {
    gulp.src(paths.src.scripts)
        .pipe(sourcemaps.init())
            .pipe(concat(paths.buildNames.scripts))
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.scripts));
});

gulp.task('build-css', () => {
    gulp.src(paths.src.styles)
        .pipe(sourcemaps.init())
            .pipe(concat(paths.buildNames.styles))
            .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.styles));
});

gulp.task('default', ['build-js', 'build-css']);

gulp.task('watch', () => {
    gulp.watch('scripts/*.js', ['build-js']);
    gulp.watch('styles/*.css', ['build-css']);
});
