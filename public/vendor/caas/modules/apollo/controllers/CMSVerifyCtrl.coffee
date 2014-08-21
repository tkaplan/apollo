class CMSVerifyCtrl
  constructor: (@$scope) ->

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSVerifyCtrl = (app) ->
  app.controller 'CMSVerifyCtrl', [
    '$scope'
    CMSVerifyCtrl
  ]

window.CMSControllers.CMSVerifyCtrl = CMSVerifyCtrl