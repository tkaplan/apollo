class CMSManageEditorsCtrl
  constructor: (@$scope, @$timeout, @UserResource) ->
    $scope.editors = []
    $scope.alert = {}
    $scope.$watch 'user', (event, value) ->
      if $scope.user?
        UserResource.addEditor($scope.user.originalObject.username).then(
          () ->
            $scope.editors.push $scope.user.originalObject
            $scope.alert.msg = 'Editor successfully added!'
            $scope.alert.type = 'success'
            $timeout () ->
              $scope.alert.msg = null
            , 3000
          (reason) ->
            $scope.alert.msg = reason
            $scope.alert.type = 'danger'
            $timeout () ->
              $scope.alert.msg = null
            , 3000
        )

    $scope.remove = (username) ->
      UserResource.removeEditor(username).then(
        () ->
          i = _.findIndex $scope.editors, (editor) ->
            editor.username == username
          $scope.editors.splice i, 1
          $scope.alert.msg = 'Editor successfully removed!'
          $scope.alert.type = 'success'
          $timeout () ->
            $scope.alert.msg = null
          , 3000
        (reason) ->
          $scope.alert.msg = reason
          $scope.alert.type = 'danger'
          $timeout () ->
            $scope.alert.msg = null
          , 3000
      )

    (() ->
      UserResource.listEditors().then(
        (editors) ->
          $scope.editors = editors
        () ->
          $scope.alert.msg = 'Error: could not retrieve editors'
          $scope.alert.type = 'danger'
      )
    )()

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSManageEditorsCtrl = (app) ->
  app.controller 'CMSManageEditorsCtrl', [
    '$scope'
    '$timeout'
    'UserResource'
    CMSManageEditorsCtrl
  ]

window.CMSControllers.CMSManageEditorsCtrl = CMSManageEditorsCtrl