class CMSAccountCtrl
  constructor: (@$scope) ->
    
if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSAccountCtrl = (app) ->
  app.controller 'CMSAccountCtrl', [
    '$scope'
    CMSAccountCtrl
  ]

window.CMSControllers.CMSAccountCtrl = CMSAccountCtrl