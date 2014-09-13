if !window.apInject?
  window.apInject = {}

window.apInject.APBlock = (app) ->
  app.directive 'apBlock', [
    '$compile'
    '$document'
    '$rootScope'
    '$http'
    'UserResource'
    'APGlobalState'
    ($compile, $document, $rootScope, $http, UserResource, APGlobalState) ->
      priority: 0
      replace: false
      transclude: false
      restrict: 'EAC'
      template: '''
      <div ng-mouseleave='mouseleave()' ng-mouseover='mouseover()' ng-init='active = false'>
        <div ng-show='active' ng-init='active = false' class='editor'>
          <text-angular ng-model='htmlContent' ta-html-editor-setup='textAreaSetup'>
          </text-angular>
        </div>
        <div ng-show='!active' class='render'>
          <ap-render-html render='htmlContent'>
          </ap-render-html>
        </div>
      </div>
      '''
      scope:
        classId: '@'
        blockId: '@'
        editor: '@'
      controller: ($scope) ->
        $scope.textAreaSetup = ($element) ->
          $element.attr 'ui-codemirror', '{onLoad:$parent.codemirrorLoaded}'
          return

        $scope.codemirrorLoaded = (_editor) ->
          _editor.setOption 'lineWrapping', true
          _editor.setOption 'lineNumbers', true
          _editor.setOption 'matchBrackets', true
          _editor.setOption 'theme', 'twilight'
          mode: 'xml'

      link: (scope, ele, attrs, controller) ->
        scope.htmlContent

        if !APGlobalState.get('set-block-content')?
          APGlobalState.set 'set-block-content', {}

        block = APGlobalState.get 'set-block-content'

        block[scope.blockId] = (content) ->
          scope.htmlContent = content
          return

        if !APGlobalState.get('get-block-content')?
          APGlobalState.set 'get-block-content', {}

        block = APGlobalState.get 'get-block-content'

        block[scope.blockId] = (key) ->
          scope.htmlContent

        ##############################
        ### Set up event handlers ###
        saveBlock = () ->
          UserResource.putBlock scope.blockId, scope.htmlContent

        $rootScope.$on 'page-save', () ->
          saveBlock()

        $rootScope.$on "#{scope.blockId}-save", () ->
          saveBlock()
        ###########################

        # If htmlContent has already been set, probably do to page loading
        # then ignore the content inside html
        scope.htmlContent = if scope.htmlContent? then scope.htmlContent else window.apBlocks[attrs.blockId]
        
        scope.mouseoverB = false

        @editMode = APGlobalState.get 'edit_mode'

        if !@editMode?
          @editMode = false

        # When we click outside, if content has changed
        # then we want to save the page. This will be
        # done at a later time.
        angular.element(document).bind 'mousedown', () ->
          if scope.mouseoverB
            scope.active = true
          else
            # Save content on deselect
            if scope.active then saveBlock()
            scope.active = false
          if !scope.editMode
            scope.active = false
          scope.htmlContent = scope.htmlContent
          scope.$apply()
          return

        scope.$on 'edit_mode', (event, value) ->
          scope.editMode = value

        scope.mouseleave = () ->
          @removeBorder()
          scope.mouseoverB = false

        scope.mouseover = () ->
          @addBorder()
          scope.mouseoverB = true

        scope.removeBorder = () ->
          ele.removeAttr 'style'
          return
        
        scope.addBorder = () =>
          if scope.editMode
            ele.attr 'style', 'border-width: 2px; border-style: solid; border-color: #AAAAFF;'
          return
        return
  ]