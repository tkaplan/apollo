//jQuery.noConflict();
// page init
jQuery(function(){
	slideContent();
	initSort();
});

// slide content
function slideContent(){
	var links = jQuery('a[rel = link]');
	links.each(function(){
		var link = jQuery(this);
		link.bind('click',function(){
			jQuery.scrollTo(link.attr('href'),{easing: 'swing', duration: 900});
			return false;
		});
	});
}

// init sort
function initSort(){
	var filterList = jQuery('.data-links > li');
	var contentList = jQuery('.portfolio-list');
	var contentListW = contentList.outerWidth(true);
	var contentListH = contentList.outerHeight(true);
	var content = contentList.children();
	var _dur = 500;
	
	filterList.each(function(){
		var _this = jQuery(this);
		_this.find('a').click(function(){
			var link = jQuery(this);
			link.parent().siblings().filter('.active').removeClass('active');
			link.parent().addClass('active');
			var filter = link.attr('class');
			var filteredElements = filter == 'all' ? content : content.filter('.'+filter);
			filteredElements.filter(':hidden').fadeIn(_dur);
			content.not(filteredElements).fadeOut(_dur);
			reposition(filteredElements, false);
			return false;
		});
	});
	contentList.css({height:contentListH,position:'relative'});
	content.css({position: 'absolute'});
	reposition(content, true);
}

// reposition elements
function reposition(els, fast){
	var w = 0, t = 0;
	var count = 0;
	els.each(function(ind, el){
		if(fast) jQuery(el).css({left: w, top: t});
		else jQuery(el).animate({left: w, top: t}, {queue:false, duration:500});
		w+= jQuery(el).outerWidth(true);
		if(w >= els.parent().outerWidth(true)) {
			count++;
			t = els.eq(0).outerHeight(true) * count;
			w = 0;
		}
	});
}
