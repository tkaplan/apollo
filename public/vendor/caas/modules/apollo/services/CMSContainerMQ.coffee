class CMSContainerMQ
  set: (scope) =>
    @$scope = scope
    return

  get: () =>
    @$scope

if !window.apInject?
  window.apInject = {}

window.apInject.CMSContainerMQ = (app) ->
  app.service 'CMSContainerMQ', [
    CMSContainerMQ
  ]