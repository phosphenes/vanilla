;(function(){
	var stickyHeader, thisY, previousY, topAnchorPoint, bottomAnchorPoint, THRESHOLD
	thisY = previousY = topAnchorPoint = bottomAnchorPoint = 0

	function checkScrolling() {
		if (stickyHeader.parentNode !== πbody) {
			πbody.add(stickyHeader)
		}

		previousY = thisY
		thisY = window.pageYOffset

		if (thisY > previousY) {  // going down
			bottomAnchorPoint = thisY

			if (thisY - topAnchorPoint > THRESHOLD) {
				stickyHeader.killClass('stuck')
			}

			if (thisY > THRESHOLD) {
				stickyHeader.addClass('hidden')
			}
		}

		else if (thisY < previousY) { // goingUp
			topAnchorPoint = thisY

			if (bottomAnchorPoint - thisY > THRESHOLD) {
				stickyHeader.css({zIndex: π.highestZ()})
				stickyHeader.addClass('stuck')
				stickyHeader.killClass('hidden')
			}

			if (thisY < THRESHOLD) {
				stickyHeader.killClass('stuck')
			}
		}
		
		stickyHeader.classOnCondition('scrolled', thisY > 10)
		
		requestAnimationFrame(checkScrolling)
	}

	function init() {
		stickyHeader = π1('.pi-sticky-header')
		if (stickyHeader) {
			var options = JSON.parse(stickyHeader.dataset.options ? stickyHeader.dataset.options : '{}')
			THRESHOLD = options.threshold || 100

			checkScrolling()
		}
	}

	π.mods.push(init)
})()
