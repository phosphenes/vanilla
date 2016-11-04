;(function(){
	π.mods.push(function () {
		console.log("π loaded. janky.")
		initAnchorScrolling();
		initExhibits();
		starFieldsORama()
		
		var backToTopButton = π1('#backToTop') 
		if(backToTopButton) initBackToTopButton(backToTopButton);
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



	function initBackToTopButton(backButton) {
		if(window.scrollY >= 200 && !backButton.hasClass('show')) {
			backButton.addClass('show');
		}
		else if(window.scrollY < 200 && backButton.hasClass('show')) {
			backButton.killClass('show');
		}
		
		requestAnimationFrame(function () {
			initBackToTopButton(backButton)
		})
	}


	/////////////////////////////////////////
	// PARALLAX ON THE STARFIELDS
	/////////////////////////////////////////
	function starFieldsORama() {
		var y = window.scrollY
		
		var y3 = px(y * 1.05)
		var y2 = px(y * 1.15)
		var y1 = px(y * 1.25)
		
		
		π('.starField').forEach(function (field) {
			var color = field.parentNode.className.indexOf('green') > -1 ? 'green' : 'yellow'
			var output = 'url(/wp-content/themes/uc/_uc/images/stars-3-' + color + '.png) center ' + y3 + ', url(/wp-content/themes/uc/_uc/images/stars-2-' + color + '.png) center  ' + y2 + ', url(/wp-content/themes/uc/_uc/images/stars-1-' + color + '.png) center  ' + y1
			field.css({background: output})
		})
		
		requestAnimationFrame(starFieldsORama)
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