class CMSContainerCtrl
  constructor: (@$rootScope, @$scope, @CMSContainerMQ, @APGlobalState) ->
    $scope.logout = () ->
      APGlobalState.set 'edit_mode', false
      $rootScope.$broadcast 'edit_mode', false
      $scope.edit_mode = false

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSContainerCtrl = (app) ->
  app.controller 'CMSContainerCtrl', [
    '$rootScope'
    '$scope'
    'CMSContainerMQ'
    'APGlobalState'
    CMSContainerCtrl
  ]

window.CMSControllers.CMSContainerCtrl = CMSContainerCtrl