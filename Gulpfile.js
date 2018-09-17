var gulp       = require('gulp');
var pug        = require('gulp-pug');
var less       = require('gulp-less');
var minifyCSS  = require('gulp-csso');
var concat     = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var sass       = require('gulp-sass');


gulp.task('css', function(){
	return gulp.src('./public/stylesheets/style.css')
	    .pipe(less())
	    .pipe(minifyCSS())
	    .pipe(gulp.dest('./public/stylesheets'))
});

gulp.task('js', function(){
	return gulp.src('./public/javascripts/*.js')
		.pipe(sourcemaps.init())
		.pipe(concat('app.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public/javascripts'))
});

gulp.task('sass', function () {
	return gulp.src('./public/stylesheets/*.scss')
		.pipe(sass({outputStyle: 'compressed'})
		.on('error', sass.logError))
		.pipe(gulp.dest('./public/stylesheets'));
});

// gulp.task('default', ['js', 'sass']);