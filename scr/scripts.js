
/**=========== 
	UI INTERACTIONS 
	=================*/
	$(document).ready(function(){
		
		$('.footer > div > ul > li').hover(
			function(){
				var footerUl = $(this).index();
				//var footerli = index(footerUl);
				//console.log(footerUl);
				$('#foot-pop-li > li').eq(footerUl).stop().animate({opacity: 0.9}, 500);			
			},
			function(){
				var footerUl = $(this).index();
				//var footerli = index(footerUl);
				//console.log(footerUl);
				$('#foot-pop-li > li').eq(footerUl).stop().animate({opacity: 0}, 500);			
			}		
		);
	});