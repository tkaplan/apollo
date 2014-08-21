class CMSBalanceOverdueCtrl
  constructor: (@$scope) ->

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSBalanceOverdueCtrl = (app) ->
  app.controller 'CMSBalanceOverdueCtrl', [
    '$scope'
    CMSBalanceOverdueCtrl
  ]

window.CMSControllers.CMSBalanceOverdueCtrl = CMSBalanceOverdueCtrl