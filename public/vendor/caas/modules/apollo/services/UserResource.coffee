if !window.apInject?
  window.apInject = {}

class UserResource
  constructor: (@$resource, @$cookies, @APGlobalState) ->
    @signupRes = @$resource "#{window.ap_base_uri}/signup/"
    @loginRes = @$resource "#{window.ap_base_uri}/login/"
    @forgotRes = @$resource "#{window.ap_base_uri}/login/forgot/"
    @logoutRes = @$resource "#{window.ap_base_uri}/logout/"
    @projectRes = @$resource "#{window.ap_base_uri}/caas/owner/:owner/project/:project"
    @editorRes = @$resource "#{window.ap_base_uri}/caas/owner/:owner/project/:project/editor/:editor/:action"
    @editorListRes = @$resource "#{window.ap_base_uri}/caas/owner/:owner/project/:project/editor/list"
    @pageRes = @$resource "#{window.ap_base_uri}/caas/owner/:owner/project/:project/page/:page"
    @blockRes = @$resource "#{window.ap_base_uri}/caas/owner/:owner/project/:project/page/:page/block/:block"
    @cardRes = @$resource "#{window.ap_base_uri}/caas/account/card/:action"
    @planRes = @$resource "#{window.ap_base_uri}/caas/account/plan/:action"
    @accountRes = @$resource "#{window.ap_base_uri}/caas/account/:action"
    @projectListRes = @$resource "#{window.ap_base_uri}/caas/owner/project/list"
    @owner = @APGlobalState.get 'owner'
    @project = @APGlobalState.get 'project'
    @page = @APGlobalState.get 'page'

  # Returns a promise
  signup: (email, username, password) =>
    signupRes = new @signupRes()
    signupRes.email = email
    signupRes.username = username
    signupRes.password = password
    signupRes.$save()

  # Returns a promise
  login: (username, password) =>
    loginRes = new @loginRes()
    loginRes.username = username
    loginRes.password = password
    loginRes.$save()

  # Returns a promise
  logout: () =>
    logoutRes = @logoutRes.get()
  
  # Returns a promise
  forgot: (email) =>
    forgotRes = new @forgotRes()
    forgotRes.email = email
    forgotRes.$save()

  customPost: (path) ->
    CustomPost = @$resource("#{window.ap_base_uri}" + path)
    customPost = new CustomPost()
    customPost.apCookie = @APGlobalState.get 'cookie'
    customPost.$save()

  listProjects: () ->
    projectListRes = new @projectListRes()
    projectListRes.apCookie = @APGlobalState.get('cookie')
    projectListRes.$save()

  # Returns a promise
  #owner, projectname
  createProject: (blocks) =>
    projectRes =  new @projectRes()
    projectRes.apCookie = @APGlobalState.get('cookie')
    projectRes.name = @project
    projectRes.pages = {}
    projectRes.pages[@page] = {
      blocks: {}
    }
    projectRes.$save
      'owner': @owner
      'project': @project

  # Returns a promise
  #owner, projectName, pageName
  getPage: (overload) =>
    @pageRes.get {
      'owner': @owner
      'project': @project
      'page': @page
      },
      overload.success
      overload.fail

  # Returns a promise
  #owner, projectName, pageName
  createPage: () =>
    pageRes = new @pageRes()
    pageRes.apCookie = @APGlobalState.get('cookie')
    pageRes[@page] = {
      blocks: {}
    }
    pageRes.$save
      'owner': @owner
      'project': @project
      'page': @page

  # Returns a promise
  #owner, projectName, pageName
  getBlock: (block, overload) =>
    @blockRes.get {
      'owner': @owner
      'project': @project
      'page': @page
      'block': block
      },
      overload.success
      overload.fail

  # Returns a promise
  #owner, projectName, pageName
  putBlock: (blockName, content) =>
    blockRes = new @blockRes()
    blockRes.apCookie = @APGlobalState.get('cookie')
    blockRes[blockName] = {
      content: content
    }
    blockRes.$save
      'owner': @owner
      'project': @project
      'page': @page
      'block': blockName

  # Returns a promise
  #owner, projectName, pageName
  deleteBlock: (block) =>
    blockRes = new @blockRes
    blockRes.apCookie = @APGlobalState.get('cookie')
    blockRes.$delete
      'owner': @owner
      'project': @project
      'page': @page
      'block': block


  # Plan Resources
  #===============
  buyPlan: (card, plan, term, name, email) ->
    planRes = new @planRes()
    planRes.apCookie = @APGlobalState.get('cookie')
    planRes.card = card
    planRes.plan = plan
    planRes.term = term
    planRes.name = name
    planRes.email = email
    planRes.$save
      'action': 'buy'

  changePlan: (plan, term) ->
    planRes = new @planRes()
    planRes.apCookie = @APGlobalState.get('cookie')
    planRes.plan = plan
    planRes.term = term
    planRes.$save
      'action': 'change'

  getAllowedBillingPlans: () ->
    planRes = new @planRes()
    planRes.apCookie = @APGlobalState.get('cookie')

    # We are not saving anything
    # but we need to use post. Out of
    # laziness and time I'm not going
    # to research a way to assign
    # a different key word to post
    planRes.$save
      'action': 'allowedBillingPlans'

  # Only applicable for monthly plan
  # Plan Resources
  #===============
  cancelPlan: () ->
    planRes = new @planRes()
    planRes.apCookie = @APGlobalState.get('cookie')
    planRes.$save
      'action': 'cancel'

  updateCard: (card, name, email) ->
    cardRes = new @cardRes
    cardRes.apCookie = @APGlobalState.get('cookie')
    cardRes.card = card
    cardRes.name = name
    cardRes.email = email
    cardRes.$save
      'action': 'update'

  payCard: (card, name, email) ->
    cardRes = new @cardRes()
    cardRes.apCookie = @APGlobalState.get('cookie')
    cardRes.name = name
    cardRes.email = email
    cardRes.card = card
    cardRes.$save
      'action': 'pay'

  getOutstandingBills: () ->
    cardRes = new @cardRes()
    cardRes.apCookie = @APGlobalState.get('cookie')
    cardRes.$save
      'action': 'getOutstandingBills'

  getNotices: () ->
    noticeRes = new @accountRes()
    noticeRes.apCookie = @APGlobalState.get('cookie')
    noticeRes.project = @project
    noticeRes.owner = @owner
    noticeRes.$save
      'action': 'notices'

  addEditor: (username) ->
    editorRes = new @editorRes()
    editorRes.apCookie = @APGlobalState.get('cookie')
    editorRes.$save
      'owner': @owner
      'project': @project
      'editor': username
      'action': 'add'

  removeEditor: (username) ->
    editorRes = new @editorRes()
    editorRes.apCookie = @APGlobalState.get('cookie')
    editorRes.$save
      'owner': @owner
      'project': @project
      'editor': username
      'action': 'remove'

  listEditors: () ->
    editorRes = new @editorListRes()
    editorRes.apCookie = @APGlobalState.get('cookie')
    editorRes.$save
      'owner': @owner
      'project': @project

window.apInject.UserResource = (app) ->
  app.service 'UserResource', [
    '$resource'
    '$cookies'
    'APGlobalState'
    UserResource
  ]