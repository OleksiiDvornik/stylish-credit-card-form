// Package imports 

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemap = require('gulp-sourcemaps');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const browserSync = require('browser-sync').create();

// File paths

const paths = {
    styles: {
        src: './app/assets/scss/**/*.+(sass|scss)',
        dest: './app/styles/'
    },
    scripts: {
        src: './app/scripts/*.js',
        dest: './app/scripts/'
    },
    images: {
        src: './app/assets/img/**/*.+(jpg|png)',
        dest: './app/assets/img/'
    },
    html: {
        src: './app/*.html'
    },
}

// Development mode tasks

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
}

function scripts() {
    return browserSync.stream()
}

// File watchers

function watch() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    })
    gulp.watch(paths.html.src).on('change', browserSync.reload);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
}

// Commands for tasks running

exports.start = gulp.parallel(styles, scripts, watch);
