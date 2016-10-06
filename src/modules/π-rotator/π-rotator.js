;(function () {
	// make all rotators available by id, e.g. AllRotators['myRotatorID']
	var AllRotators = {}

	// attach rotator to π so external triggers can access toggle
	π.rotator = {
		toggle: function (id, e) {
			var rotator = AllRotators[id]
			rotator.el.hasClass('on') ? rotator.hide() : rotator.show(e) 
		}
	}

	function Rotator(el) {
		var thisRotator = this
		thisRotator.el = el
		
		var options = JSON.parse(el.dataset.options ? el.dataset.options : '{}')
		delete el.dataset.options

		var currentIdx = 0
		var stage = π.div('stage'), sled = π.div('sled')
		var items = []
		var numberOfItems
		var container
		var prevButton, nextButton, closeButton
		var carousel = options.carousel
		var counter = options.counter ? π.div('counter') : null
		var blips = options.blips ? π.div('blips') : null
		var moving = false

		// TODO: show a spinner if loadCount < numberOfItems
		var loadCount = 0

		el.π('.item').forEach(function (item) {
			items.push(item)
			el.removeChild(item)
		})

		numberOfItems = items.length
		
		if (options.inline) {
			container = el
			el.addClass('inline')
			el.fill(stage)
		} else {
			overlay = π.div('pi-overlay')
			overlay.fill(stage)
			el.fill(overlay)
			container = overlay
		}

		if (!options.externalTrigger && !options.inline) {
			closeButton = π.button('pi-modal-close-button')
			closeButton.setAttribute('pi-rotator-trigger', el.id)
			container.appendChild(closeButton)
		}

		prevButton = π.button('pi-prev-button')
		if (!carousel) prevButton.addClass('off')

		nextButton = π.button('pi-next-button')

		prevButton.onclick = function () {
			if (!moving && !prevButton.hasClass('off')) {
				if (currentIdx <= 0) {
					currentIdx = numberOfItems
				}
				slide(-1)
			}
		}

		nextButton.onclick = function () {
			if (!moving && !nextButton.hasClass('off')) {
				if (currentIdx >= numberOfItems - 1) {
					currentIdx = -1
				}
				slide(1)
			}
		}

		container.add([prevButton, nextButton])

		if (counter) {
			counter.add([π.span(), π.span(0,0,numberOfItems)])
			container.add(counter)
		}

		if (blips) {
			var dots = items.map(function (item, idx) {
				var dot = π.button()
				dot.dataset.idx = idx
				dot.onclick = jumpToItem
				return dot
			})

			blips.add(dots)
			container.add(blips)
		}
		
		if (options.crossfade) {
			el.addClass('crossfade')
		}
		
		if (options.inline) {
			stage.fill(items[0])
			updateTheView()
		}

		function jumpToItem() {
			var idx = parseInt(this.dataset.idx)
			if (currentIdx !== idx) {
				var delta = idx > currentIdx ? 1 : -1
				slide(delta, {idx: idx})
			}
		}

		function slide(delta, jumpTo) {
			moving = true
			sled.css(options.crossfade ? 
				{opacity: 0} : 
				{left: pct(100 * delta)}
			)
			var incomingIdx = jumpTo ? jumpTo.idx : currentIdx + delta
			sled.fill(items[incomingIdx])
			container.insertBefore(sled, prevButton)

			showIncomingItem(delta, jumpTo)
		}

		function showIncomingItem(delta, jumpTo) {
			setTimeout(function () {
				var stageStyle = {}, sledStyle = {}, transitionProperty = 'opacity'
				if(options.crossfade) {
					stageStyle.opacity = 0
					sledStyle.opacity = 1
				} else {
					stageStyle.left = pct(-100 * delta)
					sledStyle.left = 0
					transitionProperty = 'left'
				}
				stage.css(stageStyle)
				sled.css(sledStyle)

				currentIdx = jumpTo ? jumpTo.idx : currentIdx + delta

				doAfterTransition(stage, transitionProperty, function () {
					container.removeChild(stage)
					stage.fill(items[currentIdx])
					stage.removeAttribute('style')

					container.replaceChild(stage, sled)
					sled.removeAttribute('style')

					updateTheView()

					moving = false
				})
			}, 50)
		}

		function updateTheView() {
			updatePrevNext()
			updateCounter()
			updateBlips()
		}

		function updateBlips() {
			if (!blips) return

			var previousBlip = blips.π1('.on')
			if (previousBlip) previousBlip.killClass('on')
			blips.childNodes[currentIdx].addClass('on')
		}

		function updateCounter() {
			if (counter) {
				counter.firstChild.textContent = currentIdx + 1
			}
		}

		function updatePrevNext() {
			if (carousel) return

			if (currentIdx === 0) {
				showHideButtons(nextButton, prevButton)
			} else if (currentIdx === numberOfItems - 1) {
				showHideButtons(prevButton, nextButton)
			} else {
				prevButton.css({display: 'block'})
				nextButton.css({display: 'block'})
				setTimeout(function () {
					prevButton.killClass('off')
					nextButton.killClass('off')
				}, 100)
			}

			function showHideButtons(showButton, hideButton) {
				hideButton.addClass('off')
				doAfterTransition(hideButton, 'opacity', function () {
					hideButton.css({display: 'none'})
				})
				showButton.css({display: 'block'})
				setTimeout(function () {
					showButton.killClass('off')
				}, 100)
			}
		}

		function handleKeyboard(e) {
			switch (e.keyCode) {
				case 27:
					thisRotator.hide()
					break

				case 37:
					prevButton.click()
					break

				case 39:
					nextButton.click()
					break
			}
		}
		
		function acutalItem(el) {
			while (!el.getAttribute('pi-rotator-trigger')) {
				el = el.parentNode
			}
			
			return el
		}

		thisRotator.show = function (e) {
			π.listen(handleKeyboard, 'keydown')
			el.css({
				display: 'block',
				zIndex: π.highestZ()
			})
			currentIdx = parseInt(acutalItem(e.target).dataset.idx) || 0
			stage.fill(items[currentIdx])
			updateTheView()
			
			πbody.appendChild(el)
			
			setTimeout(function () {
				el.addClass('on')
			}, 50)

			πbody.css({overflow: 'hidden'})
		}

		thisRotator.hide = function () {
			π.clean(handleKeyboard, 'keydown')
			el.killClass('on')
			doAfterTransition(el, 'opacity', function () {
				el.css({display: 'none'})
			})

			πbody.css({overflow: 'auto'})
		}
	}

	function init() {
		π('.pi-rotator').forEach(function (el) {
			AllRotators[el.id] = new Rotator(el)
		})
		π.setNewTriggers('rotator')
	}

	π.mods.push(init)
})()