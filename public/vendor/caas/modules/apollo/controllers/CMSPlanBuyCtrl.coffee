class CMSPlanBuyCtrl
  constructor: (@$scope, @$state, @$http, @UserResource) ->
    (() ->
      $http({
        method: 'GET'
        url: "#{window.ap_base_uri}/caas/billing-plans"
      }).success( (data, status, headers, config) ->
        for plan in data
          $scope.billingPlans[plan.name] = plan
      )
    )()
    
    @$scope.buyPlan = (status, response) ->
      scope = @
      if status > 299
        @alert.buyPlan =
          msg: 'Invalid information'
          type: 'danger'
      else
        UserResource.buyPlan(
          response
          @buyPlan.plan
          @buyPlan.term
          @name
          @email
        ).then(
          (value) ->
            scope.alert =
              msg: "Thank you! You have successfully registered. A confirmation of your plan purchased has been emailed to your account."
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

window.apInject.CMSPlanBuyCtrl = (app) ->
  app.controller 'CMSPlanBuyCtrl', [
    '$scope'
    '$state'
    '$http'
    'UserResource'
    CMSPlanBuyCtrl
  ]

window.CMSControllers.CMSPlanBuyCtrl = CMSPlanBuyCtrl