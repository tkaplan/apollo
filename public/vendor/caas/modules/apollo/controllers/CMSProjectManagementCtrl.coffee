class CMSProjectManagementCtrl
  constructor: (@$scope, @$rootScope, @UserResource) ->
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
    (() ->
      UserResource.listProjects().then(
        (value) ->
          $scope.data = value.tree
        (err) ->
          console.log err
      )
    )()
    # $scope.alert = {}
    # $scope.count = 0
    $scope.deleteBtn = {
      msg: 'Delete'
    }
    # $scope.delete = () ->
    #   if @count % 2 == 0 
    #     @deleteBtn.msg = 'Confirm'
    #     @alert.msg = 'Are you sure you want to delete this item?'
    #   else
    #     @dataForTheTree.splice(0,1)
    #     @deleteBtn.msg = 'Delete'
    #     @alert.msg = null
    #   @count++
    # $scope.content = "Hey this worked!"
    $scope.showSelected = (node) ->
      if node.type is "Block"
        UserResource.customPost("#{node.path}/get").then(
          (value) ->
            console.log value
          (reason) ->
            console.log reason
        )
      @count = 0
      console.log node

    $scope.addItem = {msg: 'hello'}

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSProjectManagementCtrl = (app) ->
  app.controller 'CMSProjectManagementCtrl', [
    '$scope'
    '$rootScope'
    'UserResource'
    CMSProjectManagementCtrl
  ]

window.CMSControllers.CMSProjectManagementCtrl = CMSProjectManagementCtrl