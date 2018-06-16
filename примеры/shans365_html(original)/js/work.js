$(document).ready(function() { 



	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		var mainWheight = $('.main').outerHeight();
		if (scrollTop < mainWheight) {
			$('header').css({
				"top": "-"+ scrollTop +"px"
			})
		}else{
			$('header').css({
				"top": "0px"
			})
		}
		if (scrollTop < 50) {
			$('header').css({
				"top": "50px"
			})
		}
		var b_offset = 500;
	    if ($(window).scrollTop() > b_offset) {
	        $('.btn_up').addClass('visible')
	    }
	    else {
	        $('.btn_up').removeClass('visible')
	    }
	

	})
	var myScroll = $(this).scrollTop();
	var elP = $('.paralax-bg');
	elP.each(function () {
		var	elHeightIndex = $(this).data('height');
		var elHeight = $(this).parent().outerHeight() * elHeightIndex
		var elTop = $(this).parent().offset();
		var	elOff = $(this).data('offset');
		$(this).css({
			"top" : ""+ (myScroll - elTop.top) * elOff +"px",
			"height" : ""+ elHeight +"px",
		})
	})
	$(window).resize(function () {
		elP.each(function () {
			var	elHeightIndex = $(this).data('height');
			var elHeight = $(this).parent().outerHeight() * elHeightIndex
			var elTop = $(this).parent().offset();
			var	elOff = $(this).data('offset');
			$(this).css({
				"top" : ""+ (myScroll - elTop.top) * elOff +"px",
				"height" : ""+ elHeight +"px",
			})
		})
	})
	$(window).scroll(function () {

		var myScroll = $(this).scrollTop();
		var elP = $('.paralax-bg');
		elP.each(function () {
			var elTop = $(this).parent().offset();
			var	elOff = $(this).data('offset');
			$(this).css({
				"top" : ""+ (myScroll - elTop.top) * elOff +"px"
			})
		})
	})
	
	$('.slider').owlCarousel({
	  items: 2,
	  nav: false,
	  dots: true,
	  loop: true,
	  autoplay: true,
	  autoplayHoverPause: true,
	  autoplayTimeout: 5000,
	  responsive : {
	      0 : {
	          items: 1
	      },
	      1025 : {
	          items: 2
	      }
	  }
	});



	$("#primary-nav").mmenu({
		"extensions": [
            "theme-white",
			"pagedim-black",
            "border-full"
		],
	    "dropdown": true,
	    "autoHeight": true,
	    "navbar" : {
			"title" : "Меню",
		},
    },
    {
	    "clone": true,
	});



	wow = new WOW(
        {
            boxClass:     'wow',      // default
            animateClass: 'animated', // default
            offset:       0,          // default
            mobile:       true,       // default
            live:         false        // default
    	}
    )
    wow.init();



	$(".scroll").click(function(event){
        event.preventDefault();
        var full_url = this.href;
        var parts = full_url.split("#");
        var trgt = parts[1];
        var target_offset = $("#"+trgt).offset();
        var target_top = target_offset.top;
        $('html, body').animate({scrollTop:target_top}, 1000);
 	});


	if ($(window).width() > 980) {
	  skrollr.init({
		forceHeight: false,
		easing: {
		  vibrate: function(p) {
			return Math.sin(p * 10 * Math.PI);
		  }
		}
	  });
	}

});