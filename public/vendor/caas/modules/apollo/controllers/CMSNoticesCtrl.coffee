class CMSNoticesCtrl
  constructor: (@$scope, @$state, @$window, @UserResource) ->
    ctrl = @
    $scope.eventFnxs = {}
    $scope.data = {}
    
    # Tells us if we have any notcies or blockers
    $scope.notices = (passthrough) ->
      ctrl.notices(passthrough)
    ## Handle notices
    ###################################################
    $scope.verify = (value, notices) ->
      scope = @
      # Add an event handler
      @eventFnxs['verify'] = () ->
        scope.notices(true).then(
          (notices) ->
            if(!notices['verify'])
              ctrl.continue notices
        )
      @$parent.page = 'Verify'
      $state.go 'container.view.modal.account.notices.verify'
    $scope.accessDenied = (value, notices) ->
      @$parent.page = 'Access Denied'
      $state.go 'container.view.modal.account.notices.accessDenied'
    # This nees to include a small button
    # link that allows one to browse payment plans
    #
    # They can also continue if they choose
    $scope.freetrialAlmostDone = (value, notices) ->
      scope = @
      @noticeMessage = value.message
      # Register event listeners
      @eventFnxs['continue'] = () ->
        scope.skipNotice.push('freeAlmostDone')
        ctrl.continue notices
      @$parent.page = 'Free Trial Almost Done'
      @data.freetrialAlmostDone = true
      $state.go 'container.view.modal.account.notices.freetrialAlmostup'
    # This will be the same window except
    # it will have some different text and
    # will not allow for continue.
    $scope.freetrialDone = (value, notices) ->
      scope = @
      @noticeMessage = value.message
      # Register event listeners
      @eventFnxs['continue'] = () ->
        scope.notices(true).then(
          (notices) ->
            if(!notices['freetrialDone'])
              ctrl.continue notices
        )
      @$parent.page = 'Free Trial Over'
      @data.freetrialDone = true
      $state.go 'container.view.modal.account.notices.freetrialOver'
    # This will deactivate the account and
    # send a link to either one time payment
    # or update card
    $scope.overdue = (value, notices) ->
      scope = @
      @noticeMessage = value.message
      @eventFnxs['continue'] = () ->
        scope.notices(true).then(
          (notices) ->
            if(!notices['overdue'])
              ctrl.continue notices
        )
      @$parent.page = 'Balance Overdue'
      @data.overdue = true
      $state.go 'container.view.modal.account.notices.balanceOverdue'
    # This will have the samething as overdue
    # except it will have a continue button
    $scope.due = (value, notices) ->
      scope = @
      @noticeMessage = value.message
      @eventFnxs['continue'] = () ->
        scope.skipNotice.push('due')
        ctrl.continue notices
      @$parent.page = 'Balance Due'
      @data.due = true
      $state.go 'container.view.modal.account.notices.balanceDue'

    (() ->
      $scope.notices()
    )()

  continue: (notices) ->
    keys = Object.keys(notices)
    if keys.length > 0
      if _.contains(@$scope.skipNotice, keys[0])
        delete notices[keys[0]]
        @continue(notices)
        return
      value = notices[keys[0]]
      delete notices[keys[0]]
      @$scope[keys[0]](value, notices)
    else
      @showToolbar()

  notices: (passthrough = false) ->
    # Create a defer
    defer = Q.defer()
    ctrl = @
    # Execute our stuff
    @UserResource.getNotices().then(
      (data) ->
        notices = data.notices
        if !passthrough
          ctrl.continue(notices)
        else
          # We want to resolve our defer
          defer.resolve(notices)
      (error) ->
        console.log error
    )

    # Return our promise
    defer.promise

  showToolbar: () ->
    @$scope.$parent.$parent.$parent.$parent['edit_mode'] = true
    @$window.scrollTo 0, 0
    @$state.go 'container.view'

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSNoticesCtrl = (app) ->
  app.controller 'CMSNoticesCtrl', [
    '$scope'
    '$state'
    '$window'
    'UserResource'
    CMSNoticesCtrl
  ]

window.CMSControllers.CMSNoticesCtrl = CMSNoticesCtrl