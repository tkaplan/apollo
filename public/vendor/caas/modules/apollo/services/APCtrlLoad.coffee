if !window.apInject?
  window.apInject = {}

class APCtrlLoad
  constructor: () ->
    @state = {}

  exec: (ctrlName, ctrl) =>
    fxns = @state[ctrlName]
    if fxns instanceof Array
      while fxns.length > 0
        ctrl[fxns[0]]()
        fxns = fxns[1 ..]
    else if fxns?
      ctrl[fxns]()
      fxns = null
    delete @state[ctrlName]

  set: (key, value) =>
    @state[key] = value

  add: (key, value) =>
    if @state[key]?
      if @state[key] instanceof Array
        @state[key].push value
      else
        throw new Error('key is not an array!')
    else
      @state[key] = []
      @state[key].push value

  get: (key) =>
    @state[key]

window.apInject.APCtrlLoad = (app) ->
  app.service 'APCtrlLoad', [
    APCtrlLoad
  ]