![GitHub issues](https://img.shields.io/github/issues/beatrizsmerino/calendar)
![GitHub forks](https://img.shields.io/github/forks/beatrizsmerino/calendar)
![GitHub stars](https://img.shields.io/github/stars/beatrizsmerino/calendar)
![GitHub watchers](https://img.shields.io/github/watchers/beatrizsmerino/calendar)
![GitHub last commit](https://img.shields.io/github/last-commit/beatrizsmerino/calendar)


# Calendar

![Image of Calendar](https://github.com/beatrizsmerino/calendar/blob/master/README/images/calendar.png)


# GULP

This project uses the `GULP task runner`.

In the [gulpfile.js](https://github.com/beatrizsmerino/calendar/blob/master/gulpfile.js) of this proyect you can see the **gulp tasks** developed to compile and compress the `SASS` and `JS`, copy and paste the `HTML` files and create a server and listen to the changes made to reload it ([Browsersync + Gulp.js](https://browsersync.io/docs/gulp))

So the project is developed in the `src` folder and published in the `dist` folder.

## 🔧 Run server and watch changes

This is the default gulp task

This command is able to:

1. Creates the `dist` folder if it does not exist.
2. Generate `html`, `css`, `js` on `dist` folder.
3. Watch the changes to the files in the `sass`, and `js` folders inside the `src` folder.
4. Create a server and reloads if there are any changes in those files of `dist` folder.

```
gulp
```

## 💻  Run server

This create a static server with browserSync package, serves the files from `dist` folder and opens by default the `index.html` file in any of these browsers: Chrome & Firefox.

```
gulp serve
```


## 📂 Generate html, css and js

This command is able to:

1. Creates the `dist` folder if it does not exist.
2. Generate `html`, `css`, `js` on `dist` folder.

```
gulp build
```

## 📄 Generate html

This command is able to:

1. Creates the `dist` folder if it does not exist.
2. Copies the `html` files from the `src` folder and pastes the `dist` folder.

```
gulp html
```

## 📄 Generate css

This command is able to:

1. Creates the `dist` folder if it does not exist.
2. Compile the `styles.sass` file (with the import files of partials sass) located at `src/sass/`, add prefixes to properties css, compress the file, create and add a mapping for the debugger styles sass on the browser inspector, apply a Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings)...
3. Export the `styles.min.css` file to `dist/css/` folder.

```
gulp css
```

## 📄 Generate js

This command is able to:

1. Creates the `dist` folder if it does not exist.
2. Get list of files of `filesJsCompile` variable, compile the files with Babel NPM package, compress it and apply a Gulp Plugin for Line Ending Corrector (A utility that makes sure your files have consistent line endings)...
3. Export the `scripts.min.js` file to `dist/js` folder.

```
gulp js
```

## 🔎 Watch changes

This command is able to:

1. Create the server.
2. Watch the changes to the files in the `html`, `sass` and `js` folders inside the `src` folder and run the tasks to re-generate the files inside the `dist` folder.
3. Reloads the server if there are any changes to the `html`, `css` and `js` files inside the `dist` folder.

```
gulp watch
```