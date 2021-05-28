const gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin');

var paths = {
    sass: ['./dev/scss/**/*.scss'],
    bootstrapcss: ['./dev/lib/bootstrap/css/bootstrap.min.css'],
    bootstrapjs: ['./dev/lib/bootstrap/js/bootstrap.min.js'],
    bootstrapfonts: ['./dev/lib/bootstrap/fonts/*'],
    jquery: ['./dev/lib/jquery/jquery-1.12.4.min.js'],
    htmls: ['./dev/www/**/*.html'],
    devenv: ['./dev/www/**'],
    vue: ['./node_modules/vue/dist/vue.js']
};
var dests = {
    css: './dist/css/',
    fonts: './dist/fonts',
    js: './dist/js/',
    root: './dist/'
}
gulp.task('default', ['sass-main', 'bootstrap', 'devenv', 'browser-sync', 'watch', 'build-img']);

gulp.task('sass-main', function(done) {
    gulp.src('./dev/scss/main.scss')
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest('./dist/css/'))
        .pipe(minifyCss({ keepSpecialComments: 0 }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(dests.css)).on('end', done);
});

gulp.task('bootstrap', function(done) {
    gulp.src(paths.bootstrapcss).pipe(gulp.dest(dests.css));
    gulp.src(paths.bootstrapjs).pipe(gulp.dest(dests.js));
    gulp.src(paths.bootstrapfonts).pipe(gulp.dest(dests.fonts));
    gulp.src(paths.vue).pipe(gulp.dest(dests.js));
    gulp.src(paths.jquery).pipe(gulp.dest(dests.js)).on('end', done);

})

gulp.task('source', function(done) {
    gulp.src(paths.htmls).pipe(gulp.dest(dests.root)).on('end', done);
})


gulp.task('devenv', function(done) {
    gulp.src(paths.devenv).pipe(gulp.dest(dests.root)).on('end', done);
})

gulp.task('browser-sync', function() {
    browserSync.init(['./dist/**'], {
        server: {
            baseDir: './dist/',
            index: './index.html'
        }
    });
});

gulp.task('build-img', () => {
    gulp.src('dev/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function(done) {
    gulp.watch(paths.sass, ['sass-main']);
    gulp.watch(paths.devenv, ['devenv']).on('end', done)
});