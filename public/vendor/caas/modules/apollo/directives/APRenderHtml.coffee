if !window.apInject?
  window.apInject = {}

window.apInject.apRenderHtml = (app) ->
  app.directive 'apRenderHtml', [
    '$compile'
    ($compile) ->
      priority: 0
      replace: true
      transclude: false
      restrict: 'EAC'
      scope:
        render: '='
        show: '='
        blockId: '='
      link: (scope, ele, attrs, controller) ->
        scope.$watch 'render', (value) =>
          ele.html value
          $compile(ele.contents())(scope)
          return
        return
  ]