/*global $:false */

$(document).ready(function() {
	
	"use strict";
	
	/* Google map */
	var addressRoot = 'ajax/address.json';
	
	$.ajax({
		url : addressRoot,
		dataType : 'json',
		success : function (data) {

			var items = [];

			for (var i = 0; i < data.length; i++) {
				
				var item = $("<div style='display:none' id='address"+ i +"'><h4>"+ data[i].name +"</h4><p>"+ data[i].address +"</p><p>"+ data[i].tel +"</p><p>"+ data[i].email +"</p><p class='webLink'>"+ data[i].web +"</p>");
				items.push(item);
				$("#address-cluod").append(item);

			}
			
		}
	});
	
	/* Custom scroll Google map */
	$("#marker-list").mCustomScrollbar({
		autoHideScrollbar:true,
		scrollInertia:600,
		theme:"light-thin"
	});
	
	
});