/*global $:false, TweenLite:false, Linear:false */

$(document).ready(function() {
	
	"use strict";
	
	// init sliders
	$('.ui-slider').slider();
	
	// init multiple sliders*/
	$( ".ui-multi-slider > span" ).each(function() {
		
		var value = parseInt($(this).text(), 10);
		
		$(this).empty().slider({
			value: value,
			range: "min",
			animate: true,
			orientation: "vertical"
		});
    });
	
	// init range slider
	$( ".ui-range-slider" ).slider({
		range: true,
		min: 0,
		max: 500,
		values: [ 75, 300 ],
		slide: function( event, ui ) {
			$( ".amount-1" ).html("Value: $" + ui.values[ 0 ] + " - $" + ui.values[ 1 ]);
		}
    });
	
	// fixed range
	$( ".ui-fixed-slider" ).slider({
		range: "max",
		min: 1,
		max: 10,
		value: 4,
		slide: function( event, ui ) {
			$( ".amount-2" ).html('Current: ' + ui.value);
		}
    });
	
	// range max
	$( ".ui-max-slider" ).slider({
		range: "min",
		value: 350,
		min: 1,
		max: 700,
		slide: function( event, ui ) {
			$( ".amount-3" ).html( "$" + ui.value );
		}
    });
	
	// ui progress bar
	$(".ui-progressbar").progressbar({
		value: 37
    });
	$(".ui-progressbar-move-1,.ui-progressbar-move-2,.ui-progressbar-move-3").progressbar({
		value: 0.1
    });
	TweenLite.to($('.ui-progressbar-move-1 .ui-progressbar-value'), 5, {width:'100%', ease:Linear.easeNone});
	TweenLite.to($('.ui-progressbar-move-2 .ui-progressbar-value'), 15, {width:'100%', ease:Linear.easeNone});
	TweenLite.to($('.ui-progressbar-move-3 .ui-progressbar-value'), 25, {width:'100%', ease:Linear.easeNone});
	
	// ui date picker
	$( ".datepicker" ).datepicker();
	
	// init mini colorpicker
	$('.minicolors').each( function() {
		$(this).minicolors({
			inline: $(this).hasClass('inline'),
			change: function(hex, opacity) {

				// Generate text to show
				var text = hex ? hex : 'transparent';
				if( opacity ) {text += ', ' + opacity;}
				text += ' / ' + $(this).minicolors('rgbaString');
				
				$('#console').text(text).addClass('busy');
				$('.amount').html(text);
			}
		});
	});
	////removendo o alerte da pagina inicial
	// display screen message
/*	$('#add-regular').click(function(){
		
		$.gritter.add({
			// (string | mandatory) the heading of the notification
			title: 'This is a regular notice!',
			// (string | mandatory) the text inside the notification
			text: 'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.',
			// (string | optional) the image to display on the left
			image: 'img/__tmp/sidebar.png',
			// (bool | optional) if you want it to fade out on its own or just sit there
			sticky: false,
			// (int | optional) the time you want it to be alive for before fading out
			time: ''
		});

		return false;

	});*/
	
	$('#add-sticky').click(function(){

		// You can have it return a unique id, this can be used to manually remove it later using
		/*
		setTimeout(function(){

			$.gritter.remove(unique_id, {
				fade: true,
				speed: 'slow'
			});

		}, 6000)
		*/

		return false;

	});
	//removendo o alerte da pagina inicial
	// $('#add-without-image').click(function(){

	// 	$.gritter.add({
	// 		// (string | mandatory) the heading of the notification
	// 		title: 'This is a notice without an image!',
	// 		// (string | mandatory) the text inside the notification
	// 		text: 'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.'
	// 	});

	// 	return false;
	// });
	
	$("#remove-all").click(function(){

		$.gritter.removeAll();
		return false;

	});
	
	// toggle content
	$('.toggle-content .whead').click(function() {
	
		var contentObj = $(this).closest('div.toggle-content').find('div.box');
		var togleObj = $(this);
		
		if(contentObj.is(':hidden')) {
			contentObj.slideDown(300);
			togleObj.css({'border-bottom': '1px solid transparent'});
		}else{
			contentObj.slideUp(300,function() {
				togleObj.css({'border': '1px solid #c3c3c3'});
			});
		}
	});
	
	// inline datepicker
	$( "#datepicker" ).datepicker();
	
});