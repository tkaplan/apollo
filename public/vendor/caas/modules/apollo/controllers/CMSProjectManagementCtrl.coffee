class CMSProjectManagementCtrl
  constructor: (@$scope, @$rootScope) ->
    $scope.treeOptions = {
    nodeChildren: "children",
    dirSelectable: true,
    injectClasses: {
        ul: "a1",
        li: "a2",
        liSelected: "a7",
        iExpanded: "a3",
        iCollapsed: "a4",
        iLeaf: "a5",
        label: "a6",
        labelSelected: "a8"
        }
    }
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
        @dataForTheTree.splice(0,1)
        @deleteBtn.msg = 'Delete'
        @alert.msg = null
      @count++
    $scope.content = "Hey this worked!"
    $scope.showSelected = (node) ->
      @selected = true
      @count = 0
      @current = node
      console.log node
    $scope.rightClick = (node) ->
      $rootScope.$broadcast "popover#{node.$$hashKey}"
      console.log node
    $scope.dataForTheTree =
    [
        { "name" : "Joe", "age" : "21", "children" : [
            { "name" : "Smith", "age" : "42", "children" : [] },
            { "name" : "Gary", "age" : "21", "children" : [
                { "name" : "Jenifer", "age" : "23", "children" : [
                    { "name" : "Dani", "age" : "32", "children" : [] },
                    { "name" : "Max", "age" : "34", "children" : [] }
                ]}
            ]}
        ]},
        { "name" : "Albert", "age" : "33", "children" : [] },
        { "name" : "Ron", "age" : "29", "children" : [] }
    ];

    setTimeout () ->
      $scope.$apply () ->
        $scope.dataForTheTree.splice(2)
    , 10000

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSProjectManagementCtrl = (app) ->
  app.controller 'CMSProjectManagementCtrl', [
    '$scope'
    '$rootScope'
    CMSProjectManagementCtrl
  ]

window.CMSControllers.CMSProjectManagementCtrl = CMSProjectManagementCtrl