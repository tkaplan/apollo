
$(document).on('mousewheel',function(event){

	var height = parseInt($('div.content-holder').css('height'));

	if(event.deltaY < 0 && height < parseInt($('div#content-height').css('height')))
	{
		height += 10;
		height += "px";
		$('div.content-holder').css('height', height);
	}
});