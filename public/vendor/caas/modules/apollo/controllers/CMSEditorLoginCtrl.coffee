class CMSEditorLoginCtrl
  constructor: (@$rootScope, @$scope, @$location, CMSContainerMQ) ->
    @$scope.edit_mode = false
    @$scope.$on 'edit_mode', (event, value) ->
      @edit_mode = value
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