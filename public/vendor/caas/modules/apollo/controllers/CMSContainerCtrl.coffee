class CMSContainerCtrl
  constructor: (@$scope, @CMSContainerMQ, @APGlobalState) ->

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSContainerCtrl = (app) ->
  app.controller 'CMSContainerCtrl', [
    '$scope'
    'CMSContainerMQ'
    'APGlobalState'
    CMSContainerCtrl
  ]

window.CMSControllers.CMSContainerCtrl = CMSContainerCtrl