const gulp         = require('gulp');
const bower        = require('gulp-bower');
const postcss      = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const imagemin     = require('gulp-imagemin');
const deploy       = require('gulp-gh-pages');
const express      = require('express');
const moment       = require('moment');
const del          = require('del');

const pkg = require('./package');

gulp.task('bower', () =>
  bower().pipe(gulp.dest('dist/bower_components'))
);

gulp.task('styles', () =>
  gulp.src('styles/**/*.css')
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('dist/styles'))
);

gulp.task('fonts', () =>
  gulp.src('fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
);

gulp.task('images', () =>
  gulp.src('images/**/*')
    .pipe(imagemin({ progresive: true, interlaced: true }))
    .pipe(gulp.dest('dist/images'))
);

gulp.task('layout', () =>
  gulp.src('./index.html')
    .pipe(gulp.dest('dist'))
);

gulp.task('build', ['bower', 'styles', 'fonts', 'images', 'layout']);

gulp.task('watch', ['build', 'server'], () => {
  gulp.watch(['styles/**/*'], ['styles']);
  gulp.watch(['./index.html'], ['layout']);
});

gulp.task('server', () => {
  express().use(express.static('dist')).listen(8000);
  console.log('Server is running on http://localhost:8000');
});

gulp.task('deploy', ['build'], () =>
  gulp.src('dist/**/*')
    .pipe(deploy({
      push: true,
      message: `Update ${moment(new Date()).format('lll')}`
    }))
);

gulp.task('clean', (done) => { del('dist', done); });

gulp.task('default', ['watch']);
