class CMSCardUpdateCtrl
  constructor: (@$scope, @$state, @UserResource) ->
    $scope.$parent.alert = null
    $scope.alert = null
    $scope.updateCard = (status, response) ->
      scope = @
      if status > 299
        @alert =
          msg: 'Invalid information'
          type: 'danger'
      else
        UserResource.updateCard(
          response
          @.name
          @.email
        ).then(
          (value) ->
            scope.alert =
              msg: 'Card update success!'
              type: 'success'
            if $state.includes '**.notices.**'
              scope.alert.msg += ' You must however still make a one time payment until automatic billing uses your updated card.'
              scope.$parent.alert = scope.alert
              $state.go '^'
              scope.$parent.notices()
          (reason) ->
            scope.alert =
              msg: reason
              type: 'danger'
        )

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSCardUpdateCtrl = (app) ->
  app.controller 'CMSCardUpdateCtrl', [
    '$scope'
    '$state'
    'UserResource'
    CMSCardUpdateCtrl
  ]

window.CMSControllers.CMSCardUpdateCtrl = CMSCardUpdateCtrl