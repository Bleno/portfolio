/*global $:false, Power1:false, TweenLite:false, setCookie:false, prettyPrint:false */

$(document).ready(function() {
	
	"use strict";
	
	/* go top button */
	function callGoTop() {
		
		if($(window).scrollTop() > 300) {
			if($('#gotop').is(':hidden')) {
				$('#gotop').css('opacity','0.8').fadeIn(150);
			}
		}else{
			$('#gotop').fadeOut(150);
		}
	}
	callGoTop();
	$(window).scroll(function() {
		callGoTop();
	});
	$('#gotop').hover(function(){
		TweenLite.to($(this), 0.5, {opacity:1, ease:Power1.easeOut});
	}, function() {
		TweenLite.to($(this), 0, {opacity:0.8, ease:Power1.easeOut});
	})
	.click(function() {
		if($(window).scrollTop() > 300) {
			$('html, body').stop(true,true).animate({scrollTop: 0}, 600);
			$('#gotop').fadeOut(600);
		}
	});
	
	/* swich admin skin */
	$('.skin a').click(function() {
		
		$('.skin a').removeClass('active');
		$(this).addClass('active');
		
		var skinType = $(this).data('pick');
		$('body').removeAttr('class').addClass(skinType);
		setCookie('body',skinType,5);
		
		$('#dynamic').empty().html('5,10,15,20,18,16,14,20,15,16,12,10').sparkline('html', {type: 'bar', barColor: $('#dynamic').css('color'), barWidth: 5, height: 31, barSpacing: 3});
		
	});
	
	/* swich admin pattern */
	$('.pattern a').click(function() {
		
		$('.pattern a').removeClass('active');
		$(this).addClass('active');
		
		var skinType = 'pattern-' + $(this).data('pick');
		$('html').removeAttr('class').addClass(skinType);
		setCookie('html',$(this).data('pick'),5);
		
	});
	
	/* Custom scroll on navigation */
	$(".sidebar-nav").mCustomScrollbar({
		autoHideScrollbar:true,
		scrollInertia:600,
		theme:"light-thin"
	});
	
	/* sidebar open */
	var seachSpeed = 0.2;
	var searchBox = $(".right-bar.search-box");
	var rightOpen = $('.right-open');
	var rightBar = $('.right-bar');
	var rightShow;
	var rightHide;
	
	function rightPosition() {
		if($(window).width() <= 950) {
			rightShow = 46;
			rightHide = -215;
		}else{
			rightShow = 221;
			rightHide = -40;
		}
	}
	rightPosition();
	$(window).resize(rightPosition);
	
	
	$('.container').click(function() {
		TweenLite.to($('.right-bar.open'), seachSpeed, {left:rightHide, ease:Power1.easeOut});
		$('.right-bar.open').removeClass('open');
		$('.right-open.toggle').removeClass('toggle');
	});
	
	function elementAction(element) {
		
		if(rightBar.hasClass('open')) {
			
			
			if(!element.hasClass('open')) {
				TweenLite.to(element, seachSpeed, {delay: seachSpeed, left:rightShow, ease:Power1.easeOut});
				setTimeout(function() {
					element.addClass('open');
				}, seachSpeed );
			}
			
			TweenLite.to($('.right-bar.open'), seachSpeed, {left:rightHide, ease:Power1.easeOut});
			$('.right-bar.open').removeClass('open');
			
		}else{
			
			TweenLite.to(element, seachSpeed, {left:rightShow, ease:Power1.easeOut});
			element.addClass('open');
			
		}
	}
	
	rightOpen.click(function() {
		if(!$(this).hasClass('toggle')) {
			$('.right-open.toggle').removeClass('toggle');
			$(this).addClass('toggle');
		}else{
			$(this).removeClass('toggle');
		}
		var eleHref = $(this).data('href');
		elementAction($(eleHref));
	});
	
	/* bootstrap tooltips */
	$('.tip').tooltip();
	
	/* init boostrap prettyprint highlighter */
	prettyPrint();
	
	/* drop down */
	$('.drop-down span').click(function() {
		if($(this).next('ul').is(':hidden')) {
			$(this).next('ul').slideDown(150);
		}else{
			$(this).next('ul').slideUp(150);
		}
		$('.drop-down ul').not($(this).closest('.drop-down').find('ul')).hide();
	});
	$('.drop-down ul a').click(function() {
		var selectValue = $(this).html();
		$(this).closest('ul').hide().prev('span').html(selectValue);
	});
	
	
	/* header search */
	function searchAction(show) {
		if(show !== false) {
			TweenLite.to(searchBox, seachSpeed, {left:rightShow, ease:Power1.easeOut});
			searchBox.addClass('open');
		}else{
			TweenLite.to(searchBox, seachSpeed, {left:rightHide, ease:Power1.easeOut});
			searchBox.removeClass('open');
		}
	}
	
	var allProducts = '<a href="grid.html" class="show-my-all">View all products</a>';
	
	$('.navbar input').keyup(function() {
		
		var searchVal = $(this).val();
		
		if(searchVal.length > 0) {
			
			$.ajax({
				url: 'ajax/search.php',
				data: 'val=' + searchVal,
				dataType: 'json',
				success : function(data) {
					
					if (data.length > 0) {
						
						var item = '';
						
						for (var i = 0; i < data.length; i++) {
							
							item += (i === 0) ? '<ul>' : '';
							item += '<li><a href="#"><img src="img/__tmp/products/' + data[i].image + '" alt=""><div><span>Title: ' + data[i].title + '</span><span>Type: ' + data[i].type + '</span><span>Category: ' + data[i].category + '</span><span class="price">Price: ' + data[i].price + '</span></div></a></li>';
						}
						item += allProducts;
						searchBox.empty().append(item);
						
					}else{
						
						// no results...
						searchBox.empty().html('<p class="empty">No results found</p>' + allProducts);
						
					}
					
					var wait = 0;
					
					if(rightBar.hasClass('open')) {
						
						//TweenLite.to(rightBar, seachSpeed, {left:rightHide, ease:Power1.easeOut});
						rightBar.removeClass('open');
						wait = 200;
					}
					
					$('.right-open.toggle').removeClass('toggle');
					TweenLite.to($('.right-bar:not(.search-box)'), seachSpeed, {left:rightHide, ease:Power1.easeOut});
					setTimeout(searchAction,wait);
				}
			});
			
		}else{
			
			// empty val
			searchBox.empty();
			searchAction(false);
			
		}
	})
	.focusin(function() {
		
		if($('ul li',searchBox).length > 0 && !searchBox.hasClass('open')) {
			
			var wait = 0;
			
			if(rightBar.hasClass('open')) {
				TweenLite.to(rightBar, seachSpeed, {left:rightHide, ease:Power1.easeOut});
				rightBar.removeClass('open');
				wait = 200;
			}
			
			$('.right-open.toggle').removeClass('toggle');
			setTimeout(searchAction,wait);
		}
	});
	
	/* init bar chart */
	$('#dynamic').sparkline('html', {type: 'bar', barColor: $('#dynamic').css('color'), barWidth: 5, height: 31, barSpacing: 3});
	
	/* placeholder */
	$('[placeholder]').focus(function() {
		var input = $(this);
		if (input.val() === input.attr('placeholder')) {
			input.val('');
			input.removeClass('placeholder');
		}
	}).blur(function() {
		var input = $(this);
		if (input.val() === '' || input.val() === input.attr('placeholder')) {
			input.addClass('placeholder');
			input.val(input.attr('placeholder'));
		}
	}).blur();
	$('[placeholder]').parents('form').submit(function() {
		$(this).find('[placeholder]').each(function() {
			var input = $(this);
			if (input.val() === input.attr('placeholder')) {
				input.val('');
			}
		});
	});
	
	
	/* checkbox styling */
	$('input[type="checkbox"]:not(.simple)').each(function() {
		
		$(this).hide().wrap('<span class="check-wrap"></span>').after('<a href="javascript:;"></a>');
		var $checkbox = $(this).parent('span').find('a');
		
		
		if($(this).is(':checked') && $(this).is(':disabled')){
			$checkbox.addClass('disabled-checked');
		}else if($(this).is(':disabled')){
			$checkbox.addClass('disabled');
		}else if($(this).is(':checked')){
			$checkbox.addClass('checked');
		}else if($(this).is(':disabled')){
			$checkbox.addClass('disabled');
		}
		
		if($(this).is(':disabled')){
			$checkbox.addClass('disabled');
		}
	});
	
	$('span.check-wrap').on('click', 'a', function() {
		var $input = $(this).prev('input');
		if(!$input.is(':disabled') && !$(this).hasClass('disabled-checked')){
			if(!$(this).hasClass('checked')){
				$(this).addClass('checked');
				$input.attr('checked', 'checked');
			}else{
				$(this).removeClass('checked');
				$input.removeAttr('checked');
			}
		}
	});
	
	// navigation
	$('#navigation li a').click(function() {
		var $this = $(this);
		var subMenu = $(this).closest('li').find('ul');
		if(subMenu.is(':hidden')) {
			$this.addClass('active');
			$('span:last',this).fadeOut(200);
			subMenu.stop(true,true).slideDown(200,function() {
				$(".sidebar-nav").mCustomScrollbar("update");
			});
		}else{
			$this.removeClass('active');
			$('span:last',this).fadeIn(200);
			subMenu.stop(true,true).slideUp(200, function() {
				$(".sidebar-nav").mCustomScrollbar("update");
			});
		}
	});
	$('#navigation li a span').before('<span class="bullet">&nbsp;</span>');
	
	// responsive layout
	// navbar menu
	$('.menu-holder').click(function() {
		if($('.menu').is(':hidden')) {
			$('.menu').css('display','inline-block');
		}else{
			$('.menu').css('display','none');
		}
	});
	
});