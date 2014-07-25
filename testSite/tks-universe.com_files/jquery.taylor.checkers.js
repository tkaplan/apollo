function init_tile_transition()
{
	$("#grid-upper").hover_transitions({
		innerHTML_two: "	<img src='Portfolio/MEDIA/IMG/blank.png' class='taylor'>\
							<img src='Portfolio/MEDIA/IMG/blank.png' class='scroll_text'>\
							<img src='Portfolio/MEDIA/IMG/point_down.png' class='center'>\
							<img src='Portfolio/MEDIA/IMG/blank.png' class='city_float_bottom'>",
		background_color_two: "#CCCCCC",
		pattern: "right",
		rewind_on_mouse_out: false,
		event_mode: "hover"
	});

	$("#grid-lower").hover_transitions({
		innerHTML_two: "	<img src='Portfolio/MEDIA/IMG/blank.png' class='city_float_upper'> ",
		background_color_two: "#CCCCCC",
		pattern: "left",
		rewind_on_mouse_out: false,
		event_mode: "hover"
	});
}