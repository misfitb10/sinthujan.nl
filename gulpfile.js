var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var del = require('del');

var paths = {
    markup: {
        src: 'src/index.html',
        dest: 'build/'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'build/images/'
    },
    styles: {
        src: 'src/styles/*.css',
        dest: 'build/assets/'
    },
    scripts: {
        src: 'src/scripts/*.js',
        dest: 'build/assets/'
    }
};

function clean() {
    return del(['assets']);
}

function markup() {
    return gulp.src(paths.markup.src)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(paths.markup.dest));
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5})]))
        .pipe(gulp.dest(paths.images.dest))
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
    return gulp.src(paths.scripts.src, {sourcemaps: true})
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
    gulp.watch(paths.markup.src, markup);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.styles.src, styles);
}

exports.markup = markup;
exports.images = images;
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

var build = gulp.series(clean, gulp.parallel(markup, images, styles, scripts));
gulp.task('build', build);
gulp.task('default', build);