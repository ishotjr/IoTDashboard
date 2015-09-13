var browserify = require('browserify'),
	watchify = require('watchify'),
	gulp = require('gulp'),
	source = require('vinyl-source-stream'),
	sass = require('gulp-sass'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	gutil = require('gulp-util'),
	sourceJSFile = '../src/js/app.js',
	destJSFolder = '../public/js/',
	destJSFile = 'main.js',
	sourceSASSFolder = '../src/scss'
	sourceSASS = sourceSASSFolder + '/styles.scss',
	destCSSFolder = '../public/css/',
	sourceFontsFolder = '../src/fonts',
	destFontsFolder = '../public/fonts';

function runBrowserify() {
	var b = browserify({
				cache: {},
				packageCache: {},
				fullPaths: true
			});

	b = watchify(b);

	b.on('update', function() {
		runBundle(b);
	});

	b.add(sourceJSFile);

	runBundle(b);
}

function runBundle(b) {
	b.bundle()
	 .on('error', gutil.log)
     .pipe(source(destJSFile))
     .pipe(gulp.dest(destJSFolder))
     .pipe(notify("JS updated"));
}

gulp.task('browserify', function() {
	runBrowserify();
});

gulp.task('watch', function() {
  gulp.watch(sourceSASSFolder + '/**/*', ['styles']);
});

gulp.task('styles', function() {
  return gulp.src(sourceSASS)
    .pipe(sass({style: 'expanded'}))
    .on('error', gutil.log)
    .pipe(gulp.dest(destCSSFolder))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(destCSSFolder))
    .pipe(notify("CSS updated"));
});

gulp.task('copyfonts', function() {
   gulp.src(sourceFontsFolder + '/**/*.{ttf,woff,eot,svg}')
   .pipe(gulp.dest(destFontsFolder));
});

gulp.task('watchfonts', function() {
  gulp.watch(sourceFontsFolder + '/**/*.{ttf,woff,eot,svg}', ['copyfonts']);
});

gulp.task('default', ['styles', 'browserify', 'watch', 'copyfonts', 'watchfonts']);