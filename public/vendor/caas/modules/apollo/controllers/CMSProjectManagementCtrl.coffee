class CMSProjectManagementCtrl
  constructor: (@$scope, @$rootScope, @$timeout, @UserResource) ->
    $scope.treeOptions = {
    nodeChildren: "children"
    dirSelectable: true
    injectClasses: {
        ul: "a1"
        li: "a2"
        liSelected: "a7"
        iExpanded: "a3"
        iCollapsed: "a4"
        iLeaf: "a5"
        label: "a6"
        labelSelected: "a8"
      }
    }

    getProjectLists = () ->
      UserResource.listProjects().then(
        (value) ->
          $scope.data = value.tree
        (err) ->
          console.log err
      )
    
    getProjectLists()

    $scope.addType = 'Project'
    $scope.apProjectManagement=
      content: '<h1>Choose block to edit content</h1>'
      path: ''
      id: ''

    $scope.alert = {}
    $scope.count = 0
    $scope.deleteBtn = {
      msg: 'Delete'
    }

    $scope.delete = () ->
      if @count % 2 == 0 
        @deleteBtn.msg = 'Confirm'
        @alert.msg = 'Are you sure you want to delete this item?'
      else
        @count = 0
        @deleteBtn.msg = 'Delete'
        UserResource.deletePath(@apProjectManagement)
        .then(
          () ->
            $scope.alert.msg = "Delete Successful!"
            $timeout () ->
              $scope.alert.msg = undefined
            , 3000
            getProjectLists()
          (err) ->
            $scope.alert.msg = err.data
            $timeout () ->
              $scope.alert.msg = undefined
            , 3000
            getProjectLists()
        )
      @count++
    $scope.content = "Hey this worked!"

    $scope.showSelected = (node) ->
      @count = 0
      $scope.deleteType = "#{node.type}: #{node.value}"
      switch node.type
        when 'Owner'
          @addType = 'Project'
          $scope.deleteType = undefined
          $scope.apProjectManagement.path = node.path
          $scope.apProjectManagement.id = node.value
          break
        when 'Project'
          @addType = 'Page'
          $scope.deleteType = 'Project'
          $scope.apProjectManagement.path = node.path
          $scope.apProjectManagement.id = node.value
          break
        when 'Page'
          @addType = 'Block'
          $scope.deleteType = 'Page'
          $scope.apProjectManagement.path = node.path
          $scope.apProjectManagement.id = node.value
          break
        when 'Block'
          @addType = 'Block'
          UserResource.customPost("#{node.path}/get").then(
            (value) ->
              console.log value
              $scope.apProjectManagement.content = value.content
              $scope.apProjectManagement.path = node.path
              $scope.apProjectManagement.id = node.value
            (reason) ->
              console.log reason
          )
          break
        else
          $scope.deleteType = undefined


    $scope.addItem = {msg: 'hello'}

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSProjectManagementCtrl = (app) ->
  app.controller 'CMSProjectManagementCtrl', [
    '$scope'
    '$rootScope'
    '$timeout'
    'UserResource'
    CMSProjectManagementCtrl
  ]

window.CMSControllers.CMSProjectManagementCtrl = CMSProjectManagementCtrl