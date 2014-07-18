/*global $:false*/

$(document).ready(function() {
	
	"use strict";
	
	// login form
	$('.form-signin button').click(function() {
		$(this).addClass('loading').html('please wait...')
		.animate({'background-position': -150},5000,'linear');
		setTimeout(function() {
			window.location.href = 'dashboard.html';
		}, 1000 );
		return false;
	});
	
});