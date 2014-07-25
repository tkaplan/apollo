$(document).ready(function(){
	$('#slide-navigation img').animate({opacity:0.5});
	$('#slide-navigation img:gt(0)').animate({opacity:1});
	var sam=$(this);
		var panelWidth = sam.find(".panel").width();
		var panelCount = sam.find(".panel").size();
		var panelContainerWidth = panelWidth*panelCount;
		var navClicks = 0; 
		$('.panel', sam).wrapAll('<div class="panel-container"></div>');
		$(".panel-container", sam).css({ width: panelContainerWidth });
		if (location.hash && parseInt(location.hash.slice(1)) <= panelCount) {
			var currentPanel = parseInt(location.hash.slice(1));
			var offset = - (panelWidth*(currentPanel - 1));
			$('.panel-container', slider).css({ marginLeft: offset });
		}else { 
			var currentPanel = 1;
		};

	

	
$('.panel-wrapper-all').easySlider({
				auto: true, 
				continuous: true
			});
	

	/*$(function() {
		$('#tabs').tabs();
       });*/
    
    $('.scrollPage').click(function() {
	   var elementClicked = $(this).attr("href");
	   var destination = $(elementClicked).offset().top;
	   $("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination-0}, 1500 );
	   return false;
	});

});	

(function($) {
	$.fn.easySlider = function(options){
		var defaults = {			
			speed: 			800,
			auto:			false,
			pause:			8000,
			continuous:		true
		}; 
		
		var options = $.extend(defaults, options);  
		var obj = $(this); 				
		var s = $(".panel", obj).length;	
		var w = $(".panel", obj).width(); 
		var h = $(".panel", obj).height(); 	
		var ts = s-1;
		var t = 0;
		var direction = 0;

		$('#slide-navigation img').each(function(z) {
		$(this).bind("click", function() {
		offset = - (w*z);
		currentPanel = z + 1;
		$('#slide-navigation img').stop().animate({opacity:0.1});
		$(this).stop().animate({opacity:1});
		$('.panel-container', obj).stop().animate({ marginLeft: offset }, 1000);
		t=z;

		setTimeout(function(){	animate("click",true);
		},10000);});});
				
		this.each(function() {  
			function animate(dir,clicked){
			var ot = t;
			var_old=t;
			if(direction==0){direction = (ot>=ts)?1:0}
			else{direction = (ot<=0)?0:1}				
			switch(dir){
				case "next":
				t = (direction == 0) ? (t+1) : 0;						
				break; 
				case "prev":
				t = (t<=0) ? (options.continuous ? ts : 0) : t-1;
				break; 
				case "first":
				t = 0;
				break; 
				case "last":
				t = ts;
				break; 
				case "click":
				t = z;
				break; 
				default:
				break; 
				};	
				
				var diff = Math.abs(ot-t);
				var speed = diff*options.speed;						
				
					p = (t*w*-1);
					$(".panel-container",obj).animate(
						{ marginLeft: p }, 
						speed
					);				
				$("#slide-navigation img").stop().animate({opacity:0.1});
				$('#slide-navigation img:eq('+t+')').stop().animate({opacity:1});		
				
				if(clicked) clearTimeout(timeout);
				if(options.auto && dir=="next" && !clicked){;
					timeout = setTimeout(function(){
						animate("next",false);
					},diff*options.speed+options.pause);
				};
				
			};
			
			var timeout;
			if(options.auto){;
				timeout = setTimeout(function(){
					animate("next",false);
				},options.pause);
			};		
		
						
			
		});
	  
	};

})(jQuery);






