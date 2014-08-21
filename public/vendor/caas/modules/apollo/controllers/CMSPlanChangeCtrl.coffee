class CMSPlanChangeCtrl
  constructor: (@$scope, @$state, @UserResource) ->
    (() ->
      UserResource.getAllowedBillingPlans().then(
        (value) ->
          $scope.allowedBillingPlans = value
        ,
        (reason) ->
          alert.msg
      )
    )()

    $scope.setPlan = (plan, term) ->
        @buyPlan.plan = plan
        @buyPlan.term = term
    $scope.changePlan = () ->
      scope = @
      UserResource.changePlan(
        @buyPlan.plan
        @buyPlan.term
      ).then(
        (value) ->
          scope.alert =
            msg: value
            type: 'success'
          if $state.is 'container.view.modal.account.notices'
              scope.$parent.alert = scope.alert
              $state.go '^'
        (reason) ->
          scope.alert =
            msg: reason
            type: 'danger'
      )

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSPlanChangeCtrl = (app) ->
  app.controller 'CMSPlanChangeCtrl', [
    '$scope'
    '$state'
    'UserResource'
    CMSPlanChangeCtrl
  ]

window.CMSControllers.CMSPlanChangeCtrl = CMSPlanChangeCtrl