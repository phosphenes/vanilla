;(function(){
	π.mods.push(init)

	function init(){
		π.clean(init);
		console.log("π loaded");

		initStickyHeader();
		initAnchorScrolling();
		initMobileMenu();
		initExhibits();
		// initHeaderColorWipe();
		initCenterImages();
		initIntroStuff();
		initProcessStuff();
		// initTheThinking();
		initContactForm();

		if(π1('#processButton')) {
			π1('#processButton').onclick = function() {

				var thingToScrollTo;
				var theStep = π1('#process section.inRange');
				var nextStep = theStep.nextElementSibling;

				console.log(nextStep);

				if(nextStep.id == 'processSteps') {
					thingToScrollTo = π1('#process').nextElementSibling;
					console.log(nextStep);
				}
				else {
					thingToScrollTo = nextStep;
				}
				scrollToAnchor(thingToScrollTo);
			};
		}
	}

	function initStickyHeader() {
		var header = π1('header');
		setInterval(function() {
			if(window.scrollY >= 200 && !header.hasClass('sticky')) {
				header.addClass('sticky');
			}
			else if(window.scrollY < 200 && header.hasClass('sticky')) {
				header.killClass('sticky');
			}
		}, 10);
	}

	function initMobileMenu() {
		var button = π1('#menuButton');
		var menu = π1('#menu');
		var body = π1('body');
		button.onclick = function() {
			(body.hasClass('openMenu')) ? body.killClass('openMenu'): body.addClass('openMenu');
			(menu.hasClass('inRange')) ? menu.killClass('inRange'): menu.addClass('inRange');
		};
	}

	function initTheThinking() {
		var speed = 2000;
		var images = $('#thinkBeyond .imageBG');
		var words = $('#bWords > span');

		setTimeout(function() {
			images.each(function (i) {

				if(i === 0) $('#beyondText').addClass('on');

				var image = $(this);
				setTimeout(function () {
					images.parent().find('> .on').removeClass('on');
					image.addClass('on');

					if(i == (images.length-1)) {
						words.parent().addClass('last');
						$('#intro .colorSplash, .introOutro').addClass('on');
						setTimeout(function () {
							// $('#intro .colorSplash').show().get(0).play();
						}, 1000);
					}
					words.parent().css('top', '-'+(i*100)+'%');
					words.parent().find('> .on').removeClass('on');
					words.eq(i).addClass('on');

				}, i * speed);
			});
		}, 1000);
	}

	////////////////////////////////////
	// CONTACT FORM
	////////////////////////////////////
	function initContactForm() {
		π('#footerContact label').forEach(function(el,i) {
			var input = el.π1('input[type=text], input[type=email], textarea');
			window.requestAnimationFrame(function() {
				trackInputValue(el, input);
			});
		});
	}

	function trackInputValue(el, input) {

		(input.value !== '') ? el.addClass('filled'): el.killClass('filled');
		($(input).is(":focus")) ? el.addClass('focus'): el.killClass('focus');

		window.requestAnimationFrame(function() {
			trackInputValue(el, input);
		});
	}


	////////////////////////////////////
	// PROCESS STUFF
	////////////////////////////////////
	function initIntroStuff() {
		π('#intro section').forEach(function(el,i) {
			window.requestAnimationFrame(function() {
				moveTheHex(el,i);
			});
		});
	}

	function moveTheHex(el,i) {

		var theText = el.π1('main');
		var theHex = el.π1('.halfHex');
		var winY = window.pageYOffset;
		var maxH = window.innerHeight;
		var winDistance = (window.innerHeight-theHex.getBoundingClientRect().height)/2;
		var parentOffset = el.getBoundingClientRect().top;
		var theOffset = (winY <= maxH) ? ((winDistance*winY)/maxH)+parentOffset: (winDistance*maxH)/maxH;
		var theTextOffset = (winDistance)*i;

		theText.css('top','calc(100vh - '+(theOffset-theTextOffset)+'px)');
		theHex.css('top','calc(50vh - '+theOffset+'px)');

		window.requestAnimationFrame(function() {
			moveTheHex(el,i);
		});
	}

	////////////////////////////////////
	// EXHIBIT SECTION ANIMATIONS
	////////////////////////////////////
	function initExhibits() {
		π('.exhibit').forEach(function(el) {
			window.requestAnimationFrame(function() {
				toggleExhibits(el);
			});
		});
	}

	function toggleExhibits(el) {

		var margin = (el.dataset.rangeMargin) ? parseInt(el.dataset.rangeMargin): 10;
		var inRange = elementInRange(el, margin);

		if(inRange && !el.hasClass('inRange')) {
			el.addClass('inRange');
			if(el.dataset.rangeFunction) processRangeFunction(el);
		}
		else if(!inRange && el.hasClass('inRange') && !el.hasClass('exhibitOnOnly')) el.killClass('inRange');

		window.requestAnimationFrame(function() {
			toggleExhibits(el);
		});
	}

	// CUSTOM FUNCTIONALITY
	function processRangeFunction(el) {
		switch(el.dataset.rangeFunction) {
			case 'switchProcessStep':
				switchProcessStep(el);
				break;

			case 'initTheThinking':
				initTheThinking();
				break;
		}
	}

	////////////////////////////////////
	// PROCESS STEPS
	////////////////////////////////////
	var processStep;
	var stepTimer;
	var stepResizerTimer;

	function initProcessStuff() {
		// π('#process section[data-process-step]').forEach(function(el, i) {
		//
		// 	// POPULATE NAV
		// 	var thisStep = el.dataset.processStep;
		// 	var thisA = π.contentElement("a");
		// 	thisA.onclick = function() {
		// 		scrollToAnchor(el, 0, 300);
		// 	};
		// 	π1('#process nav').add(thisA);
		// });
	}

	function switchProcessStep(el) {

		clearTimeout(stepTimer);
		clearInterval(stepResizerTimer);

		var step = parseInt(el.dataset.processStep);
		var actions = π1('#processSteps .actions');
		var delay = 0;

		if(step !== processStep) {

			// HIDE STUFF
			if(actions.hasClass('open')) {
				delay = 800;
				flipTheStep('out', processStep, actions);
			}

			processStep = step;

			// SHOW STUFF
			stepTimer = setTimeout(function () {
				flipTheStep('in', step, actions);
			}, delay);

			// SWITCH NAV ITEM
			if(π1('#process nav a.on')) π1('#process nav a.on').killClass('on');
			π('#process nav a').item(step).addClass('on');
		}
	}

	function flipTheStep(way, step, actions) {

		var theTitle = π('#processSteps .headers h2').item(step);
		var theAction = π('.actions .action').item(step);
		var theBox = theAction.getBoundingClientRect();

		(way == 'in') ? theTitle.addClass('on'): theTitle.killClass('on');
		(way == 'in') ? theAction.addClass('on'): theAction.killClass('on');
		(way == 'in') ? actions.addClass('open'): actions.removeAttribute('style');
		(way == 'in') ? actions.css({'height': theBox.height+'px'}): actions.killClass('open');

		// RESIZE THE BOX FOR RESPONSIVE
		if(way == 'in') {

			// SET THE STEP
			π1('#processSteps').dataset.currentStep = step;

			// RESIZE CONTENT ON WINDOW RESIZE
			stepResizerTimer = setInterval(function() {
				theBox = theAction.getBoundingClientRect();
				actions.css({'height': theBox.height+'px'});
			}, 10);
		}
	}

	////////////////////////////////////
	// SCROLL TO/FROM FIXED CENTER
	////////////////////////////////////

	function initCenterImages() {
		π('*[data-scroll-center]').forEach(function(el, i) {
			window.requestAnimationFrame(function() {
				scrollInAndOutOfFixedCenter(el, i);
			});
		});
	}

	function scrollInAndOutOfFixedCenter(el, i) {

		var parent = π1('#'+el.dataset.scrollCenter);
		var pPos = scrollPosition($(parent));
		var maxTop = ((window.innerHeight/2)-(el.offsetHeight/2));
		var maxBottom = maxTop + el.offsetHeight;

		var isTop = (pPos.top > maxTop);
		var isBottom = (pPos.bottom < maxBottom);
		var isCenter = (pPos.top < maxTop && pPos.bottom > maxBottom);

		// ADD CLASSES
		if(isTop && !el.hasClass('fixToTop')) el.addClass('fixToTop');
		if(isBottom && !el.hasClass('fixToBottom')) el.addClass('fixToBottom');
		if(isCenter && !el.hasClass('fixToCenter')) el.addClass('fixToCenter');

		if(!isTop && el.hasClass('fixToTop')) el.killClass('fixToTop');
		if(!isBottom && el.hasClass('fixToBottom')) el.killClass('fixToBottom');
		if(!isCenter && el.hasClass('fixToCenter')) el.killClass('fixToCenter');

		window.requestAnimationFrame(function() {
			scrollInAndOutOfFixedCenter(el, i);
		});
	}






	// SAVE THIS CODE!!!!!!!!!

	////////////////////////////////////
	// BLACK/WHITE HEADER WIPE
	////////////////////////////////////
	// var wipeHeader, wiper;
	// function initHeaderColorWipe() {
	//
	// 	wipeHeader = π1('header');
	// 	wiper = π1('header .wiper');
	//
	// 	π('section.reverseHeader').forEach(function(el, i) {
	// 		window.requestAnimationFrame(function() {
	// 			trackHeaderColorWipe(el);
	// 		});
	// 	});
	// }

	// function trackHeaderColorWipe(el) {
	//
	// 	var boxPos = scrollPosition($(el));
	// 	var headerPos = scrollPosition($(wipeHeader));
	//
	// 	var isOver = elementOverlappingAnother(el, wipeHeader);
	// 	var topInside = (boxPos.top < headerPos.bottom && boxPos.top > headerPos.top);
	// 	var bottomInside = (boxPos.bottom < headerPos.bottom && boxPos.bottom > headerPos.top);
	// 	var wiperY = null, wiperKidsY = null;
	//
	// 	if(isOver) {
	//
	// 		el.addClass('isOverHeader');
	// 		var hasTwoHovers = (π('.reverseHeader.isOverHeader').length > 1);
	//
	// 		if(topInside && !hasTwoHovers) {
	// 			wiperY = Math.abs(boxPos.top - headerPos.top);
	// 			wiperKidsY = -Math.abs(wiperY);
	// 		}
	// 		else if(bottomInside && !hasTwoHovers) {
	// 			wiperY = -Math.abs(boxPos.bottom - headerPos.bottom);
	// 			wiperKidsY = Math.abs(wiperY);
	// 		}
	// 		else if((!bottomInside && !topInside) || hasTwoHovers) {
	// 			wiperY = 0;
	// 			wiperKidsY = 0;
	// 		}
	// 		wiper.css('transform', 'translateY('+(wiperY)+'px)');
	// 		wiper.π(':scope > *').css('transform', 'translateY('+(wiperKidsY)+'px)');
	//
	// 	}
	// 	else if(!isOver && wiper.css('transform') !== null) {
	// 		el.killClass('isOverHeader');
	//
	// 		// KILL STYLES ON WIPER ONLY IF THERE ARE NO OTHER DARK ELEMENTS HOVERING
	// 		if(!π('.reverseHeader.isOverHeader').length) {
	// 			wiper.css('transform', null);
	// 			wiper.π(':scope > *').css('transform', null);
	// 		}
	// 	}
	//
	// 	window.requestAnimationFrame(function() {
	// 		trackHeaderColorWipe(el);
	// 	});
	//
	// }


	/////////////////////////////////////////
	// HASHTAG/ANCHOR LINK ANIMATED SCROLLING
	/////////////////////////////////////////
	function initAnchorScrolling() {
		$('a[href*="#"]').each(function() {
			var url = $(this).attr('href').replace(/\/$/, "");
			var name = (url.indexOf("#") !== -1) ? url.substring(url.indexOf("#")+1): url.match(/([^\/]*)\/*$/)[1];
			var exists = (typeof($("a[name='"+name+"']").offset()) !== "undefined" || typeof($("#"+name).offset()) !== "undefined");

			if(exists) {
				var theTarget = (typeof($("a[name='"+name+"']").offset()) !== "undefined") ? $("a[name='"+name+"']"): $("#"+name);
				$(this).click(function(e) {
					e.preventDefault();
					scrollToAnchor(theTarget);
				});
			}
		});
	}


	////////////////////////////////////
	// UTILITIES
	////////////////////////////////////
	function elementOverlappingAnother(box, win) {
		box = $(box);
		win = $(win);

		var boxPos = scrollPosition(box);
		var winPos = scrollPosition(win);

		return (boxPos.bottom > winPos.top && boxPos.top < winPos.bottom);
	}

	function elementInView(box) {
		box = $(box);
		var boxPos = scrollPosition(box);
		return (boxPos.bottom > 0 && boxPos.top < $(window).height())
	}

	function elementInRange(box, margin) {

		box = $(box);
		margin = (!margin) ? 0.2: margin*0.01;

		var boxPos = scrollPosition(box);
		var winHeight = $(window).height();

		var zoneBottom = parseInt(winHeight*margin);
		var zoneTop = parseInt(winHeight*(1-margin));

		return (boxPos.bottom > zoneTop && boxPos.top < zoneBottom);

	}

	function scrollPosition(el) {
		var boxTop = el.offset().top-$(window).scrollTop();
		var boxBottom = boxTop+el.outerHeight();
		return {
			top: boxTop,
			bottom: boxBottom
		}
	}

	function scrollToAnchor(el, speed, padding) {
		console.log(el);
		el = $(el);
		speed = (speed) ? speed: 500;
		padding = (padding) ? padding: -1;
		var theTop = el.offset().top-padding;

		$('html, body').stop().animate({ scrollTop:theTop }, speed, 'easeInOutCubic', function() {
			//window.location.hash = name;
		});
	}

	function centerizeThisThing(el, parent) {
		parent = (!parent) ? el.parent(): parent;
		var th = parent.height(), tw = parent.width(), ih = el.height(), iw = el.width();
		var theHeight = ((th/tw) > (ih/iw)) ? th: 'auto';
		var theWidth = ((th/tw) > (ih/iw)) ? 'auto': tw;

		image.css({ height: theHeight, width: theWidth });

		window.requestAnimationFrame(function() {
			centerizeThisThing(el, parent);
		});
	}

})();


