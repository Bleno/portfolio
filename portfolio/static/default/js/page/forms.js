/*global $:false */

$(document).ready(function() {
	
	"use strict";
	
	/* input masks */
	$.mask.definitions['h'] = "[A-Fa-f0-9]";
	$("input#date").mask("99/99/9999");
	$("#phone").mask("(999) 999-9999");
	$("#tin").mask("99-9999999");
	$("#ssn").mask("999-99-9999");
	$("#phonecode").mask("+34 9999999");
	$("#color").mask("#hhhhhh");
	
	/* textarea/input tags */
	$('#tags').tagsInput({width:'100%',height:'150px'});

	/* styling dropdown */
	$('select.styled').customSelect();
	
	/* auto tabs */
	$('.auto-tabs input:not(:last)').keyup(function() {
		if($(this).val().length >= 6) {
			$(this).next().focus();
		}
	});
	
	/* textarea character counter */
	$('textarea.counter').keyup(function() {
		
		var radix = 10;
		
		var max = parseInt($(this).attr('maxlength'), radix);
		var len = $(this).val().length;
		
		if (len >= max) {
			$(this).next('span').text('No more characters');
		} else {
			var left = max - len;
			$(this).next('span').text(left + ' characters remaining.');
		}
	});
	
	/* multiple select box */
	$('#t2').click(function() {  
		return !$('#select1 option:selected').remove().appendTo('#select2');  
	});  
	$('#t1').click(function() {  
		return !$('#select2 option:selected').remove().appendTo('#select1');  
	});
	$('#at1').click(function() {  
		$('#select2 option').remove().appendTo('#select1').attr('selected','selected');  
	});
	$('#at2').click(function() {  
		$('#select1 option').remove().appendTo('#select2').attr('selected','selected');  
	});
	
});