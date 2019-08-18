"use strict";

var gulp = require("gulp");
var del = require("del");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var uglifyJs = require("gulp-uglify");
var htmlmin = require("gulp-htmlmin");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(gulp.dest("source/css"))
    .pipe(gulp.dest("build/css"))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("compress", function () {
  return gulp.src("source/js/script.js")
    .pipe(gulp.dest("build/js"))
    .pipe(uglifyJs())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("source/js"))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.jpg")
    .pipe(webp({quality: 92}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/sprite/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img"))
});

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css", "refresh"));
  gulp.watch("source/js/script.js", gulp.series("compress", "refresh"));
  gulp.watch("source/img/sprite/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/css/**",
    "source/img/**",
    "source/js/**"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series("clean", "copy", "css", "compress", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
