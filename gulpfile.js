"use strict";

// Config file for Gulp
var config = require('./gulpconfig.json');

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(),
    sass = require('gulp-sass'),
    del = require('del'),
    yargs = require('yargs').argv,
    minify = !!yargs.minify;

function clean() {
    return del(config.path.build.main);
}

function html() {
    return gulp.src(config.path.src.html)
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(config.path.build.main))
        .pipe(plugins.size({title: '--> HTML'}));
}

function images() {
    return gulp.src(config.path.src.images)
        .pipe(plugins.imagemin([
            plugins.imagemin.gifsicle({interlaced: true}),
            plugins.imagemin.jpegtran({progressive: true}),
            plugins.imagemin.optipng({optimizationLevel: 5})]))
        .pipe(gulp.dest(config.path.build.images))
        .pipe(plugins.size({title: '--> Images'}));
}

function styles() {
    return gulp.src(config.path.src.styles)
        .pipe(plugins.sass().on('error', sass.logError))
        .pipe(plugins.autoprefixer(config.path.autoprefixer.split(', ')))
        .pipe(plugins.if(minify, plugins.cssnano()))
        .pipe(plugins.rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.path.build.assets))
        .pipe(plugins.size({title: '--> CSS'}));
}

function scripts() {
    return gulp.src(config.path.src.scripts, {sourcemaps: true})
        .pipe(plugins.if(minify, plugins.uglify()))
        .pipe(plugins.concat('main.min.js'))
        .pipe(gulp.dest(config.path.build.assets))
        .pipe(plugins.size({title: '--> Scripts'}));
}

function watch() {
    gulp.watch(config.path.src.html, html);
    gulp.watch(config.path.src.images, images);
    gulp.watch(config.path.src.scripts, scripts);
    gulp.watch(config.path.src.styles, styles);
}

exports.html = html;
exports.images = images;
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

var build = gulp.series(clean, gulp.parallel(html, images, styles, scripts));
gulp.task('build', build);
gulp.task('default', build);