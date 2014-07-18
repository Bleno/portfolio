/*global $:false */

$(document).ready(function() {
	
	"use strict";
	
	// table sorter init
	$(".tblr").addClass("beautifulData").beautify({
		pageSize : 7,
		pagerSize : 5
	});
	
	/* Enable table search */
	$(".table-search").keyup(function() {
		$(this).closest('div').next().beautify("rebuild", { globalFilter : $(".table-search").val() });
	});
	
});