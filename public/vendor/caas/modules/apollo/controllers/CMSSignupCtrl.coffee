class CMSSignupCtrl
  constructor: (@$scope, @$rootScope, $state, UserResource, @APGlobalState) ->
    $scope.signup = (email, username, password) ->
      UserResource.signup(email, username, password).then (u) =>
          APGlobalState.set('cookie', u.cookie.split(';').shift())
          @alert = {}
          if !u.success
            @alert.username = u.errfor.username
            @alert.email = u.errfor.email
            @alert.password = u.errfor.password
          else
            APGlobalState.set 'getPageError'
            APGlobalState.set 'createProjectOnSignin', true
            # Change to state
            $state.go '^.buildResources'
        , (err) ->
          console.log err

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSSignupCtrl = (app) ->
  app.controller 'CMSSignupCtrl', [
    '$scope'
    '$rootScope'
    '$state'
    'UserResource'
    'APGlobalState'
    CMSSignupCtrl
  ]

window.CMSControllers.CMSSignupCtrl = CMSSignupCtrl