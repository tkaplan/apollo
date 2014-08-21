class CMSCardPayCtrl
  constructor: (@$scope, @$state, @UserResource) ->
    $scope.$parent.alert = null
    $scope.alert = null

    (() ->
      # Only needed on notice chain
      UserResource.getOutstandingBills().then(
        (value) ->
          $scope.outstandingBills = value
          $scope.outstandingBills.totalDue = parseFloat(value.totalDue).toFixed(2)
        (reason) ->
          $scope.alert =
            msg: reason
            type: 'danger'
      )
    )()

    $scope.payCard = (status, response) ->
        scope = @
        if status > 299
          @alert =
            msg: 'Invalid information'
            type: 'danger'
        else
          UserResource.payCard(response, @.name, @.email).then(
            (value) ->
              scope.alert =
                msg: """You payment of $#{scope.outstandingBills.totalDue} was successful. A
                confirmation email has been sent to your account."""
                type: 'success'
              scope.balancePaid = true
                
            (reason) ->
              scope.alert =
                msg: reason
                type: 'danger'
          )

if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSCardPayCtrl = (app) ->
  app.controller 'CMSCardPayCtrl', [
    '$scope'
    '$state'
    'UserResource'
    CMSCardPayCtrl
  ]

window.CMSControllers.CMSCardPayCtrl = CMSCardPayCtrl