var config = {
    prefixer: {
        src_path: './css/index.css',
        dest_path: './css'
    },
    sass: {
        src_path: './sass/**/*.scss',
        dest_path: './dist/css_min'
    },
    min_css: {
        src_path: './css/*.css', 
        dest_path: './dist/css_min'
    },
    min_js: {
        src_path: './js/*.js',
        dest_path: './dist/js-min'
    },
    live_sass: {
        watch: './sass/**/*.scss'
    },
    live_js: {
        watch: './js/*.js'
    }
}

module.exports = config;