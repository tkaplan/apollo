class CMSForgotPasswordCtrl

  constructor: (@$scope, @$location) ->
      
if !window.apInject?
  window.apInject = {}

if !window.CMSControllers?
  window.CMSControllers = {}

window.apInject.CMSForgotPasswordCtrl = (app) ->
  app.controller 'CMSForgotPasswordCtrl', [
    '$scope'
    '$location'
    CMSForgotPasswordCtrl
  ]

window.CMSControllers.CMSForgotPasswordCtrl = CMSForgotPasswordCtrl