class CMSBuildResourcesCtrl
  constructor: (@$rootScope, @$scope, @$state, @UserResource, @APGlobalState) ->

    owner = @APGlobalState.get 'owner'
    project = @APGlobalState.get 'project'
    page = @APGlobalState.get 'page'
    err = @APGlobalState.get 'getPageError'
    createProject = false
    missingParameter = false
    createPage = false
    createPageOnSignin = if @APGlobalState.get 'createPageOnSignin' then true else false
    createProjectOnSignin = if @APGlobalState.get 'createProjectOnSignin' then true else false

    $scope.alerts = []

    if owner is undefined
      missingParameter = true
      alert =
        type: 'danger'
        msg: 'data-owner is missing from &lt;meta ...&gt; you cannot manage content unless you add this attribute. Example: &lt;meta data-owner="some_user_name" ...&gt;'
      $scope.alerts.push alert
    
    if project is undefined
      missingParameter = true
      alert =
        type: 'danger'
        msg: 'data-project is missing from &lt;meta ...&gt; you cannot manage content unless you add this attribute. Example: &lt;meta data-project="example_project" ...&gt;'
      $scope.alerts.push alert

    if page is undefined
      missingParameter = true
      alert =
        type: 'danger'
        msg: 'data-page is missing from &lt;meta ...&gt; you cannot manage content unless you add this attribute. Example: &lt;meta data-page="some_page" ...&gt;'
      $scope.alerts.push alert

    if createPageOnSignin is true and !missingParameter
      createPage = true
      alert =
        type: 'alert'
        msg: "Do you want to create page #{page}? You must create a page before managing content."
      $scope.alerts.push alert

    if createProjectOnSignin is true and !missingParameter
      createProject = true
      alert =
        type: 'alert'
        msg: "Do you want to create project #{project}? You must create a project before managing content."
      $scope.alerts.push alert

    if !missingParameter and err
      alert =
        type: 'danger'
        msg: "We had a serious error (#{err.status}): #{err.statusText}"
      $scope.alerts.push alert


    $scope.missingParameter = missingParameter
    $scope.createProjectBool = createProject
    $scope.createPageBool = createPage

    $scope.createProject = () ->
      if parameterMissing? and parameterMissing
        throw new Error("Cannot create project: meta paramter missing")
      UserResource.createProject().then(
        #resolve
        (value) =>
          $rootScope.$broadcast 'page-save'
          # Change to business rules state
          $state.go '^.account.notices'
        #reject
        (reason) ->
          #Do whatever error handeling you want to
          #if project creation is unsuccessful
      )

    $scope.createPage = () ->
      if bctrl.parameterMissing
        throw new Error("Cannot create page: meta parameter missing")
      UserResource.createPage().then(
        #resolve
        (value) ->
          $rootScope.$broadcast 'page-save'
          $state.go '^.account.notices'
        #reject
        (reason) ->
          #Do whatever error handeling you want to
          #if page creation is unsuccessful
      )

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSBuildResourcesCtrl = (app) ->
  app.controller 'CMSLoginCtrl', [
    '$rootScope'
    '$scope'
    '$state'
    'UserResource'
    'APGlobalState'
    CMSBuildResourcesCtrl
  ]

window.CMSControllers.CMSBuildResourcesCtrl = CMSBuildResourcesCtrl