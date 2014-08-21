documentStatusId = setInterval () ->
  if document.readyState is 'complete'

    apollo.addDom()
    apollo.getDefaultDom()

    if !window.apDependencies?
    	window.apDependencies = []

    dependencies = _.unique window.apDependencies.concat([
      'ui.router'
      'ui.bootstrap'
      'textAngular'
      'ngResource'
      'ngCookies'
      'angularPayments'
    ])

    try
      apollo.rootInit(dependencies)
      console.log "Starting Apollo CAAS!"
    catch e
      console.log e
      console.log 'Initialization Aborted'

    clearInterval documentStatusId
, 50