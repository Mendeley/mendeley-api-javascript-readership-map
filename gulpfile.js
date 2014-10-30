var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    del = require('del');

gulp.task('styles', function() {
    return gulp.src('application/src/*.css')
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('application'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
    return gulp.src(['application/src/readership-map.js'])
        .pipe(uglify())
        .pipe(concat('main.min.js'))
        .pipe(gulp.dest('application'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function(cb) {
    del(['application/*.min.css', 'application/*.min.js'], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

gulp.task('watch', function() {
    // Watch .css files
    gulp.watch('application/src/*.css', ['styles']);

    // Watch .js files
    gulp.watch('application/src/*.js', ['scripts']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['application/**']).on('change', livereload.changed);
});