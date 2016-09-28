const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');

const browserSync = require('browser-sync');

var rjs = require('requirejs');

const $ = gulpLoadPlugins();

const reload = browserSync.reload;

var rDefineStart = /define\([^{]*?{/;
var rDefineEndWithReturn = /\s*return\s+[^\}]+(\}\);[^\w\}]*)$/;
var rDefineEnd = /\}\);[^}\w]*$/;

const config = {
        baseUrl: 'src/js',
        name: 'lottery/lottery',
        optimize: 'none',
        wrap: {
            startFile: 'src/js/intro.js',
            endFile: 'src/js/outro.js'
        },
        out: 'dist/lottery.js',
        findNestedDependencies: true,
        skipSemiColonInsertion: true,
        onBuildWrite: function (name, path, contents) {
            contents = contents.replace(rDefineStart, '');
            if (rDefineEndWithReturn.test(contents)) {
                contents = contents.replace(rDefineEndWithReturn, '');
            } else {
                contents = contents.replace(rDefineEnd, '');
            }
            return contents;
        },
        excludeShallow: ['jquery'],
        paths: {
            jquery: 'empty:'
        },
        packages: [{
            name: 'lottery',
            location: './'
        }]
    };

gulp.task('rjs', (cb)=>{
    rjs.optimize(config, function(buildResponse){
        console.log('build response', buildResponse);
        reload({stream: true});
        cb();
    }, cb);
});

gulp.task('styles', ()=>{
    return gulp.src('src/style/main.scss')
        .pipe($.concat('lottery.scss'))
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
        outputStyle: 'expanded',
        precision: 10,
        includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('dist/'));
});

gulp.task('image', ()=>{
    return gulp.src('src/icons/*')
        .pipe(gulp.dest('dist/icons/'));
});

gulp.task('serve', ['styles', 'rjs', 'image'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist','test'],
      routes: {
        '/icons': 'src/icons',
        '/bower_components': 'bower_components'
      }
    }
  });
  gulp.watch([
    'test/*.html',
    'src/icons/**/*',
    'dist/**/*'
  ]).on('change', reload);
  gulp.watch('src/style/**/*.scss', ['styles']);
  gulp.watch('src/js/**/*.js', ['rjs']);
  gulp.watch('src/icons/**/*', ['image']);

});