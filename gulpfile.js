'use strict';

// var ProjectOptions = {
// 	CUSTOM_OBJECT: {
// 		build: 'https://google-iot.firebaseio.com/',
// 		dist: 'https://iot-infographic.firebaseio.com/'
// 	}
// }

var WORDPRESS = true;

// include gulp
var gulp = require('gulp');

// include plugins
var jshint = require('gulp-jshint');
var replace = require('gulp-replace');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var minifyHTML = require('gulp-htmlmin');
var autoprefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var chmod = require('gulp-chmod');

var buildScripts = ['src/scripts/alf.js', 'src/scripts/π.js', 'src/debug/*.js', 'src/scripts/globals.js', 'src/components/*.js', 'src/modules/**/*.js', 'src/scripts/script.js'];
var distScripts = ['src/scripts/alf.js', 'src/scripts/π.js', 'src/scripts/globals.js', 'src/components/*.js', 'src/modules/**/*.js', 'src/scripts/script.js'];

var buildFolder = './build/';
var distFolder = './dist/';

// id JS bugs
gulp.task('jshint', function () {
	gulp.src(buildScripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// id workers bugs
gulp.task('workerHint', function () {
	gulp.src('src/workers/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
	var imgSrc = ['src/**/*.jpg', 'src/**/*.png', 'src/**/*.gif', 'src/**/*.svg'];

	gulp.src(imgSrc)
		.pipe(changed(buildFolder))
		.pipe(imagemin())
		.pipe(gulp.dest(buildFolder))
		.pipe(gulp.dest(distFolder))
});

// minify html
gulp.task('htmlpage', function() {
	var htmlSrc = ['src/*.html', 'src/**/*.html'];

	gulp.src(htmlSrc)
		.pipe(changed(buildFolder))
		.pipe(replace('scripts/script.js', './script.js'))
		.pipe(replace('styles/styles.sass', './styles.css'))
		.pipe(gulp.dest(buildFolder));

	gulp.src(htmlSrc)
		.pipe(changed(distFolder))
		.pipe(minifyHTML({collapseWhitespace: true}))
		.pipe(replace('scripts/script.js', './script.js'))
		.pipe(replace('styles/styles.sass', './styles.css'))
		.pipe(gulp.dest(distFolder));
});

// pass php files unmolested
gulp.task('phppage', function() {
	var phpSrc = ['src/*.php', 'src/**/*.php'];

	gulp.src(phpSrc)
		.pipe(changed(buildFolder))
		.pipe(gulp.dest(buildFolder));

	gulp.src(phpSrc)
		.pipe(changed(distFolder))
		.pipe(gulp.dest(distFolder));
});

// concat, de-comment & log, minify scripts
gulp.task('scripts', function() {
	gulp.src(buildScripts)
		.pipe(sourcemaps.init())
		.pipe(concat('script.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(WORDPRESS ? './build/wp-content/themes/uc/' : buildFolder));

	gulp.src(distScripts)
		.pipe(concat('script.js'))
		.pipe(stripDebug())
		.pipe(uglify())
		// .pipe(replace(ProjectOptions.CUSTOM_OBJECT.build, ProjectOptions.CUSTOM_OBJECT.dist))
		.pipe(gulp.dest(WORDPRESS ? './build/wp-content/themes/uc/' : distFolder));
});

// do the same for workers
gulp.task('workers', function() {
	gulp.src('src/workers/*.js')
		// .pipe(changed('src/workers/'))
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./build/workers/'));

	gulp.src('src/workers/*.js')
		// .pipe(changed('src/workers/'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(gulp.dest('./dist/workers/'));

	gulp.src('src/workers/*.json')
		.pipe(chmod(777))
		.pipe(gulp.dest('./build/workers/'));

	gulp.src('src/workers/*.json')
		.pipe(chmod(777))
		.pipe(gulp.dest('./dist/workers/'));

});

// SASS
gulp.task('sass', function () {
	gulp.src('src/styles/styles.sass')
		.pipe(changed(buildFolder))
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefix('last 4 versions'))
		.pipe(concat('styles.css'))
		.pipe(sourcemaps.write())
		.pipe(replace('../../images', './images'))
		.pipe(gulp.dest(WORDPRESS ? './build/wp-content/themes/uc/' : buildFolder));

	gulp.src('src/styles/styles.sass')
		.pipe(changed(distFolder))
		.pipe(sass())
		.pipe(autoprefix('last 4 versions'))
		.pipe(concat('styles.css'))
		.pipe(minifyCSS())
		.pipe(replace('../../images', './images'))
		.pipe(gulp.dest(WORDPRESS ? './build/wp-content/themes/uc/' : distFolder));
});

// default gulp task
gulp.task('default', ['jshint', 'workerHint', 'imagemin', 'htmlpage', 'phppage', 'scripts', 'workers', 'sass'], function() {
	// watch for image changes
	gulp.watch(['src/**/*.jpg', 'src/**/*.png', 'src/**/*.gif','src/**/*.svg'], ['imagemin']);

	// watch for HTML changes
	gulp.watch(['src/**/*.html'], ['htmlpage']);

	// watch for HTML changes
	gulp.watch(['src/**/*.php'], ['phppage']);

	// watch for JS changes
	gulp.watch(buildScripts, ['jshint', 'scripts']);

	// watch for worker changes
	gulp.watch('src/workers/*.js', ['workerHint', 'workers']);

	// watch for CSS changes
	gulp.watch('src/baseComponents/*/*.sass', ['sass']);
	gulp.watch('src/modules/*/*.sass', ['sass']);
	gulp.watch('src/styles/partials/*.sass', ['sass']);
	gulp.watch('src/styles/*.sass', ['sass']);
});
