const env = require('gulp-env');
const clean = require('gulp-clean');
const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const postcssPresetEnv = require('postcss-preset-env');
const assets  = require('postcss-assets');
const short = require('postcss-short');
const nested = require('postcss-nested');

const glob = require("glob");
const handlebars = require('gulp-compile-handlebars');
const rename = require("gulp-rename");

const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const paths = {
    src: {
        dir: 'src',
        scripts: 'src/scripts/*.js',
        styles: 'src/styles/*.css'
    },
    build: {
        dir: 'build/',
        scripts: 'build/scripts',
        styles: 'build/styles'
    },
    buildNames: {
        scripts: 'scripts.min.js',
        styles: 'styles.min.css'
    },
    templates: 'src/templates/**/*.hbs'
}

env({
    file: '.env',
    type: 'ini'
})

gulp.task('clean', function () {
    gulp.src('build', {read: false})
        .pipe(clean());
});

gulp.task('compile', () => {
    glob(paths.templates, (err, files) => {
        if (!err) {
            const options = {
                ignorePartials: true,
                batch: files.map(item => item.slice(0, item.lastIndexOf('/')))
            };

            gulp.src('src/templates/index.hbs')
                .pipe(handlebars({}, options))
                .pipe(rename('index.html'))
                .pipe(gulp.dest(paths.build.dir))
        }
    });
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
    const plugins = [
        autoprefixer({
            browsers: ['last 1 version']
        }),
        postcssPresetEnv,
        assets({
            loadPaths: ['images/'],
            relativeTo: 'styles/'
        }),
        short,
        nested
    ];

    gulp.src(paths.src.styles)
        .pipe(sourcemaps.init())
            .pipe(postcss(plugins))
            .pipe(concat(paths.buildNames.styles))
            .pipe(gulpif(process.env.NODE_ENV === 'production', cssnano()))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.styles));
});

gulp.task('build', ['build-js', 'build-css', 'compile']);

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
