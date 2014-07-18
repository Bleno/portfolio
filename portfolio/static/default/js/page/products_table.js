/*global $:false */

$(document).ready(function() {
	
	"use strict";
	
	/* filter */
	$('#content').on('click', '.table-more', function() {
		//$(this).remove();
		$.ajax({
			url: 'ajax/table.html',
			success : function(data) {
				$('table.products-table').append(data);
			}
		});
	});
	$( "#products" ).sortable({
		items: 'li:has(a)'
	});
    $( "#products" ).disableSelection();
	$( ".slider-range" ).slider({
		range: true,
		min: 0,
		max: 500,
		values: [ 75, 400 ],
		slide: function( event, ui ) {
			$( ".amount" ).html( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
		}
    });
    $( ".amount" ).html( "$" + $( ".slider-range" ).slider( "values", 0 ) + " - $" + $( ".slider-range" ).slider( "values", 1 ) );
	
	$( ".slider-range-max" ).slider({
		range: "max",
		min: 1,
		max: 10,
		value: 5,
		slide: function( event, ui ) {
			$( ".amount-max" ).html( ui.value );
		}
    });
    $( ".amount-max" ).html( $( ".slider-range-max" ).slider( "value" ) );
	
	$( ".slider-rows-max" ).slider({
		range: "max",
		min: 1,
		max: 10,
		value: 7,
		slide: function( event, ui ) {
			$( ".rows-max" ).html( ui.value );
		}
    });
    $( ".rows-max" ).html( $( ".slider-rows-max" ).slider( "value" ) );
});