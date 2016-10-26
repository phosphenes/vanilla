(function(window){
	/***********************************************
	 ***********************************************
	 ****
	 ****  π CORE
	 ****
	 ***********************************************
	 ***********************************************/
	var d = document
	d.g = d.getElementById
	d.q = d.querySelector
	d.a = d.querySelectorAll

	var π, π1, πd, πbody

	π = function(selector) {
		return d.a(selector)
	}

	π1 = function (selector) {
		return d.q(selector)
	}

	πd = function(id) {
		return d.g(id)
	}
	
	/********************************************************************
	 ****
	 ****  HTMLELEMENT/NODE PROTOTYPE METHODS (jquery-izations)
	 ****
	 ********************************************************************/

	HTMLElement.prototype.wrap = Node.prototype.wrap = function(content){
		var wrapper = this
		
		if (!content.forEach) content = [content]
		
		var parent = content[0].parentNode
		parent.insertBefore(wrapper, content[0])

		content.forEach(function(el){
			wrapper.appendChild(el)
		})
	}

	HTMLElement.prototype.prepend = Node.prototype.prepend = function(el){
		this.insertBefore(el, this.childNodes[0])
	}

	HTMLElement.prototype.add = Node.prototype.add = function(additions){
		if (!Array.isArray(additions)) additions = [additions]
		var el = this
		additions.forEach(function(obj){
			if (obj) el.appendChild(obj)
		})
	}

	HTMLElement.prototype.classOnCondition = Node.prototype.classOnCondition = function(classname, condition) {
		if (condition)
			this.addClass(classname)
		else
			this.killClass(classname)
	}

	HTMLElement.prototype.offset = Node.prototype.offset = function(){
		return this.getBoundingClientRect()
	}

// like d.g, but for child elements
	HTMLElement.prototype.πd = Node.prototype.πd = function(id) {
		return this.getElementById(id)
	}

// like d.q, but for child elements
	HTMLElement.prototype.π1 = Node.prototype.π1 = function(selector) {
		return this.querySelector(selector)
	}

// like d.a, but for child elements
	HTMLElement.prototype.π = Node.prototype.π = function(selector) {
		return this.querySelectorAll(selector)
	}

// only direct descendents, with optional selector
	HTMLElement.prototype.kids = Node.prototype.kids = function(selector) {
		var childNodes = this.childNodes
		if (!selector) return childNodes

		var descendents = this.π(selector)
		var children = []

		childNodes.forEach(function(node){
			if (descendents.indexOf(node) !== -1) {
				children.push(node)
			}
		})

		return children
	}

	HTMLElement.prototype.hasClass = Node.prototype.hasClass = function (className) {
		return this.classList ? this.classList.contains(className) : false
	}

	HTMLElement.prototype.addClass = Node.prototype.addClass = function (classNames) {
		if (!Array.isArray(classNames)) classNames = [classNames]
		var el = this
		classNames.forEach(function (className) {
			el.classList.add(className)
		})
	}

	HTMLElement.prototype.killClass = Node.prototype.killClass = function (classNames) {
		if (!Array.isArray(classNames)) classNames = [classNames]
		var el = this
		classNames.forEach(function (className) {
			el.classList.remove(className)
		})
	}

	HTMLElement.prototype.toggleClass= Node.prototype.toggleClass = function (classNames) {
		if (!Array.isArray(classNames)) classNames = [classNames]
		var el = this
		classNames.forEach(function (className) {
			el.classList.toggle(className)
		})
	}

	HTMLElement.prototype.siblings = Node.prototype.siblings = function(selector){
		var el = this
		return el.parentNode.π(':scope > ' + (selector || '*')).filter(function(obj){return obj != el})
	}

	HTMLElement.prototype.css = Node.prototype.css = function(ruleOrObject, value) {
		/*
		 *   3 signatures:
		 *   1. el.css()
		 *      returns getComputedStyle(el)
		 *
		 *   2. el.css({ruleName: value})
		 *
		 *   3. el.css('ruleName', 'value')
		 */
		var el = this

		if (arguments.length === 0) {
			return window.getComputedStyle(this)
		}

		else if (typeof ruleOrObject === 'object') { // an object was passed in
			Object.keys(ruleOrObject).forEach(function(key){
				el.style[key] = ruleOrObject[key]
			})
		}

		else if (typeof ruleOrObject === 'string' && value !== undefined) { // 2 string values were passed in
			el.style[ruleOrObject] = value
		}
	}

	HTMLElement.prototype.listen = Node.prototype.listen = function(callback, eventName){
		this.addEventListener(eventName, callback)
	}

// just like it sounds
	HTMLElement.prototype.index = Node.prototype.index = function() {
		return this.parentNode.childNodes.indexOf(this)
	}

// just like it sounds
	HTMLElement.prototype.empty = Node.prototype.empty = function() {
		this.innerHTML = ""
	}

// replaces — DOES NOT APPEND — element's innerHTML with content or array of contents
	HTMLElement.prototype.fill = Node.prototype.fill = function(content) {
		/*
		 *   2 uses:
		 *
		 *   1. el.fill(object or hmtl)
		 *
		 *   2. el.fill([arrray])
		 *
		 */
		var el = this
		el.empty()

		if (Array.isArray(content)) {
			content.forEach(function(obj){
				if (obj)
					el.appendChild(obj)
			})

			return
		}

		if (!content.nodeType) {
			var textElement = document.createElement("text")
			textElement.innerHTML = content
			content = textElement
		}

		this.appendChild(content)
	}

// looks for a given class on the entire linear ancestry
	HTMLElement.prototype.isHeirOfClass = Node.prototype.isHeirOfClass = function (className) {
		if (this === π1('html')) return false

		var parent = this.parentNode

		if (parent) {
			while (parent !== πbody) {
				if (parent.hasClass(className)) return true

				parent = parent.parentNode
			}
		}

		return false
	}

// kills the element itself
	HTMLElement.prototype.kill = Node.prototype.kill = function() {
		if (this.parentNode) {
			this.parentNode.removeChild(this)
		}
	}


	HTMLElement.prototype.parent = Node.prototype.parent = function (selector) {
		var immediateParent = this.parentNode

		if (!selector || π(selector).indexOf(immediateParent) !== -1) {
			return immediateParent
		}

		return immediateParent.parent(selector)
	}

	HTMLElement.prototype.onscreen = Node.prototype.onscreen = function () {
		var rect = this.getBoundingClientRect()
		return rect.top <  window.innerHeight && rect.top > -rect.height
	}
// simple mobile l/r swipe handling
	HTMLElement.prototype.addSwipes = function (swipeLeftHandler, swipeRightHandler, options) {
		var startX,
			startY,
			startTime,
			moving,
			MIN_X_DELTA = options ? (options.xThresh || 30) : 30,
			MAX_Y_DELTA = options ? (options.yThresh || 30) : 30,
			MAX_ALLOWED_TIME = options ? (options.duration || 1000) : 1000

		this.addEventListener('touchstart', function(e){
			if (moving) return

			var touchobj = e.changedTouches[0]
			startX = touchobj.pageX
			startY = touchobj.pageY
			startTime = new Date().getTime() // get time when finger first makes contact with surface
		}, true)

		this.addEventListener('touchmove', function(e){
			if (moving) return

			var touchobj = e.changedTouches[0]
			var deltaX = touchobj.pageX - startX

			// check Y validity
			if (Math.abs(touchobj.pageY - startY) > MAX_Y_DELTA) return

			// check elapsed time
			if ((new Date().getTime() - startTime) > MAX_ALLOWED_TIME) return

			// check X validity
			if (Math.abs(deltaX) < MIN_X_DELTA) return

			moving = true

			if (deltaX < 0) // swipe left
				swipeLeftHandler()
			else // swipe right
				swipeRightHandler()

			setTimeout(function(){
				moving = false
			}, 300)
		}, false)
	}

	/***********************************************
	 ****
	 ****  NODELIST/ARRAY METHODS
	 ****
	 ***********************************************/

	Array.prototype.hasClass = NodeList.prototype.hasClass = function (className) {
		var found = false

		this.forEach(function (obj) {
			if (obj.hasClass(className)) found = true
		})

		return found
	}

	Array.prototype.addClass = NodeList.prototype.addClass = function (className) {
		this.forEach(function (obj) {
			obj.addClass(className)
		})
	}

	Array.prototype.killClass = NodeList.prototype.killClass = function (className) {
		this.forEach(function (obj) {
			obj.killClass(className)
		})
	}

	Array.prototype.toggleClass = NodeList.prototype.toggleClass = function (className) {
		this.forEach(function (obj) {
			obj.toggleClass(className)
		})
	}

	Array.prototype.lastIdx = function() {
		return this.length - 1
	}

	Array.prototype.lastObj = function() {
		return this[this.lastIdx()]
	}

	var arrayMethods = Object.getOwnPropertyNames(Array.prototype)
	arrayMethods.forEach(function(methodName){
		if(methodName !== "length") {
			NodeList.prototype[methodName] = Array.prototype[methodName]
		}
	})

	NodeList.prototype.css = function(ruleOrObject, rule, value) {
		this.forEach(function(obj){
			obj.css(ruleOrObject, rule, value)
		})
	}

	NodeList.prototype.π = function(selector) {
		this.forEach(function (node){
			return node.π(selector)
		})
	}

	NodeList.prototype.π1 = function(selector) {
		this.forEach(function (node){
			return node.π1(selector)
		})
	}

	NodeList.prototype.onclick = function(method){
		this.forEach(function(node){
			node.onclick = method
		})
	}

	/***********************************************
	 ****
	 ****  STRING METHODS
	 ****
	 ***********************************************/

	String.prototype.camelCase = function () {
		var string = this.replace(/[^a-zA-Z\d\s_-]/g, "").toLowerCase()

		var components = string.split(" ")

		components.forEach(function(thisWord, idx){
			if (idx !== 0) {
				var firstLetter = thisWord.charAt(0).toUpperCase()
				thisWord = firstLetter + thisWord.slice(1)
			}

			components[idx] = thisWord
		})

		return components.join("")
	}



	String.prototype.capitalCase = function() {
		var components = this.toLowerCase().split(" ")

		components.forEach(function(thisWord, idx){
			var firstLetter = thisWord.charAt(0).toUpperCase()
			components[idx] = firstLetter + thisWord.slice(1)
		})

		return components.join(" ")
	}

	/***********************************************
	 ****
	 ****  DATE METHODS
	 ****
	 ***********************************************/

// Mon Jan 1 2015 12:00:00 am
	Date.prototype.standardString = function() {
		var Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
		var Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

		var day = Days[this.getDay()]
		var month = Months[this.getMonth()]
		var aDate = this.getDate()
		var year = this.getFullYear()

		var Hours = this.getHours()
		var hour = Hours > 12 ? Hours - 12 : (Hours || 12)

		var Minutes = this.getMinutes()
		var minute = Minutes > 9 ? Minutes : "0" + Minutes

		var amPm = Hours < 12 ? "am" : "pm"

		var time = hour + ":" + minute + " " + amPm

		var output = [day, month, aDate, year, time]

		return output.join(" ")
	}


	/***********************************************
	 ****
	 ****  MISCELLANY
	 ****
	 ***********************************************/

	π.clean = function(callback, eventName) {
		window.removeEventListener(eventName || "DOMContentLoaded", callback)
	}

	π.listen = function(callbacks, eventName) {
		if (typeof callbacks == 'function') callbacks = [callbacks]
		callbacks.forEach(function (callback) {
			window.addEventListener(eventName || "DOMContentLoaded", callback)
		})
	}

	π.highestZ = function() {
		var Z = 1000

		d.a("*").forEach(function(el){
			var thisZ = el.css().zIndex

			if (thisZ != "auto") {
				if (thisZ > Z) Z = thisZ + 1
			}
		})

		return Z
	}

	/***********************************************
	 ****
	 ****  OK, NOW LET'S GO GET OUR MODS
	 ****
	 ***********************************************/

	π.mods = []

	π.setTriggers = function(selector, object){
		selector = 'pi-' + selector + '-trigger'
		π('[' + selector + ']').forEach(function(trigger){
			trigger.onclick = function(){
				object.show(trigger.getAttribute(selector))
			}
		})
	}

	π.setNewTriggers = function(selector){
		var fullSelector = 'pi-' + selector + '-trigger'
		π('[' + fullSelector + ']').forEach(function(trigger){
			trigger.onclick = function(e){
				π[selector].toggle(trigger.getAttribute(fullSelector), e)
			}
		})
	}

	function loadMods() {
		π.clean(loadMods)
		π.mods.forEach(function(init){
			init()
		})
	}

	function setGlobals() {
		π.clean(setGlobals)
		πbody = π1('body')
	}

	π.listen([setGlobals, loadMods])


	window.π = π
	window.π1 = π1
	window.πd = πd
	window.πbody = πbody

})(window)  // end π
