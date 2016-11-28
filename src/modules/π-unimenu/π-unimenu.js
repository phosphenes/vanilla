/*****************************************************************
 *
 * π-unimenu
 *
 *****************************************************************/
;(function(){
	var HAMBURGER_THRESHHOLD = 1200
	var WINDOW_WIDTH = 0
	var OPEN_NAV = false
	var MOVING = false
	var NAV, BURGER_BUTTON
	
	function init() {
		Unimenu(π1('.pi-unimenu'))
	}

	function toggleMenu() {
		OPEN_NAV = !OPEN_NAV
	}

	function Unimenu(el) {
		if (!el) return
		
		NAV = el
		
		BURGER_BUTTON = π.dom('button.pi-burger-button')
		BURGER_BUTTON.onclick = toggleMenu
		πbody.add(BURGER_BUTTON)
		
		setMenuStyles()
	}

	function setMenuStyles() {
		if (window.innerWidth !== WINDOW_WIDTH) {
			WINDOW_WIDTH = window.innerWidth
		}
		
		if (WINDOW_WIDTH > HAMBURGER_THRESHHOLD) {
			OPEN_NAV = false
			NAV.removeAttribute('style')
		}
		
		if (!MOVING) {
			OPEN_NAV ? toggleNav(true) : toggleNav()
		}
		
		requestAnimationFrame(setMenuStyles)
	}

	function toggleNav(show) {
		var showing = show && !πbody.hasClass('open-nav')
		var hiding = !show && πbody.hasClass('open-nav')
		if (showing || hiding) {
			MOVING = true
			if(showing) πbody.addClass('open-nav') 
			doTheThing(showing)
		}
	}

	function doTheThing() {
		setTimeout(function () {
			NAV.css({opacity: OPEN_NAV ? 1 : 0})
			doAfterTransition(NAV, 'opacity', function () {
				if (!OPEN_NAV) πbody.killClass('open-nav')
				MOVING = false
			})
		}, 10)
	}
	
	π.mods.push(init)
})()