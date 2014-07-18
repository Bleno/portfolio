/*global $:false */

function setCookie(c_name,value,exdays) {
	
	"use strict";
	
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=value + ((exdays===null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name) {
	
	"use strict";
	
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start === -1) {
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start === -1) {
		c_value = null;
	}else{
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end === -1){
			c_end = c_value.length;
		}
		c_value = c_value.substring(c_start,c_end);
	}
	return c_value;
}

$(document).ready(function() {
	
	"use strict";
	
	var skinAppear = getCookie('body');
	
	if(skinAppear !== null) {
		$('body').addClass(skinAppear);
		
		$('.skin li a').removeClass('active');
		$('.skin li a.' + skinAppear).addClass('active');
		if(!$('.skin li a').hasClass('active')) {
			$('.skin li:first a').addClass('active');
		}
	}
	
	var backAppear = getCookie('html');
	
	if(backAppear !== null) {
		$('html').addClass('pattern-' + backAppear);
		
		$('.pattern li a').removeClass('active');
		$('.pattern li a[data-pick="' + backAppear + '"]').addClass('active');
		if(!$('.pattern li a').hasClass('active')) {
			$('.pattern li:first a').addClass('active');
		}
	}
});

setCookie();