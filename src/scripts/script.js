;(function(){
	π.mods.push(function () {
		console.log("π loaded.")

		initStickyHeader();
		initAnchorScrolling();
		// initMobileMenu();
		initExhibits();
		initCenterImages();
		if(π1('.filterBox')) initDirectoryFilters();
		if(π1('#backToTop')) initBackToTopButton();
	})



	function initStickyHeader() {
		var header = π1('header');
		if (!header) return
		
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
		if (!button) return
		
		button.onclick = function() {
			(πbody.hasClass('openMenu')) ? πbody.killClass('openMenu'): πbody.addClass('openMenu');
		};
	}

	function initBackToTopButton() {
		var backButton = π1('#backToTop');
		setInterval(function() {
			if(window.scrollY >= 200 && !backButton.hasClass('show')) {
				backButton.addClass('show');
			}
			else if(window.scrollY < 200 && backButton.hasClass('show')) {
				backButton.killClass('show');
			}
		}, 10);
	}

	////////////////////////////////////
	// EXHIBIT SECTION ANIMATIONS
	////////////////////////////////////
	function initExhibits() {
		π('.exhibit').forEach(function(el) {
			toggleExhibits(el);
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

		requestAnimationFrame(function() {
			toggleExhibits(el);
		});
	}

	////////////////////////////////////
	// SCROLL TO/FROM FIXED CENTER
	////////////////////////////////////
	function initCenterImages() {
		π('*[data-scroll-center]').forEach(function(el, i) {
			scrollInAndOutOfFixedCenter(el, i);
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

		requestAnimationFrame(function() {
			scrollInAndOutOfFixedCenter(el, i);
		});
	}

	/////////////////////////////////////////
	// HASHTAG/ANCHOR LINK ANIMATED SCROLLING
	/////////////////////////////////////////
	function initAnchorScrolling() {
		if (typeof $ == "undefined") {
			console.log("jquery is needed for anchor scrolling.")
			return
		} 
		
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
	// DIRECTORY STUFF
	////////////////////////////////////
	function initDirectoryFilters() {

		π('.institution').addClass('show');

		π('.filterBox a').forEach(function(e) {
			e.onclick = function() {
				(e.hasClass('active')) ? e.killClass('active'): e.addClass('active');
				getTheFilters();
			};
		});

		π('.show-more').forEach(function(e) {
			e.onclick = function() {

				var topParent = $(e).parent().parent();
				console.log(topParent);
				(topParent.hasClass('open')) ? topParent.removeClass('open'): topParent.addClass('open');

			};
		});
	}

	function getTheFilters() {
		var stuff = [];
		π('.filterBox a.active').forEach(function(e) {
			stuff.push('filter-'+e.getAttribute('data-filter'));
		});

		if(stuff.length === 0) {
			π('.institution').addClass('show');
		}
		else {
			π('.institution').killClass('show');
			stuff.forEach(function (e) {
				π('.' + e).addClass('show');
			});
		}



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


})()