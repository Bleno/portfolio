/*global $:false, alert:false */

$(document).ready(function() {
	
	"use strict";
	
	// init dropzone
	$(".dropzone-box").dropzone({ url: "ajax/file.php" });
	
	// init file tree
	$(document).ready( function() {
		$('#file_tree_box').fileTree({ 
			root: '/var/www/default/dev/theme.bootstrap/',
			script: 'ajax/jquery.file.tree.php'
		}, function(file) {
			alert(file);
		});
	});
	
});