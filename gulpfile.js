const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');

var rjs = require('requirejs');

const $ = gulpLoadPlugins();

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
        excludeShallow: ['jquery', 'app'],
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
        cb();
    }, cb);
});