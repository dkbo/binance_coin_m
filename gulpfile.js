var gulp = require('gulp')
var del = require('del')
var replace = require('gulp-replace')
var config = require('./config')

// gulp.task('cdn', () => {
//     gulp.src(['../public/static/js/manifest*.js'])
//         .pipe(replace(`"{{$CDN}}"`, `CDN+'/'`))
//         .pipe(gulp.dest('../public/static/js/'))
// })

/*
gulp.task('remove console', () => {
    gulp.src(['../public/static/js/*.js'])
        .pipe(replace(/console\.(log|warn|error)\(([^()]+)\)/g, `(true)`))
        .pipe(gulp.dest('../public/static/js/'))
})
*/
gulp.task('swJs', () => {
    gulp.src(['./public/sw.js'])
        .pipe(replace(/importScripts\("precache-manifest\.[a-z0-9]+\.js"\);/, ''))
        .pipe(gulp.dest('./public/'))
})

gulp.task('rm', () => del(['../public/precache-manifest.*.js'], {force: true}))
gulp.task('default', ['swJs', 'rm'])