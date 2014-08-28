documentStatusId = setInterval () ->
  if document.readyState is 'complete'

    if !window.apDependencies?
      window.apDependencies = []

    alert 'work!'

    try
      console.log "Starting Apollo CAAS!"
    catch e
      console.log e
      console.log 'Initialization Aborted'

    clearInterval documentStatusId
, 50