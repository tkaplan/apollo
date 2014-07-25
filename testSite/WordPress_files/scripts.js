

// as the page loads, call these scripts
jQuery(document).ready(function($) {

	$('a.logIn').click(function(){
	
		$('.logInForm').fadeToggle();
	
	});
    
    $('.flexslider').flexslider({
      animation: "fade",
      directionNav: false,
      controlNav: false
    });
	
	// add all your scripts here
	
	//$('option.count-0').attr('disabled', 'disabled');

	
	$("#signup_email").change(function() {                  // When the email is changed
			var email = this.value;
			var name = email.split("@")[0];	
	        $('#signup_username').val(email);  
	        $('#field_1').val(name);                  // copy it over to the mail
	    });
	
	$( "#commenttabs" ).tabs();
	
	//hide it initially
	$('.register .editfield .checkboxes').hide();
	
	$('.editfield .toggle').click(function(){
		
		$(this).parents('.editfield').find('.checkboxes').slideToggle(function() {
		    $(this).parent().toggleClass('open', $(this).is(':visible'));
		  });
	});
	
	//Let's get some checkAll action ON
	
	$('.checkAll').click(function() {
	        $(this).parents('.editfield').find(':checkbox').not('.checkAll').prop('checked', this.checked);
	    });
	
		//if you uncheck one, uncheck the checkAll box
	    $('.checkAll').parents('.editfield').find(':checkbox').not('.checkAll,:checked').click(function() {
	        $(this).parents('.editfield').find('.checkAll').prop('checked', false);
	    });
	

 
}); /* end of as page load scripts */



/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
    var doc = w.document;
    if( !doc.querySelector ){ return; }
    var meta = doc.querySelector( "meta[name=viewport]" ),
        initialContent = meta && meta.getAttribute( "content" ),
        disabledZoom = initialContent + ",maximum-scale=1",
        enabledZoom = initialContent + ",maximum-scale=10",
        enabled = true,
		x, y, z, aig;
    if( !meta ){ return; }
    function restoreZoom(){
        meta.setAttribute( "content", enabledZoom );
        enabled = true; }
    function disableZoom(){
        meta.setAttribute( "content", disabledZoom );
        enabled = false; }
    function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
		// If portrait orientation and in one of the danger zones
        if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){ disableZoom(); } }
		else if( !enabled ){ restoreZoom(); } }
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );
})( this );