"use strict";



// DEPENDENCIES
// =================================================
const gulp                    = require("gulp"),
      gulpAutoprefixer        = require("gulp-autoprefixer"),
      gulpBabel               = require("gulp-babel"),
      gulpCleanCss            = require("gulp-clean-css"),
      gulpConcat              = require("gulp-concat"),
      gulpLineEndingCorrector = require("gulp-line-ending-corrector"),
      gulpRename              = require("gulp-rename"),
      gulpSass                = require("gulp-sass")(require("sass")),
	  gulpSourcemaps          = require("gulp-sourcemaps"),
	  gulpSvgSprites          = require("gulp-svg-sprites"),
      gulpUglify              = require("gulp-uglify"),
	  webpackStream           = require("webpack-stream"),
	  webpack                 = require("webpack"),
	  browserSync             = require("browser-sync").create(),
	  reload                  = browserSync.reload;


// SETTINGS: FOLDER/FILE PATHS
// =================================================
let proyectName = "calendar/";

// Path src
let pathSrc     = "src/",
	pathSrcSass = pathSrc + "sass/",
	pathSrcJs   = pathSrc + "js/",
	pathSrcImg  = pathSrc + "images/",
	pathSrcIcon = pathSrc + "images/icon/",
	pathSrcSvg  = pathSrc + "images/icons/svg/";

// Path dist
let pathDist     = "dist/",
	pathDistCss  = pathDist + "css/",
	pathDistJs   = pathDist + "js/",
	pathDistImg  = pathDist + "images/",
	pathDistIcon = pathDist + "images/icon/",
	pathDistSvg  = pathDist + "images/icons/svg/";

// Path Files
let pathFiles     = "**/*",
    pathFilesHtml = "*.html",
    pathFilesSass = "**/*.sass",
    pathFilesCss  = "**/*.css",
    pathFilesJs   = "**/*.js",
	pathFilesSvg  = "**/*.svg";

// Watch Files
let watchFilesHtml = pathDist + pathFilesHtml,
    watchFilesCss  = pathDistCss + pathFilesCss,
    watchFilesJs   = pathDistJs + pathFilesJs,
	watchFilesSvg  = pathDistSvg + pathFilesSvg;

// Paths used to concat the files in a specific order.
let filesJsCompile = [
	pathSrcJs + "scripts.js",
	pathSrcJs + "components/_components-sprite.js",
	pathSrcJs + "pages/_pages-calendar-1.js",
	pathSrcJs + "pages/_pages-calendar-2.js",
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
	return gulp.src(`${directoryToCopy}/**/*`).pipe(gulp.dest(directoryOutput));
}

function copyFiles(filesToCopy, directoryOutput) {
	return gulp.src(filesToCopy).pipe(gulp.dest(directoryOutput));
}

function htmlCopy() {
	return copyFiles(pathSrc + pathFilesHtml, pathDist);
}

function sassCompile() {
	return gulp
		.src([pathSrcSass + "styles.sass"])
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
	const BabelConfig = {
		presets: ["@babel/preset-env", "babel-preset-minify"],
		plugins: [
			"@babel/transform-runtime",
			"@babel/plugin-transform-async-to-generator",
		],
	};

	return gulp
		.src(filesJsCompile)
		.pipe(gulpBabel(BabelConfig))
		.pipe(
			webpackStream(
				require("./webpack.config.js"),
				webpack,
				function (err, stats) {
					/* Use stats to do more things if needed */
				}
			)
		)
		.pipe(gulpConcat("scripts.min.js"))
		.pipe(gulpUglify())
		.pipe(gulpLineEndingCorrector())
		.pipe(gulp.dest(pathDistJs));
}

function imagesCopy() {
	return copyDirectory(pathSrcImg, pathDistImg);
}

function createSprite() {
	return gulp
		.src(pathSrcSvg + pathFilesSvg)
		.pipe(
			gulpSvgSprites({
				svgId: "icon-%f",
				baseSize: 16,
				mode: "symbols",
				svg: {
					symbols: "../sprites.svg",
				},
				svgPath: "../../%f",
				preview:{
					symbols: ""
				}
			})
		)
		.pipe(gulp.dest(pathDistSvg));
}

function watch() {
	createServer();

	gulp.watch(pathSrc + pathFilesHtml, htmlCopy);
	gulp.watch(pathSrcSass + pathFilesSass, sassCompile);
	gulp.watch(pathSrcJs + pathFilesJs, jsCompile);
	gulp.watch(pathSrcSvg + pathFilesSvg, gulp.series(createSprite, imagesCopy));

	gulp.watch([watchFilesHtml, watchFilesCss, watchFilesJs, watchFilesSvg]).on(
		"change",
		reload
	);
}



// EXPORTS
// =================================================
exports.createServer    = createServer;
exports.htmlCopy        = htmlCopy;
exports.sassCompile     = sassCompile;
exports.jsCompile       = jsCompile;
exports.createSprite    = createSprite;
exports.imagesCopy      = imagesCopy;
exports.watch           = watch;



// TASKS
// =================================================
gulp.task(
	"default",
	gulp.series(htmlCopy, sassCompile, jsCompile, createSprite, imagesCopy, watch)
);
gulp.task("serve", gulp.series(createServer));
gulp.task(
	"build",
	gulp.series(htmlCopy, sassCompile, jsCompile, createSprite, imagesCopy)
);
gulp.task("html", gulp.series(htmlCopy));
gulp.task("css", gulp.series(sassCompile));
gulp.task("js", gulp.series(jsCompile));
gulp.task("img", gulp.series(createSprite, imagesCopy));
gulp.task("watch", gulp.parallel(watch));
