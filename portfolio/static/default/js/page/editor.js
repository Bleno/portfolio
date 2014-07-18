/*global $:false, CKEDITOR:false */

$(document).ready(function() {
	
	"use strict";
	
	// init ckeditor
	CKEDITOR.replace('ckeditor2', { height: 500 });
	
	// search input ajax
	var searchInput = $('.example-search input');
	var searchBox = $('.example-search .search-box');
	
	searchInput.keyup(function() {
		
		var searchVal = searchInput.val();
		
		if(searchVal !== '') {
		
			$.ajax({
				url: 'ajax/editor.php',
				data: 'val=' + searchVal,
				dataType: 'json',
				success : function(data) {
					
					
					if (data.length > 0) {
						
						var item = '';
						
						for (var i = 0; i < data.length; i++) {
							
							item += '<li>' + data[i] + '</li>';
							
						}
						
						searchBox.empty().append(item).show();
						
					}else{
						
						searchBox.hide();
						
					}
				}
			});
			
		}else{
			
			searchBox.hide();
			
		}
	});
	
	searchBox.on('click', 'li', function() {
		searchInput.val($(this).html());
		searchBox.hide();
	});
	
});