const env = require('gulp-env');
const clean = require('gulp-clean');
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

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

env({
    file: '.env',
    type: 'ini'
})

gulp.task('clean', function () {
    gulp.src('build', {read: false})
        .pipe(clean());
});

gulp.task('build-js', () => {
    gulp.src(paths.src.scripts)
        .pipe(sourcemaps.init())
            .pipe(concat(paths.buildNames.scripts))
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.scripts));
});

gulp.task('build-css', () => {
    gulp.src(paths.src.styles)
        .pipe(sourcemaps.init())
            .pipe(concat(paths.buildNames.styles))
            .pipe(gulpif(process.env.NODE_ENV === 'production', cssnano()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.styles));
});

gulp.task('build', ['build-js', 'build-css']);

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch(paths.src.scripts, ['js-watch']);
    gulp.watch(paths.src.styles, ['css-watch']);
});

gulp.task('js-watch', ['build-js'], () => browserSync.reload());
gulp.task('css-watch', ['build-css'], () => browserSync.reload());

gulp.task('clean-build', ['clean']);
gulp.task('prod', ['build']);
gulp.task('dev', ['build', 'browser-sync']);
gulp.task('default', ['dev']);
