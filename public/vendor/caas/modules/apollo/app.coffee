class Apollo
  constructor: () ->

  # Set up necessary dom
  addDom: () ->

    # Add proto to make prepending easier
    Element.prototype.prependChild = (child) ->
      this.insertBefore child, @firstChild
      return

    head = document.getElementsByTagName('head')[0]
    css = document.createElement 'link'
    css.setAttribute 'rel', 'stylesheet'
    css.setAttribute 'type', 'text/css'
    css.setAttribute 'href', "#{window.ap_base_uri}#{window.ap_base_dist}/all.css"
    head.appendChild css

    # Create div element and prepend to document without jQuery
    # This div element will be used to contain our tool bar and $modelValue
    container = document.createElement 'div'
    container.setAttribute 'style', 'width: 100%'
    container.setAttribute 'ui-view', 'container'

    document.getElementsByTagName('body')[0].prependChild container

    # Center our stuff
    center = document.createElement 'center'

    # Append a login to bottom of page
    login = document.createElement 'a'
    login.setAttribute 'class', 'ap-login-link'
    login.setAttribute 'ng-controller', 'CMSEditorLoginCtrl'
    # login.setAttribute 'ng-click', 'login()'
    login.setAttribute 'ng-show', 'showAdmin'
    login.setAttribute 'ui-sref', 'container.view.modal.login'

    # Create text node
    textNode = document.createTextNode 'Admin Login'
    login.appendChild textNode

    # Center our login
    center.appendChild login

    # If there are any footer tags, then append it to that instead
    footer = document.getElementsByTagName('footer')
    if (footer.length > 0)
      footer[footer.length - 1].appendChild center
    else
      document.getElementsByTagName('body')[0].appendChild center

    return

  getDefaultDom: () ->
    window.apBlocks = {}
    # Grab all dom
    apBlocks = document.querySelectorAll '[ap-block]'
    for block in apBlocks
      if block.attributes? and block.attributes['block-id']?
        window.apBlocks[block.attributes['block-id'].value] = block.innerHTML

  rootInit: (dependencies) ->
    app = angular.module 'apollo', dependencies
    @dependenciesInit(app)
    angular.bootstrap document, ['apollo']
    @getPage()
    return

  # Responsible for loading all the blocks with their content
  getPage: () ->
    APGlobalState = angular.element(document).injector().get('APGlobalState')
    UserResource = angular.element(document).injector().get('UserResource')
    UserResource.getPage {
      'success': (data) ->
        # If there is actually a returned block tree
        # then we set the content for each block.
        for blockName, block of data.blocks
          # Initialize the model of our ap-blocks
          setBlock = APGlobalState.get 'set-block-content'
          # Sets the block content
          setBlock[blockName](block.content)
      'fail': (err) ->
        # If there are errors
        console.log err.data
        switch err.data
          when "Page not found"
            APGlobalState.set 'createPageOnSignin', true
          when "Error: No project found"
            APGlobalState.set 'createProjectOnSignin', true

        APGlobalState = angular.element(document).injector().get('APGlobalState')
        APGlobalState.set 'getPageError', err
      }

  dependenciesInit: (app) ->
    for key, callback of window.apInject
      callback app

window.apollo = new Apollo()