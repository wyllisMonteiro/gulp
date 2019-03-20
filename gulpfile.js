var gulp            = require('gulp');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var cleanCSS        = require('gulp-clean-css');
var uglify          = require('gulp-uglify');
var rename          = require('gulp-rename');

var config          = require('./config/config')

// CSS OR SASS
var mode = "sass"

sass.compiler = require('node-sass');

gulp.task( 'default', [mode, "js"] );

gulp.task( 'sass', function() {
    // Create SASS to CSS file
    return gulp.src( config.sass.src_path )
        .pipe( sass().on('error', sass.logError) )
        .pipe( autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe( cleanCSS( {compatibility: 'ie11'} ) )
        .pipe( rename({ suffix: '.min' } ) )
        .pipe( gulp.dest( config.sass.dest_path ) );
});
 
gulp.task( 'css', function() {
  return gulp.src( config.min_css.src_path )

        .pipe( autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe( cleanCSS( {compatibility: 'ie11'} ) )
        .pipe( rename({ suffix: '.min' } ) )
        .pipe( gulp.dest( config.min_css.dest_path ) );
});

gulp.task( 'js', function() {
    gulp.src([config.min_js.src_path])

        .pipe( uglify() )
        .pipe( rename({ suffix: '.min' } ) )
        .pipe( gulp.dest( config.min_js.dest_path ) )
});

/**********************/
/****** LISTENER ******/
/**********************/

gulp.task( 'watch', ["sass:watch", "js:watch"] );

gulp.task( 'sass:watch', function() {
    gulp.watch( config.live_sass.watch, ['sass'] );
});

gulp.task( 'js:watch', function() {
    gulp.watch( config.live_js.watch, ['js'] );
});