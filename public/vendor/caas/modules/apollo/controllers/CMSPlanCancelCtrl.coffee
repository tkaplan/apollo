class CMSPlanCancelCtrl
  constructor: (@$scope) ->
    @$scope.cancelPlan = () ->
      scope = @
      UserResource.cancelPlan().then(
        (value) ->
          scope.alert = 
            msg: value.message
            type: 'success'
        (reason) ->
          scope.alert =
            msg: reason
            type: 'danger'
      )

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSPlanCancelCtrl = (app) ->
  app.controller 'CMSPlanCancelCtrl', [
    '$scope'
    'UserResource'
    CMSPlanCancelCtrl
  ]

window.CMSControllers.CMSPlanCancelCtrl = CMSPlanCancelCtrl