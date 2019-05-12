var gulp            = require('gulp');
var sassPackage     = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var cleanCSS        = require('gulp-clean-css');
var uglify          = require('gulp-uglify');
var rename          = require('gulp-rename');

var config          = require('./config/config')

sassPackage.compiler = require('node-sass');

gulp.task( 'default', gulp.parallel(sass, js) );
gulp.task("sass", sass)
gulp.task("css", css)
gulp.task("js", js);

/**********************/
/****** LISTENER ******/
/**********************/

gulp.task( 'watch', gulp.parallel(sass_watch, js_watch) );
gulp.task( 'sass:watch', sass_watch);
gulp.task( 'js:watch', js_watch);

function sass() {
    return gulp.src( config.sass.src_path )
        .pipe( sassPackage().on('error', sassPackage.logError) )
        .pipe( autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe( cleanCSS( {compatibility: 'ie11'} ) )
        .pipe( rename({ suffix: '.min' } ) )
        .pipe( gulp.dest( config.sass.dest_path ) );
}

function css() {
    return gulp.src( config.min_css.src_path )
        .pipe( autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe( cleanCSS( {compatibility: 'ie11'} ) )
        .pipe( rename({ suffix: '.min' } ) )
        .pipe( gulp.dest( config.min_css.dest_path ) );
}

function js() {
    gulp.src([config.min_js.src_path])
        .pipe( uglify() )
        .pipe( rename({ suffix: '.min' } ) )
        .pipe( gulp.dest( config.min_js.dest_path ) )
}

/* WATCHERS */
function sass_watch() {
    gulp.watch(config.live_sass.watch, sass);
}

function js_watch() {
    gulp.watch( config.live_js.watch, js);
}