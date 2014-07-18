/*global $:false */

$(document).ready(function() {
	
	"use strict";
	
	/* table checkboxes */
	var checkAll = $('.checkboxes thead th:first .check-wrap');
	var checkRow = $('.checkboxes tbody td .check-wrap');
	
	checkAll.on('click', 'a', function() {
		
		if($(this).hasClass('checked')) {
			checkRow.find('a').addClass('checked');
			checkRow.find('input').attr('checked',true);
			checkRow.closest('tr').addClass('active');
		}else{
			checkRow.find('a').removeClass('checked');
			checkRow.find('input').removeAttr('checked');
			checkRow.closest('tr').removeClass('active');
		}
		
	});
	
	checkRow.on('click', 'a', function() {
		if($(this).hasClass('checked')) {
			$(this).closest('tr').addClass('active');
		}else{
			$(this).closest('tr').removeClass('active');
		}
	});
	
	/* init bar chart */
	$('.t-dynamic').sparkline('html', {type: 'bar', barColor: '#000', barWidth: 5, height: 30, barSpacing: 3});
	
});