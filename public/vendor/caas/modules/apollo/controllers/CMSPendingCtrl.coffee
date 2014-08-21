class CMSPendingCtrl
  constructor: (@$scope) ->

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSPendingCtrl = (app) ->
  app.controller 'CMSPendingCtrl', [
    '$scope'
    CMSPendingCtrl
  ]

window.CMSControllers.CMSPendingCtrl = CMSPendingCtrl