"use strict";



// DEPENDENCIES
// =================================================
const gulp = require("gulp");
const gulpAutoprefixer = require("gulp-autoprefixer");
const gulpBabel = require("gulp-babel");
const gulpCleanCss = require("gulp-clean-css");
const gulpLineEndingCorrector = require("gulp-line-ending-corrector");
const gulpRename = require("gulp-rename");
const gulpSass = require("gulp-sass")(require("sass"));
const gulpStripCssComments = require("gulp-strip-css-comments");
const gulpSourcemaps = require("gulp-sourcemaps");
const gulpSvgSprites = require("gulp-svg-sprites");
const webpackStream = require("webpack-stream");
const TerserPlugin = require("terser-webpack-plugin");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;


// SETTINGS: FOLDER/FILE PATHS
// =================================================
const paths = {
	src: {
		base: "src/",
		sass: "src/sass/",
		js: "src/js/",
		img: "src/images/",
		svg: "src/images/icons/svg/",
	},
	dist: {
		base: "dist/",
		css: "dist/css/",
		js: "dist/js/",
		img: "dist/images/",
		svg: "dist/images/icons/svg/",
	},
	files: {
		base: "**/*",
		html: "*.html",
		sass: "**/*.sass",
		css: "**/*.css",
		js: "**/*.js",
		svg: "**/*.svg",
	},
	watch: {
		html: "dist/*.html",
		css: "dist/css/*.css",
		js: "dist/js/*.js",
		svg: "dist/images/icons/svg/*.svg",
	},
};

// Paths used to concat the files in a specific order.
const filesJsCompile = [
	`${paths.src.js}scripts.js`,
	`${paths.src.js}components/_components-sprite.js`,
	`${paths.src.js}layouts/_layouts-header.js`,
	`${paths.src.js}pages/_pages-calendar-1.js`,
	`${paths.src.js}pages/_pages-calendar-2.js`,
	`${paths.src.js}pages/_pages-calendar-3.js`,
];



// FUNTIONS USED IN THE TASKS
// =================================================
function createServer() {
	browserSync.init({
		server: {
			baseDir: "./dist",
			browser: [
				"google-chrome",
				"firefox",
			],
		},
	});
};

function copyDirectory(directoryToCopy, directoryOutput) {
	return gulp.src(`${directoryToCopy}/${paths.files.base}`).pipe(gulp.dest(directoryOutput));
};

function copyFiles(filesToCopy, directoryOutput) {
	return gulp.src(filesToCopy).pipe(gulp.dest(directoryOutput));
};

function htmlCopy() {
	return copyFiles(
		`${paths.src.base}${paths.files.html}`,
		paths.dist.base
	);
};

function sassCompile() {
	return gulp
		.src([
			`${paths.src.sass}styles.sass`,
		])
		.pipe(
			gulpSourcemaps.init({
				loadMaps: true,
			})
		)
		.pipe(
			gulpSass({
				outputStyle: "compressed",
			}).on(
				"error",
				gulpSass.logError
			)
		)
		.pipe(
			gulpAutoprefixer({
				versions: [
					"last 2 versions",
				],
			})
		)
		.pipe(gulpCleanCss())
		.pipe(gulpSourcemaps.write())
		.pipe(gulpLineEndingCorrector())
		.pipe(gulpStripCssComments())
		.pipe(gulpRename("styles.min.css"))
		.pipe(gulp.dest(paths.dist.css));
};

function jsCompile() {
	const babelConfig = {
		presets: [
			"@babel/preset-env",
		],
		plugins: [
			"@babel/transform-runtime",
			"@babel/plugin-transform-async-to-generator",
		],
	};

	const webpackConfig = {
		mode: "production",
		output: {
			filename: "scripts.min.js",
		},
		optimization: {
			minimize: true,
			minimizer: [
				new TerserPlugin({
					extractComments: false,
					terserOptions: {
						compress: {
							drop_debugger: true,
							drop_console: true
						},
						format: {
							comments: false,
						},
					},
				})
			],
		},
	};

	return gulp
		.src(filesJsCompile)
		.pipe(gulpBabel(babelConfig))
		.pipe(webpackStream(webpackConfig))
		.pipe(gulpLineEndingCorrector())
		.pipe(gulp.dest(paths.dist.js));
};

function jsTest() {
	const babelConfig = {
		"presets": [
			"@babel/preset-env",
		],
		plugins: [
			"@babel/transform-runtime",
			"@babel/plugin-transform-async-to-generator",
		],
	};

	const webpackConfig = {
		mode: "production",
		output: {
			filename: "scripts.js",
		},
		optimization: {
			minimize: false,
			minimizer: [
				new TerserPlugin({
					extractComments: false,
					terserOptions: {
						compress: {
							drop_debugger: false,
							drop_console: false
						},
						format: {
							comments: false,
						},
					},
				})
			],
		},
	};

	return gulp
		.src(filesJsCompile)
		.pipe(gulpBabel(babelConfig))
		.pipe(webpackStream(webpackConfig))
		.pipe(gulpLineEndingCorrector())
		.pipe(gulp.dest(paths.dist.js));
};

function imagesCopy() {
	return copyDirectory(
		paths.src.img,
		paths.dist.img
	);
};

function createSprite() {
	return gulp
		.src(`${paths.src.svg}${paths.files.svg}`)
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
					symbols: "",
				},
			})
		)
		.pipe(gulp.dest(paths.dist.svg));
};

function watch() {
	createServer();

	gulp.watch(
		`${paths.src.base}${paths.files.html}`,
		htmlCopy
	);

	gulp.watch(
		`${paths.src.sass}${paths.files.sass}`,
		sassCompile
	);

	gulp.watch(
		`${paths.src.js}${paths.files.js}`,
		gulp.series(
			jsCompile,
			jsTest
		)
	);

	gulp.watch(
		`${paths.src.svg}${paths.files.svg}`,
		gulp.series(
			createSprite,
			imagesCopy
		)
	);

	gulp.watch([
		paths.watch.html,
		paths.watch.css,
		paths.watch.js,
		paths.watch.svg,
	]).on(
		"change",
		reload
	);
};



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
	gulp.series(
		htmlCopy,
		sassCompile,
		jsCompile,
		jsTest,
		createSprite,
		imagesCopy,
		watch
	)
);

gulp.task(
	"serve",
	createServer
);

gulp.task(
	"build",
	gulp.series(
		htmlCopy,
		sassCompile,
		jsCompile,
		jsTest,
		createSprite,
		imagesCopy
	)
);

gulp.task(
	"html",
	htmlCopy
);

gulp.task(
	"css",
	sassCompile
);

gulp.task(
	"js",
	gulp.series(
		jsCompile,
		jsTest
	)
);

gulp.task(
	"img",
	gulp.series(
		createSprite,
		imagesCopy
	)
);

gulp.task(
	"watch",
	watch
);
