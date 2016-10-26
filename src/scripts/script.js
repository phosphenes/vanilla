;(function(){
	π.mods.push(function () {
		console.log("π loaded. poo.")
		initAnchorScrolling();
		initExhibits();
		initCenterImages();



	})


	
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