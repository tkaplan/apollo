class SCEDelegateProvider
	constructor: (@$sceDelegateProvider) ->
		@$sceDelegateProvider.resourceUrlWhitelist [
			'self'
			"#{ap_base_uri}/**"
		]

if !window.apInject?
	window.apInject = {}

window.apInject.SCEDelegateProvider = (app) ->
	app.config [
		'$sceDelegateProvider'
		SCEDelegateProvider
	]