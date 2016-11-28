/**
 * Original author: Andreas Schneider
 *
 * Feel free to extend this gulpfile with more tasks
 * please use pump instead of piping for improved error handling.
 * See here for more info:
 * https://github.com/terinjokes/gulp-uglify/tree/master/docs/why-use-pump
 *
 * Please document your tasks and add your name and e-mail for easy contact.
 * Thank you
 */

"use strict";

const gulp 			= require('gulp');
const pump          = require('pump');
const browserSync 	= require('browser-sync').create();
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');

gulp.task('serve', function() {
    browserSync.init({
    	files: [
            './css/**/*.css',
            './js/**/*.js'
        ],
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./css/sass/**/*.scss', ['sass']);
    gulp.watch('index.html').on('change', browserSync.reload);
});

gulp.task('sass', function (cb) {
    pump([
        gulp.src('./css/sass/**/*.scss'),
        sourcemaps.init(),
        sass().on('error', sass.logError),
        sourcemaps.write(),
        gulp.dest('./css')
    ], cb);
});

gulp.task('sass:watch', function () {
    gulp.watch('./css/sass/**/*.scss', ['sass']);
});