paths = require 'path'
gulp = require 'gulp'
coffee = require 'gulp-coffee'
less = require 'gulp-less'
watch = require 'gulp-watch'
jade = require 'gulp-jade'
concat = require 'gulp-concat'
plumber = require 'gulp-plumber'
ignore = require 'gulp-ignore'
run_sequence = require 'run-sequence'
argv = require('yargs').argv

src_files =
  modules_less: [
    'assets/stylesheets/*.less'
    'modules/**/views/assets/stylesheets/*.less'
    'modules/**'
  ]
  modules_coffee: [
    'coffee/*.coffee'
    'modules/**'
    'modules/**/configs/*.coffee'
    'modules/**/services/*.coffee'
    'modules/**/directives/*.coffee'
    'modules/**/controllers/*.coffee'
    'modules/**/app.coffee'
  ]
  bower_js: [
    'misc/stripe.js'

    'bower_components/ace-builds/src-noconflict/ace.js'
    'bower_components/ace-builds/src-noconflict/mode-markdown.js'
    'bower_components/ace-builds/src-noconflict/theme-twilight.js'

    'bower_components/q/q.js'
    'bower_components/lodash/dist/lodash.js'
    'bower_components/angular/angular.js'
    
    'bower_components/angular-ui-ace/ui-ace.min.js'

    'bower_components/angucomplete/angucomplete.js'
    'bower_components/angular-tree-control/angular-tree-control.js'
    'bower_components/angular-resource/angular-resource.js'
    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
    'bower_components/angular-ui-router/release/angular-ui-router.js'
    'bower_components/angular-cookies/angular-cookies.js'
    'bower_components/angular-payments/lib/angular-payments.js'
    'bower_components/textAngular/src/textAngularSetup.js'
    'bower_components/textAngular/src/textAngular-sanitize.js'
    'bower_components/textAngular/src/textAngular.js'
    'dist/all.js'
  ]
  bower_css: [
    'bower_components/angucomplete/angucomplete.css'
    'bower_components/bootstrap/less/bootstrap.css'

    'bower_components/CodeMirror/lib/codemirror.css'
    'bower_components/CodeMirror/theme/twilight.css'
    
    'bower_components/angular-tree-control/css/tree-control-attribute.css'
    'assets/font-awesome-4.0.3/css/font-awesome.css'
    'dist/all.css'
  ]

gulp.task 'coffee', () ->
  gulp.src src_files.modules_coffee
  .pipe ignore.include('**/*.coffee')
  .pipe ignore.exclude('**/tests/*')
  .pipe coffee()
  .pipe plumber()
  .pipe concat('all.js')
  .pipe gulp.dest('./dist')

gulp.task 'js', () ->
  gulp.src src_files.bower_js
  .pipe concat('all.js')
  .pipe gulp.dest('./dist')

gulp.task 'css', () ->
  gulp.src src_files.bower_css
  .pipe concat('all.css')
  .pipe gulp.dest('./dist')

gulp.task 'less', () ->
  gulp.src src_files.modules_less
  .pipe ignore.include('**/*.less')
  .pipe less()
  .pipe plumber()
  .pipe concat('all.css')
  .pipe gulp.dest('./dist')

gulp.task 'watch', () ->

  watch {
    emit: 'all'
    glob: src_files.modules_coffee
    emitOnGlob: true
  }, (files) ->
    run_sequence('coffee','js')
  .pipe plumber()

  watch {
    emit: 'all'
    glob: src_files.modules_less
    emitOnGlob: true
  }, (files) ->
    run_sequence('less','css')
  .pipe plumber()

  return
