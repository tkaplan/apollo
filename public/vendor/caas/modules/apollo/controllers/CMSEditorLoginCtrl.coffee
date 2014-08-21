class CMSEditorLoginCtrl
  constructor: (@$rootScope, @$scope, @$location, CMSContainerMQ) ->
    @$scope.showAdmin = true
    @$scope.$on 'CMSEditorLoginCtrl-showAdmin', (event, value) ->
      @showAdmin = value
    @$scope.login = () ->
      # Open modal
      CMSContainerMQ.get().openModal()

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSEditorLoginCtrl = (app) ->
  app.controller 'CMSEditorLoginCtrl', [
    '$rootScope'
    '$scope'
    '$location'
    'CMSContainerMQ'
    CMSEditorLoginCtrl
  ]

window.CMSControllers.CMSEditorLoginCtrl = CMSEditorLoginCtrl