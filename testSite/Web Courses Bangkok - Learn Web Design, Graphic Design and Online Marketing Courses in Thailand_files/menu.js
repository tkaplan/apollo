jQuery(function(){
		var rowWidth=0;
		var rowHeight=0;
		rowWidth = jQuery.fn.calcSubWidth;
		rowHeight = jQuery.fn.calcSubHeight;

		jQuery("ul#nav-item li ul").css({'opacity':'0'});
		jQuery("ul#nav-item li").hover(function(){
	
	jQuery(this).find("ul").css({'width' : rowWidth,'height':rowHeight}); 
	jQuery(this).find("ul").stop().fadeTo(500, 1).show();
	
},function(){
	jQuery(this).find("ul").stop().fadeTo(1000, 0).hide();
});  		
 
 
 (function(jQuery) {
         jQuery.fn.calcSubWidth = function() {
            rowWidth = 0;
         jQuery(this).find("ul").each(function() { 
                rowWidth += jQuery(this).width(); 
            });
        };
    })(jQuery); 
	
	 (function(jQuery) {
       jQuery.fn.calcSubHeight = function() {
            rowHeight = 0;
       jQuery(this).find("li").each(function() { 
                rowHeight += jQuery(this).height(); 
            });
        };
    })(jQuery); 


});
