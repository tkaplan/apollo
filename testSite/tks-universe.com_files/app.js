var app = angular.module('app',[]).config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{|');
	$interpolateProvider.endSymbol('|}');
}).directive('ngReady', function(){
	return {
		restrict: 'A',
		link: function(scope,element,attr) {

			// upper-layer width is the same as lower-layer width
			var width = jQuery('.upper-layer').css('width');
			jQuery('.upper-layer').css('width',width);
			jQuery('.lower-layer').css('width',width);
			
			// Initialize checker patter transition
			init_tile_transition();

			element.addClass('fade-hide');
			element.addClass('fade');
			angular.element(document).ready(function(){

				// After loading glass is done with its transition
				// Show our content
				window.setTimeout(function(){
					element.removeClass('fade-hide');
					element.addClass('fade-show');
					jQuery("div#grid-upper").mouseover();
					jQuery("div#grid-lower").mouseover();

					// After our transition is finished
					// we need to clean up our html so it
					// behaves correctly.
					window.setTimeout(function(){
						// Remove our transition elements
						jQuery('.delete').remove();

						// Show our actual conte10
						jQuery('#container').removeClass('display-none');

						jQuery('.upper-layer').css('width','auto');
						jQuery('.lower-layer').css('width','auto');
						
						// Initialize Gumby
						Gumby.init();
					},1000);
				}, 1000);				
			});
		}
	}
}).directive('ngLoading', function(){
	return {
		restrict: 'A',
		link: function(scope,element,attr) {
			element.addClass('fade-show');
			element.addClass('fade');
			angular.element(document).ready(function(){
				element.removeClass('fade-show');
				element.addClass('fade-hide');

				// After transition hide loading
				window.setTimeout(function(){
					element.addClass('display-none');
				},500);
			});
		}
	}
});

var mainCtrl = function($scope) {

};

app.controller('mainCtrl', mainCtrl);