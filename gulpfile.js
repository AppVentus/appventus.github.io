// grab our packages
var gulp  = require('gulp'),
    sass = require('gulp-sass'), // convert scss to css
    livereload = require('gulp-livereload'), // reload the pages
    autoprefixer = require('gulp-autoprefixer'), // auto prefix css properties
    csso = require('gulp-csso') // makes css inline
    jshint = require('gulp-jshint') // hint js
    twig = require('gulp-twig'); // convert twig on css

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

gulp.task('build-css-bricks', function() {
    return bricks = buildCss('scss/bricks/bricks.scss');
});

gulp.task('build-css-components', function() {
    return components = buildCss('scss/components/components.scss');
});

gulp.task('build-css-layouts', function() {
    return layouts = buildCss('scss/layouts/layouts.scss');
});

gulp.task('build-css-compatibility', function() {
    return compatibility = buildCss('scss/compatibility/lte-ie9.scss');
});

gulp.task('build-css-ugly', function() {
    return ugly = buildCss('scss/ugly.scss');
});

gulp.task('build-css-parameters', function() {
    return parameters = buildCss([
        'scss/bricks/bricks.scss',
        'scss/components/components.scss',
        'scss/layouts/layouts.scss',
        'scss/compatibility/lte-ie9.scss',
        'scss/ugly.scss'
    ]);
});

function buildCss (src) {
    gulp.src(src)
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: true,
        remove: true
    }))
    .pipe(csso())
    .pipe(gulp.dest('css'))
    .pipe(livereload());
}

gulp.task('build-twig', function() {
    return templates = gulp.src('templates/index.html.twig')
        .pipe(twig())
        .pipe(gulp.dest('.'))
        .pipe(livereload());
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('scss/bricks/*.scss', ['build-css-bricks']);
    gulp.watch('scss/components/*.scss', ['build-css-components']);
    gulp.watch('scss/layouts/*.scss', ['build-css-layouts']);
    gulp.watch('scss/compatibility/*.scss', ['build-css-compatibility']);
    gulp.watch('scss/ugly.scss', ['build-css-ugly']);
    gulp.watch('scss/parameters/*.scss', ['build-css-parameters']);
    gulp.watch('templates/**/*.html.twig', ['build-twig']);
});
