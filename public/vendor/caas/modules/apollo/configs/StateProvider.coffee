class StateProvider
  constructor: (@$stateProvider, @$urlRouterProvider) ->
    @$stateProvider
    .state('container', {
      url: '/apollo'
      abstract: true
      views: {
        'container': {
          controller: window.CMSControllers.CMSContainerCtrl
          templateUrl: "#{window.ap_base_uri}/ap-views/cms-container.html"
        }
      }
    })
    .state('container.view', {
      url: '/view'
      views: {
        'toolbar': {
          templateUrl: "#{window.ap_base_uri}/ap-views/toolbar.html"
        }
      }
    })
    .state('container.view.modal', {
      url: ''
      abstract: true
      onEnter: ['$modal', '$state', ($modal, $state) ->
        $modal.open({
          template: '''
            <div class="modal-header">
              <h3>{{page}}</h3>
            </div>
            <div class="modal-body">
              <div ui-view="modal"></div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-warning" ng-click="close()">Close</button>
            </div>
          '''
          size: 'lg'
          backdrop: 'static'
          controller: [
            '$scope'
            '$rootScope'
            '$modalInstance'
            (@$scope, @$rootScope, @$modalInstance) ->
              @$scope.close = () ->
                $state.go('container.view')
                $modalInstance.close()
              @$rootScope.$on('$stateChangeSuccess', (event, toState) ->
                if toState.name.indexOf('modal') < 0
                  event.preventDefault
                  $modalInstance.close()
              )
          ]
        }).result.finally( () ->
          $state.go('container.view');
       );
      ]
       
    })
    .state('container.view.modal.signup', {
      url: '/signup'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/signup.html"
          controller: window.CMSControllers.CMSSignupCtrl
        }
      }
    })
    .state('container.view.modal.login', {
      url: '/login'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/login.html"
          controller: window.CMSControllers.CMSLoginCtrl
        }
      }
    })
    .state('container.view.modal.forgotPassword', {
      url: '/forgot-password'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/forgot-password.html"
          controller: window.CMSControllers.CMSForgotPasswordCtrl
        }
      }
    })
    .state('container.view.modal.manageEditors', {
      url: '/manage-editors'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/manage-editors.html"
          controller: window.CMSControllers.CMSManageEditorsCtrl
        }
      }
    })
    .state('container.view.modal.projectManagement', {
      url: '/project-management'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/project-management.html"
          controller: window.CMSControllers.CMSProjectManagementCtrl
        }
      }
    })
    .state('container.view.modal.buildResources', {
      url: '/build-resources'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/build-resources.html"
          controller: window.CMSControllers.CMSBuildResourcesCtrl
        }
      }
    })

    ##################################################################################
    ## Account States
    ##################################################################################
    .state('container.view.modal.account', {
      url: '/account'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/account.html"
          controller: window.CMSControllers.CMSAccountCtrl
        }
      }
    })
    .state('container.view.modal.account.notices', {
      url: '/notices'
      controller: window.CMSControllers.CMSNoticesCtrl
    })
    .state('container.view.modal.account.notices.balanceDue', {
      url: '/balance-due'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/account-balance-due.html"
          controller: window.CMSControllers.CMSBalanceDueCtrl
        }
      }
    })
    .state('container.view.modal.account.notices.balanceOverdue', {
      url: '/balance-overdue'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/account-balance-overdue.html"
          controller: window.CMSControllers.CMSBalanceOverdueCtrl
        }
      }
    })

    ## Plan routes
    .state('container.view.modal.account.notices.planBuy', {
      url: '/plan/buy'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/account-plan-buy.html"
          controller: window.CMSControllers.CMSPlanBuyCtrl
        }
      }
    })
    .state('container.view.modal.account.notices.planChange', {
      url: '/plan/change'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/account-plan-change.html"
          controller: window.CMSControllers.CMSPlanChangeCtrl
        }
      }
    })
    .state('container.view.modal.account.notices.planCancel', {
      url: '/plan/cancel'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/account-plan-cancel.html"
          controller: window.CMSControllers.CMSPlanCancelCtrl
        }
      }
    })
    #################################################################################
    
    ## Card routes
    .state('container.view.modal.account.notices.cardPay', {
      url: '/card/pay'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/account-card-pay.html"
          controller: window.CMSControllers.CMSCardPayCtrl
        }
      }
    })
    .state('container.view.modal.account.notices.cardUpdate', {
      url: '/card/update'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/account-card-update.html"
          controller: window.CMSControllers.CMSCardUpdateCtrl
        }
      }
    })

    #################################################################################
    
    .state('container.view.modal.account.notices.freetrialAlmostup', {
      url: '/freetrial/almostup'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/account-freetrial-almostup.html"
          controller: window.CMSControllers.CMSFreetrialCtrl
        }
      }
    })
    .state('container.view.modal.account.notices.freetrialOver', {
      url: '/freetrial/over'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/account-freetrial-over.html"
          controller: window.CMSControllers.CMSFreetrialCtrl
        }
      }
    })
    .state('container.view.modal.account.notices.freetrialStarted', {
      url: '/freetrial/started'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/account-freetrial-started.html"
          controller: window.CMSControllers.CMSFreetrialCtrl
        }
      }
    })
    .state('container.view.modal.account.notices.accessDenied', {
      url: '/access/denied'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/account-access-denied.html"
        }
      }
    })
    .state('container.view.modal.account.notices.storagelimitApproached', {
      url: '/storagelimit/approached'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/account-storagelimit-approached.html"
        }
      }
    })
    .state('container.view.modal.account.notices.verify', {
      url: '/verify'
      views: {
        'modal@': {
          templateUrl: "#{window.ap_base_uri}/ap-views/account-verify.html"
          controller: window.CMSControllers.CMSVerifyCtrl
        }
      }
    })

if !window.apInject?
  window.apInject = {}

window.apInject.StateProvider = (app) ->
  app.config [
    '$stateProvider'
    '$urlRouterProvider'
    StateProvider
  ]