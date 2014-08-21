class CMSBalanceDueCtrl
  constructor: (@$scope) ->

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSBalanceDueCtrl = (app) ->
  app.controller 'CMSBalanceDueCtrl', [
    '$scope'
    CMSBalanceDueCtrl
  ]

window.CMSControllers.CMSBalanceDueCtrl = CMSBalanceDueCtrl