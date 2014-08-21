if !window.apInject?
  window.apInject = {}

class APGlobalState
  constructor: () ->
    @state = {}
    meta = document.getElementsByTagName('meta')
    for value in meta
      @state['owner'] = if value.getAttribute('data-owner')? then value.getAttribute 'data-owner'
      @state['project'] = if value.getAttribute('data-project')? then value.getAttribute 'data-project'
      @state['page'] = if value.getAttribute('data-page')? then value.getAttribute 'data-page'

  set: (key, value) =>
    @state[key] = value
    return

  get: (key) =>
    @state[key]

window.apInject.APGlobalState = (app) ->
  app.service 'APGlobalState', [
    APGlobalState
  ]