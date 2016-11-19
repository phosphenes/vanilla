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
		var stage = π.dom('.stage'), sled = π.dom('.sled')
		var items = []
		var numberOfItems
		var container
		var prevButton, nextButton, closeButton
		var carousel = options.carousel
		var counter = options.counter ? π.dom('.counter') : null
		var blips = options.blips ? π.dom('.blips') : null
		var moving = false

		// TODO: show a spinner if loadCount < numberOfItems
		var loadCount = 0
		

		el.π('.item').forEach(function (item) {
			items.push(item)
			el.removeChild(item)
		})

		numberOfItems = items.length
		
		if (numberOfItems === 0) {
			console.warn('A rotator with no items is no rotator at all', el)
			return
		}

		if (options.inline) {
			container = el
			el.addClass('inline')
			el.fill(stage)
		} else {
			overlay = π.dom('.pi-overlay')
			overlay.fill(stage)
			el.fill(overlay)
			container = overlay
		}

		if (!options.externalTrigger && !options.inline) {
			closeButton = π.dom('button.pi-modal-close-button')
			closeButton.setAttribute('pi-rotator-trigger', el.id)
			container.appendChild(closeButton)
		}
		
		if (numberOfItems > 1) {
			if (options.prevNext) {
				prevButton = π.dom('button.pi-prev-button')
				if (!carousel) prevButton.addClass('off')

				nextButton = π.dom('button.pi-next-button')
				prevButton.onclick = prev
				nextButton.onclick = next

				container.add([prevButton, nextButton])
			}

			if (counter) {
				counter.add([π.dom('span'), π.dom('span', numberOfItems.toString())])
				container.add(counter)
			}

			if (blips) {
				var dots = items.map(function (item, idx) {
					var dot = π.dom('button')
					dot.dataset.idx = idx
					dot.onclick = jumpToItem
					return dot
				})

				blips.add(dots)
				container.add(blips)
				updateBlips()
			}

			if (options.crossfade) {
				el.addClass('crossfade')
			}

			if (options.autoPlay) {
				var delay = parseInt(options.autoPlay)
				setTimeout(function () {
					autoPlay(delay)
				}, delay)
			}
		}


		if (options.inline) {
			stage.fill(items[0].cloneNode(true))
			updateTheView()
		}


		function autoPlay(delay) {
			if (!options.autoPlay) return

			next()
			setTimeout(function () {
				autoPlay(delay)
			}, delay)
		}

		function jumpToItem() {
			options.autoPlay = false

			var idx = parseInt(this.dataset.idx)
			if (currentIdx !== idx) {
				var delta = idx > currentIdx ? 1 : -1
				slide(delta, {idx: idx})
			}
		}

		function slide(delta, jumpTo) {
			if (moving) return

			moving = true
			sled.css(options.crossfade ?
				{opacity: 0} :
				{left: pct(100 * delta)}
			)
			var incomingIdx = jumpTo ? jumpTo.idx : currentIdx + delta
			sled.fill(items[incomingIdx].cloneNode(true))
			container.appendChild(sled)

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
				updateBlips()

				doAfterTransition(stage, transitionProperty, function () {
					container.removeChild(stage)
					stage.fill(items[currentIdx].cloneNode(true))
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
			if (!options.prevNext) return

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

		function prev() {
			if (!moving) {
				if (prevButton && prevButton.hasClass('off')) return

				if (currentIdx <= 0) {
					currentIdx = numberOfItems
				}
				slide(-1)
			}
		}

		function next() {
			if (this === nextButton) options.autoPlay = false
			if (!moving) {
				if (currentIdx >= numberOfItems - 1) {
					currentIdx = -1
				}
				slide(1)
			}
		}

		thisRotator.show = function (e) {
			π.listen(handleKeyboard, 'keydown')
			el.css({
				display: 'block',
				zIndex: π.highestZ()
			})
			currentIdx = parseInt(acutalItem(e.target).dataset.idx) || 0
			stage.fill(items[currentIdx].cloneNode(true))
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
		π.setTriggers('rotator')
	}

	π.mods.push(init)
})()