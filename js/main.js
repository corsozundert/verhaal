(function ($) {
	
	// Init ScrollMagic
    var controller = new ScrollMagic.Controller();
    
	// Enable ScrollMagic only for desktop, disable on touch and mobile devices
	if (!Modernizr.touch) {
		
		$('body').addClass('overflow-hidden');
		$('html').css({
			'overflow': 'hidden',
			'height': '100%'
		})
		
	    // Preloader
		var loadedCount = 0; //current number of images loaded
		var imagesToLoad = $('.bcg').length; //number of slides with .bcg container
		var loadingProgress = 0; //timeline progress - starts at 0
	
		$('.bcg').imagesLoaded({
		    background: true
		  }
		).progress( function( instance, image ) {
			loadProgress();
		});
	
		function loadProgress(imgLoad, image)
		{
			loadedCount++;
			loadingProgress = (loadedCount/imagesToLoad);
			TweenLite.to(progressTl, 1, {progress:loadingProgress, ease:Linear.easeNone});
		}
		var progressTl = new TimelineMax({paused:true,onUpdate:progressUpdate,onComplete:loadComplete});
	
		progressTl
			.to($('.progress span'), 1, {width:100, ease:Linear.easeNone});
	
		function progressUpdate()
		{
			loadingProgressPerc = Math.round(progressTl.progress() * 100);
			loadingProgress = (progressTl.progress() * 268) + 'px';
			$('.intro-logo').css('clip', 'rect(0px, ' + loadingProgress + ' ,150px,0px)');
		}
	
		function loadComplete() {
	
			var preloaderOutTl = new TimelineMax();
			preloaderOutTl
				.to($('.intro-logo-grayscale '), 0, {autoAlpha:0, delay:0.85})
				.to($('.intro-logo'), 0.55, {y: -180, ease:Back.easeIn, delay:0.35})
				.set($('body'), {className: '-=is-loading'})
				.to($('#preloader'), 0.75, {yPercent: 100, ease:Power4.easeInOut, onComplete:enableScroll})
				.set($('#preloader'), {className: '+=is-hidden'})
				.from($('#intro'), 1.5, {autoAlpha: 0, ease:Power1.easeOut}, '-=0.3')
				.from($('#intro h1'), 0.75, {autoAlpha: 0, ease:Power1.easeOut}, '-=0.8')
				.from($('#intro .logo'), 0.5, {autoAlpha: 0, ease:Power1.easeOut}, '-=0.25')
			return preloaderOutTl;
		}
		
		function enableScroll() {
			$('html').css({
				'overflow': 'auto',
				'height': 'auto'
			})
			
			/* Custom scrollbar + smooth scrollen */
			var OSName="Unknown OS";
			if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
			else if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
			else if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
			else if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
			
			
			if (OSName != 'MacOS' ) {
				$(document).ready(function() {  
				    $("html").niceScroll({
						cursorcolor:		"#333",
						cursorwidth: 		"12px",
						cursorborder: 		"2px solid rgba(0,0,0,0)",
						cursorborderradius: "12px",
						scrollspeed: 		150,
						mousescrollstep:	60,
						autohidemode: 		true,
						background: 		'rgba(255,255,255,0.7)',
						cursorfixedheight: 	false,
						cursorminheight: 	20,
						enablekeyboard: 	true,
						horizrailenabled: 	false,
						bouncescroll: 		false,
						smoothscroll: 		true,
						iframeautoresize: 	true,
						touchbehavior: 		false,
						oneaxismousemode:	true,
						zindex: 999
				    });
				    
				    $('body').addClass('overflow-hidden');
				    
				});
			}			
		}

		var slideDuration = '100%';
	    var outroTweenIntro = new TimelineMax();

	    outroTweenIntro
	    	.to($('#intro .bcg'), 1.4, {y: '20%', ease:Power1.easeOut}, '-=0.2')
	    	.to($('#intro .bcg'), 0.7, {autoAlpha: 0.15, ease:Power1.easeNone, delay:0.5}, 0);

		var introScene = new ScrollMagic.Scene({
	        triggerElement: '#intro', 
	        triggerHook: 0,
	        duration: "100%"
	    })
	    .setTween(outroTweenIntro)
	    .addTo(controller);

	    
	    // SCENE REUSACHTIG
	    var bigImgSlide = $('#slideReusachtig .imageSlide .bcg');

	    var introReusachtig = new TimelineMax({repeat:0, paused:true});
	    introReusachtig
	    	.to(bigImgSlide, 4, {scale:"1.55", rotationZ: 0.01, force3D:true, ease:Power2.easeInOut })
	    	.to($('#slideReusachtig .intro'), 1, {autoAlpha: 1 },'-=4')
	    	.from($('#slideReusachtig .intro'), 0.75, {y: '-40px', ease:Power1.easeOut} ,"-=4")
	    	.to($('#slideReusachtig .buttons a.btn.jury'), 0.4, {autoAlpha: 1 },'-=3.5')
	    	.to($('#slideReusachtig .buttons a.btn.voortbeweging'), 0.4, {autoAlpha: 1 },'-=3.25');
 
		var reusachtigScene = new ScrollMagic.Scene({
		    triggerElement: '#slideReusachtig', 
		    triggerHook: 0,
		    duration: slideDuration
		})		
		.setPin("#slideReusachtig .imageSlide")
		.addTo(controller);
		setScrollMagicEvents(reusachtigScene, bigImgSlide, introReusachtig);
		
		var outroReusachtig = new TimelineMax();
	    outroReusachtig
	    	.to($('#slideReusachtig .bcg'), 1.4, {y: '20%', ease:Power1.easeInOut}, '-=0.5')
	    	.to($('#slideReusachtig .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone, delay:0.5 }, 0);		
		
		var reusachtigOutroScene = new ScrollMagic.Scene({
		    triggerElement: '#slideJubel', 
		    triggerHook: 60,
		    duration: "100%"
		})	
	    .setTween(outroReusachtig)
	    .addTo(controller);	
	  
		
		// SCENE JUBEL
	    var bigImgSlide2 = $('#slideJubel .imageSlide .bcg');
    
	    var introJubel = new TimelineMax({repeat:0, paused:true});
	    introJubel
	    	.to(bigImgSlide2, 6, {scale:"1.25", rotationZ: 0.01, force3D:true, ease:Power1.easeInOut })
	    	.to($('#slideJubel .intro'), 1, {autoAlpha: 1 },'-=6')
	    	.from($('#slideJubel .intro'), 0.75, {y: '-40px', ease:Power1.easeOut} ,"-=6")
	    	.to($('#slideJubel .buttons a.btn.jubel'), 0.4, {autoAlpha: 1 },'-=5.5');
	    	
		var jubelScene = new ScrollMagic.Scene({
		    triggerElement: '#slideJubel', 
		    triggerHook: 0,
		    duration: slideDuration
		})
		.setPin("#slideJubel .imageSlide")
		.addTo(controller);
		setScrollMagicEvents(jubelScene, bigImgSlide2, introJubel);
		
		var outroJubel = new TimelineMax();
	    outroJubel
	    	.to($('#slideJubel .bcg'), 1.4, {y: '20%', ease:Power1.easeInOut}, '-=0.5')
	    	.to($('#slideJubel .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone, delay:0.5 }, 0);		
		
		var jubelOutroScene = new ScrollMagic.Scene({
		    triggerElement: '#slideVrijwilligers', 
		    triggerHook: 60,
		    duration: "100%"
		})	
	    .setTween(outroJubel)
	    .addTo(controller);
		
		
		
		// SCENE VRIJWILLIGERS
	    var bigImgSlide3 = $('#slideVrijwilligers .imageSlide .bcg');

	    var introVrijwilliger = new TimelineMax({repeat:0, paused:true});
	    introVrijwilliger
	    	.to(bigImgSlide3, 6, {scale:"1.25", rotationZ: 0.01, force3D:true, ease:Power1.easeInOut })
	    	.to($('#slideVrijwilligers .intro'), 1, {autoAlpha: 1 },'-=6')
	    	.from($('#slideVrijwilligers .intro'), 0.75, {y: '-40px', ease:Power1.easeOut} ,"-=6")
	    	.to($('#slideVrijwilligers .buttons a.btn.buurtschappen'), 0.4, {autoAlpha: 1 },'-=5.5');	
	    	
		var vrijwilligersScene = new ScrollMagic.Scene({
		    triggerElement: '#slideVrijwilligers', 
		    triggerHook: 0,
		    duration: slideDuration
		})
		.setPin("#slideVrijwilligers .imageSlide")
		.addTo(controller);	
		setScrollMagicEvents(vrijwilligersScene, bigImgSlide3, introVrijwilliger);
		
		var outroVrijwilliger = new TimelineMax();
	    outroVrijwilliger
	    	.to($('#slideVrijwilligers .bcg'), 1.4, {y: '20%', ease:Power1.easeNone}, 0)
	    	.to($('#slideVrijwilligers .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone, delay:0.5 }, 0);		
		
		var vrijwilligerOutroScene = new ScrollMagic.Scene({
		    triggerElement: '#slideBouw', 
		    triggerHook: 60,
		    duration: "100%"
		})	
	    .setTween(outroVrijwilliger)
	    .addTo(controller);

		
		// SCENE BOUW
	    var bigImgSlide4 = $('#slideBouw .imageSlide .bcg');

	    var introBouw = new TimelineMax({repeat:0, paused:true});
	    introBouw
	    	.to(bigImgSlide4, 6, {scale:"1.25", rotationZ: 0.01, force3D:true, ease:Power1.easeInOut })	
	    	.to($('#slideBouw .intro'), 1, {autoAlpha: 1 },'-=6')
	    	.from($('#slideBouw .intro'), 0.75, {y: '-40px', ease:Power1.easeOut} ,"-=6")
	    	.to($('#slideBouw .buttons a.btn.maquettes'), 0.4, {autoAlpha: 1 },'-=5.5')
	    	.to($('#slideBouw .buttons a.btn.ontwerpers'), 0.4, {autoAlpha: 1 },'-=5.25');	    	    	

		var bouwScene = new ScrollMagic.Scene({
		    triggerElement: '#slideBouw', 
		    triggerHook: 0,
		    duration: slideDuration
		})
		.setPin("#slideBouw .imageSlide")
		.addTo(controller);	
		setScrollMagicEvents(bouwScene, bigImgSlide4, introBouw);	
		
		var outroBouw = new TimelineMax();
	    outroBouw
	    	.to($('#slideBouw .bcg'), 1.4, {y: '20%', ease:Power1.easeNone}, 0)
	    	.to($('#slideBouw .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone, delay:0.5 }, 0);		
		
		var bouwOutroScene = new ScrollMagic.Scene({
		    triggerElement: '#slideBloemenveld', 
		    triggerHook: 60,
		    duration: "100%"
		})	
	    .setTween(outroBouw)
	    .addTo(controller);		
		
			
		// SCENE BLOEMENVELD
	    var bigImgSlide5 = $('#slideBloemenveld .imageSlide .bcg');

	    var introBloemenveld = new TimelineMax({repeat:0, paused:true});
	    introBloemenveld
	    	.to(bigImgSlide5, 6, {scale:"1.25", rotationZ: 0.01, force3D:true, ease:Power1.easeInOut })
	    	.to($('#slideBloemenveld .intro'), 1, {autoAlpha: 1 },'-=6')
	    	.from($('#slideBloemenveld .intro'), 0.75, {y: '-40px', ease:Power1.easeOut} ,"-=6");

		var bloemenveldScene = new ScrollMagic.Scene({
		    triggerElement: '#slideBloemenveld', 
		    triggerHook: 0,
		    duration: slideDuration
		})
		.setPin("#slideBloemenveld .imageSlide")
		.addTo(controller);	
		setScrollMagicEvents(bloemenveldScene, bigImgSlide5, introBloemenveld);
		
		var outroBloemenveld = new TimelineMax();
	    outroBloemenveld
	    	.to($('#slideBloemenveld .bcg'), 1.4, {y: '20%', ease:Power1.easeNone}, 0)
	    	.to($('#slideBloemenveld .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone, delay:0.5 }, 0);		
		
		var bloemenveldOutroScene = new ScrollMagic.Scene({
		    triggerElement: '#slideTikken', 
		    triggerHook: 60,
		    duration: "100%"
		})	
	    .setTween(outroBloemenveld)
	    .addTo(controller);			

		
		// SCENE TIKKEN
	    var bigImgSlide6 = $('#slideTikken .imageSlide .bcg');

	    var introTikken = new TimelineMax({repeat:0, paused:true});
	    introTikken
	    	.to(bigImgSlide6, 6, {scale:"1.25", rotationZ: 0.01, force3D:true, ease:Power1.easeInOut })
	    	.to($('#slideTikken .intro'), 1, {autoAlpha: 1 },'-=6')
	    	.from($('#slideTikken .intro'), 0.75, {y: '-40px', ease:Power1.easeOut} ,"-=6");	    	

	    	
		var tikkenScene = new ScrollMagic.Scene({
		    triggerElement: '#slideTikken', 
		    triggerHook: 0,
		    duration: slideDuration
		})
		.setPin("#slideTikken .imageSlide")
		.addTo(controller);	
		setScrollMagicEvents(tikkenScene, bigImgSlide6, introTikken);
		
		var outroTikken = new TimelineMax();
	    outroTikken
	    	.to($('#slideTikken .bcg'), 1.4, {y: '20%', ease:Power1.easeNone}, 0)
	    	.to($('#slideTikken .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone, delay:0.5 }, 0);		
		
		var tikkenOutroScene = new ScrollMagic.Scene({
		    triggerElement: '#slideHistorie', 
		    triggerHook: 60,
		    duration: "100%"
		})	
	    .setTween(outroTikken)
	    .addTo(controller);			
		
		
		// SCENE HISTORIE
	    var bigImgSlide7 = $('#slideHistorie .imageSlide .bcg');

	    var introHistorie= new TimelineMax({repeat:0, paused:true});
	    introHistorie
	    	.to(bigImgSlide7, 6, {scale:"1.15", rotationZ: 0.01, force3D:true, ease:Power1.easeInOut })
	    	.to($('#slideHistorie .intro'), 1, {autoAlpha: 1 },'-=6')
	    	.from($('#slideHistorie .intro'), 0.75, {y: '-40px', ease:Power1.easeOut} ,"-=6")
	    	.to($('#slideHistorie .buttons a.btn.historie'), 0.4, {autoAlpha: 1 },'-=5.5');		    	
	    	
		var historieScene = new ScrollMagic.Scene({
		    triggerElement: '#slideHistorie', 
		    triggerHook: 0,
		    duration: slideDuration
		})
		.setPin("#slideHistorie .imageSlide")
		.addTo(controller);	
		setScrollMagicEvents(historieScene, bigImgSlide7, introHistorie);

		var outroHistorie = new TimelineMax();
	    outroHistorie
	    	.to($('#slideHistorie .bcg'), 1.4, {y: '20%', ease:Power1.easeNone}, 0)
	    	.to($('#slideHistorie .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone, delay:0.5 }, 0);		
		
		var historieOutroScene = new ScrollMagic.Scene({
		    triggerElement: '#slideFeest', 
		    triggerHook: 60,
		    duration: "100%"
		})	
	    .setTween(outroHistorie)
	    .addTo(controller);				
		
		
		// SCENE FEEST
	    var bigImgSlide8 = $('#slideFeest .imageSlide .bcg');

	    var introFeest = new TimelineMax({repeat:0, paused:true});
	    introFeest
	    	.to(bigImgSlide8, 6, {scale:"1.25", rotationZ: 0.01, force3D:true, ease:Power1.easeInOut })
	    	.from($('#slideFeest .intro'), 1, {y: '-40px', ease:Power1.easeOut} ,"-=6")
	    	.to($('#slideFeest .intro'), 0.75, {autoAlpha: 1 },"-=6")
	    	.to($('#slideFeest .buttons a.btn.feest'), 0.4, {autoAlpha: 1 },'-=5.5');    
	    	
		var feestScene = new ScrollMagic.Scene({
		    triggerElement: '#slideFeest', 
		    triggerHook: 0,
		    duration: "75%"
		})
		.on("start", function (event) {
			bigImgSlide8.css('position', 'relative');
			introFeest.play();
		})	
		.on("enter", function (event) {
			introFeest.resume();
		})	
		.on("leave", function (event) {
			if(event.scrollDirection == 'REVERSE') {
				introFeest.pause();
			}
		})		
		.on("end", function (event) {
			bigImgSlide8.css('position', 'fixed');
			bigImgSlide8.css('top', '0');
			bigImgSlide8.css('left', '0');		
		})		
		.setPin("#slideFeest .imageSlide")
		.addTo(controller);	
		
		var notScrolling = true;
		// Smooth scrollen naar anchor
		controller.scrollTo(function (newpos) {
			notScrolling = false;
			if(newpos != 0) {
				newpos += $(window).height();
			}
		    TweenMax.to(window, 2, {scrollTo: {y: newpos}, ease:Power1.easeInOut, onComplete:enableScrolling});
		});
		
		function enableScrolling() {
			notScrolling = true;
		}
		
		$(document).on("click", "a[href^='#']", function (e) {
			$('nav li a').removeClass('active');
			$(this).addClass('active');
		    var id = $(this).attr("href");
		    if ($(id).length > 0) {
		        e.preventDefault();
		        controller.scrollTo(id);
		 
		        if (window.history && window.history.pushState) {
		            history.pushState("", document.title, id);
		        }
		    }
		});	
		
		$(window).scroll(function () {
			if($(document).scrollTop() < 250) {
				if(notScrolling) {
					$('nav li a').removeClass('active');
					$('nav li:first-child a').addClass('active');
				}
			}
		});	

		function setScrollMagicEvents(scene, slide, timeline) {
			scene.on("start", function (event) {
				slide.css('position', 'relative');
				timeline.play();
			})	
			scene.on("enter", function (event) {
				if(event.scrollDirection == 'REVERSE') {
					timeline.resume();
				}
			})	
			scene.on("leave", function (event) {
				$( slide ).removeClass('blurred');
				$( slide.parent().find(".wrapper")).removeClass('blurred');
				if(event.scrollDirection == 'REVERSE') {
					timeline.pause();
				}
			})		
			scene.on("end", function (event) {
				if(event.scrollDirection == 'FORWARD') {
					timeline.pause();
				}			
			})	
		}
				
		setButtons($('#slideReusachtig'), true);
		setButtons($('#slideVrijwilligers'), true);			
		setButtons($('#slideBouw'), true);		
		setButtons($('#slideHistorie'), true);				
		
	}
	
	
	
	
	/* SCROLLMAGIC MOBILE */
	else {
		
   		var controller = new ScrollMagic.Controller();
   		
		$('body').addClass('overflow-hidden');
		$('html').css({
			'overflow': 'hidden',
			'height': '100%',
			'width': '100%',
			'position': 'fixed'
		})
		
	    // Preloader
		var loadedCount = 0; //current number of images loaded
		var imagesToLoad = $('.bcg, img').length; //number of slides with .bcg container
		var loadingProgress = 0; //timeline progress - starts at 0
	
		$('.bcg, img').imagesLoaded({
		    background: true
		  }
		).progress( function( instance, image ) {
			loadProgress();
		});
	
		function loadProgress(imgLoad, image)
		{
			loadedCount++;
			loadingProgress = (loadedCount/imagesToLoad);
			TweenLite.to(progressTl, 1, {progress:loadingProgress, ease:Linear.easeNone});
		}
		var progressTl = new TimelineMax({paused:true,onUpdate:progressUpdate,onComplete:loadComplete});
	
		progressTl
			.to($('.progress span'), 1, {width:100, ease:Linear.easeNone});
	
		function progressUpdate()
		{
			loadingProgressPerc = Math.round(progressTl.progress() * 100);
			loadingProgress = (progressTl.progress() * 268) + 'px';
			$('.intro-logo').css('clip', 'rect(0px, ' + loadingProgress + ' ,150px,0px)');
		}
	
		function loadComplete() {
	
			var preloaderOutTl = new TimelineMax();
			preloaderOutTl
				.to($('.intro-logo-grayscale '), 0, {autoAlpha:0, delay:0.85})
				.to($('.intro-logo'), 0.55, {y: -180, ease:Back.easeIn, delay:0.35})
				.set($('body'), {className: '-=is-loading'})
				.to($('#preloader'), 0.75, {yPercent: 100, ease:Power4.easeInOut, onComplete:enableScroll})
				.set($('#preloader'), {className: '+=is-hidden'})
				.from($('#intro'), 1.5, {autoAlpha: 0, ease:Power1.easeOut}, '-=0.3')
				.from($('#intro h1'), 0.75, {autoAlpha: 0, ease:Power1.easeOut}, '-=0.8')
				.from($('#intro .logo'), 0.5, {autoAlpha: 0, ease:Power1.easeOut}, '-=0.25')
			return preloaderOutTl;
		}
		
		function enableScroll() {
			$('html').css({
				'overflow': 'auto',
				'height': 'auto',
				'width': 'auto',
				'position': 'relative'
			})
		}   	
		
	    var outroTweenIntro = new TimelineMax();

	    outroTweenIntro
	    	.to($('#intro .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone, delay:0.5}, 0);

		var introScene = new ScrollMagic.Scene({
	        triggerElement: '#intro', 
	        triggerHook: 0,
	        duration: "100%"
	    })
	    .setTween(outroTweenIntro)
	    .addTo(controller);

	    
	    // SCENE REUSACHTIG
	    var bigImgSlide = $('#slideReusachtig .imageSlide .bcg');

	    var introReusachtig = new TimelineMax({repeat:0, paused:true});
	    introReusachtig
	    	.to(bigImgSlide, 4, {scale:"1.55", rotationZ: 0.01, force3D:true, ease:Power2.easeInOut })
	    	.to($('#slideReusachtig .intro'), 2, {autoAlpha: 1 },'-=4')
	    	.from($('#slideReusachtig .intro'), 0.75, {y: '-100px', ease:Power1.easeOut} ,"-=4")
	    	.to($('#slideReusachtig .buttons a.btn.jury'), 0.4, {autoAlpha: 1 },'-=3.5')
	    	.to($('#slideReusachtig .buttons a.btn.voortbeweging'), 0.4, {autoAlpha: 1 },'-=3.25');
 
		var reusachtigScene = new ScrollMagic.Scene({
		    triggerElement: '#slideReusachtig', 
		    triggerHook: 'onLeave',
		    offset:-150,
		    duration: slideDuration
		})		
		.addTo(controller);
		
		var outroReusachtig = new TimelineMax();
	    outroReusachtig
	    	.to($('#slideReusachtig .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone, delay:0.5 }, 0);		
		
		var reusachtigOutroScene = new ScrollMagic.Scene({
		    triggerElement: '#slideJubel', 
		    triggerHook: 50,
		    offset:-100,
		    duration: "100%"
		})	
	    .setTween(outroReusachtig)
	    .addTo(controller);		
	    setScrollMagicEvents(reusachtigScene, bigImgSlide, introReusachtig);	
				
		
		// SCENE JUBEL
	    var bigImgSlide2 = $('#slideJubel .imageSlide .bcg');
	    
	    var introJubel = new TimelineMax({repeat:0, paused:true});
	    introJubel
	    	.to(bigImgSlide2, 6, {scale:"1.25", rotationZ: 0.01, force3D:true, ease:Power1.easeInOut })
	    	.to($('#slideJubel .intro'), 2, {autoAlpha: 1 },'-=6')
	    	.from($('#slideJubel .intro'), 0.75, {y: '-100px', ease:Power1.easeOut} ,"-=6")
	    	.to($('#slideJubel .buttons a.btn.jubel'), 0.4, {autoAlpha: 1 },'-=5.5');
 
		var jubelScene = new ScrollMagic.Scene({
		    triggerElement: '#slideJubel', 
		    triggerHook: 'onLeave',
		    offset:-150,
		    duration: slideDuration
		})		
		.addTo(controller);
		
		var outroJubel = new TimelineMax();
	    outroJubel
	    	.to($('#slideJubel .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone, delay:0.5 }, 0);		
		
		var jubelOutroScene = new ScrollMagic.Scene({
		    triggerElement: '#slideVrijwilligers', 
		    triggerHook: 50,
		    offset:-100,
		    duration: "100%"
		})	
	    .setTween(outroJubel)
	    .addTo(controller);		
	    setScrollMagicEvents(jubelScene, bigImgSlide2, introJubel);	   
	    
	    
		// SCENE VRIJWILLIGERS
	    var bigImgSlide3 = $('#slideVrijwilligers .imageSlide .bcg');
	    
	    var introVrijwilligers = new TimelineMax({repeat:0, paused:true});
	    introVrijwilligers
	    	.to(bigImgSlide3, 6, {scale:"1.25", rotationZ: 0.01, force3D:true, ease:Power1.easeInOut })
	    	.to($('#slideVrijwilligers .intro'), 2, {autoAlpha: 1 },'-=6')
	    	.from($('#slideVrijwilligers .intro'), 0.75, {y: '-100px', ease:Power1.easeOut} ,"-=6")
	    	.to($('#slideVrijwilligers .buttons a.btn.buurtschappen'), 0.4, {autoAlpha: 1 },'-=5.5');
 
		var vrijwilligersScene = new ScrollMagic.Scene({
		    triggerElement: '#slideVrijwilligers', 
		    triggerHook: 'onLeave',
		    offset:-150,
		    duration: slideDuration
		})		
		.addTo(controller);
		
		var outroVrijwilligers = new TimelineMax();
	    outroVrijwilligers
	    	.to($('#slideVrijwilligers .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone, delay:0.5 }, 0);		
		
		var vrijwilligersOutroScene = new ScrollMagic.Scene({
		    triggerElement: '#slideBouw', 
		    triggerHook: 50,
		    offset:-100,
		    duration: "100%"
		})	
	    .setTween(outroVrijwilligers)
	    .addTo(controller);		
	    setScrollMagicEvents(vrijwilligersScene, bigImgSlide3, introVrijwilligers);		

	    
		// SCENE BOUW
	    var bigImgSlide4 = $('#slideBouw .imageSlide .bcg');
	    
	    var introBouw = new TimelineMax({repeat:0, paused:true});
	    introBouw
	    	.to(bigImgSlide4, 6, {scale:"1.25", rotationZ: 0.01, force3D:true, ease:Power1.easeInOut })
	    	.to($('#slideBouw .intro'), 2, {autoAlpha: 1 },'-=6')
	    	.from($('#slideBouw .intro'), 0.75, {y: '-100px', ease:Power1.easeOut} ,"-=6")
	    	.to($('#slideBouw .buttons a.btn.maquettes'), 0.4, {autoAlpha: 1 },'-=5.5')
	    	.to($('#slideBouw .buttons a.btn.ontwerpers'), 0.4, {autoAlpha: 1 },'-=5.25');	    	
 
		var bouwScene = new ScrollMagic.Scene({
		    triggerElement: '#slideBouw', 
		    triggerHook: 'onLeave',
		    offset:-150,
		    duration: slideDuration
		})		
		.addTo(controller);
		
		var outroBouw = new TimelineMax();
	    outroBouw
	    	.to($('#slideBouw .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone, delay:0.5 }, 0);		
		
		var bouwOutroScene = new ScrollMagic.Scene({
		    triggerElement: '#slideBloemenveld', 
		    triggerHook: 50,
		    offset:-100,
		    duration: "100%"
		})	
	    .setTween(outroBouw)
	    .addTo(controller);		
	    setScrollMagicEvents(bouwScene, bigImgSlide4, introBouw);

	    
		// SCENE BLOEMENVELD
	    var bigImgSlide5 = $('#slideBloemenveld .imageSlide .bcg');
	    
	    var introBloemenveld = new TimelineMax({repeat:0, paused:true});
	    introBloemenveld
	    	.to(bigImgSlide5, 6, {scale:"1.25", rotationZ: 0.01, force3D:true, ease:Power1.easeInOut })
	    	.to($('#slideBloemenveld .intro'), 2, {autoAlpha: 1 },'-=6')
	    	.from($('#slideBloemenveld .intro'), 0.75, {y: '-100px', ease:Power1.easeOut} ,"-=6")    	
 
		var bloemenveldScene = new ScrollMagic.Scene({
		    triggerElement: '#slideBloemenveld', 
		    triggerHook: 'onLeave',
		    offset:-150,
		    duration: slideDuration
		})		
		.addTo(controller);
		
		var outroBloemenveld = new TimelineMax();
	    outroBloemenveld
	    	.to($('#slideBloemenveld .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone, delay:0.5 }, 0);		
		
		var BloemenveldOutroScene = new ScrollMagic.Scene({
		    triggerElement: '#slideTikken', 
		    triggerHook: 50,
		    offset:-100,
		    duration: "100%"
		})	
	    .setTween(outroBloemenveld)
	    .addTo(controller);		
	    setScrollMagicEvents(bloemenveldScene, bigImgSlide5, introBloemenveld);
	    
	    
		// SCENE TIKKEN
	    var bigImgSlide6 = $('#slideTikken .imageSlide .bcg');
	    
	    var introTikken = new TimelineMax({repeat:0, paused:true});
	    introTikken
	    	.to(bigImgSlide6, 6, {scale:"1.25", rotationZ: 0.01, force3D:true, ease:Power1.easeInOut })
	    	.to($('#slideTikken .intro'), 2, {autoAlpha: 1 },'-=6')
	    	.from($('#slideTikken .intro'), 0.75, {y: '-100px', ease:Power1.easeOut} ,"-=6")    	
 
		var tikkenScene = new ScrollMagic.Scene({
		    triggerElement: '#slideTikken', 
		    triggerHook: 'onLeave',
		    offset:-150,
		    duration: slideDuration
		})		
		.addTo(controller);
		
		var outroTikken = new TimelineMax();
	    outroTikken
	    	.to($('#slideTikken .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone, delay:0.5 }, 0);		
		
		var tikkenOutroScene = new ScrollMagic.Scene({
		    triggerElement: '#slideHistorie', 
		    triggerHook: 50,
		    offset:-100,
		    duration: "100%"
		})	
	    .setTween(outroTikken)
	    .addTo(controller);		
	    setScrollMagicEvents(tikkenScene, bigImgSlide6, introTikken);	    

	    
		// SCENE HISTORIE
	    var bigImgSlide7 = $('#slideHistorie .imageSlide .bcg');
	    
	    var introHistorie = new TimelineMax({repeat:0, paused:true});
	    introHistorie
	    	.to(bigImgSlide7, 6, {scale:"1.25", rotationZ: 0.01, force3D:true, ease:Power1.easeInOut })
	    	.to($('#slideHistorie .intro'), 2, {autoAlpha: 1 },'-=6')
	    	.from($('#slideHistorie .intro'), 0.75, {y: '-100px', ease:Power1.easeOut} ,"-=6")
	    	.to($('#slideHistorie .buttons a.btn.historie'), 0.4, {autoAlpha: 1 },'-=5.5');
 
		var historieScene = new ScrollMagic.Scene({
		    triggerElement: '#slideHistorie', 
		    triggerHook: 'onLeave',
		    offset:-150,
		    duration: slideDuration
		})		
		.addTo(controller);
		
		var outroHistorie = new TimelineMax();
	    outroHistorie
	    	.to($('#slideHistorie .bcg'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone, delay:0.5 }, 0);		
		
		var historieOutroScene = new ScrollMagic.Scene({
		    triggerElement: '#slideFeest', 
		    triggerHook: 50,
		    offset:-100,
		    duration: "100%"
		})	
	    .setTween(outroHistorie)
	    .addTo(controller);		
	    setScrollMagicEvents(historieScene, bigImgSlide7, introHistorie);	
	     
	    
		// SCENE FEEST
	    var bigImgSlide8 = $('#slideFeest .imageSlide .bcg');
	    
	    var introFeest = new TimelineMax({repeat:0, paused:true});
	    introFeest
	    	.to(bigImgSlide8, 6, {scale:"1.25", rotationZ: 0.01, force3D:true, ease:Power1.easeInOut })
	    	.to($('#slideFeest .intro'), 2, {autoAlpha: 1 },'-=6')
	    	.from($('#slideFeest .intro'), 0.75, {y: '-100px', ease:Power1.easeOut} ,"-=6")   
	    	.to($('#slideFeest .buttons a.btn.feest'), 0.4, {autoAlpha: 1 },'-=5.5'); 	
 
		var feestScene = new ScrollMagic.Scene({
		    triggerElement: '#slideFeest', 
		    triggerHook: 'onLeave',
		    offset:-150,
		    duration: slideDuration
		})		
		.addTo(controller);
	    setScrollMagicEvents(feestScene, bigImgSlide8, introFeest);		    	
	    
	    

		function setScrollMagicEvents(scene, slide, timeline) {
			scene.on("start", function (event) {
				slide.css('position', 'relative');
				timeline.play();
			})
		}		

		
		setButtons($('#slideReusachtig'), false);
		setButtons($('#slideVrijwilligers'), false);			
		setButtons($('#slideBouw'), false);		
		setButtons($('#slideHistorie'), false);				
	}
	
	
	
	
	
	
	
	
	
	
	function resetButtons(mainSlide) {
		$(mainSlide.parent().find('.buttons a.btn')).each(function() {
			$(this).removeClass('active');
		});
		$(mainSlide.parent().find('.diepgang')).each(function() {
			TweenMax.to($(this), 0.6, { right:'-35%', autoAlpha:0, ease:Power1.easeInOut });
		});		
		TweenMax.to($(mainSlide), 0.45, { autoAlpha:1, ease:Power1.easeInOut });
	}
	
	
	var maqWidth = $('.maquette-container').width();
	var t1 = new TimelineMax({repeat:-1})
	    .from($('.maq_la'), 20, {x:maqWidth + 700, y:'-50%', scale:0.35, ease:Linear.easeNone, rotationZ: 0.01, force3D: true} )
	
	var t2 = new TimelineMax({repeat:-1})
	    .from($('.maq_markt'), 20, {x:maqWidth + 700, y:'-50%', scale:0.35, ease:Linear.easeNone, rotationZ: 0.01, force3D: true})
	    
	var t3 = new TimelineMax({repeat:-1})
	    .from($('.maq_wh'), 20, {x:maqWidth + 700, y:'-50%', scale:0.35, ease:Linear.easeNone, rotationZ: 0.01, force3D: true})	
	    
	var t4 = new TimelineMax({repeat:-1})
	    .from($('.maq_pe'), 20, {x:maqWidth + 700, y:'-50%', scale:0.35, ease:Linear.easeNone, rotationZ: 0.01, force3D: true})				    			    
	    
	var maquetteTimeline = new TimelineMax({paused: true})
		.add(t1, 0)
		.add(t2, 5)
		.add(t3, 10)
		.add(t4, 15);
	
	
	function setButtons(mainSlide, blurred) {
		
		var currButton;
		var currDiepgang;
		var clicked = false;
		var dataId;
		
		$( mainSlide.selector + " a.btn" ).click(function(e) {
			e.preventDefault();
			currButton = $(this);
			dataId = $(this).data("id");
			currDiepgang = $(mainSlide.selector + ' .diepgang.' + dataId);
			currDiepgang.css('z-index', '4');
			
			$(mainSlide.selector + ' a.btn').each(function() {
				$(this).removeClass('active');
			});				
			currButton.addClass('active');
			
			$(mainSlide.selector + ' .diepgang').each(function() {
				if($(this).data("id") != dataId) {
					$(this).css('z-index', '4');
					TweenMax.to($(this), 0.6, { right:'-35%', autoAlpha:0, ease:Power1.easeInOut });
				}
				else {
					TweenMax.to(currDiepgang, 0.6, { right:'0%', autoAlpha:1, ease:Power1.easeInOut });
					if(dataId == 'maquettes') {
						maquetteTimeline.play();
					}
					
					if(blurred) {
						if(mainSlide.selector != '#slideHistorie') {
							if(dataId != 'maquettes') {
								$( mainSlide.selector + " .bcg" ).addClass('blurred');
								$( mainSlide.selector + " .wrapper" ).addClass('blurred');
							}
						}
						TweenMax.to($(mainSlide.find('.diepgangoverlay')), 0.6, { autoAlpha:0.85, ease:Power1.easeInOut, onComplete:function(){ clicked = true } });
					}
					else {
						TweenMax.to($(mainSlide.find('.diepgangoverlay')), 0.6, { autoAlpha:0.93, ease:Power1.easeInOut, onComplete:function(){ clicked = true } });
					}
					
					
				}
			});				
		});
		
		$(mainSlide.find('.diepgangoverlay, .close')).click(function(e) {
			closePopup();
		});			
		
		function closePopup() {
			if(clicked) {
				clicked = false;	
				$( mainSlide.selector + " .bcg" ).removeClass('blurred');
				$( mainSlide.selector + " .wrapper" ).removeClass('blurred');
				TweenMax.to($(mainSlide.find('.diepgangoverlay')), 0.6, { autoAlpha:0, ease:Power1.easeInOut });
				TweenMax.to(currDiepgang, 0.6, { right:'-35%', autoAlpha:0, ease:Power1.easeInOut });
				currButton.removeClass('active');	
				
				if(dataId == 'maquettes') {
					maquetteTimeline.pause();
				}				
			}
		}	
	}
	
    var miepTween = new TimelineMax({repeat:0, paused:true});
    miepTween
    	.to(".miep", 20, {scale:"1.1", x:"-50px", rotationZ: 0.01, force3D:true, ease:Linear.easeNone })
    	.to(".miepbg", 20, {scale:"1.065", x:"25px", rotationZ: 0.01, force3D:true, ease:Linear.easeNone }, "-=20.0");
   
	$(".btn.historie").click(function(e) {
		miepTween.play();
	});	
	
	$('.popup-video').magnificPopup({
	    disableOn: 0,
	    type: 'iframe',
	    iframe: {
	        patterns: {
	            youtube: {
	                index: 'youtube.com/', 
	                id: function(url) {        
	                    var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
	                    if ( !m || !m[1] ) return null;
	                    return m[1];
	                },
	                src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0'
	            },
	            vimeo: {
	                index: 'vimeo.com/', 
	                id: function(url) {        
	                    var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
	                    if ( !m || !m[5] ) return null;
	                    return m[5];
	                },
	                src: '//player.vimeo.com/video/%id%?autoplay=1'
	            }
	        }
	    },
	    mainClass: 'mfp-fade',
	    removalDelay: 100,
	    preloader: false,
	    fixedContentPos: true,
        callbacks: {
			open: function() {
				$('html').removeClass('noscroll');
			},
			close: function() {
				$('html').addClass('noscroll');
			}
        } 
	});		

}(jQuery));

(function($){
	$(window).load(function(){
		$(".diepgang.historie").mCustomScrollbar({
			axis:"y",
			theme:"dark-thick",
			mouseWheelPixels: 250,
			mouseWheel:{ preventDefault: true }
		});
	});
})(jQuery);

/* Oude events

		.on("start", function (event) {
			bigImgSlide3.css('position', 'relative');
			introVrijwilliger.play();
		})
		.on("end", function (event) {
			bigImgSlide3.css('position', 'fixed');
			bigImgSlide3.css('top', '0');
			bigImgSlide3.css('left', '0');			
		})
		
*/