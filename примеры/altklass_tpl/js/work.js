
$(document).ready(function() { 

	var browserVersion = detect.parse(navigator.userAgent);
	if(browserVersion.browser['family']==='Safari'){
		$('html').addClass('safari');
	}

	if(browserVersion.browser['family']==='Firefox'){
		$('html').addClass('Firefox');
	}
	if(browserVersion.browser['family']==='Chrome'){
		$('html').addClass('Chrome');
	}
	if(browserVersion.browser['family']==='Edge'){
		$('html').addClass('Edge');
	}
	console.log(browserVersion.browser['family'])


	var wScrTop =  $(window).scrollTop()
	if (wScrTop > 0) {
		$('header').addClass('fixed')
	}else{
		$('header').removeClass('fixed')
	}

	if(wScrTop > 500){
		$('.btn_upp').addClass('visible')
	}else{
		$('.btn_upp').removeClass('visible')
	}
	$(window).scroll(function(){
		var wScrTop =  $(window).scrollTop()
		if (wScrTop > 0) {
			$('header').addClass('fixed')
		}else{
			$('header').removeClass('fixed')
		}

		if(wScrTop > 500){
			$('.btn_upp').addClass('visible')
		}else{
			$('.btn_upp').removeClass('visible')
		}
	})


	var controller = new ScrollMagic.Controller();




	var screenHeight = $(window).height();
	$('.parallax_wrapper').each(function(){
		var parallaxBg = $(this).find('.parallax_bg')
		var prallax = new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 1,
			duration: screenHeight*2.5,
		})
		.setTween(TweenMax.to(parallaxBg, 10, {y:screenHeight/2,ease: Power0.easeNone}))
		.addTo(controller)
		// .addIndicators({name:"paralax"});
	});

	var mainContainer = $('.main_conteiner').outerHeight();
	var mainTl = new TimelineMax();
		mainTl.to('.main_conteiner', 1, {y:150,opacity: 0, ease: Power0.easeNone},0)
			  .to('.sircle_bottom', 1, {x:150,opacity: 0, ease: Power0.easeNone},0)
			  .to('.sircle_top', 1, {x:'-=150px',opacity: 0, ease: Power0.easeNone},0)
	var mainScene = new ScrollMagic.Scene({
		triggerHook: 1,
		duration: screenHeight,
	})
	.setTween(mainTl)
	.addTo(controller);





	var table = TweenMax.from('.table', 1, {x:'10%', ease: Linear.easeNone})
	var tableMoove = new ScrollMagic.Scene({
		triggerElement: '.table',
		offset: '60%',
		triggerHook: .5,
		duration: '130%',
	})
	.setTween(table)
	.addTo(controller);


	var windowWidth = $(window).width();
	if (windowWidth > 1024) {
		if(browserVersion.browser['family']==='Firefox' || browserVersion.browser['family']==='Edge'){
			console.log('ads');
			var  timeLineSection = $('.timeline').selector
			var my_gr = TweenMax.to('#gr_line_path_fierfox', 2, {x:'100%'})
			var grMoove = new ScrollMagic.Scene({
				triggerElement: timeLineSection,
				triggerHook: 0,
				duration: '500%',
			})
			.setPin('.timeline')
			.setTween(my_gr)
			.addTo(controller);
		}else{
			var  timeLineSection = $('.timeline').selector
			var my_gr = TweenMax.fromTo('#gr_line_path', 2, {width:0}, {width:'100%'})
			var grMoove = new ScrollMagic.Scene({
				triggerElement: timeLineSection,
				triggerHook: 0,
				duration: '500%',
			})
			.setPin('.timeline')
			.setTween(my_gr)
			.addTo(controller);
		}
	}



	var my_dots = new TimelineMax();
		my_dots.staggerFrom('.dot', 2,{scale:0},2,2)
			 .staggerFrom('.dot_text_before', 2,{x:'-=30',opacity:0},2,2)
			 .staggerFrom('.dot_text', 2,{scale:0, x:'-=30'},2,2)
	var dotsMoove = new ScrollMagic.Scene({
		triggerElement: timeLineSection,
		triggerHook: 0.5,
		duration: '300%',
	})
	.setTween(my_dots)
	.addTo(controller);



	var online = new TimelineMax();
	online.staggerFrom('.item', .5, {y:'30%', opacity:0},0.1)
	var onlineMoove = new ScrollMagic.Scene({
		triggerElement: '.items',
		triggerHook: .5,
	})
	.setTween(online)
	.addTo(controller);

	var for_who = new TimelineMax();
	for_who.staggerFrom('.for_item', .5, {y:100, opacity:0},0.1)
	var for_whoMoove = new ScrollMagic.Scene({
		triggerElement: '.for_who',
		triggerHook: .75,
	})
	.setTween(for_who)
	.addTo(controller);



	if (windowWidth > 1024) {
		var facts = new TimelineMax();
		facts.from('.facts circle', .2, {opacity:0})
			 .from('.fact_numbers', .2,{x:'-=100%', opacity:0})
			 .from('.wh_bg', .2,{x:'100%'})
			 .from('.fact_title_before', .2,{height:0})
			 .from('.fact_title_after', .2,{height:0})
			 .from('.fact_title', .2,{opacity:0, x: 100})
		var factsMoove = new ScrollMagic.Scene({
			triggerElement: '.facts',
			triggerHook: .5,
		})
		.setTween(facts)
		.addTo(controller);
	}else{
		var facts = new TimelineMax();
		facts.from('.fact_title', .2,{opacity:0, x: 100})
			 .from('.fact_numbers', .2,{x:'-=100%', opacity:0})
		var factsMoove = new ScrollMagic.Scene({
			triggerElement: '.facts',
			triggerHook: .5,
		})
		.setTween(facts)
		.addTo(controller);
	}


	if (windowWidth > 1024) {
		var testimonials = new TimelineMax();
		testimonials.from('.t_title', .3, {x:'100%'})
					.from('.carousel', .3, {x:'-=100%'})
		var testimonialsMoove = new ScrollMagic.Scene({
			triggerElement: '.testimonials',
			triggerHook: .5,
		})
		.setTween(testimonials)
		.addTo(controller);
	}




	$('.carousel').owlCarousel({
		items: 3,
		nav: true,
		dots: false,
		loop: true,
		autoplay: true,
		autoplayHoverPause: true,
		autoplayTimeout: 5000,
		responsive : {
			0 : {
			  items: 1
			},
			767 : {
				items: 2
			},
			1023 : {
			  items: 3
			}
		}
	});

	$(".scroll").click(function(event){
        event.preventDefault();
        var full_url = this.href;
        var parts = full_url.split("#");
        var trgt = parts[1];
        var target_offset = $("#"+trgt).offset();
        var target_top = target_offset.top - 62;
        $('html, body').animate({scrollTop:target_top}, 1500);
 	});


	$('.hamburger').click(function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active')
    		$('.mobile_menu').removeClass('opened').stop(false, true).slideUp(300);
		}else{
			$(this).addClass('active')
    		$('.mobile_menu').addClass('opened').stop(false, true).slideDown(400);
		}
	})

	$('.mobile_menu a').click(function(){
		if($('.mobile_menu').hasClass('opened')){
    		$('.mobile_menu').removeClass('opened').stop(false, true).slideUp(300);
    		$('.hamburger').removeClass('active');
		}else{
    		$('.mobile_menu').addClass('opened').stop(false, true).slideDown(400);
		}

	})
});