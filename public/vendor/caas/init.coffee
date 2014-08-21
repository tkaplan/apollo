fs = require 'fs'

fs.mkdir 'coffee', '0777', (err) ->
fs.mkdir 'partials', '0777', (err) ->
fs.mkdir 'modules', '0777', (err) ->
fs.mkdir 'dist', '0777', (err) ->
fs.mkdir 'assets', '0777', (err) ->
  fs.mkdir 'assets/stylesheets', '0777', (err) ->
  fs.mkdir 'assets/media', '0777', (err) ->