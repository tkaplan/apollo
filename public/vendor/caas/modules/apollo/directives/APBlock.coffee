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
      <div ng-mouseleave='mouseleave()' ng-mouseover='mouseover()' ng-init='active = false' style='min-height:10px'>
        <div ng-show='active' ng-init='active = false' class='editor'>
          <text-angular ng-model='block.content'>
          </text-angular>
        </div>
        <div ng-show='!active' class='render'>
          <ap-render-html render='block.content'>
          </ap-render-html>
        </div>
      </div>
      '''
      scope:
        classId: '@'
        blockId: '@'
        blockTarget: '='

      link: (scope, ele, attrs, controller) ->
        scope.block =
          content: ''

        # This should probably go in a different function
        if scope.blockId?
          scope.block.id = scope.blockId
          # Functions that allow for setting outside block
          # Content
          if !APGlobalState.get('set-block-content')?
            APGlobalState.set 'set-block-content', {}

          block = APGlobalState.get 'set-block-content'

          block[scope.block.id] = (content) ->
            scope.block.content = content
            return
          ###############################################

          # Functions that allow for outside functions
          # to get block content
          if !APGlobalState.get('get-block-content')?
            APGlobalState.set 'get-block-content', {}

          block = APGlobalState.get 'get-block-content'

          block[scope.block.id] = (key) ->
            scope.block.content
          ############################################
        else if scope.blockTarget?
          scope.block = scope.blockTarget
          scope.editMode = if scope.blockTarget.id isnt '' then true else false
          scope.$watch 'block.id', () ->
            scope.editMode = if scope.block.id isnt '' then true else false

        ##############################
        ### Set up event handlers ###
        saveBlock = () ->
          if scope.block.path?
            payload =
              path: scope.block.path
              body: {}
            payload.body[scope.block.id] =
              content: scope.block.content
            UserResource.putPath payload
          else
            UserResource.putBlock scope.block.id, scope.block.content

        $rootScope.$on 'page-save', () ->
          saveBlock()

        $rootScope.$on "#{scope.id}-save", () ->
          saveBlock()
        ###########################

        # If content has already been set, probably do to page loading
        # then ignore the content inside html
        scope.block.content = if scope.block.content? then scope.block.content else window.apBlocks[attrs.blockId]
        
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