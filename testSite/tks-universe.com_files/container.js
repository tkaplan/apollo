var containerCtrl = function($scope, $http) {
	$scope.templateContent = { url: 'Portfolio/HTML/content.html' };
	$scope.templateResume = { url: 'Portfolio/HTML/resume.html' };
	$scope.mail = {};
	$scope.mail.email = "";
	$scope.mail.message = "";
	$scope.mail.from = "";

	$scope.scrollToContent = function(input)
	{

		// open up our main content all the way
		jQuery('div.content-holder').animate({
			height: jQuery('div#content-height').css('height')},
			'slow'
		);

		if(input == "modal")
		{
			// Pop modal here
			return;
		}

		var scroll = $(input).offset().top - 20;

		// Go to our content
		jQuery('html,body').animate({ 
			scrollTop: scroll},
        	'slow'
        );
	}

	$scope.mail = function()
	{
		var data = {"data": [{"email": $scope.mail.email}, {"message": $scope.mail.message}, {"name": $scope.mail.from}]};
		$http.post('Portfolio/PHP5/cgi/contact.php', JSON.stringify(data)).success(function(data){
			alert("You message as been successfully sent!");
		});
	}
};

app.controller('containerCtrl',containerCtrl);