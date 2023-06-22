"use strict";



// DEPENDENCIES
// =================================================
const gulp = require("gulp");
const gulpAutoprefixer = require("gulp-autoprefixer");
const gulpBabel = require("gulp-babel");
const gulpCleanCss = require("gulp-clean-css");
const gulpConcat = require("gulp-concat");
const gulpLineEndingCorrector = require("gulp-line-ending-corrector");
const gulpRename = require("gulp-rename");
const gulpSass = require("gulp-sass")(require("sass"));
const gulpSourcemaps = require("gulp-sourcemaps");
const gulpSvgSprites = require("gulp-svg-sprites");
const gulpUglify = require("gulp-uglify");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;


// SETTINGS: FOLDER/FILE PATHS
// =================================================

// Path src
const pathSrc = "src/";
const pathSrcSass = `${pathSrc}sass/`;
const pathSrcJs = `${pathSrc}js/`;
const pathSrcImg = `${pathSrc}images/`;
const pathSrcSvg = `${pathSrc}images/icons/svg/`;

// Path dist
const pathDist = "dist/";
const pathDistCss = `${pathDist}css/`;
const pathDistJs = `${pathDist}js/`;
const pathDistImg = `${pathDist}images/`;
const pathDistSvg = `${pathDist}images/icons/svg/`;

// Path Files
const pathFiles = "**/*";
const pathFilesHtml = "*.html";
const pathFilesSass = `${pathFiles}.sass`;
const pathFilesCss = `${pathFiles}.css`;
const pathFilesJs = `${pathFiles}.js`;
const pathFilesSvg = `${pathFiles}.svg`;

// Watch Files
const watchFilesHtml = `${pathDist}${pathFilesHtml}`;
const watchFilesCss = `${pathDistCss}${pathFilesCss}`;
const watchFilesJs = `${pathDistJs}${pathFilesJs}`;
const watchFilesSvg = `${pathDistSvg}${pathFilesSvg}`;

// Paths used to concat the files in a specific order.
const filesJsCompile = [
	`${pathSrcJs}scripts.js`,
	`${pathSrcJs}components/_components-sprite.js`,
	`${pathSrcJs}layouts/_layouts-header.js`,
	`${pathSrcJs}pages/_pages-calendar-1.js`,
	`${pathSrcJs}pages/_pages-calendar-2.js`,
	`${pathSrcJs}pages/_pages-calendar-3.js`,
];



// FUNTIONS USED IN THE TASKS
// =================================================
function createServer() {
	browserSync.init({
		server: {
			baseDir: "./dist",
			browser: ["google-chrome", "firefox"],
		},
	});
}

function copyDirectory(directoryToCopy, directoryOutput) {
	return gulp.src(`${directoryToCopy}/${pathFiles}`).pipe(gulp.dest(directoryOutput));
}

function copyFiles(filesToCopy, directoryOutput) {
	return gulp.src(filesToCopy).pipe(gulp.dest(directoryOutput));
}

function htmlCopy() {
	return copyFiles(`${pathSrc}${pathFilesHtml}`, pathDist);
}

function sassCompile() {
	return gulp
		.src([`${pathSrcSass}styles.sass`])
		.pipe(
			gulpSourcemaps.init({
				loadMaps: true,
			})
		)
		.pipe(
			gulpSass({
				outputStyle: "compressed",
			}).on("error", gulpSass.logError)
		)
		.pipe(
			gulpAutoprefixer({
				versions: ["last 2 versions"],
			})
		)
		.pipe(gulpCleanCss())
		.pipe(gulpSourcemaps.write())
		.pipe(gulpLineEndingCorrector())
		.pipe(gulpRename("styles.min.css"))
		.pipe(gulp.dest(pathDistCss));
}

function jsCompile() {
	const babelConfig = {
		presets: [
			"@babel/preset-env",
			[
				"minify",
				{
					"builtIns": false,
					"mangle": false
				}
			]
		],
		plugins: [
			"@babel/transform-runtime",
			"@babel/plugin-transform-async-to-generator",
		],
	};

	return gulp
		.src(filesJsCompile)
		.pipe(gulpBabel(babelConfig))
		.pipe(
			webpackStream(
				require("./webpack.config.js"),
				webpack
			)
		)
		.pipe(gulpConcat("scripts.min.js"))
		.pipe(gulpUglify())
		.pipe(gulpLineEndingCorrector())
		.pipe(gulp.dest(pathDistJs));
}

function jsTest() {
	return gulp
		.src(filesJsCompile)
		.pipe(gulpConcat("scripts.js"))
		.pipe(gulpLineEndingCorrector())
		.pipe(gulp.dest(pathDistJs))
}

function imagesCopy() {
	return copyDirectory(pathSrcImg, pathDistImg);
}

function createSprite() {
	return gulp
		.src(`${pathSrcSvg}${pathFilesSvg}`)
		.pipe(
			gulpSvgSprites({
				svgId: "icon-%f",
				baseSize: 16,
				mode: "symbols",
				svg: {
					symbols: "../sprites.svg",
				},
				svgPath: "../../%f",
				preview: {
					symbols: ""
				}
			})
		)
		.pipe(gulp.dest(pathDistSvg));
}

function watch() {
	createServer();

	gulp.watch(`${pathSrc}${pathFilesHtml}`, htmlCopy);
	gulp.watch(`${pathSrcSass}${pathFilesSass}`, sassCompile);
	gulp.watch(`${pathSrcJs}${pathFilesJs}`, gulp.series(jsCompile, jsTest));
	gulp.watch(`${pathSrcSvg}${pathFilesSvg}`, gulp.series(createSprite, imagesCopy));

	gulp.watch([watchFilesHtml, watchFilesCss, watchFilesJs, watchFilesSvg]).on(
		"change",
		reload
	);
}



// EXPORTS
// =================================================
exports.createServer = createServer;
exports.htmlCopy = htmlCopy;
exports.sassCompile = sassCompile;
exports.jsCompile = jsCompile;
exports.jsTest = jsTest;
exports.createSprite = createSprite;
exports.imagesCopy = imagesCopy;
exports.watch = watch;



// TASKS
// =================================================
gulp.task(
	"default",
	gulp.series(htmlCopy, sassCompile, jsCompile, jsTest, createSprite, imagesCopy, watch)
);
gulp.task("serve", gulp.series(createServer));
gulp.task(
	"build",
	gulp.series(htmlCopy, sassCompile, jsCompile, jsTest, createSprite, imagesCopy)
);
gulp.task("html", gulp.series(htmlCopy));
gulp.task("css", gulp.series(sassCompile));
gulp.task("js", gulp.series(jsCompile, jsTest));
gulp.task("img", gulp.series(createSprite, imagesCopy));
gulp.task("watch", gulp.parallel(watch));
