class ResourceProvider
	constructor: (@$resourceProvider) ->
		@$resourceProvider.defaults.stripTrailingSlashes = false

if !window.apInject?
	window.apInject = {}

window.apInject.ResourceProvider = (app) ->
	app.config [
		'$resourceProvider'
		ResourceProvider
	]