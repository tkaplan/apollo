class CMSLoginCtrl
  constructor: (@$scope, @$state, @UserResource, @APGlobalState) ->
    $scope.$parent.page = "Login"
    $scope.login = (username, password) =>
      @login username, password
    $scope.alert = {}

  login: (username, password) ->
    ctrl = @
    @UserResource.login(username, password).then (u) =>
      @APGlobalState.set('cookie', u.cookie.split(';').shift())
      if !u.success
        # @$scope.alert.error = u.errfor[Object.keys(u.errfor)[0]]
        @$scope.alert.error = u.errors[0]
        # Will implement flash message
      else
        owner = @APGlobalState.get 'owner'
        project = @APGlobalState.get 'project'
        page = @APGlobalState.get 'page'
        # First check if owner, project or page is undefined
        if owner is undefined or project is undefined or page is undefined
          ctrl.$state.go "^.buildResources"
          return
        else if @APGlobalState.get('createPageOnSignin') or @APGlobalState.get('createProjectOnSignin')
          ctrl.$state.go "^.buildResources"
          return
        else if @APGlobalState.get('getPageError')?
          ctrl.$state.go "^.buildResources"
          return
        # Change state to CMSAccountCtrl
        ctrl.$state.go "^.account.notices"
    , (err) ->
      console.log err
    return

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSLoginCtrl = (app) ->
  app.controller 'CMSLoginCtrl', [
    '$scope'
    '$state'
    'UserResource'
    'APGlobalState'
    CMSLoginCtrl
  ]

window.CMSControllers.CMSLoginCtrl = CMSLoginCtrl