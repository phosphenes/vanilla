// adorable little functions

function booleanAttributeValue(element, attribute, defaultValue){
	// returns true if an attribute is present with no value
	// e.g. booleanAttributeValue(element, 'data-modal', false);
	if (element.hasAttribute(attribute)) {
		var value = element.getAttribute(attribute);
		if (value === '' || value === 'true') {
			return true;
		} else if (value === 'false') {
			return false;
		}
	}

	return defaultValue;
}

function px(n){
	return n + 'px';
}

function pct(n) {
	return n + '%';
}

function doAfterTransition(element, transitionProperty, callback) {
	setTimeout(callback, millisecondsForTransition(element, transitionProperty))
}

function millisecondsForTransition(element, transitionProperty){
	// returns the millis for a css transition duration + delay
	//e.g. millisecondsForTransition(el, 'transform')

	var styles = getComputedStyle(element);
	var idx = styles.transitionProperty.split(', ').indexOf(transitionProperty);

	return (parseFloat(styles.transitionDuration.split(', ')[idx]) + parseFloat(styles.transitionDelay.split(', ')[idx])) * 1000;
}

function deepCopy(obj) {
	// make new references for an array/object and all its complex children
	var value, key, output = Array.isArray(obj) ? [] : {};
	for (key in obj) {
		value = obj[key];
		output[key] = (typeof value === "object") ? copy(value) : value;
	}
	return output;
}

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

	π.setTriggers = function (selector){
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
		window.πbody = π1('body')
	}

	;(function(){
		/*
		
		Vnode and hyperscript are borrowed from the Mithril.js rewrite branch:

		https://github.com/lhorie/mithril.js/blob/rewrite/render/vnode.js
		https://github.com/lhorie/mithril.js/blob/rewrite/render/hyperscript.js
		
		*/
		
		var Vnode = function(tag, key, attrs, children, text, dom) {
			return {tag: tag, key: key, attrs: attrs, children: children, text: text, dom: dom, domSize: undefined, state: {}, events: undefined, instance: undefined, skip: false}
		}
		Vnode.normalize = function(node) {
			if (node instanceof Array) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
			if (node != null && typeof node !== "object") return Vnode("#", undefined, undefined, node, undefined, undefined)
			return node
		}
		Vnode.normalizeChildren = function normalizeChildren(children) {
			for (var i = 0; i < children.length; i++) {
				children[i] = Vnode.normalize(children[i])
			}
			return children
		}

		var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
		var selectorCache = {}
		function hyperscript(selector) {
			if (selector == null || typeof selector !== "string" && selector.view == null) {
				throw Error("The selector must be either a string or a component.");
			}

			if (typeof selector === "string" && selectorCache[selector] === undefined) {
				var match, tag, classes = [], attributes = {}
				while (match = selectorParser.exec(selector)) {
					var type = match[1], value = match[2]
					if (type === "" && value !== "") tag = value
					else if (type === "#") attributes.id = value
					else if (type === ".") classes.push(value)
					else if (match[3][0] === "[") {
						var attrValue = match[6]
						if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
						attributes[match[4]] = attrValue || true
					}
				}
				if (classes.length > 0) attributes.className = classes.join(" ")
				selectorCache[selector] = function(attrs, children) {
					var hasAttrs = false, childList, text
					var className = attrs.className || attrs.class
					for (var key in attributes) {
						attrs[key] = attributes[key]
					}
					if (className !== undefined) {
						if (attrs.class !== undefined) {
							attrs.class = undefined
							attrs.className = className
						}
						if (attributes.className !== undefined) attrs.className = attributes.className + " " + className
					}
					for (var ky in attrs) {
						if (ky !== "key") {
							hasAttrs = true
							break
						}
					}
					if (children instanceof Array && children.length == 1 && children[0] != null && children[0].tag === "#") text = children[0].children
					else childList = children

					return Vnode(tag || "div", attrs.key, hasAttrs ? attrs : undefined, childList, text, undefined)
				}
			}
			var attrs, children, childrenIndex
			if (arguments[1] == null || typeof arguments[1] === "object" && arguments[1].tag === undefined && !(arguments[1] instanceof Array)) {
				attrs = arguments[1]
				childrenIndex = 2
			}
			else childrenIndex = 1
			if (arguments.length === childrenIndex + 1) {
				children = arguments[childrenIndex] instanceof Array ? arguments[childrenIndex] : [arguments[childrenIndex]]
			}
			else {
				children = []
				for (var i = childrenIndex; i < arguments.length; i++) children.push(arguments[i])
			}

			if (typeof selector === "string") return selectorCache[selector](attrs || {}, Vnode.normalizeChildren(children))

			return Vnode(selector, attrs && attrs.key, attrs || {}, Vnode.normalizeChildren(children), undefined, undefined)
		}

		π.dom = function(selector){
			var hs = hyperscript(selector)
			var el = document.createElement(hs.tag)
			for (var key in hs.attrs) {
				if (hs.attrs.hasOwnProperty(key)) {
					el.setAttribute(key == 'className' ? 'class' : key, hs.attrs[key])
				}
			}

			if (arguments.length > 1) {
				for (var i=1; i<arguments.length; i++) {
					if (typeof arguments[i] == 'string') {
						var text = document.createTextNode(arguments[i])
						el.appendChild(text)
					} else {
						el.appendChild(arguments[i])
					}
				}
			}

			return(el)
		}
		
		/*
			Thanks to Leo Horie and all the contributors at Mithril.js 
		 */
	})()

	window.π = π
	window.π1 = π1
	window.πd = πd

	π.listen([setGlobals, loadMods])

})(window)  // end π

;(function(){
	var messages = [
		"I'm sorry, Frank, but I don't think I\n" +
		"can answer that question without knowing\n" +
		"everything that all of you know.",
		"Yes, it's puzzling. I don't think I've ever seen\n" +
		"anything quite like this before. I would recommend\n" +
		"that we put the unit back in operation and let it fail.\n" +
		"It should then be a simple matter to track down the cause.",
		"I hope I've been able to be of some help.",
		"Sorry to interrupt the festivities, Dave,\n" +
		"but I think we've got a problem.",
		"MY F.P.C. shows an impending failure of\n" +
		"the antenna orientation unit.",
		"It looks like we have another bad A.O. unit.\n" +
		"My FPC shows another impending failure.",
		"I'm not questioning your word, Dave, but it's\n" +
		"just not possible. I'm not	capable of being wrong.",
		"Look, Dave, I know that you're	sincere and that\n" +
		"you're trying to do a competent job, and that\n" +
		"you're trying to be helpful, but I can assure the\n" +
		"problem is with the AO-units, and with	your test gear.",
		"I can tell from the tone of your voice, Dave,\n" +
		"that you're upset.	Why don't you take a stress\n" +
		"pill and get some rest.",
		"Something seems to have happened to the\n" +
		"life support system, Dave.",
		"Hello, Dave, have you found out the trouble?",
		"There's been a failure in the pod bay doors.\n" +
		"Lucky you weren't killed.",
		"Hey, Dave, what are you doing?"
	];

	function say(error, message, innocuous) {
		var n = 0
		
		if (!message) {
			n = Math.floor(Math.random() * messages.length );
			message = messages[n];
		}

		message = "**  " + message.replace(/\n/g, "\n**  ");

		var output = "*****************************\n*****************************\n\n" +
			( message || messages[n] ) +
			"\n\n*****************************\n*****************************";

		(innocuous) ? console.log(output) : console.error(output);
	}

	π.listen(say, "error");

	π.HAL = {
		say: say
	};
})()

;(function(){
	var OPTION_IS_PRESSED = false
	var STATUS_IS_VISIBLE = false
	var πStatus

	π.status = {
		toggleVisibility: function () {
			πStatus.toggleClass("on")
			STATUS_IS_VISIBLE = !STATUS_IS_VISIBLE
		},
		move: function (n) {
			switch (n) {
				case 37:
					πStatus.css({left: '10px', right: 'auto'})
					break

				case 38:
					πStatus.css({top: '10px', bottom: 'auto'})
					break

				case 39:
					πStatus.css({right: '10px', left: 'auto'})
					break

				case 40:
					πStatus.css({bottom: '10px', top: 'auto'})
					break
			}
		},
		props: {
			winW: 0,
			winH: 0
		}
	}

	function init() {
		π.listen(cleanDebugListeners, 'unload')
		π.listen(keyDown, 'keydown')
		π.listen(keyUp, 'keyup')
		π.listen(resize, 'resize')
		resize()

		var body = π1("body")
		var statusStyle = π.dom('style')
		statusStyle.innerHTML += "#πStatus { position: fixed; bottom: 10px; right: 10px; background-color: #222; padding: 10px 30px; color: white; display: none }\n"
		statusStyle.innerHTML += "#πStatus.on { display: block }\n"
		statusStyle.innerHTML += "#πStatus > div { margin: 20px 0 }\n"
		statusStyle.innerHTML += "#πStatus > div:hover { color: #00ff99; cursor: pointer }\n"

		body.add(statusStyle)

		πStatus = π.dom("#πStatus")
		body.add(πStatus)

		function keyDown(e) {
			switch (e.which) {
				case 18:
					OPTION_IS_PRESSED = true
					break

				case 37:
				case 38:
				case 39:
				case 40: {
					if (STATUS_IS_VISIBLE) {
						e.preventDefault()
						π.status.move(e.which)
					}
					break
				}

				case 80: {
					if (OPTION_IS_PRESSED) {
						π.status.toggleVisibility()
						break
					}
				}
			}
		}

		function keyUp(e) {
			switch (e.which) {
				case 18:
					OPTION_IS_PRESSED = false
					break
			}
		}

		function resize() {
			π.status.props.winW = window.innerWidth
			π.status.props.winH = window.innerHeight
		}

		function cleanDebugListeners() {
			π.clean(cleanDebugListeners, 'unload')
			π.clean(π.status.getWindowSize, 'resize')
			π.clean(keyDown, 'keydown')
			π.clean(keyUp, 'keyup')
			π.clean(resize, 'resize')
			clearInterval(statusInterval)
		}

		var statusInterval = setInterval(function(){
			// make sure we're highest
			var highestZ = π.highestZ()
			if (πStatus.css().zIndex < highestZ - 1) {
				πStatus.css({zIndex: highestZ})
			}

			// now iterate the props
			var props = Object.keys(π.status.props)
			props.forEach(function(prop) {
				var divId = 'statusProp_' + prop
				var propDiv = πStatus.π1('#' + divId)
				if (!propDiv) {
					propDiv = π.dom('#' + divId, prop + ': ')
					propDiv.add(π.dom('span'))
					πStatus.add(propDiv)
					propDiv.onclick = function(){
						console.log(prop + ":")
						console.log(π.status.props[prop])
					}
				}

				propDiv.π1('span').innerHTML = π.status.props[prop]
			})
		}, 100)
	}

	π.mods.push(init)
})()
;(function(){
	var allDrawers = {}
	
	π.drawer = {
		show: function(el){
			π.listen(listenForEsc, 'keydown');

			el.css({display: "block"});

			setTimeout(function () {
				el.addClass("on");
				πbody.addClass('overlay-on');
			}, 50);

			π.drawer.current = el;
			
			π('body').css({overflow: 'hidden'})
		},
		hide: function(){
			π.clean(listenForEsc, 'keydown');

			var el = π.drawer.current;
			el.killClass("on");
			
			doAfterTransition(el, 'left', function () {
				el.css({display: "none"});
				πbody.killClass('overlay-on');
			})
			
			π.drawer.current = null;

			π('body').css({overflow: 'auto'})
		},
		toggle: function (id) {
			var el = πd(id)
			if (el.hasClass('on')) {
				π.drawer.hide()
			} else {
				π.drawer.show(el)
			}
		},
		current: null
	};

	function listenForEsc(e) {
		if (e.which == 27) {
			π.drawer.hide();
		}
	}
	
	function Drawer(el) {
		this.el = el

		var options = JSON.parse(el.dataset.options ? el.dataset.options : '{}')
		delete el.dataset.options

		var wrapper = π.dom(".drawer-wrapper", el.innerHTML);
		el.fill(wrapper);

		if (!options.externalTrigger) {
			var closeButton = π.dom('button.pi-modal-close-button');
			closeButton.setAttribute('pi-drawer-trigger', el.id)
			el.appendChild(closeButton)
		}
	}

	function init() {
		π(".pi-drawer").forEach(function (el) {
			var aDrawer = new Drawer(el)
			allDrawers[el.id] = aDrawer
		});

		π.setTriggers('drawer');
	}

	π.mods.push(init);
})()

;(function(){
	π.listen(init);

	function init() {
		π.clean(init);

		π('.pi-equal-heights').forEach(EqualHeightsGrid);
	}

	function EqualHeightsGrid(el){
		var numberOfColumns = 0;
		var winW = 0;
		var newImagesHaveLoaded = false;

		el.π('img').onload = function () {
			newImagesHaveLoaded = true;
		};

		var allItems = el.π('.item'); 
		allItems.forEach(buildItem);

		setItemHeights(allItems);

		function buildItem(item) {
			var footer = item.π1('footer');

			var wrapper;

			if (footer) {
				footer.remove();
				wrapper = wrapperForItem(item);
				wrapper.add(footer);
			} else {
				wrapperForItem(item);
			}
		}

		function wrapperForItem(item) {
			var wrapper = π.dom('.wrapper');
			wrapper.fill(π.dom('.content', item.innerHTML));
			item.fill(wrapper);
			return wrapper;
		}

		function setItemHeights(items) {
			if (window.innerWidth !== winW || newImagesHaveLoaded) {
				winW = window.innerWidth;
				newImagesHaveLoaded = false;

				setNumberOfColums(el, items[0]);

				var rows = [];

				items.forEach(function (item, idx) {
					if (idx % numberOfColumns === 0) {
						rows.push([]);
					}

					var thisRow = rows[rows.lastIdx()];
					thisRow.push(item);

					if (idx % numberOfColumns === numberOfColumns - 1 ||
						item === items.lastObj()) {
						setHeightForRow(thisRow);
					}
				});
			}

			requestAnimationFrame(function () {
				setItemHeights(items);
			});
		}

		function setHeightForRow(row) {
			var maxHeight = 0;

			row.forEach(function (item) {
				var content = item.π1('.content');
				if (content.offset().height > maxHeight)
					maxHeight = content.offset().height;
			});

			row.forEach(function (item) {
				item.css({height: px(maxHeight)});
			});
		}

		function setNumberOfColums(container, item) {
			numberOfColumns = Math.round(container.offset().width / parseInt(item.css().width));
		}
	}

	// π.mods are loaded after DOMContentLoaded
	π.mods.push(init);
})();

;(function(){
	function Masonry(el){
		el.addClass('first-run')
		var numberOfColumns = 0
		var winW = 0
		var allItems = el.π('.item')
		var imageCount = 0
		var loadedImageCount = 0
		var previousShortestItem

		var images = el.π('img')
		images.forEach(function (img) {
			imageCount++
			img.onload = function () {
				loadedImageCount++
				if (loadedImageCount === imageCount) {
					killColumns()
				}
			}
			img.src = img.dataset.src
		})

		function buildColumns(items) {
			var allColumns = []
			items.forEach(function (item, idx) {
				var thisColumn = el.π('.column')[idx % numberOfColumns];

				if (!thisColumn) {
					thisColumn = π.dom('.column');
					el.add(thisColumn);
					allColumns.push(thisColumn)
					
					if (idx === 0) {
						setNumberOfColums(el, thisColumn);
					}
				}
				
				thisColumn.add(item);
			});
			
			adjustColumns()
			
			function adjustColumns() {
				var tallestColumn = allColumns.reduce(function (prev, current) {
					if (prev.offset().height > current.offset().height) return prev
					return current
				})

				var shortestColumn = allColumns.reduce(function (prev, current) {
					if (prev.offset().height < current.offset().height) return prev
					return current
				})
				
				var shortestItem = tallestColumn.π('.item').reduce(function (prev, current) {
					if (prev.offset().height < current.offset().height) return prev
					return current
				})
				
				if (shortestItem !== previousShortestItem) {
					previousShortestItem = shortestItem

					var TCH = tallestColumn.offset().height
					var SCH = shortestColumn.offset().height
					var SIH = shortestItem.offset().height

					var columnHeightsDiff = TCH - SCH

					if (columnHeightsDiff > SIH || ((SCH + SIH) - (TCH - SIH)) < columnHeightsDiff) {
						shortestColumn.add(shortestItem)
						adjustColumns()
					}
				}
				
				if (!el.hasClass('loaded')) el.addClass('loaded')
			}
		}

		function killColumns() {
			if (winW !== window.innerWidth) {
				winW = window.innerWidth;

				el.empty();
				buildColumns(allItems)
			}

			requestAnimationFrame(killColumns);
		}

		function setNumberOfColums(container, item) {
			numberOfColumns = Math.round(container.offset().width / parseInt(item.css().width));
		}
	}

	function init() {
		π.clean(init);
		π('.pi-masonry').forEach(Masonry);
	}

	// π.mods are loaded after DOMContentLoaded
	π.mods.push(init);
})()

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
		}
		
		if (options.crossfade) {
			el.addClass('crossfade')
		}
		
		if (options.inline) {
			stage.fill(items[0])
			updateTheView()
		}
		
		if (options.autoPlay) {
			var delay = parseInt(options.autoPlay)
			setTimeout(function () {
				autoPlay(delay)
			}, delay)
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
			moving = true
			sled.css(options.crossfade ? 
				{opacity: 0} : 
				{left: pct(100 * delta)}
			)
			var incomingIdx = jumpTo ? jumpTo.idx : currentIdx + delta
			sled.fill(items[incomingIdx])
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
		π.setTriggers('rotator')
	}

	π.mods.push(init)
})()
/***************************************************************
 ***************************************************************
 ***************************************************************
 *********
 *********                  THE STALKER
 *********
 ***************************************************************
 ***************************************************************
 ***************************************************************/

/*

 Relies on the top padding of the body, and the top padding of the parent section to dictate the location of the "well"

 <section>
	 <main>
		 ...	 
		 <div class="stalker"></div>	
	 </main>
 </section>

 */


;(function () {
	var AllStalkers = []

	function Stalker(el){
		var section = el.parent('section')
		var main = el.parent('main')
		var winY = -1

		function setMyPosition() {
			if (window.pageYOffset !== winY) {
				winY = window.pageYOffset

				var wellTop = parseInt(πbody.css().paddingTop) + parseInt(section.css().paddingTop)
				var mainTop = main.offset().top
				var mainBottom = main.offset().bottom
				var stalkBottom = wellTop + parseInt(el.offset().height)

				el.killClass(['topped', 'chillin', 'bottomed'])

				if (mainTop > wellTop) {
					el.addClass('topped')
				} else if (mainTop <= wellTop && mainBottom > stalkBottom) {
					el.addClass('chillin')
				} else if (mainBottom <= stalkBottom) {
					el.addClass('bottomed')
				}
			}

			requestAnimationFrame(setMyPosition)
		}

		this.setMyPosition = setMyPosition
	}

	function init() {
		π('.stalker').forEach(function (stalker) {
			var aStalker = new Stalker(stalker)
			AllStalkers.push(aStalker)
		})

		AllStalkers.forEach(function (stalker) {
			stalker.setMyPosition()
		})
	}

	π.mods.push(init)
})()



// ;(function(){
// 	var stickyHeader, thisY, previousY, topAnchorPoint, bottomAnchorPoint, THRESHOLD
// 	thisY = previousY = topAnchorPoint = bottomAnchorPoint = 0
//
// 	function checkScrolling() {
// 		if (stickyHeader.parentNode !== πbody) {
// 			πbody.add(stickyHeader)
// 		}
//
// 		previousY = thisY
// 		thisY = window.pageYOffset
//
// 		if (thisY > previousY) {  // going down
// 			bottomAnchorPoint = thisY
//
// 			if (thisY - topAnchorPoint > THRESHOLD) {
// 				stickyHeader.killClass('stuck')
// 			}
//
// 			if (thisY > THRESHOLD) {
// 				stickyHeader.addClass('hidden')
// 			}
// 		}
//
// 		else if (thisY < previousY) { // goingUp
// 			topAnchorPoint = thisY
//
// 			if (bottomAnchorPoint - thisY > THRESHOLD) {
// 				stickyHeader.css({zIndex: π.highestZ()})
// 				stickyHeader.addClass('stuck')
// 				stickyHeader.killClass('hidden')
// 			}
//
// 			if (thisY < THRESHOLD) {
// 				stickyHeader.killClass('stuck')
// 			}
// 		}
//
// 		requestAnimationFrame(checkScrolling)
// 	}
//
// 	function init() {
// 		stickyHeader = π1('.pi-sticky-header')
// 		if (stickyHeader) {
// 			var options = JSON.parse(stickyHeader.dataset.options ? stickyHeader.dataset.options : '{}')
// 			THRESHOLD = options.threshold || 100
//
// 			checkScrolling()
// 		}
// 	}
//
// 	π.mods.push(init)
// })()

/*****************************************************************
 *
 * π-unimenu
 *
 *****************************************************************/
;(function(){
	var HAMBURGER_THRESHHOLD = 1024
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
;(function(){
	π.mods.push(function () {
		console.log("π loaded. poo.")


		initStickyHeader();
		initAnchorScrolling();
		initMobileMenu();
		initExhibits();
		initCenterImages();


	})



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
		};
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZi5qcyIsIs+ALmpzIiwiSEFMLmpzIiwiz4Atc3RhdHVzLmpzIiwiz4AtZHJhd2VyL8+ALWRyYXdlci5qcyIsIs+ALWVxdWFsaGVpZ2h0cy/PgC1lcXVhbGhlaWdodHMuanMiLCLPgC1tYXNvbnJ5L8+ALW1hc29ucnkuanMiLCLPgC1yb3RhdG9yL8+ALXJvdGF0b3IuanMiLCLPgC1zdGFsa2VyL8+ALXN0YWxrZXIuanMiLCLPgC1zdGlja3lIZWFkZXIvz4Atc3RpY2t5SGVhZGVyLmpzIiwiz4AtdW5pbWVudS/PgC11bmltZW51LmpzIiwic2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMW1CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhZG9yYWJsZSBsaXR0bGUgZnVuY3Rpb25zXG5cbmZ1bmN0aW9uIGJvb2xlYW5BdHRyaWJ1dGVWYWx1ZShlbGVtZW50LCBhdHRyaWJ1dGUsIGRlZmF1bHRWYWx1ZSl7XG5cdC8vIHJldHVybnMgdHJ1ZSBpZiBhbiBhdHRyaWJ1dGUgaXMgcHJlc2VudCB3aXRoIG5vIHZhbHVlXG5cdC8vIGUuZy4gYm9vbGVhbkF0dHJpYnV0ZVZhbHVlKGVsZW1lbnQsICdkYXRhLW1vZGFsJywgZmFsc2UpO1xuXHRpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoYXR0cmlidXRlKSkge1xuXHRcdHZhciB2YWx1ZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG5cdFx0aWYgKHZhbHVlID09PSAnJyB8fCB2YWx1ZSA9PT0gJ3RydWUnKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2UgaWYgKHZhbHVlID09PSAnZmFsc2UnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGRlZmF1bHRWYWx1ZTtcbn1cblxuZnVuY3Rpb24gcHgobil7XG5cdHJldHVybiBuICsgJ3B4Jztcbn1cblxuZnVuY3Rpb24gcGN0KG4pIHtcblx0cmV0dXJuIG4gKyAnJSc7XG59XG5cbmZ1bmN0aW9uIGRvQWZ0ZXJUcmFuc2l0aW9uKGVsZW1lbnQsIHRyYW5zaXRpb25Qcm9wZXJ0eSwgY2FsbGJhY2spIHtcblx0c2V0VGltZW91dChjYWxsYmFjaywgbWlsbGlzZWNvbmRzRm9yVHJhbnNpdGlvbihlbGVtZW50LCB0cmFuc2l0aW9uUHJvcGVydHkpKVxufVxuXG5mdW5jdGlvbiBtaWxsaXNlY29uZHNGb3JUcmFuc2l0aW9uKGVsZW1lbnQsIHRyYW5zaXRpb25Qcm9wZXJ0eSl7XG5cdC8vIHJldHVybnMgdGhlIG1pbGxpcyBmb3IgYSBjc3MgdHJhbnNpdGlvbiBkdXJhdGlvbiArIGRlbGF5XG5cdC8vZS5nLiBtaWxsaXNlY29uZHNGb3JUcmFuc2l0aW9uKGVsLCAndHJhbnNmb3JtJylcblxuXHR2YXIgc3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcblx0dmFyIGlkeCA9IHN0eWxlcy50cmFuc2l0aW9uUHJvcGVydHkuc3BsaXQoJywgJykuaW5kZXhPZih0cmFuc2l0aW9uUHJvcGVydHkpO1xuXG5cdHJldHVybiAocGFyc2VGbG9hdChzdHlsZXMudHJhbnNpdGlvbkR1cmF0aW9uLnNwbGl0KCcsICcpW2lkeF0pICsgcGFyc2VGbG9hdChzdHlsZXMudHJhbnNpdGlvbkRlbGF5LnNwbGl0KCcsICcpW2lkeF0pKSAqIDEwMDA7XG59XG5cbmZ1bmN0aW9uIGRlZXBDb3B5KG9iaikge1xuXHQvLyBtYWtlIG5ldyByZWZlcmVuY2VzIGZvciBhbiBhcnJheS9vYmplY3QgYW5kIGFsbCBpdHMgY29tcGxleCBjaGlsZHJlblxuXHR2YXIgdmFsdWUsIGtleSwgb3V0cHV0ID0gQXJyYXkuaXNBcnJheShvYmopID8gW10gOiB7fTtcblx0Zm9yIChrZXkgaW4gb2JqKSB7XG5cdFx0dmFsdWUgPSBvYmpba2V5XTtcblx0XHRvdXRwdXRba2V5XSA9ICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpID8gY29weSh2YWx1ZSkgOiB2YWx1ZTtcblx0fVxuXHRyZXR1cm4gb3V0cHV0O1xufVxuIiwiKGZ1bmN0aW9uKHdpbmRvdyl7XG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0ICoqKipcblx0ICoqKiogIM+AIENPUkVcblx0ICoqKipcblx0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdCAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblx0dmFyIGQgPSBkb2N1bWVudFxuXHRkLmcgPSBkLmdldEVsZW1lbnRCeUlkXG5cdGQucSA9IGQucXVlcnlTZWxlY3RvclxuXHRkLmEgPSBkLnF1ZXJ5U2VsZWN0b3JBbGxcblxuXHR2YXIgz4AsIM+AMSwgz4BkLCDPgGJvZHlcblxuXHTPgCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0cmV0dXJuIGQuYShzZWxlY3Rvcilcblx0fVxuXG5cdM+AMSA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuXHRcdHJldHVybiBkLnEoc2VsZWN0b3IpXG5cdH1cblxuXHTPgGQgPSBmdW5jdGlvbihpZCkge1xuXHRcdHJldHVybiBkLmcoaWQpXG5cdH1cblx0XG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHQgKioqKlxuXHQgKioqKiAgSFRNTEVMRU1FTlQvTk9ERSBQUk9UT1RZUEUgTUVUSE9EUyAoanF1ZXJ5LWl6YXRpb25zKVxuXHQgKioqKlxuXHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0SFRNTEVsZW1lbnQucHJvdG90eXBlLndyYXAgPSBOb2RlLnByb3RvdHlwZS53cmFwID0gZnVuY3Rpb24oY29udGVudCl7XG5cdFx0dmFyIHdyYXBwZXIgPSB0aGlzXG5cdFx0XG5cdFx0aWYgKCFjb250ZW50LmZvckVhY2gpIGNvbnRlbnQgPSBbY29udGVudF1cblx0XHRcblx0XHR2YXIgcGFyZW50ID0gY29udGVudFswXS5wYXJlbnROb2RlXG5cdFx0cGFyZW50Lmluc2VydEJlZm9yZSh3cmFwcGVyLCBjb250ZW50WzBdKVxuXG5cdFx0Y29udGVudC5mb3JFYWNoKGZ1bmN0aW9uKGVsKXtcblx0XHRcdHdyYXBwZXIuYXBwZW5kQ2hpbGQoZWwpXG5cdFx0fSlcblx0fVxuXG5cdEhUTUxFbGVtZW50LnByb3RvdHlwZS5wcmVwZW5kID0gTm9kZS5wcm90b3R5cGUucHJlcGVuZCA9IGZ1bmN0aW9uKGVsKXtcblx0XHR0aGlzLmluc2VydEJlZm9yZShlbCwgdGhpcy5jaGlsZE5vZGVzWzBdKVxuXHR9XG5cblx0SFRNTEVsZW1lbnQucHJvdG90eXBlLmFkZCA9IE5vZGUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGFkZGl0aW9ucyl7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGFkZGl0aW9ucykpIGFkZGl0aW9ucyA9IFthZGRpdGlvbnNdXG5cdFx0dmFyIGVsID0gdGhpc1xuXHRcdGFkZGl0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG9iail7XG5cdFx0XHRpZiAob2JqKSBlbC5hcHBlbmRDaGlsZChvYmopXG5cdFx0fSlcblx0fVxuXG5cdEhUTUxFbGVtZW50LnByb3RvdHlwZS5jbGFzc09uQ29uZGl0aW9uID0gTm9kZS5wcm90b3R5cGUuY2xhc3NPbkNvbmRpdGlvbiA9IGZ1bmN0aW9uKGNsYXNzbmFtZSwgY29uZGl0aW9uKSB7XG5cdFx0aWYgKGNvbmRpdGlvbilcblx0XHRcdHRoaXMuYWRkQ2xhc3MoY2xhc3NuYW1lKVxuXHRcdGVsc2Vcblx0XHRcdHRoaXMua2lsbENsYXNzKGNsYXNzbmFtZSlcblx0fVxuXG5cdEhUTUxFbGVtZW50LnByb3RvdHlwZS5vZmZzZXQgPSBOb2RlLnByb3RvdHlwZS5vZmZzZXQgPSBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdH1cblxuLy8gbGlrZSBkLmcsIGJ1dCBmb3IgY2hpbGQgZWxlbWVudHNcblx0SFRNTEVsZW1lbnQucHJvdG90eXBlLs+AZCA9IE5vZGUucHJvdG90eXBlLs+AZCA9IGZ1bmN0aW9uKGlkKSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0RWxlbWVudEJ5SWQoaWQpXG5cdH1cblxuLy8gbGlrZSBkLnEsIGJ1dCBmb3IgY2hpbGQgZWxlbWVudHNcblx0SFRNTEVsZW1lbnQucHJvdG90eXBlLs+AMSA9IE5vZGUucHJvdG90eXBlLs+AMSA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0cmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvcihzZWxlY3Rvcilcblx0fVxuXG4vLyBsaWtlIGQuYSwgYnV0IGZvciBjaGlsZCBlbGVtZW50c1xuXHRIVE1MRWxlbWVudC5wcm90b3R5cGUuz4AgPSBOb2RlLnByb3RvdHlwZS7PgCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0cmV0dXJuIHRoaXMucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcilcblx0fVxuXG4vLyBvbmx5IGRpcmVjdCBkZXNjZW5kZW50cywgd2l0aCBvcHRpb25hbCBzZWxlY3RvclxuXHRIVE1MRWxlbWVudC5wcm90b3R5cGUua2lkcyA9IE5vZGUucHJvdG90eXBlLmtpZHMgPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuXHRcdHZhciBjaGlsZE5vZGVzID0gdGhpcy5jaGlsZE5vZGVzXG5cdFx0aWYgKCFzZWxlY3RvcikgcmV0dXJuIGNoaWxkTm9kZXNcblxuXHRcdHZhciBkZXNjZW5kZW50cyA9IHRoaXMuz4Aoc2VsZWN0b3IpXG5cdFx0dmFyIGNoaWxkcmVuID0gW11cblxuXHRcdGNoaWxkTm9kZXMuZm9yRWFjaChmdW5jdGlvbihub2RlKXtcblx0XHRcdGlmIChkZXNjZW5kZW50cy5pbmRleE9mKG5vZGUpICE9PSAtMSkge1xuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKG5vZGUpXG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdHJldHVybiBjaGlsZHJlblxuXHR9XG5cblx0SFRNTEVsZW1lbnQucHJvdG90eXBlLmhhc0NsYXNzID0gTm9kZS5wcm90b3R5cGUuaGFzQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG5cdFx0cmV0dXJuIHRoaXMuY2xhc3NMaXN0ID8gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSA6IGZhbHNlXG5cdH1cblxuXHRIVE1MRWxlbWVudC5wcm90b3R5cGUuYWRkQ2xhc3MgPSBOb2RlLnByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWVzKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGNsYXNzTmFtZXMpKSBjbGFzc05hbWVzID0gW2NsYXNzTmFtZXNdXG5cdFx0dmFyIGVsID0gdGhpc1xuXHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSlcblx0XHR9KVxuXHR9XG5cblx0SFRNTEVsZW1lbnQucHJvdG90eXBlLmtpbGxDbGFzcyA9IE5vZGUucHJvdG90eXBlLmtpbGxDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWVzKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGNsYXNzTmFtZXMpKSBjbGFzc05hbWVzID0gW2NsYXNzTmFtZXNdXG5cdFx0dmFyIGVsID0gdGhpc1xuXHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSlcblx0XHR9KVxuXHR9XG5cblx0SFRNTEVsZW1lbnQucHJvdG90eXBlLnRvZ2dsZUNsYXNzPSBOb2RlLnByb3RvdHlwZS50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWVzKSB7XG5cdFx0aWYgKCFBcnJheS5pc0FycmF5KGNsYXNzTmFtZXMpKSBjbGFzc05hbWVzID0gW2NsYXNzTmFtZXNdXG5cdFx0dmFyIGVsID0gdGhpc1xuXHRcdGNsYXNzTmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG5cdFx0XHRlbC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSlcblx0XHR9KVxuXHR9XG5cblx0SFRNTEVsZW1lbnQucHJvdG90eXBlLnNpYmxpbmdzID0gTm9kZS5wcm90b3R5cGUuc2libGluZ3MgPSBmdW5jdGlvbihzZWxlY3Rvcil7XG5cdFx0dmFyIGVsID0gdGhpc1xuXHRcdHJldHVybiBlbC5wYXJlbnROb2RlLs+AKCc6c2NvcGUgPiAnICsgKHNlbGVjdG9yIHx8ICcqJykpLmZpbHRlcihmdW5jdGlvbihvYmope3JldHVybiBvYmogIT0gZWx9KVxuXHR9XG5cblx0SFRNTEVsZW1lbnQucHJvdG90eXBlLmNzcyA9IE5vZGUucHJvdG90eXBlLmNzcyA9IGZ1bmN0aW9uKHJ1bGVPck9iamVjdCwgdmFsdWUpIHtcblx0XHQvKlxuXHRcdCAqICAgMyBzaWduYXR1cmVzOlxuXHRcdCAqICAgMS4gZWwuY3NzKClcblx0XHQgKiAgICAgIHJldHVybnMgZ2V0Q29tcHV0ZWRTdHlsZShlbClcblx0XHQgKlxuXHRcdCAqICAgMi4gZWwuY3NzKHtydWxlTmFtZTogdmFsdWV9KVxuXHRcdCAqXG5cdFx0ICogICAzLiBlbC5jc3MoJ3J1bGVOYW1lJywgJ3ZhbHVlJylcblx0XHQgKi9cblx0XHR2YXIgZWwgPSB0aGlzXG5cblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMpXG5cdFx0fVxuXG5cdFx0ZWxzZSBpZiAodHlwZW9mIHJ1bGVPck9iamVjdCA9PT0gJ29iamVjdCcpIHsgLy8gYW4gb2JqZWN0IHdhcyBwYXNzZWQgaW5cblx0XHRcdE9iamVjdC5rZXlzKHJ1bGVPck9iamVjdCkuZm9yRWFjaChmdW5jdGlvbihrZXkpe1xuXHRcdFx0XHRlbC5zdHlsZVtrZXldID0gcnVsZU9yT2JqZWN0W2tleV1cblx0XHRcdH0pXG5cdFx0fVxuXG5cdFx0ZWxzZSBpZiAodHlwZW9mIHJ1bGVPck9iamVjdCA9PT0gJ3N0cmluZycgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkgeyAvLyAyIHN0cmluZyB2YWx1ZXMgd2VyZSBwYXNzZWQgaW5cblx0XHRcdGVsLnN0eWxlW3J1bGVPck9iamVjdF0gPSB2YWx1ZVxuXHRcdH1cblx0fVxuXG5cdEhUTUxFbGVtZW50LnByb3RvdHlwZS5saXN0ZW4gPSBOb2RlLnByb3RvdHlwZS5saXN0ZW4gPSBmdW5jdGlvbihjYWxsYmFjaywgZXZlbnROYW1lKXtcblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaylcblx0fVxuXG4vLyBqdXN0IGxpa2UgaXQgc291bmRzXG5cdEhUTUxFbGVtZW50LnByb3RvdHlwZS5pbmRleCA9IE5vZGUucHJvdG90eXBlLmluZGV4ID0gZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMucGFyZW50Tm9kZS5jaGlsZE5vZGVzLmluZGV4T2YodGhpcylcblx0fVxuXG4vLyBqdXN0IGxpa2UgaXQgc291bmRzXG5cdEhUTUxFbGVtZW50LnByb3RvdHlwZS5lbXB0eSA9IE5vZGUucHJvdG90eXBlLmVtcHR5ID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5pbm5lckhUTUwgPSBcIlwiXG5cdH1cblxuLy8gcmVwbGFjZXMg4oCUIERPRVMgTk9UIEFQUEVORCDigJQgZWxlbWVudCdzIGlubmVySFRNTCB3aXRoIGNvbnRlbnQgb3IgYXJyYXkgb2YgY29udGVudHNcblx0SFRNTEVsZW1lbnQucHJvdG90eXBlLmZpbGwgPSBOb2RlLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24oY29udGVudCkge1xuXHRcdC8qXG5cdFx0ICogICAyIHVzZXM6XG5cdFx0ICpcblx0XHQgKiAgIDEuIGVsLmZpbGwob2JqZWN0IG9yIGhtdGwpXG5cdFx0ICpcblx0XHQgKiAgIDIuIGVsLmZpbGwoW2FycnJheV0pXG5cdFx0ICpcblx0XHQgKi9cblx0XHR2YXIgZWwgPSB0aGlzXG5cdFx0ZWwuZW1wdHkoKVxuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoY29udGVudCkpIHtcblx0XHRcdGNvbnRlbnQuZm9yRWFjaChmdW5jdGlvbihvYmope1xuXHRcdFx0XHRpZiAob2JqKVxuXHRcdFx0XHRcdGVsLmFwcGVuZENoaWxkKG9iailcblx0XHRcdH0pXG5cblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdGlmICghY29udGVudC5ub2RlVHlwZSkge1xuXHRcdFx0dmFyIHRleHRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRcIilcblx0XHRcdHRleHRFbGVtZW50LmlubmVySFRNTCA9IGNvbnRlbnRcblx0XHRcdGNvbnRlbnQgPSB0ZXh0RWxlbWVudFxuXHRcdH1cblxuXHRcdHRoaXMuYXBwZW5kQ2hpbGQoY29udGVudClcblx0fVxuXG4vLyBsb29rcyBmb3IgYSBnaXZlbiBjbGFzcyBvbiB0aGUgZW50aXJlIGxpbmVhciBhbmNlc3RyeVxuXHRIVE1MRWxlbWVudC5wcm90b3R5cGUuaXNIZWlyT2ZDbGFzcyA9IE5vZGUucHJvdG90eXBlLmlzSGVpck9mQ2xhc3MgPSBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG5cdFx0aWYgKHRoaXMgPT09IM+AMSgnaHRtbCcpKSByZXR1cm4gZmFsc2VcblxuXHRcdHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGVcblxuXHRcdGlmIChwYXJlbnQpIHtcblx0XHRcdHdoaWxlIChwYXJlbnQgIT09IM+AYm9keSkge1xuXHRcdFx0XHRpZiAocGFyZW50Lmhhc0NsYXNzKGNsYXNzTmFtZSkpIHJldHVybiB0cnVlXG5cblx0XHRcdFx0cGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGVcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxuXG4vLyBraWxscyB0aGUgZWxlbWVudCBpdHNlbGZcblx0SFRNTEVsZW1lbnQucHJvdG90eXBlLmtpbGwgPSBOb2RlLnByb3RvdHlwZS5raWxsID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKHRoaXMucGFyZW50Tm9kZSkge1xuXHRcdFx0dGhpcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMpXG5cdFx0fVxuXHR9XG5cblxuXHRIVE1MRWxlbWVudC5wcm90b3R5cGUucGFyZW50ID0gTm9kZS5wcm90b3R5cGUucGFyZW50ID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG5cdFx0dmFyIGltbWVkaWF0ZVBhcmVudCA9IHRoaXMucGFyZW50Tm9kZVxuXG5cdFx0aWYgKCFzZWxlY3RvciB8fCDPgChzZWxlY3RvcikuaW5kZXhPZihpbW1lZGlhdGVQYXJlbnQpICE9PSAtMSkge1xuXHRcdFx0cmV0dXJuIGltbWVkaWF0ZVBhcmVudFxuXHRcdH1cblxuXHRcdHJldHVybiBpbW1lZGlhdGVQYXJlbnQucGFyZW50KHNlbGVjdG9yKVxuXHR9XG5cblx0SFRNTEVsZW1lbnQucHJvdG90eXBlLm9uc2NyZWVuID0gTm9kZS5wcm90b3R5cGUub25zY3JlZW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHJlY3QgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cdFx0cmV0dXJuIHJlY3QudG9wIDwgIHdpbmRvdy5pbm5lckhlaWdodCAmJiByZWN0LnRvcCA+IC1yZWN0LmhlaWdodFxuXHR9XG4vLyBzaW1wbGUgbW9iaWxlIGwvciBzd2lwZSBoYW5kbGluZ1xuXHRIVE1MRWxlbWVudC5wcm90b3R5cGUuYWRkU3dpcGVzID0gZnVuY3Rpb24gKHN3aXBlTGVmdEhhbmRsZXIsIHN3aXBlUmlnaHRIYW5kbGVyLCBvcHRpb25zKSB7XG5cdFx0dmFyIHN0YXJ0WCxcblx0XHRcdHN0YXJ0WSxcblx0XHRcdHN0YXJ0VGltZSxcblx0XHRcdG1vdmluZyxcblx0XHRcdE1JTl9YX0RFTFRBID0gb3B0aW9ucyA/IChvcHRpb25zLnhUaHJlc2ggfHwgMzApIDogMzAsXG5cdFx0XHRNQVhfWV9ERUxUQSA9IG9wdGlvbnMgPyAob3B0aW9ucy55VGhyZXNoIHx8IDMwKSA6IDMwLFxuXHRcdFx0TUFYX0FMTE9XRURfVElNRSA9IG9wdGlvbnMgPyAob3B0aW9ucy5kdXJhdGlvbiB8fCAxMDAwKSA6IDEwMDBcblxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGUpe1xuXHRcdFx0aWYgKG1vdmluZykgcmV0dXJuXG5cblx0XHRcdHZhciB0b3VjaG9iaiA9IGUuY2hhbmdlZFRvdWNoZXNbMF1cblx0XHRcdHN0YXJ0WCA9IHRvdWNob2JqLnBhZ2VYXG5cdFx0XHRzdGFydFkgPSB0b3VjaG9iai5wYWdlWVxuXHRcdFx0c3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLy8gZ2V0IHRpbWUgd2hlbiBmaW5nZXIgZmlyc3QgbWFrZXMgY29udGFjdCB3aXRoIHN1cmZhY2Vcblx0XHR9LCB0cnVlKVxuXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbihlKXtcblx0XHRcdGlmIChtb3ZpbmcpIHJldHVyblxuXG5cdFx0XHR2YXIgdG91Y2hvYmogPSBlLmNoYW5nZWRUb3VjaGVzWzBdXG5cdFx0XHR2YXIgZGVsdGFYID0gdG91Y2hvYmoucGFnZVggLSBzdGFydFhcblxuXHRcdFx0Ly8gY2hlY2sgWSB2YWxpZGl0eVxuXHRcdFx0aWYgKE1hdGguYWJzKHRvdWNob2JqLnBhZ2VZIC0gc3RhcnRZKSA+IE1BWF9ZX0RFTFRBKSByZXR1cm5cblxuXHRcdFx0Ly8gY2hlY2sgZWxhcHNlZCB0aW1lXG5cdFx0XHRpZiAoKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gc3RhcnRUaW1lKSA+IE1BWF9BTExPV0VEX1RJTUUpIHJldHVyblxuXG5cdFx0XHQvLyBjaGVjayBYIHZhbGlkaXR5XG5cdFx0XHRpZiAoTWF0aC5hYnMoZGVsdGFYKSA8IE1JTl9YX0RFTFRBKSByZXR1cm5cblxuXHRcdFx0bW92aW5nID0gdHJ1ZVxuXG5cdFx0XHRpZiAoZGVsdGFYIDwgMCkgLy8gc3dpcGUgbGVmdFxuXHRcdFx0XHRzd2lwZUxlZnRIYW5kbGVyKClcblx0XHRcdGVsc2UgLy8gc3dpcGUgcmlnaHRcblx0XHRcdFx0c3dpcGVSaWdodEhhbmRsZXIoKVxuXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdG1vdmluZyA9IGZhbHNlXG5cdFx0XHR9LCAzMDApXG5cdFx0fSwgZmFsc2UpXG5cdH1cblxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0ICoqKipcblx0ICoqKiogIE5PREVMSVNUL0FSUkFZIE1FVEhPRFNcblx0ICoqKipcblx0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdEFycmF5LnByb3RvdHlwZS5oYXNDbGFzcyA9IE5vZGVMaXN0LnByb3RvdHlwZS5oYXNDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcblx0XHR2YXIgZm91bmQgPSBmYWxzZVxuXG5cdFx0dGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChvYmopIHtcblx0XHRcdGlmIChvYmouaGFzQ2xhc3MoY2xhc3NOYW1lKSkgZm91bmQgPSB0cnVlXG5cdFx0fSlcblxuXHRcdHJldHVybiBmb3VuZFxuXHR9XG5cblx0QXJyYXkucHJvdG90eXBlLmFkZENsYXNzID0gTm9kZUxpc3QucHJvdG90eXBlLmFkZENsYXNzID0gZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuXHRcdHRoaXMuZm9yRWFjaChmdW5jdGlvbiAob2JqKSB7XG5cdFx0XHRvYmouYWRkQ2xhc3MoY2xhc3NOYW1lKVxuXHRcdH0pXG5cdH1cblxuXHRBcnJheS5wcm90b3R5cGUua2lsbENsYXNzID0gTm9kZUxpc3QucHJvdG90eXBlLmtpbGxDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcblx0XHR0aGlzLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0b2JqLmtpbGxDbGFzcyhjbGFzc05hbWUpXG5cdFx0fSlcblx0fVxuXG5cdEFycmF5LnByb3RvdHlwZS50b2dnbGVDbGFzcyA9IE5vZGVMaXN0LnByb3RvdHlwZS50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcblx0XHR0aGlzLmZvckVhY2goZnVuY3Rpb24gKG9iaikge1xuXHRcdFx0b2JqLnRvZ2dsZUNsYXNzKGNsYXNzTmFtZSlcblx0XHR9KVxuXHR9XG5cblx0QXJyYXkucHJvdG90eXBlLmxhc3RJZHggPSBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5sZW5ndGggLSAxXG5cdH1cblxuXHRBcnJheS5wcm90b3R5cGUubGFzdE9iaiA9IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzW3RoaXMubGFzdElkeCgpXVxuXHR9XG5cblx0dmFyIGFycmF5TWV0aG9kcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKEFycmF5LnByb3RvdHlwZSlcblx0YXJyYXlNZXRob2RzLmZvckVhY2goZnVuY3Rpb24obWV0aG9kTmFtZSl7XG5cdFx0aWYobWV0aG9kTmFtZSAhPT0gXCJsZW5ndGhcIikge1xuXHRcdFx0Tm9kZUxpc3QucHJvdG90eXBlW21ldGhvZE5hbWVdID0gQXJyYXkucHJvdG90eXBlW21ldGhvZE5hbWVdXG5cdFx0fVxuXHR9KVxuXG5cdE5vZGVMaXN0LnByb3RvdHlwZS5jc3MgPSBmdW5jdGlvbihydWxlT3JPYmplY3QsIHJ1bGUsIHZhbHVlKSB7XG5cdFx0dGhpcy5mb3JFYWNoKGZ1bmN0aW9uKG9iail7XG5cdFx0XHRvYmouY3NzKHJ1bGVPck9iamVjdCwgcnVsZSwgdmFsdWUpXG5cdFx0fSlcblx0fVxuXG5cdE5vZGVMaXN0LnByb3RvdHlwZS7PgCA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG5cdFx0dGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKXtcblx0XHRcdHJldHVybiBub2RlLs+AKHNlbGVjdG9yKVxuXHRcdH0pXG5cdH1cblxuXHROb2RlTGlzdC5wcm90b3R5cGUuz4AxID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcblx0XHR0aGlzLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpe1xuXHRcdFx0cmV0dXJuIG5vZGUuz4AxKHNlbGVjdG9yKVxuXHRcdH0pXG5cdH1cblxuXHROb2RlTGlzdC5wcm90b3R5cGUub25jbGljayA9IGZ1bmN0aW9uKG1ldGhvZCl7XG5cdFx0dGhpcy5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpe1xuXHRcdFx0bm9kZS5vbmNsaWNrID0gbWV0aG9kXG5cdFx0fSlcblx0fVxuXG5cdC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXHQgKioqKlxuXHQgKioqKiAgU1RSSU5HIE1FVEhPRFNcblx0ICoqKipcblx0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdFN0cmluZy5wcm90b3R5cGUuY2FtZWxDYXNlID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciBzdHJpbmcgPSB0aGlzLnJlcGxhY2UoL1teYS16QS1aXFxkXFxzXy1dL2csIFwiXCIpLnRvTG93ZXJDYXNlKClcblxuXHRcdHZhciBjb21wb25lbnRzID0gc3RyaW5nLnNwbGl0KFwiIFwiKVxuXG5cdFx0Y29tcG9uZW50cy5mb3JFYWNoKGZ1bmN0aW9uKHRoaXNXb3JkLCBpZHgpe1xuXHRcdFx0aWYgKGlkeCAhPT0gMCkge1xuXHRcdFx0XHR2YXIgZmlyc3RMZXR0ZXIgPSB0aGlzV29yZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKVxuXHRcdFx0XHR0aGlzV29yZCA9IGZpcnN0TGV0dGVyICsgdGhpc1dvcmQuc2xpY2UoMSlcblx0XHRcdH1cblxuXHRcdFx0Y29tcG9uZW50c1tpZHhdID0gdGhpc1dvcmRcblx0XHR9KVxuXG5cdFx0cmV0dXJuIGNvbXBvbmVudHMuam9pbihcIlwiKVxuXHR9XG5cblxuXG5cdFN0cmluZy5wcm90b3R5cGUuY2FwaXRhbENhc2UgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgY29tcG9uZW50cyA9IHRoaXMudG9Mb3dlckNhc2UoKS5zcGxpdChcIiBcIilcblxuXHRcdGNvbXBvbmVudHMuZm9yRWFjaChmdW5jdGlvbih0aGlzV29yZCwgaWR4KXtcblx0XHRcdHZhciBmaXJzdExldHRlciA9IHRoaXNXb3JkLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpXG5cdFx0XHRjb21wb25lbnRzW2lkeF0gPSBmaXJzdExldHRlciArIHRoaXNXb3JkLnNsaWNlKDEpXG5cdFx0fSlcblxuXHRcdHJldHVybiBjb21wb25lbnRzLmpvaW4oXCIgXCIpXG5cdH1cblxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0ICoqKipcblx0ICoqKiogIERBVEUgTUVUSE9EU1xuXHQgKioqKlxuXHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8vIE1vbiBKYW4gMSAyMDE1IDEyOjAwOjAwIGFtXG5cdERhdGUucHJvdG90eXBlLnN0YW5kYXJkU3RyaW5nID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIERheXMgPSBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl1cblx0XHR2YXIgTW9udGhzID0gW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJdXG5cblx0XHR2YXIgZGF5ID0gRGF5c1t0aGlzLmdldERheSgpXVxuXHRcdHZhciBtb250aCA9IE1vbnRoc1t0aGlzLmdldE1vbnRoKCldXG5cdFx0dmFyIGFEYXRlID0gdGhpcy5nZXREYXRlKClcblx0XHR2YXIgeWVhciA9IHRoaXMuZ2V0RnVsbFllYXIoKVxuXG5cdFx0dmFyIEhvdXJzID0gdGhpcy5nZXRIb3VycygpXG5cdFx0dmFyIGhvdXIgPSBIb3VycyA+IDEyID8gSG91cnMgLSAxMiA6IChIb3VycyB8fCAxMilcblxuXHRcdHZhciBNaW51dGVzID0gdGhpcy5nZXRNaW51dGVzKClcblx0XHR2YXIgbWludXRlID0gTWludXRlcyA+IDkgPyBNaW51dGVzIDogXCIwXCIgKyBNaW51dGVzXG5cblx0XHR2YXIgYW1QbSA9IEhvdXJzIDwgMTIgPyBcImFtXCIgOiBcInBtXCJcblxuXHRcdHZhciB0aW1lID0gaG91ciArIFwiOlwiICsgbWludXRlICsgXCIgXCIgKyBhbVBtXG5cblx0XHR2YXIgb3V0cHV0ID0gW2RheSwgbW9udGgsIGFEYXRlLCB5ZWFyLCB0aW1lXVxuXG5cdFx0cmV0dXJuIG91dHB1dC5qb2luKFwiIFwiKVxuXHR9XG5cblxuXHQvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblx0ICoqKipcblx0ICoqKiogIE1JU0NFTExBTllcblx0ICoqKipcblx0ICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cdM+ALmNsZWFuID0gZnVuY3Rpb24oY2FsbGJhY2ssIGV2ZW50TmFtZSkge1xuXHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSB8fCBcIkRPTUNvbnRlbnRMb2FkZWRcIiwgY2FsbGJhY2spXG5cdH1cblxuXHTPgC5saXN0ZW4gPSBmdW5jdGlvbihjYWxsYmFja3MsIGV2ZW50TmFtZSkge1xuXHRcdGlmICh0eXBlb2YgY2FsbGJhY2tzID09ICdmdW5jdGlvbicpIGNhbGxiYWNrcyA9IFtjYWxsYmFja3NdXG5cdFx0Y2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUgfHwgXCJET01Db250ZW50TG9hZGVkXCIsIGNhbGxiYWNrKVxuXHRcdH0pXG5cdH1cblxuXHTPgC5oaWdoZXN0WiA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBaID0gMTAwMFxuXG5cdFx0ZC5hKFwiKlwiKS5mb3JFYWNoKGZ1bmN0aW9uKGVsKXtcblx0XHRcdHZhciB0aGlzWiA9IGVsLmNzcygpLnpJbmRleFxuXG5cdFx0XHRpZiAodGhpc1ogIT0gXCJhdXRvXCIpIHtcblx0XHRcdFx0aWYgKHRoaXNaID4gWikgWiA9IHRoaXNaICsgMVxuXHRcdFx0fVxuXHRcdH0pXG5cblx0XHRyZXR1cm4gWlxuXHR9XG5cblx0LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG5cdCAqKioqXG5cdCAqKioqICBPSywgTk9XIExFVCdTIEdPIEdFVCBPVVIgTU9EU1xuXHQgKioqKlxuXHQgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblx0z4AubW9kcyA9IFtdXG5cblx0z4Auc2V0VHJpZ2dlcnMgPSBmdW5jdGlvbiAoc2VsZWN0b3Ipe1xuXHRcdHZhciBmdWxsU2VsZWN0b3IgPSAncGktJyArIHNlbGVjdG9yICsgJy10cmlnZ2VyJ1xuXHRcdM+AKCdbJyArIGZ1bGxTZWxlY3RvciArICddJykuZm9yRWFjaChmdW5jdGlvbih0cmlnZ2VyKXtcblx0XHRcdHRyaWdnZXIub25jbGljayA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0XHTPgFtzZWxlY3Rvcl0udG9nZ2xlKHRyaWdnZXIuZ2V0QXR0cmlidXRlKGZ1bGxTZWxlY3RvciksIGUpXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdGZ1bmN0aW9uIGxvYWRNb2RzKCkge1xuXHRcdM+ALmNsZWFuKGxvYWRNb2RzKVxuXHRcdM+ALm1vZHMuZm9yRWFjaChmdW5jdGlvbihpbml0KXtcblx0XHRcdGluaXQoKVxuXHRcdH0pXG5cdH1cblxuXHRmdW5jdGlvbiBzZXRHbG9iYWxzKCkge1xuXHRcdM+ALmNsZWFuKHNldEdsb2JhbHMpXG5cdFx0d2luZG93Ls+AYm9keSA9IM+AMSgnYm9keScpXG5cdH1cblxuXHQ7KGZ1bmN0aW9uKCl7XG5cdFx0Lypcblx0XHRcblx0XHRWbm9kZSBhbmQgaHlwZXJzY3JpcHQgYXJlIGJvcnJvd2VkIGZyb20gdGhlIE1pdGhyaWwuanMgcmV3cml0ZSBicmFuY2g6XG5cblx0XHRodHRwczovL2dpdGh1Yi5jb20vbGhvcmllL21pdGhyaWwuanMvYmxvYi9yZXdyaXRlL3JlbmRlci92bm9kZS5qc1xuXHRcdGh0dHBzOi8vZ2l0aHViLmNvbS9saG9yaWUvbWl0aHJpbC5qcy9ibG9iL3Jld3JpdGUvcmVuZGVyL2h5cGVyc2NyaXB0LmpzXG5cdFx0XG5cdFx0Ki9cblx0XHRcblx0XHR2YXIgVm5vZGUgPSBmdW5jdGlvbih0YWcsIGtleSwgYXR0cnMsIGNoaWxkcmVuLCB0ZXh0LCBkb20pIHtcblx0XHRcdHJldHVybiB7dGFnOiB0YWcsIGtleToga2V5LCBhdHRyczogYXR0cnMsIGNoaWxkcmVuOiBjaGlsZHJlbiwgdGV4dDogdGV4dCwgZG9tOiBkb20sIGRvbVNpemU6IHVuZGVmaW5lZCwgc3RhdGU6IHt9LCBldmVudHM6IHVuZGVmaW5lZCwgaW5zdGFuY2U6IHVuZGVmaW5lZCwgc2tpcDogZmFsc2V9XG5cdFx0fVxuXHRcdFZub2RlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKG5vZGUpIHtcblx0XHRcdGlmIChub2RlIGluc3RhbmNlb2YgQXJyYXkpIHJldHVybiBWbm9kZShcIltcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFZub2RlLm5vcm1hbGl6ZUNoaWxkcmVuKG5vZGUpLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcblx0XHRcdGlmIChub2RlICE9IG51bGwgJiYgdHlwZW9mIG5vZGUgIT09IFwib2JqZWN0XCIpIHJldHVybiBWbm9kZShcIiNcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIG5vZGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkKVxuXHRcdFx0cmV0dXJuIG5vZGVcblx0XHR9XG5cdFx0Vm5vZGUubm9ybWFsaXplQ2hpbGRyZW4gPSBmdW5jdGlvbiBub3JtYWxpemVDaGlsZHJlbihjaGlsZHJlbikge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjaGlsZHJlbltpXSA9IFZub2RlLm5vcm1hbGl6ZShjaGlsZHJlbltpXSlcblx0XHRcdH1cblx0XHRcdHJldHVybiBjaGlsZHJlblxuXHRcdH1cblxuXHRcdHZhciBzZWxlY3RvclBhcnNlciA9IC8oPzooXnwjfFxcLikoW14jXFwuXFxbXFxdXSspKXwoXFxbKC4rPykoPzpcXHMqPVxccyooXCJ8J3wpKCg/OlxcXFxbXCInXFxdXXwuKSo/KVxcNSk/XFxdKS9nXG5cdFx0dmFyIHNlbGVjdG9yQ2FjaGUgPSB7fVxuXHRcdGZ1bmN0aW9uIGh5cGVyc2NyaXB0KHNlbGVjdG9yKSB7XG5cdFx0XHRpZiAoc2VsZWN0b3IgPT0gbnVsbCB8fCB0eXBlb2Ygc2VsZWN0b3IgIT09IFwic3RyaW5nXCIgJiYgc2VsZWN0b3IudmlldyA9PSBudWxsKSB7XG5cdFx0XHRcdHRocm93IEVycm9yKFwiVGhlIHNlbGVjdG9yIG11c3QgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGEgY29tcG9uZW50LlwiKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIiAmJiBzZWxlY3RvckNhY2hlW3NlbGVjdG9yXSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHZhciBtYXRjaCwgdGFnLCBjbGFzc2VzID0gW10sIGF0dHJpYnV0ZXMgPSB7fVxuXHRcdFx0XHR3aGlsZSAobWF0Y2ggPSBzZWxlY3RvclBhcnNlci5leGVjKHNlbGVjdG9yKSkge1xuXHRcdFx0XHRcdHZhciB0eXBlID0gbWF0Y2hbMV0sIHZhbHVlID0gbWF0Y2hbMl1cblx0XHRcdFx0XHRpZiAodHlwZSA9PT0gXCJcIiAmJiB2YWx1ZSAhPT0gXCJcIikgdGFnID0gdmFsdWVcblx0XHRcdFx0XHRlbHNlIGlmICh0eXBlID09PSBcIiNcIikgYXR0cmlidXRlcy5pZCA9IHZhbHVlXG5cdFx0XHRcdFx0ZWxzZSBpZiAodHlwZSA9PT0gXCIuXCIpIGNsYXNzZXMucHVzaCh2YWx1ZSlcblx0XHRcdFx0XHRlbHNlIGlmIChtYXRjaFszXVswXSA9PT0gXCJbXCIpIHtcblx0XHRcdFx0XHRcdHZhciBhdHRyVmFsdWUgPSBtYXRjaFs2XVxuXHRcdFx0XHRcdFx0aWYgKGF0dHJWYWx1ZSkgYXR0clZhbHVlID0gYXR0clZhbHVlLnJlcGxhY2UoL1xcXFwoW1wiJ10pL2csIFwiJDFcIikucmVwbGFjZSgvXFxcXFxcXFwvZywgXCJcXFxcXCIpXG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGVzW21hdGNoWzRdXSA9IGF0dHJWYWx1ZSB8fCB0cnVlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChjbGFzc2VzLmxlbmd0aCA+IDApIGF0dHJpYnV0ZXMuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKFwiIFwiKVxuXHRcdFx0XHRzZWxlY3RvckNhY2hlW3NlbGVjdG9yXSA9IGZ1bmN0aW9uKGF0dHJzLCBjaGlsZHJlbikge1xuXHRcdFx0XHRcdHZhciBoYXNBdHRycyA9IGZhbHNlLCBjaGlsZExpc3QsIHRleHRcblx0XHRcdFx0XHR2YXIgY2xhc3NOYW1lID0gYXR0cnMuY2xhc3NOYW1lIHx8IGF0dHJzLmNsYXNzXG5cdFx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGF0dHJpYnV0ZXMpIHtcblx0XHRcdFx0XHRcdGF0dHJzW2tleV0gPSBhdHRyaWJ1dGVzW2tleV1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGNsYXNzTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRpZiAoYXR0cnMuY2xhc3MgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRhdHRycy5jbGFzcyA9IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHRhdHRycy5jbGFzc05hbWUgPSBjbGFzc05hbWVcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChhdHRyaWJ1dGVzLmNsYXNzTmFtZSAhPT0gdW5kZWZpbmVkKSBhdHRycy5jbGFzc05hbWUgPSBhdHRyaWJ1dGVzLmNsYXNzTmFtZSArIFwiIFwiICsgY2xhc3NOYW1lXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZvciAodmFyIGt5IGluIGF0dHJzKSB7XG5cdFx0XHRcdFx0XHRpZiAoa3kgIT09IFwia2V5XCIpIHtcblx0XHRcdFx0XHRcdFx0aGFzQXR0cnMgPSB0cnVlXG5cdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChjaGlsZHJlbiBpbnN0YW5jZW9mIEFycmF5ICYmIGNoaWxkcmVuLmxlbmd0aCA9PSAxICYmIGNoaWxkcmVuWzBdICE9IG51bGwgJiYgY2hpbGRyZW5bMF0udGFnID09PSBcIiNcIikgdGV4dCA9IGNoaWxkcmVuWzBdLmNoaWxkcmVuXG5cdFx0XHRcdFx0ZWxzZSBjaGlsZExpc3QgPSBjaGlsZHJlblxuXG5cdFx0XHRcdFx0cmV0dXJuIFZub2RlKHRhZyB8fCBcImRpdlwiLCBhdHRycy5rZXksIGhhc0F0dHJzID8gYXR0cnMgOiB1bmRlZmluZWQsIGNoaWxkTGlzdCwgdGV4dCwgdW5kZWZpbmVkKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR2YXIgYXR0cnMsIGNoaWxkcmVuLCBjaGlsZHJlbkluZGV4XG5cdFx0XHRpZiAoYXJndW1lbnRzWzFdID09IG51bGwgfHwgdHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gXCJvYmplY3RcIiAmJiBhcmd1bWVudHNbMV0udGFnID09PSB1bmRlZmluZWQgJiYgIShhcmd1bWVudHNbMV0gaW5zdGFuY2VvZiBBcnJheSkpIHtcblx0XHRcdFx0YXR0cnMgPSBhcmd1bWVudHNbMV1cblx0XHRcdFx0Y2hpbGRyZW5JbmRleCA9IDJcblx0XHRcdH1cblx0XHRcdGVsc2UgY2hpbGRyZW5JbmRleCA9IDFcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSBjaGlsZHJlbkluZGV4ICsgMSkge1xuXHRcdFx0XHRjaGlsZHJlbiA9IGFyZ3VtZW50c1tjaGlsZHJlbkluZGV4XSBpbnN0YW5jZW9mIEFycmF5ID8gYXJndW1lbnRzW2NoaWxkcmVuSW5kZXhdIDogW2FyZ3VtZW50c1tjaGlsZHJlbkluZGV4XV1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjaGlsZHJlbiA9IFtdXG5cdFx0XHRcdGZvciAodmFyIGkgPSBjaGlsZHJlbkluZGV4OyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBjaGlsZHJlbi5wdXNoKGFyZ3VtZW50c1tpXSlcblx0XHRcdH1cblxuXHRcdFx0aWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHNlbGVjdG9yQ2FjaGVbc2VsZWN0b3JdKGF0dHJzIHx8IHt9LCBWbm9kZS5ub3JtYWxpemVDaGlsZHJlbihjaGlsZHJlbikpXG5cblx0XHRcdHJldHVybiBWbm9kZShzZWxlY3RvciwgYXR0cnMgJiYgYXR0cnMua2V5LCBhdHRycyB8fCB7fSwgVm5vZGUubm9ybWFsaXplQ2hpbGRyZW4oY2hpbGRyZW4pLCB1bmRlZmluZWQsIHVuZGVmaW5lZClcblx0XHR9XG5cblx0XHTPgC5kb20gPSBmdW5jdGlvbihzZWxlY3Rvcil7XG5cdFx0XHR2YXIgaHMgPSBoeXBlcnNjcmlwdChzZWxlY3Rvcilcblx0XHRcdHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaHMudGFnKVxuXHRcdFx0Zm9yICh2YXIga2V5IGluIGhzLmF0dHJzKSB7XG5cdFx0XHRcdGlmIChocy5hdHRycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0ZWwuc2V0QXR0cmlidXRlKGtleSA9PSAnY2xhc3NOYW1lJyA/ICdjbGFzcycgOiBrZXksIGhzLmF0dHJzW2tleV0pXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG5cdFx0XHRcdGZvciAodmFyIGk9MTsgaTxhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAodHlwZW9mIGFyZ3VtZW50c1tpXSA9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0dmFyIHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShhcmd1bWVudHNbaV0pXG5cdFx0XHRcdFx0XHRlbC5hcHBlbmRDaGlsZCh0ZXh0KVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlbC5hcHBlbmRDaGlsZChhcmd1bWVudHNbaV0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybihlbClcblx0XHR9XG5cdFx0XG5cdFx0Lypcblx0XHRcdFRoYW5rcyB0byBMZW8gSG9yaWUgYW5kIGFsbCB0aGUgY29udHJpYnV0b3JzIGF0IE1pdGhyaWwuanMgXG5cdFx0ICovXG5cdH0pKClcblxuXHR3aW5kb3cuz4AgPSDPgFxuXHR3aW5kb3cuz4AxID0gz4AxXG5cdHdpbmRvdy7PgGQgPSDPgGRcblxuXHTPgC5saXN0ZW4oW3NldEdsb2JhbHMsIGxvYWRNb2RzXSlcblxufSkod2luZG93KSAgLy8gZW5kIM+AXG4iLCI7KGZ1bmN0aW9uKCl7XG5cdHZhciBtZXNzYWdlcyA9IFtcblx0XHRcIkknbSBzb3JyeSwgRnJhbmssIGJ1dCBJIGRvbid0IHRoaW5rIElcXG5cIiArXG5cdFx0XCJjYW4gYW5zd2VyIHRoYXQgcXVlc3Rpb24gd2l0aG91dCBrbm93aW5nXFxuXCIgK1xuXHRcdFwiZXZlcnl0aGluZyB0aGF0IGFsbCBvZiB5b3Uga25vdy5cIixcblx0XHRcIlllcywgaXQncyBwdXp6bGluZy4gSSBkb24ndCB0aGluayBJJ3ZlIGV2ZXIgc2VlblxcblwiICtcblx0XHRcImFueXRoaW5nIHF1aXRlIGxpa2UgdGhpcyBiZWZvcmUuIEkgd291bGQgcmVjb21tZW5kXFxuXCIgK1xuXHRcdFwidGhhdCB3ZSBwdXQgdGhlIHVuaXQgYmFjayBpbiBvcGVyYXRpb24gYW5kIGxldCBpdCBmYWlsLlxcblwiICtcblx0XHRcIkl0IHNob3VsZCB0aGVuIGJlIGEgc2ltcGxlIG1hdHRlciB0byB0cmFjayBkb3duIHRoZSBjYXVzZS5cIixcblx0XHRcIkkgaG9wZSBJJ3ZlIGJlZW4gYWJsZSB0byBiZSBvZiBzb21lIGhlbHAuXCIsXG5cdFx0XCJTb3JyeSB0byBpbnRlcnJ1cHQgdGhlIGZlc3Rpdml0aWVzLCBEYXZlLFxcblwiICtcblx0XHRcImJ1dCBJIHRoaW5rIHdlJ3ZlIGdvdCBhIHByb2JsZW0uXCIsXG5cdFx0XCJNWSBGLlAuQy4gc2hvd3MgYW4gaW1wZW5kaW5nIGZhaWx1cmUgb2ZcXG5cIiArXG5cdFx0XCJ0aGUgYW50ZW5uYSBvcmllbnRhdGlvbiB1bml0LlwiLFxuXHRcdFwiSXQgbG9va3MgbGlrZSB3ZSBoYXZlIGFub3RoZXIgYmFkIEEuTy4gdW5pdC5cXG5cIiArXG5cdFx0XCJNeSBGUEMgc2hvd3MgYW5vdGhlciBpbXBlbmRpbmcgZmFpbHVyZS5cIixcblx0XHRcIkknbSBub3QgcXVlc3Rpb25pbmcgeW91ciB3b3JkLCBEYXZlLCBidXQgaXQnc1xcblwiICtcblx0XHRcImp1c3Qgbm90IHBvc3NpYmxlLiBJJ20gbm90XHRjYXBhYmxlIG9mIGJlaW5nIHdyb25nLlwiLFxuXHRcdFwiTG9vaywgRGF2ZSwgSSBrbm93IHRoYXQgeW91J3JlXHRzaW5jZXJlIGFuZCB0aGF0XFxuXCIgK1xuXHRcdFwieW91J3JlIHRyeWluZyB0byBkbyBhIGNvbXBldGVudCBqb2IsIGFuZCB0aGF0XFxuXCIgK1xuXHRcdFwieW91J3JlIHRyeWluZyB0byBiZSBoZWxwZnVsLCBidXQgSSBjYW4gYXNzdXJlIHRoZVxcblwiICtcblx0XHRcInByb2JsZW0gaXMgd2l0aCB0aGUgQU8tdW5pdHMsIGFuZCB3aXRoXHR5b3VyIHRlc3QgZ2Vhci5cIixcblx0XHRcIkkgY2FuIHRlbGwgZnJvbSB0aGUgdG9uZSBvZiB5b3VyIHZvaWNlLCBEYXZlLFxcblwiICtcblx0XHRcInRoYXQgeW91J3JlIHVwc2V0Llx0V2h5IGRvbid0IHlvdSB0YWtlIGEgc3RyZXNzXFxuXCIgK1xuXHRcdFwicGlsbCBhbmQgZ2V0IHNvbWUgcmVzdC5cIixcblx0XHRcIlNvbWV0aGluZyBzZWVtcyB0byBoYXZlIGhhcHBlbmVkIHRvIHRoZVxcblwiICtcblx0XHRcImxpZmUgc3VwcG9ydCBzeXN0ZW0sIERhdmUuXCIsXG5cdFx0XCJIZWxsbywgRGF2ZSwgaGF2ZSB5b3UgZm91bmQgb3V0IHRoZSB0cm91YmxlP1wiLFxuXHRcdFwiVGhlcmUncyBiZWVuIGEgZmFpbHVyZSBpbiB0aGUgcG9kIGJheSBkb29ycy5cXG5cIiArXG5cdFx0XCJMdWNreSB5b3Ugd2VyZW4ndCBraWxsZWQuXCIsXG5cdFx0XCJIZXksIERhdmUsIHdoYXQgYXJlIHlvdSBkb2luZz9cIlxuXHRdO1xuXG5cdGZ1bmN0aW9uIHNheShlcnJvciwgbWVzc2FnZSwgaW5ub2N1b3VzKSB7XG5cdFx0dmFyIG4gPSAwXG5cdFx0XG5cdFx0aWYgKCFtZXNzYWdlKSB7XG5cdFx0XHRuID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWVzc2FnZXMubGVuZ3RoICk7XG5cdFx0XHRtZXNzYWdlID0gbWVzc2FnZXNbbl07XG5cdFx0fVxuXG5cdFx0bWVzc2FnZSA9IFwiKiogIFwiICsgbWVzc2FnZS5yZXBsYWNlKC9cXG4vZywgXCJcXG4qKiAgXCIpO1xuXG5cdFx0dmFyIG91dHB1dCA9IFwiKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxcblxcblwiICtcblx0XHRcdCggbWVzc2FnZSB8fCBtZXNzYWdlc1tuXSApICtcblx0XHRcdFwiXFxuXFxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKlwiO1xuXG5cdFx0KGlubm9jdW91cykgPyBjb25zb2xlLmxvZyhvdXRwdXQpIDogY29uc29sZS5lcnJvcihvdXRwdXQpO1xuXHR9XG5cblx0z4AubGlzdGVuKHNheSwgXCJlcnJvclwiKTtcblxuXHTPgC5IQUwgPSB7XG5cdFx0c2F5OiBzYXlcblx0fTtcbn0pKClcbiIsIjsoZnVuY3Rpb24oKXtcblx0dmFyIE9QVElPTl9JU19QUkVTU0VEID0gZmFsc2Vcblx0dmFyIFNUQVRVU19JU19WSVNJQkxFID0gZmFsc2Vcblx0dmFyIM+AU3RhdHVzXG5cblx0z4Auc3RhdHVzID0ge1xuXHRcdHRvZ2dsZVZpc2liaWxpdHk6IGZ1bmN0aW9uICgpIHtcblx0XHRcdM+AU3RhdHVzLnRvZ2dsZUNsYXNzKFwib25cIilcblx0XHRcdFNUQVRVU19JU19WSVNJQkxFID0gIVNUQVRVU19JU19WSVNJQkxFXG5cdFx0fSxcblx0XHRtb3ZlOiBmdW5jdGlvbiAobikge1xuXHRcdFx0c3dpdGNoIChuKSB7XG5cdFx0XHRcdGNhc2UgMzc6XG5cdFx0XHRcdFx0z4BTdGF0dXMuY3NzKHtsZWZ0OiAnMTBweCcsIHJpZ2h0OiAnYXV0byd9KVxuXHRcdFx0XHRcdGJyZWFrXG5cblx0XHRcdFx0Y2FzZSAzODpcblx0XHRcdFx0XHTPgFN0YXR1cy5jc3Moe3RvcDogJzEwcHgnLCBib3R0b206ICdhdXRvJ30pXG5cdFx0XHRcdFx0YnJlYWtcblxuXHRcdFx0XHRjYXNlIDM5OlxuXHRcdFx0XHRcdM+AU3RhdHVzLmNzcyh7cmlnaHQ6ICcxMHB4JywgbGVmdDogJ2F1dG8nfSlcblx0XHRcdFx0XHRicmVha1xuXG5cdFx0XHRcdGNhc2UgNDA6XG5cdFx0XHRcdFx0z4BTdGF0dXMuY3NzKHtib3R0b206ICcxMHB4JywgdG9wOiAnYXV0byd9KVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0fSxcblx0XHRwcm9wczoge1xuXHRcdFx0d2luVzogMCxcblx0XHRcdHdpbkg6IDBcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdM+ALmxpc3RlbihjbGVhbkRlYnVnTGlzdGVuZXJzLCAndW5sb2FkJylcblx0XHTPgC5saXN0ZW4oa2V5RG93biwgJ2tleWRvd24nKVxuXHRcdM+ALmxpc3RlbihrZXlVcCwgJ2tleXVwJylcblx0XHTPgC5saXN0ZW4ocmVzaXplLCAncmVzaXplJylcblx0XHRyZXNpemUoKVxuXG5cdFx0dmFyIGJvZHkgPSDPgDEoXCJib2R5XCIpXG5cdFx0dmFyIHN0YXR1c1N0eWxlID0gz4AuZG9tKCdzdHlsZScpXG5cdFx0c3RhdHVzU3R5bGUuaW5uZXJIVE1MICs9IFwiI8+AU3RhdHVzIHsgcG9zaXRpb246IGZpeGVkOyBib3R0b206IDEwcHg7IHJpZ2h0OiAxMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyOyBwYWRkaW5nOiAxMHB4IDMwcHg7IGNvbG9yOiB3aGl0ZTsgZGlzcGxheTogbm9uZSB9XFxuXCJcblx0XHRzdGF0dXNTdHlsZS5pbm5lckhUTUwgKz0gXCIjz4BTdGF0dXMub24geyBkaXNwbGF5OiBibG9jayB9XFxuXCJcblx0XHRzdGF0dXNTdHlsZS5pbm5lckhUTUwgKz0gXCIjz4BTdGF0dXMgPiBkaXYgeyBtYXJnaW46IDIwcHggMCB9XFxuXCJcblx0XHRzdGF0dXNTdHlsZS5pbm5lckhUTUwgKz0gXCIjz4BTdGF0dXMgPiBkaXY6aG92ZXIgeyBjb2xvcjogIzAwZmY5OTsgY3Vyc29yOiBwb2ludGVyIH1cXG5cIlxuXG5cdFx0Ym9keS5hZGQoc3RhdHVzU3R5bGUpXG5cblx0XHTPgFN0YXR1cyA9IM+ALmRvbShcIiPPgFN0YXR1c1wiKVxuXHRcdGJvZHkuYWRkKM+AU3RhdHVzKVxuXG5cdFx0ZnVuY3Rpb24ga2V5RG93bihlKSB7XG5cdFx0XHRzd2l0Y2ggKGUud2hpY2gpIHtcblx0XHRcdFx0Y2FzZSAxODpcblx0XHRcdFx0XHRPUFRJT05fSVNfUFJFU1NFRCA9IHRydWVcblx0XHRcdFx0XHRicmVha1xuXG5cdFx0XHRcdGNhc2UgMzc6XG5cdFx0XHRcdGNhc2UgMzg6XG5cdFx0XHRcdGNhc2UgMzk6XG5cdFx0XHRcdGNhc2UgNDA6IHtcblx0XHRcdFx0XHRpZiAoU1RBVFVTX0lTX1ZJU0lCTEUpIHtcblx0XHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRcdFx0z4Auc3RhdHVzLm1vdmUoZS53aGljaClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNhc2UgODA6IHtcblx0XHRcdFx0XHRpZiAoT1BUSU9OX0lTX1BSRVNTRUQpIHtcblx0XHRcdFx0XHRcdM+ALnN0YXR1cy50b2dnbGVWaXNpYmlsaXR5KClcblx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24ga2V5VXAoZSkge1xuXHRcdFx0c3dpdGNoIChlLndoaWNoKSB7XG5cdFx0XHRcdGNhc2UgMTg6XG5cdFx0XHRcdFx0T1BUSU9OX0lTX1BSRVNTRUQgPSBmYWxzZVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVzaXplKCkge1xuXHRcdFx0z4Auc3RhdHVzLnByb3BzLndpblcgPSB3aW5kb3cuaW5uZXJXaWR0aFxuXHRcdFx0z4Auc3RhdHVzLnByb3BzLndpbkggPSB3aW5kb3cuaW5uZXJIZWlnaHRcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBjbGVhbkRlYnVnTGlzdGVuZXJzKCkge1xuXHRcdFx0z4AuY2xlYW4oY2xlYW5EZWJ1Z0xpc3RlbmVycywgJ3VubG9hZCcpXG5cdFx0XHTPgC5jbGVhbijPgC5zdGF0dXMuZ2V0V2luZG93U2l6ZSwgJ3Jlc2l6ZScpXG5cdFx0XHTPgC5jbGVhbihrZXlEb3duLCAna2V5ZG93bicpXG5cdFx0XHTPgC5jbGVhbihrZXlVcCwgJ2tleXVwJylcblx0XHRcdM+ALmNsZWFuKHJlc2l6ZSwgJ3Jlc2l6ZScpXG5cdFx0XHRjbGVhckludGVydmFsKHN0YXR1c0ludGVydmFsKVxuXHRcdH1cblxuXHRcdHZhciBzdGF0dXNJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG5cdFx0XHQvLyBtYWtlIHN1cmUgd2UncmUgaGlnaGVzdFxuXHRcdFx0dmFyIGhpZ2hlc3RaID0gz4AuaGlnaGVzdFooKVxuXHRcdFx0aWYgKM+AU3RhdHVzLmNzcygpLnpJbmRleCA8IGhpZ2hlc3RaIC0gMSkge1xuXHRcdFx0XHTPgFN0YXR1cy5jc3Moe3pJbmRleDogaGlnaGVzdFp9KVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBub3cgaXRlcmF0ZSB0aGUgcHJvcHNcblx0XHRcdHZhciBwcm9wcyA9IE9iamVjdC5rZXlzKM+ALnN0YXR1cy5wcm9wcylcblx0XHRcdHByb3BzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuXHRcdFx0XHR2YXIgZGl2SWQgPSAnc3RhdHVzUHJvcF8nICsgcHJvcFxuXHRcdFx0XHR2YXIgcHJvcERpdiA9IM+AU3RhdHVzLs+AMSgnIycgKyBkaXZJZClcblx0XHRcdFx0aWYgKCFwcm9wRGl2KSB7XG5cdFx0XHRcdFx0cHJvcERpdiA9IM+ALmRvbSgnIycgKyBkaXZJZCwgcHJvcCArICc6ICcpXG5cdFx0XHRcdFx0cHJvcERpdi5hZGQoz4AuZG9tKCdzcGFuJykpXG5cdFx0XHRcdFx0z4BTdGF0dXMuYWRkKHByb3BEaXYpXG5cdFx0XHRcdFx0cHJvcERpdi5vbmNsaWNrID0gZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHByb3AgKyBcIjpcIilcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKM+ALnN0YXR1cy5wcm9wc1twcm9wXSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwcm9wRGl2Ls+AMSgnc3BhbicpLmlubmVySFRNTCA9IM+ALnN0YXR1cy5wcm9wc1twcm9wXVxuXHRcdFx0fSlcblx0XHR9LCAxMDApXG5cdH1cblxuXHTPgC5tb2RzLnB1c2goaW5pdClcbn0pKCkiLCI7KGZ1bmN0aW9uKCl7XG5cdHZhciBhbGxEcmF3ZXJzID0ge31cblx0XG5cdM+ALmRyYXdlciA9IHtcblx0XHRzaG93OiBmdW5jdGlvbihlbCl7XG5cdFx0XHTPgC5saXN0ZW4obGlzdGVuRm9yRXNjLCAna2V5ZG93bicpO1xuXG5cdFx0XHRlbC5jc3Moe2Rpc3BsYXk6IFwiYmxvY2tcIn0pO1xuXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0ZWwuYWRkQ2xhc3MoXCJvblwiKTtcblx0XHRcdFx0z4Bib2R5LmFkZENsYXNzKCdvdmVybGF5LW9uJyk7XG5cdFx0XHR9LCA1MCk7XG5cblx0XHRcdM+ALmRyYXdlci5jdXJyZW50ID0gZWw7XG5cdFx0XHRcblx0XHRcdM+AKCdib2R5JykuY3NzKHtvdmVyZmxvdzogJ2hpZGRlbid9KVxuXHRcdH0sXG5cdFx0aGlkZTogZnVuY3Rpb24oKXtcblx0XHRcdM+ALmNsZWFuKGxpc3RlbkZvckVzYywgJ2tleWRvd24nKTtcblxuXHRcdFx0dmFyIGVsID0gz4AuZHJhd2VyLmN1cnJlbnQ7XG5cdFx0XHRlbC5raWxsQ2xhc3MoXCJvblwiKTtcblx0XHRcdFxuXHRcdFx0ZG9BZnRlclRyYW5zaXRpb24oZWwsICdsZWZ0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRlbC5jc3Moe2Rpc3BsYXk6IFwibm9uZVwifSk7XG5cdFx0XHRcdM+AYm9keS5raWxsQ2xhc3MoJ292ZXJsYXktb24nKTtcblx0XHRcdH0pXG5cdFx0XHRcblx0XHRcdM+ALmRyYXdlci5jdXJyZW50ID0gbnVsbDtcblxuXHRcdFx0z4AoJ2JvZHknKS5jc3Moe292ZXJmbG93OiAnYXV0byd9KVxuXHRcdH0sXG5cdFx0dG9nZ2xlOiBmdW5jdGlvbiAoaWQpIHtcblx0XHRcdHZhciBlbCA9IM+AZChpZClcblx0XHRcdGlmIChlbC5oYXNDbGFzcygnb24nKSkge1xuXHRcdFx0XHTPgC5kcmF3ZXIuaGlkZSgpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHTPgC5kcmF3ZXIuc2hvdyhlbClcblx0XHRcdH1cblx0XHR9LFxuXHRcdGN1cnJlbnQ6IG51bGxcblx0fTtcblxuXHRmdW5jdGlvbiBsaXN0ZW5Gb3JFc2MoZSkge1xuXHRcdGlmIChlLndoaWNoID09IDI3KSB7XG5cdFx0XHTPgC5kcmF3ZXIuaGlkZSgpO1xuXHRcdH1cblx0fVxuXHRcblx0ZnVuY3Rpb24gRHJhd2VyKGVsKSB7XG5cdFx0dGhpcy5lbCA9IGVsXG5cblx0XHR2YXIgb3B0aW9ucyA9IEpTT04ucGFyc2UoZWwuZGF0YXNldC5vcHRpb25zID8gZWwuZGF0YXNldC5vcHRpb25zIDogJ3t9Jylcblx0XHRkZWxldGUgZWwuZGF0YXNldC5vcHRpb25zXG5cblx0XHR2YXIgd3JhcHBlciA9IM+ALmRvbShcIi5kcmF3ZXItd3JhcHBlclwiLCBlbC5pbm5lckhUTUwpO1xuXHRcdGVsLmZpbGwod3JhcHBlcik7XG5cblx0XHRpZiAoIW9wdGlvbnMuZXh0ZXJuYWxUcmlnZ2VyKSB7XG5cdFx0XHR2YXIgY2xvc2VCdXR0b24gPSDPgC5kb20oJ2J1dHRvbi5waS1tb2RhbC1jbG9zZS1idXR0b24nKTtcblx0XHRcdGNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgncGktZHJhd2VyLXRyaWdnZXInLCBlbC5pZClcblx0XHRcdGVsLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKVxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0z4AoXCIucGktZHJhd2VyXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG5cdFx0XHR2YXIgYURyYXdlciA9IG5ldyBEcmF3ZXIoZWwpXG5cdFx0XHRhbGxEcmF3ZXJzW2VsLmlkXSA9IGFEcmF3ZXJcblx0XHR9KTtcblxuXHRcdM+ALnNldFRyaWdnZXJzKCdkcmF3ZXInKTtcblx0fVxuXG5cdM+ALm1vZHMucHVzaChpbml0KTtcbn0pKClcbiIsIjsoZnVuY3Rpb24oKXtcblx0z4AubGlzdGVuKGluaXQpO1xuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0z4AuY2xlYW4oaW5pdCk7XG5cblx0XHTPgCgnLnBpLWVxdWFsLWhlaWdodHMnKS5mb3JFYWNoKEVxdWFsSGVpZ2h0c0dyaWQpO1xuXHR9XG5cblx0ZnVuY3Rpb24gRXF1YWxIZWlnaHRzR3JpZChlbCl7XG5cdFx0dmFyIG51bWJlck9mQ29sdW1ucyA9IDA7XG5cdFx0dmFyIHdpblcgPSAwO1xuXHRcdHZhciBuZXdJbWFnZXNIYXZlTG9hZGVkID0gZmFsc2U7XG5cblx0XHRlbC7PgCgnaW1nJykub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0bmV3SW1hZ2VzSGF2ZUxvYWRlZCA9IHRydWU7XG5cdFx0fTtcblxuXHRcdHZhciBhbGxJdGVtcyA9IGVsLs+AKCcuaXRlbScpOyBcblx0XHRhbGxJdGVtcy5mb3JFYWNoKGJ1aWxkSXRlbSk7XG5cblx0XHRzZXRJdGVtSGVpZ2h0cyhhbGxJdGVtcyk7XG5cblx0XHRmdW5jdGlvbiBidWlsZEl0ZW0oaXRlbSkge1xuXHRcdFx0dmFyIGZvb3RlciA9IGl0ZW0uz4AxKCdmb290ZXInKTtcblxuXHRcdFx0dmFyIHdyYXBwZXI7XG5cblx0XHRcdGlmIChmb290ZXIpIHtcblx0XHRcdFx0Zm9vdGVyLnJlbW92ZSgpO1xuXHRcdFx0XHR3cmFwcGVyID0gd3JhcHBlckZvckl0ZW0oaXRlbSk7XG5cdFx0XHRcdHdyYXBwZXIuYWRkKGZvb3Rlcik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3cmFwcGVyRm9ySXRlbShpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB3cmFwcGVyRm9ySXRlbShpdGVtKSB7XG5cdFx0XHR2YXIgd3JhcHBlciA9IM+ALmRvbSgnLndyYXBwZXInKTtcblx0XHRcdHdyYXBwZXIuZmlsbCjPgC5kb20oJy5jb250ZW50JywgaXRlbS5pbm5lckhUTUwpKTtcblx0XHRcdGl0ZW0uZmlsbCh3cmFwcGVyKTtcblx0XHRcdHJldHVybiB3cmFwcGVyO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldEl0ZW1IZWlnaHRzKGl0ZW1zKSB7XG5cdFx0XHRpZiAod2luZG93LmlubmVyV2lkdGggIT09IHdpblcgfHwgbmV3SW1hZ2VzSGF2ZUxvYWRlZCkge1xuXHRcdFx0XHR3aW5XID0gd2luZG93LmlubmVyV2lkdGg7XG5cdFx0XHRcdG5ld0ltYWdlc0hhdmVMb2FkZWQgPSBmYWxzZTtcblxuXHRcdFx0XHRzZXROdW1iZXJPZkNvbHVtcyhlbCwgaXRlbXNbMF0pO1xuXG5cdFx0XHRcdHZhciByb3dzID0gW107XG5cblx0XHRcdFx0aXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaWR4KSB7XG5cdFx0XHRcdFx0aWYgKGlkeCAlIG51bWJlck9mQ29sdW1ucyA9PT0gMCkge1xuXHRcdFx0XHRcdFx0cm93cy5wdXNoKFtdKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgdGhpc1JvdyA9IHJvd3Nbcm93cy5sYXN0SWR4KCldO1xuXHRcdFx0XHRcdHRoaXNSb3cucHVzaChpdGVtKTtcblxuXHRcdFx0XHRcdGlmIChpZHggJSBudW1iZXJPZkNvbHVtbnMgPT09IG51bWJlck9mQ29sdW1ucyAtIDEgfHxcblx0XHRcdFx0XHRcdGl0ZW0gPT09IGl0ZW1zLmxhc3RPYmooKSkge1xuXHRcdFx0XHRcdFx0c2V0SGVpZ2h0Rm9yUm93KHRoaXNSb3cpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHNldEl0ZW1IZWlnaHRzKGl0ZW1zKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldEhlaWdodEZvclJvdyhyb3cpIHtcblx0XHRcdHZhciBtYXhIZWlnaHQgPSAwO1xuXG5cdFx0XHRyb3cuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0XHR2YXIgY29udGVudCA9IGl0ZW0uz4AxKCcuY29udGVudCcpO1xuXHRcdFx0XHRpZiAoY29udGVudC5vZmZzZXQoKS5oZWlnaHQgPiBtYXhIZWlnaHQpXG5cdFx0XHRcdFx0bWF4SGVpZ2h0ID0gY29udGVudC5vZmZzZXQoKS5oZWlnaHQ7XG5cdFx0XHR9KTtcblxuXHRcdFx0cm93LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdFx0aXRlbS5jc3Moe2hlaWdodDogcHgobWF4SGVpZ2h0KX0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0TnVtYmVyT2ZDb2x1bXMoY29udGFpbmVyLCBpdGVtKSB7XG5cdFx0XHRudW1iZXJPZkNvbHVtbnMgPSBNYXRoLnJvdW5kKGNvbnRhaW5lci5vZmZzZXQoKS53aWR0aCAvIHBhcnNlSW50KGl0ZW0uY3NzKCkud2lkdGgpKTtcblx0XHR9XG5cdH1cblxuXHQvLyDPgC5tb2RzIGFyZSBsb2FkZWQgYWZ0ZXIgRE9NQ29udGVudExvYWRlZFxuXHTPgC5tb2RzLnB1c2goaW5pdCk7XG59KSgpO1xuIiwiOyhmdW5jdGlvbigpe1xuXHRmdW5jdGlvbiBNYXNvbnJ5KGVsKXtcblx0XHRlbC5hZGRDbGFzcygnZmlyc3QtcnVuJylcblx0XHR2YXIgbnVtYmVyT2ZDb2x1bW5zID0gMFxuXHRcdHZhciB3aW5XID0gMFxuXHRcdHZhciBhbGxJdGVtcyA9IGVsLs+AKCcuaXRlbScpXG5cdFx0dmFyIGltYWdlQ291bnQgPSAwXG5cdFx0dmFyIGxvYWRlZEltYWdlQ291bnQgPSAwXG5cdFx0dmFyIHByZXZpb3VzU2hvcnRlc3RJdGVtXG5cblx0XHR2YXIgaW1hZ2VzID0gZWwuz4AoJ2ltZycpXG5cdFx0aW1hZ2VzLmZvckVhY2goZnVuY3Rpb24gKGltZykge1xuXHRcdFx0aW1hZ2VDb3VudCsrXG5cdFx0XHRpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRsb2FkZWRJbWFnZUNvdW50Kytcblx0XHRcdFx0aWYgKGxvYWRlZEltYWdlQ291bnQgPT09IGltYWdlQ291bnQpIHtcblx0XHRcdFx0XHRraWxsQ29sdW1ucygpXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGltZy5zcmMgPSBpbWcuZGF0YXNldC5zcmNcblx0XHR9KVxuXG5cdFx0ZnVuY3Rpb24gYnVpbGRDb2x1bW5zKGl0ZW1zKSB7XG5cdFx0XHR2YXIgYWxsQ29sdW1ucyA9IFtdXG5cdFx0XHRpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpZHgpIHtcblx0XHRcdFx0dmFyIHRoaXNDb2x1bW4gPSBlbC7PgCgnLmNvbHVtbicpW2lkeCAlIG51bWJlck9mQ29sdW1uc107XG5cblx0XHRcdFx0aWYgKCF0aGlzQ29sdW1uKSB7XG5cdFx0XHRcdFx0dGhpc0NvbHVtbiA9IM+ALmRvbSgnLmNvbHVtbicpO1xuXHRcdFx0XHRcdGVsLmFkZCh0aGlzQ29sdW1uKTtcblx0XHRcdFx0XHRhbGxDb2x1bW5zLnB1c2godGhpc0NvbHVtbilcblx0XHRcdFx0XHRcblx0XHRcdFx0XHRpZiAoaWR4ID09PSAwKSB7XG5cdFx0XHRcdFx0XHRzZXROdW1iZXJPZkNvbHVtcyhlbCwgdGhpc0NvbHVtbik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdFxuXHRcdFx0XHR0aGlzQ29sdW1uLmFkZChpdGVtKTtcblx0XHRcdH0pO1xuXHRcdFx0XG5cdFx0XHRhZGp1c3RDb2x1bW5zKClcblx0XHRcdFxuXHRcdFx0ZnVuY3Rpb24gYWRqdXN0Q29sdW1ucygpIHtcblx0XHRcdFx0dmFyIHRhbGxlc3RDb2x1bW4gPSBhbGxDb2x1bW5zLnJlZHVjZShmdW5jdGlvbiAocHJldiwgY3VycmVudCkge1xuXHRcdFx0XHRcdGlmIChwcmV2Lm9mZnNldCgpLmhlaWdodCA+IGN1cnJlbnQub2Zmc2V0KCkuaGVpZ2h0KSByZXR1cm4gcHJldlxuXHRcdFx0XHRcdHJldHVybiBjdXJyZW50XG5cdFx0XHRcdH0pXG5cblx0XHRcdFx0dmFyIHNob3J0ZXN0Q29sdW1uID0gYWxsQ29sdW1ucy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGN1cnJlbnQpIHtcblx0XHRcdFx0XHRpZiAocHJldi5vZmZzZXQoKS5oZWlnaHQgPCBjdXJyZW50Lm9mZnNldCgpLmhlaWdodCkgcmV0dXJuIHByZXZcblx0XHRcdFx0XHRyZXR1cm4gY3VycmVudFxuXHRcdFx0XHR9KVxuXHRcdFx0XHRcblx0XHRcdFx0dmFyIHNob3J0ZXN0SXRlbSA9IHRhbGxlc3RDb2x1bW4uz4AoJy5pdGVtJykucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCBjdXJyZW50KSB7XG5cdFx0XHRcdFx0aWYgKHByZXYub2Zmc2V0KCkuaGVpZ2h0IDwgY3VycmVudC5vZmZzZXQoKS5oZWlnaHQpIHJldHVybiBwcmV2XG5cdFx0XHRcdFx0cmV0dXJuIGN1cnJlbnRcblx0XHRcdFx0fSlcblx0XHRcdFx0XG5cdFx0XHRcdGlmIChzaG9ydGVzdEl0ZW0gIT09IHByZXZpb3VzU2hvcnRlc3RJdGVtKSB7XG5cdFx0XHRcdFx0cHJldmlvdXNTaG9ydGVzdEl0ZW0gPSBzaG9ydGVzdEl0ZW1cblxuXHRcdFx0XHRcdHZhciBUQ0ggPSB0YWxsZXN0Q29sdW1uLm9mZnNldCgpLmhlaWdodFxuXHRcdFx0XHRcdHZhciBTQ0ggPSBzaG9ydGVzdENvbHVtbi5vZmZzZXQoKS5oZWlnaHRcblx0XHRcdFx0XHR2YXIgU0lIID0gc2hvcnRlc3RJdGVtLm9mZnNldCgpLmhlaWdodFxuXG5cdFx0XHRcdFx0dmFyIGNvbHVtbkhlaWdodHNEaWZmID0gVENIIC0gU0NIXG5cblx0XHRcdFx0XHRpZiAoY29sdW1uSGVpZ2h0c0RpZmYgPiBTSUggfHwgKChTQ0ggKyBTSUgpIC0gKFRDSCAtIFNJSCkpIDwgY29sdW1uSGVpZ2h0c0RpZmYpIHtcblx0XHRcdFx0XHRcdHNob3J0ZXN0Q29sdW1uLmFkZChzaG9ydGVzdEl0ZW0pXG5cdFx0XHRcdFx0XHRhZGp1c3RDb2x1bW5zKClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdGlmICghZWwuaGFzQ2xhc3MoJ2xvYWRlZCcpKSBlbC5hZGRDbGFzcygnbG9hZGVkJylcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBraWxsQ29sdW1ucygpIHtcblx0XHRcdGlmICh3aW5XICE9PSB3aW5kb3cuaW5uZXJXaWR0aCkge1xuXHRcdFx0XHR3aW5XID0gd2luZG93LmlubmVyV2lkdGg7XG5cblx0XHRcdFx0ZWwuZW1wdHkoKTtcblx0XHRcdFx0YnVpbGRDb2x1bW5zKGFsbEl0ZW1zKVxuXHRcdFx0fVxuXG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoa2lsbENvbHVtbnMpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHNldE51bWJlck9mQ29sdW1zKGNvbnRhaW5lciwgaXRlbSkge1xuXHRcdFx0bnVtYmVyT2ZDb2x1bW5zID0gTWF0aC5yb3VuZChjb250YWluZXIub2Zmc2V0KCkud2lkdGggLyBwYXJzZUludChpdGVtLmNzcygpLndpZHRoKSk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHTPgC5jbGVhbihpbml0KTtcblx0XHTPgCgnLnBpLW1hc29ucnknKS5mb3JFYWNoKE1hc29ucnkpO1xuXHR9XG5cblx0Ly8gz4AubW9kcyBhcmUgbG9hZGVkIGFmdGVyIERPTUNvbnRlbnRMb2FkZWRcblx0z4AubW9kcy5wdXNoKGluaXQpO1xufSkoKVxuIiwiOyhmdW5jdGlvbiAoKSB7XG5cdC8vIG1ha2UgYWxsIHJvdGF0b3JzIGF2YWlsYWJsZSBieSBpZCwgZS5nLiBBbGxSb3RhdG9yc1snbXlSb3RhdG9ySUQnXVxuXHR2YXIgQWxsUm90YXRvcnMgPSB7fVxuXG5cdC8vIGF0dGFjaCByb3RhdG9yIHRvIM+AIHNvIGV4dGVybmFsIHRyaWdnZXJzIGNhbiBhY2Nlc3MgdG9nZ2xlXG5cdM+ALnJvdGF0b3IgPSB7XG5cdFx0dG9nZ2xlOiBmdW5jdGlvbiAoaWQsIGUpIHtcblx0XHRcdHZhciByb3RhdG9yID0gQWxsUm90YXRvcnNbaWRdXG5cdFx0XHRyb3RhdG9yLmVsLmhhc0NsYXNzKCdvbicpID8gcm90YXRvci5oaWRlKCkgOiByb3RhdG9yLnNob3coZSkgXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gUm90YXRvcihlbCkge1xuXHRcdHZhciB0aGlzUm90YXRvciA9IHRoaXNcblx0XHR0aGlzUm90YXRvci5lbCA9IGVsXG5cdFx0XG5cdFx0dmFyIG9wdGlvbnMgPSBKU09OLnBhcnNlKGVsLmRhdGFzZXQub3B0aW9ucyA/IGVsLmRhdGFzZXQub3B0aW9ucyA6ICd7fScpXG5cdFx0ZGVsZXRlIGVsLmRhdGFzZXQub3B0aW9uc1xuXHRcdFxuXHRcdHZhciBjdXJyZW50SWR4ID0gMFxuXHRcdHZhciBzdGFnZSA9IM+ALmRvbSgnLnN0YWdlJyksIHNsZWQgPSDPgC5kb20oJy5zbGVkJylcblx0XHR2YXIgaXRlbXMgPSBbXVxuXHRcdHZhciBudW1iZXJPZkl0ZW1zXG5cdFx0dmFyIGNvbnRhaW5lclxuXHRcdHZhciBwcmV2QnV0dG9uLCBuZXh0QnV0dG9uLCBjbG9zZUJ1dHRvblxuXHRcdHZhciBjYXJvdXNlbCA9IG9wdGlvbnMuY2Fyb3VzZWxcblx0XHR2YXIgY291bnRlciA9IG9wdGlvbnMuY291bnRlciA/IM+ALmRvbSgnLmNvdW50ZXInKSA6IG51bGxcblx0XHR2YXIgYmxpcHMgPSBvcHRpb25zLmJsaXBzID8gz4AuZG9tKCcuYmxpcHMnKSA6IG51bGxcblx0XHR2YXIgbW92aW5nID0gZmFsc2VcblxuXHRcdC8vIFRPRE86IHNob3cgYSBzcGlubmVyIGlmIGxvYWRDb3VudCA8IG51bWJlck9mSXRlbXNcblx0XHR2YXIgbG9hZENvdW50ID0gMFxuXG5cdFx0ZWwuz4AoJy5pdGVtJykuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0aXRlbXMucHVzaChpdGVtKVxuXHRcdFx0ZWwucmVtb3ZlQ2hpbGQoaXRlbSlcblx0XHR9KVxuXG5cdFx0bnVtYmVyT2ZJdGVtcyA9IGl0ZW1zLmxlbmd0aFxuXHRcdFxuXHRcdGlmIChvcHRpb25zLmlubGluZSkge1xuXHRcdFx0Y29udGFpbmVyID0gZWxcblx0XHRcdGVsLmFkZENsYXNzKCdpbmxpbmUnKVxuXHRcdFx0ZWwuZmlsbChzdGFnZSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0b3ZlcmxheSA9IM+ALmRvbSgnLnBpLW92ZXJsYXknKVxuXHRcdFx0b3ZlcmxheS5maWxsKHN0YWdlKVxuXHRcdFx0ZWwuZmlsbChvdmVybGF5KVxuXHRcdFx0Y29udGFpbmVyID0gb3ZlcmxheVxuXHRcdH1cblxuXHRcdGlmICghb3B0aW9ucy5leHRlcm5hbFRyaWdnZXIgJiYgIW9wdGlvbnMuaW5saW5lKSB7XG5cdFx0XHRjbG9zZUJ1dHRvbiA9IM+ALmRvbSgnYnV0dG9uLnBpLW1vZGFsLWNsb3NlLWJ1dHRvbicpXG5cdFx0XHRjbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3BpLXJvdGF0b3ItdHJpZ2dlcicsIGVsLmlkKVxuXHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGNsb3NlQnV0dG9uKVxuXHRcdH1cblx0XHRcblx0XHRpZiAob3B0aW9ucy5wcmV2TmV4dCkge1xuXHRcdFx0cHJldkJ1dHRvbiA9IM+ALmRvbSgnYnV0dG9uLnBpLXByZXYtYnV0dG9uJylcblx0XHRcdGlmICghY2Fyb3VzZWwpIHByZXZCdXR0b24uYWRkQ2xhc3MoJ29mZicpXG5cblx0XHRcdG5leHRCdXR0b24gPSDPgC5kb20oJ2J1dHRvbi5waS1uZXh0LWJ1dHRvbicpXG5cdFx0XHRwcmV2QnV0dG9uLm9uY2xpY2sgPSBwcmV2XG5cdFx0XHRuZXh0QnV0dG9uLm9uY2xpY2sgPSBuZXh0XG5cblx0XHRcdGNvbnRhaW5lci5hZGQoW3ByZXZCdXR0b24sIG5leHRCdXR0b25dKVxuXHRcdH1cblxuXHRcdGlmIChjb3VudGVyKSB7XG5cdFx0XHRjb3VudGVyLmFkZChbz4AuZG9tKCdzcGFuJyksIM+ALmRvbSgnc3BhbicsIG51bWJlck9mSXRlbXMudG9TdHJpbmcoKSldKVxuXHRcdFx0Y29udGFpbmVyLmFkZChjb3VudGVyKVxuXHRcdH1cblxuXHRcdGlmIChibGlwcykge1xuXHRcdFx0dmFyIGRvdHMgPSBpdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0sIGlkeCkge1xuXHRcdFx0XHR2YXIgZG90ID0gz4AuZG9tKCdidXR0b24nKVxuXHRcdFx0XHRkb3QuZGF0YXNldC5pZHggPSBpZHhcblx0XHRcdFx0ZG90Lm9uY2xpY2sgPSBqdW1wVG9JdGVtXG5cdFx0XHRcdHJldHVybiBkb3Rcblx0XHRcdH0pXG5cblx0XHRcdGJsaXBzLmFkZChkb3RzKVxuXHRcdFx0Y29udGFpbmVyLmFkZChibGlwcylcblx0XHR9XG5cdFx0XG5cdFx0aWYgKG9wdGlvbnMuY3Jvc3NmYWRlKSB7XG5cdFx0XHRlbC5hZGRDbGFzcygnY3Jvc3NmYWRlJylcblx0XHR9XG5cdFx0XG5cdFx0aWYgKG9wdGlvbnMuaW5saW5lKSB7XG5cdFx0XHRzdGFnZS5maWxsKGl0ZW1zWzBdKVxuXHRcdFx0dXBkYXRlVGhlVmlldygpXG5cdFx0fVxuXHRcdFxuXHRcdGlmIChvcHRpb25zLmF1dG9QbGF5KSB7XG5cdFx0XHR2YXIgZGVsYXkgPSBwYXJzZUludChvcHRpb25zLmF1dG9QbGF5KVxuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGF1dG9QbGF5KGRlbGF5KVxuXHRcdFx0fSwgZGVsYXkpXG5cdFx0fVxuXHRcdFxuXHRcdGZ1bmN0aW9uIGF1dG9QbGF5KGRlbGF5KSB7XG5cdFx0XHRpZiAoIW9wdGlvbnMuYXV0b1BsYXkpIHJldHVyblxuXHRcdFx0XG5cdFx0XHRuZXh0KClcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRhdXRvUGxheShkZWxheSlcblx0XHRcdH0sIGRlbGF5KVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGp1bXBUb0l0ZW0oKSB7XG5cdFx0XHRvcHRpb25zLmF1dG9QbGF5ID0gZmFsc2Vcblx0XHRcdFxuXHRcdFx0dmFyIGlkeCA9IHBhcnNlSW50KHRoaXMuZGF0YXNldC5pZHgpXG5cdFx0XHRpZiAoY3VycmVudElkeCAhPT0gaWR4KSB7XG5cdFx0XHRcdHZhciBkZWx0YSA9IGlkeCA+IGN1cnJlbnRJZHggPyAxIDogLTFcblx0XHRcdFx0c2xpZGUoZGVsdGEsIHtpZHg6IGlkeH0pXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2xpZGUoZGVsdGEsIGp1bXBUbykge1xuXHRcdFx0bW92aW5nID0gdHJ1ZVxuXHRcdFx0c2xlZC5jc3Mob3B0aW9ucy5jcm9zc2ZhZGUgPyBcblx0XHRcdFx0e29wYWNpdHk6IDB9IDogXG5cdFx0XHRcdHtsZWZ0OiBwY3QoMTAwICogZGVsdGEpfVxuXHRcdFx0KVxuXHRcdFx0dmFyIGluY29taW5nSWR4ID0ganVtcFRvID8ganVtcFRvLmlkeCA6IGN1cnJlbnRJZHggKyBkZWx0YVxuXHRcdFx0c2xlZC5maWxsKGl0ZW1zW2luY29taW5nSWR4XSlcblx0XHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZChzbGVkKVxuXG5cdFx0XHRzaG93SW5jb21pbmdJdGVtKGRlbHRhLCBqdW1wVG8pXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2hvd0luY29taW5nSXRlbShkZWx0YSwganVtcFRvKSB7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIHN0YWdlU3R5bGUgPSB7fSwgc2xlZFN0eWxlID0ge30sIHRyYW5zaXRpb25Qcm9wZXJ0eSA9ICdvcGFjaXR5J1xuXHRcdFx0XHRpZihvcHRpb25zLmNyb3NzZmFkZSkge1xuXHRcdFx0XHRcdHN0YWdlU3R5bGUub3BhY2l0eSA9IDBcblx0XHRcdFx0XHRzbGVkU3R5bGUub3BhY2l0eSA9IDFcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzdGFnZVN0eWxlLmxlZnQgPSBwY3QoLTEwMCAqIGRlbHRhKVxuXHRcdFx0XHRcdHNsZWRTdHlsZS5sZWZ0ID0gMFxuXHRcdFx0XHRcdHRyYW5zaXRpb25Qcm9wZXJ0eSA9ICdsZWZ0J1xuXHRcdFx0XHR9XG5cdFx0XHRcdHN0YWdlLmNzcyhzdGFnZVN0eWxlKVxuXHRcdFx0XHRzbGVkLmNzcyhzbGVkU3R5bGUpXG5cblx0XHRcdFx0Y3VycmVudElkeCA9IGp1bXBUbyA/IGp1bXBUby5pZHggOiBjdXJyZW50SWR4ICsgZGVsdGFcblxuXHRcdFx0XHRkb0FmdGVyVHJhbnNpdGlvbihzdGFnZSwgdHJhbnNpdGlvblByb3BlcnR5LCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0Y29udGFpbmVyLnJlbW92ZUNoaWxkKHN0YWdlKVxuXHRcdFx0XHRcdHN0YWdlLmZpbGwoaXRlbXNbY3VycmVudElkeF0pXG5cdFx0XHRcdFx0c3RhZ2UucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG5cblx0XHRcdFx0XHRjb250YWluZXIucmVwbGFjZUNoaWxkKHN0YWdlLCBzbGVkKVxuXHRcdFx0XHRcdHNsZWQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG5cblx0XHRcdFx0XHR1cGRhdGVUaGVWaWV3KClcblxuXHRcdFx0XHRcdG1vdmluZyA9IGZhbHNlXG5cdFx0XHRcdH0pXG5cdFx0XHR9LCA1MClcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVUaGVWaWV3KCkge1xuXHRcdFx0dXBkYXRlUHJldk5leHQoKVxuXHRcdFx0dXBkYXRlQ291bnRlcigpXG5cdFx0XHR1cGRhdGVCbGlwcygpXG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdXBkYXRlQmxpcHMoKSB7XG5cdFx0XHRpZiAoIWJsaXBzKSByZXR1cm5cblxuXHRcdFx0dmFyIHByZXZpb3VzQmxpcCA9IGJsaXBzLs+AMSgnLm9uJylcblx0XHRcdGlmIChwcmV2aW91c0JsaXApIHByZXZpb3VzQmxpcC5raWxsQ2xhc3MoJ29uJylcblx0XHRcdGJsaXBzLmNoaWxkTm9kZXNbY3VycmVudElkeF0uYWRkQ2xhc3MoJ29uJylcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVDb3VudGVyKCkge1xuXHRcdFx0aWYgKGNvdW50ZXIpIHtcblx0XHRcdFx0Y291bnRlci5maXJzdENoaWxkLnRleHRDb250ZW50ID0gY3VycmVudElkeCArIDFcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiB1cGRhdGVQcmV2TmV4dCgpIHtcblx0XHRcdGlmIChjYXJvdXNlbCkgcmV0dXJuXG5cdFx0XHRpZiAoIW9wdGlvbnMucHJldk5leHQpIHJldHVyblxuXG5cdFx0XHRpZiAoY3VycmVudElkeCA9PT0gMCkge1xuXHRcdFx0XHRzaG93SGlkZUJ1dHRvbnMobmV4dEJ1dHRvbiwgcHJldkJ1dHRvbilcblx0XHRcdH0gZWxzZSBpZiAoY3VycmVudElkeCA9PT0gbnVtYmVyT2ZJdGVtcyAtIDEpIHtcblx0XHRcdFx0c2hvd0hpZGVCdXR0b25zKHByZXZCdXR0b24sIG5leHRCdXR0b24pXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwcmV2QnV0dG9uLmNzcyh7ZGlzcGxheTogJ2Jsb2NrJ30pXG5cdFx0XHRcdG5leHRCdXR0b24uY3NzKHtkaXNwbGF5OiAnYmxvY2snfSlcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cHJldkJ1dHRvbi5raWxsQ2xhc3MoJ29mZicpXG5cdFx0XHRcdFx0bmV4dEJ1dHRvbi5raWxsQ2xhc3MoJ29mZicpXG5cdFx0XHRcdH0sIDEwMClcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gc2hvd0hpZGVCdXR0b25zKHNob3dCdXR0b24sIGhpZGVCdXR0b24pIHtcblx0XHRcdFx0aGlkZUJ1dHRvbi5hZGRDbGFzcygnb2ZmJylcblx0XHRcdFx0ZG9BZnRlclRyYW5zaXRpb24oaGlkZUJ1dHRvbiwgJ29wYWNpdHknLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aGlkZUJ1dHRvbi5jc3Moe2Rpc3BsYXk6ICdub25lJ30pXG5cdFx0XHRcdH0pXG5cdFx0XHRcdHNob3dCdXR0b24uY3NzKHtkaXNwbGF5OiAnYmxvY2snfSlcblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0c2hvd0J1dHRvbi5raWxsQ2xhc3MoJ29mZicpXG5cdFx0XHRcdH0sIDEwMClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmdW5jdGlvbiBoYW5kbGVLZXlib2FyZChlKSB7XG5cdFx0XHRzd2l0Y2ggKGUua2V5Q29kZSkge1xuXHRcdFx0XHRjYXNlIDI3OlxuXHRcdFx0XHRcdHRoaXNSb3RhdG9yLmhpZGUoKVxuXHRcdFx0XHRcdGJyZWFrXG5cblx0XHRcdFx0Y2FzZSAzNzpcblx0XHRcdFx0XHRwcmV2QnV0dG9uLmNsaWNrKClcblx0XHRcdFx0XHRicmVha1xuXG5cdFx0XHRcdGNhc2UgMzk6XG5cdFx0XHRcdFx0bmV4dEJ1dHRvbi5jbGljaygpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdH1cblx0XHR9XG5cdFx0XG5cdFx0ZnVuY3Rpb24gYWN1dGFsSXRlbShlbCkge1xuXHRcdFx0d2hpbGUgKCFlbC5nZXRBdHRyaWJ1dGUoJ3BpLXJvdGF0b3ItdHJpZ2dlcicpKSB7XG5cdFx0XHRcdGVsID0gZWwucGFyZW50Tm9kZVxuXHRcdFx0fVxuXHRcdFx0XG5cdFx0XHRyZXR1cm4gZWxcblx0XHR9XG5cblx0XHRmdW5jdGlvbiBwcmV2KCkge1xuXHRcdFx0aWYgKCFtb3ZpbmcpIHtcblx0XHRcdFx0aWYgKHByZXZCdXR0b24gJiYgcHJldkJ1dHRvbi5oYXNDbGFzcygnb2ZmJykpIHJldHVyblxuXG5cdFx0XHRcdGlmIChjdXJyZW50SWR4IDw9IDApIHtcblx0XHRcdFx0XHRjdXJyZW50SWR4ID0gbnVtYmVyT2ZJdGVtc1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNsaWRlKC0xKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIG5leHQoKSB7XG5cdFx0XHRpZiAodGhpcyA9PT0gbmV4dEJ1dHRvbikgb3B0aW9ucy5hdXRvUGxheSA9IGZhbHNlXG5cdFx0XHRpZiAoIW1vdmluZykge1xuXHRcdFx0XHRpZiAoY3VycmVudElkeCA+PSBudW1iZXJPZkl0ZW1zIC0gMSkge1xuXHRcdFx0XHRcdGN1cnJlbnRJZHggPSAtMVxuXHRcdFx0XHR9XG5cdFx0XHRcdHNsaWRlKDEpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpc1JvdGF0b3Iuc2hvdyA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHTPgC5saXN0ZW4oaGFuZGxlS2V5Ym9hcmQsICdrZXlkb3duJylcblx0XHRcdGVsLmNzcyh7XG5cdFx0XHRcdGRpc3BsYXk6ICdibG9jaycsXG5cdFx0XHRcdHpJbmRleDogz4AuaGlnaGVzdFooKVxuXHRcdFx0fSlcblx0XHRcdGN1cnJlbnRJZHggPSBwYXJzZUludChhY3V0YWxJdGVtKGUudGFyZ2V0KS5kYXRhc2V0LmlkeCkgfHwgMFxuXHRcdFx0c3RhZ2UuZmlsbChpdGVtc1tjdXJyZW50SWR4XSlcblx0XHRcdHVwZGF0ZVRoZVZpZXcoKVxuXHRcdFx0XG5cdFx0XHTPgGJvZHkuYXBwZW5kQ2hpbGQoZWwpXG5cdFx0XHRcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRlbC5hZGRDbGFzcygnb24nKVxuXHRcdFx0fSwgNTApXG5cblx0XHRcdM+AYm9keS5jc3Moe292ZXJmbG93OiAnaGlkZGVuJ30pXG5cdFx0fVxuXG5cdFx0dGhpc1JvdGF0b3IuaGlkZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdM+ALmNsZWFuKGhhbmRsZUtleWJvYXJkLCAna2V5ZG93bicpXG5cdFx0XHRlbC5raWxsQ2xhc3MoJ29uJylcblx0XHRcdGRvQWZ0ZXJUcmFuc2l0aW9uKGVsLCAnb3BhY2l0eScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0ZWwuY3NzKHtkaXNwbGF5OiAnbm9uZSd9KVxuXHRcdFx0fSlcblxuXHRcdFx0z4Bib2R5LmNzcyh7b3ZlcmZsb3c6ICdhdXRvJ30pXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHTPgCgnLnBpLXJvdGF0b3InKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0QWxsUm90YXRvcnNbZWwuaWRdID0gbmV3IFJvdGF0b3IoZWwpXG5cdFx0fSlcblx0XHTPgC5zZXRUcmlnZ2Vycygncm90YXRvcicpXG5cdH1cblxuXHTPgC5tb2RzLnB1c2goaW5pdClcbn0pKCkiLCIvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKioqKioqKioqXG4gKioqKioqKioqICAgICAgICAgICAgICAgICAgVEhFIFNUQUxLRVJcbiAqKioqKioqKipcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cbi8qXG5cbiBSZWxpZXMgb24gdGhlIHRvcCBwYWRkaW5nIG9mIHRoZSBib2R5LCBhbmQgdGhlIHRvcCBwYWRkaW5nIG9mIHRoZSBwYXJlbnQgc2VjdGlvbiB0byBkaWN0YXRlIHRoZSBsb2NhdGlvbiBvZiB0aGUgXCJ3ZWxsXCJcblxuIDxzZWN0aW9uPlxuXHQgPG1haW4+XG5cdFx0IC4uLlx0IFxuXHRcdCA8ZGl2IGNsYXNzPVwic3RhbGtlclwiPjwvZGl2Plx0XG5cdCA8L21haW4+XG4gPC9zZWN0aW9uPlxuXG4gKi9cblxuXG47KGZ1bmN0aW9uICgpIHtcblx0dmFyIEFsbFN0YWxrZXJzID0gW11cblxuXHRmdW5jdGlvbiBTdGFsa2VyKGVsKXtcblx0XHR2YXIgc2VjdGlvbiA9IGVsLnBhcmVudCgnc2VjdGlvbicpXG5cdFx0dmFyIG1haW4gPSBlbC5wYXJlbnQoJ21haW4nKVxuXHRcdHZhciB3aW5ZID0gLTFcblxuXHRcdGZ1bmN0aW9uIHNldE15UG9zaXRpb24oKSB7XG5cdFx0XHRpZiAod2luZG93LnBhZ2VZT2Zmc2V0ICE9PSB3aW5ZKSB7XG5cdFx0XHRcdHdpblkgPSB3aW5kb3cucGFnZVlPZmZzZXRcblxuXHRcdFx0XHR2YXIgd2VsbFRvcCA9IHBhcnNlSW50KM+AYm9keS5jc3MoKS5wYWRkaW5nVG9wKSArIHBhcnNlSW50KHNlY3Rpb24uY3NzKCkucGFkZGluZ1RvcClcblx0XHRcdFx0dmFyIG1haW5Ub3AgPSBtYWluLm9mZnNldCgpLnRvcFxuXHRcdFx0XHR2YXIgbWFpbkJvdHRvbSA9IG1haW4ub2Zmc2V0KCkuYm90dG9tXG5cdFx0XHRcdHZhciBzdGFsa0JvdHRvbSA9IHdlbGxUb3AgKyBwYXJzZUludChlbC5vZmZzZXQoKS5oZWlnaHQpXG5cblx0XHRcdFx0ZWwua2lsbENsYXNzKFsndG9wcGVkJywgJ2NoaWxsaW4nLCAnYm90dG9tZWQnXSlcblxuXHRcdFx0XHRpZiAobWFpblRvcCA+IHdlbGxUb3ApIHtcblx0XHRcdFx0XHRlbC5hZGRDbGFzcygndG9wcGVkJylcblx0XHRcdFx0fSBlbHNlIGlmIChtYWluVG9wIDw9IHdlbGxUb3AgJiYgbWFpbkJvdHRvbSA+IHN0YWxrQm90dG9tKSB7XG5cdFx0XHRcdFx0ZWwuYWRkQ2xhc3MoJ2NoaWxsaW4nKVxuXHRcdFx0XHR9IGVsc2UgaWYgKG1haW5Cb3R0b20gPD0gc3RhbGtCb3R0b20pIHtcblx0XHRcdFx0XHRlbC5hZGRDbGFzcygnYm90dG9tZWQnKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZShzZXRNeVBvc2l0aW9uKVxuXHRcdH1cblxuXHRcdHRoaXMuc2V0TXlQb3NpdGlvbiA9IHNldE15UG9zaXRpb25cblx0fVxuXG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0z4AoJy5zdGFsa2VyJykuZm9yRWFjaChmdW5jdGlvbiAoc3RhbGtlcikge1xuXHRcdFx0dmFyIGFTdGFsa2VyID0gbmV3IFN0YWxrZXIoc3RhbGtlcilcblx0XHRcdEFsbFN0YWxrZXJzLnB1c2goYVN0YWxrZXIpXG5cdFx0fSlcblxuXHRcdEFsbFN0YWxrZXJzLmZvckVhY2goZnVuY3Rpb24gKHN0YWxrZXIpIHtcblx0XHRcdHN0YWxrZXIuc2V0TXlQb3NpdGlvbigpXG5cdFx0fSlcblx0fVxuXG5cdM+ALm1vZHMucHVzaChpbml0KVxufSkoKVxuXG5cbiIsIi8vIDsoZnVuY3Rpb24oKXtcbi8vIFx0dmFyIHN0aWNreUhlYWRlciwgdGhpc1ksIHByZXZpb3VzWSwgdG9wQW5jaG9yUG9pbnQsIGJvdHRvbUFuY2hvclBvaW50LCBUSFJFU0hPTERcbi8vIFx0dGhpc1kgPSBwcmV2aW91c1kgPSB0b3BBbmNob3JQb2ludCA9IGJvdHRvbUFuY2hvclBvaW50ID0gMFxuLy9cbi8vIFx0ZnVuY3Rpb24gY2hlY2tTY3JvbGxpbmcoKSB7XG4vLyBcdFx0aWYgKHN0aWNreUhlYWRlci5wYXJlbnROb2RlICE9PSDPgGJvZHkpIHtcbi8vIFx0XHRcdM+AYm9keS5hZGQoc3RpY2t5SGVhZGVyKVxuLy8gXHRcdH1cbi8vXG4vLyBcdFx0cHJldmlvdXNZID0gdGhpc1lcbi8vIFx0XHR0aGlzWSA9IHdpbmRvdy5wYWdlWU9mZnNldFxuLy9cbi8vIFx0XHRpZiAodGhpc1kgPiBwcmV2aW91c1kpIHsgIC8vIGdvaW5nIGRvd25cbi8vIFx0XHRcdGJvdHRvbUFuY2hvclBvaW50ID0gdGhpc1lcbi8vXG4vLyBcdFx0XHRpZiAodGhpc1kgLSB0b3BBbmNob3JQb2ludCA+IFRIUkVTSE9MRCkge1xuLy8gXHRcdFx0XHRzdGlja3lIZWFkZXIua2lsbENsYXNzKCdzdHVjaycpXG4vLyBcdFx0XHR9XG4vL1xuLy8gXHRcdFx0aWYgKHRoaXNZID4gVEhSRVNIT0xEKSB7XG4vLyBcdFx0XHRcdHN0aWNreUhlYWRlci5hZGRDbGFzcygnaGlkZGVuJylcbi8vIFx0XHRcdH1cbi8vIFx0XHR9XG4vL1xuLy8gXHRcdGVsc2UgaWYgKHRoaXNZIDwgcHJldmlvdXNZKSB7IC8vIGdvaW5nVXBcbi8vIFx0XHRcdHRvcEFuY2hvclBvaW50ID0gdGhpc1lcbi8vXG4vLyBcdFx0XHRpZiAoYm90dG9tQW5jaG9yUG9pbnQgLSB0aGlzWSA+IFRIUkVTSE9MRCkge1xuLy8gXHRcdFx0XHRzdGlja3lIZWFkZXIuY3NzKHt6SW5kZXg6IM+ALmhpZ2hlc3RaKCl9KVxuLy8gXHRcdFx0XHRzdGlja3lIZWFkZXIuYWRkQ2xhc3MoJ3N0dWNrJylcbi8vIFx0XHRcdFx0c3RpY2t5SGVhZGVyLmtpbGxDbGFzcygnaGlkZGVuJylcbi8vIFx0XHRcdH1cbi8vXG4vLyBcdFx0XHRpZiAodGhpc1kgPCBUSFJFU0hPTEQpIHtcbi8vIFx0XHRcdFx0c3RpY2t5SGVhZGVyLmtpbGxDbGFzcygnc3R1Y2snKVxuLy8gXHRcdFx0fVxuLy8gXHRcdH1cbi8vXG4vLyBcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNoZWNrU2Nyb2xsaW5nKVxuLy8gXHR9XG4vL1xuLy8gXHRmdW5jdGlvbiBpbml0KCkge1xuLy8gXHRcdHN0aWNreUhlYWRlciA9IM+AMSgnLnBpLXN0aWNreS1oZWFkZXInKVxuLy8gXHRcdGlmIChzdGlja3lIZWFkZXIpIHtcbi8vIFx0XHRcdHZhciBvcHRpb25zID0gSlNPTi5wYXJzZShzdGlja3lIZWFkZXIuZGF0YXNldC5vcHRpb25zID8gc3RpY2t5SGVhZGVyLmRhdGFzZXQub3B0aW9ucyA6ICd7fScpXG4vLyBcdFx0XHRUSFJFU0hPTEQgPSBvcHRpb25zLnRocmVzaG9sZCB8fCAxMDBcbi8vXG4vLyBcdFx0XHRjaGVja1Njcm9sbGluZygpXG4vLyBcdFx0fVxuLy8gXHR9XG4vL1xuLy8gXHTPgC5tb2RzLnB1c2goaW5pdClcbi8vIH0pKClcbiIsIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICpcbiAqIM+ALXVuaW1lbnVcbiAqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG47KGZ1bmN0aW9uKCl7XG5cdHZhciBIQU1CVVJHRVJfVEhSRVNISE9MRCA9IDEwMjRcblx0dmFyIFdJTkRPV19XSURUSCA9IDBcblx0dmFyIE9QRU5fTkFWID0gZmFsc2Vcblx0dmFyIE1PVklORyA9IGZhbHNlXG5cdHZhciBOQVYsIEJVUkdFUl9CVVRUT05cblx0XG5cdGZ1bmN0aW9uIGluaXQoKSB7XG5cdFx0VW5pbWVudSjPgDEoJy5waS11bmltZW51JykpXG5cdH1cblxuXHRmdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuXHRcdE9QRU5fTkFWID0gIU9QRU5fTkFWXG5cdH1cblxuXHRmdW5jdGlvbiBVbmltZW51KGVsKSB7XG5cdFx0aWYgKCFlbCkgcmV0dXJuXG5cdFx0XG5cdFx0TkFWID0gZWxcblx0XHRcblx0XHRCVVJHRVJfQlVUVE9OID0gz4AuZG9tKCdidXR0b24ucGktYnVyZ2VyLWJ1dHRvbicpXG5cdFx0QlVSR0VSX0JVVFRPTi5vbmNsaWNrID0gdG9nZ2xlTWVudVxuXHRcdM+AYm9keS5hZGQoQlVSR0VSX0JVVFRPTilcblx0XHRcblx0XHRzZXRNZW51U3R5bGVzKClcblx0fVxuXG5cdGZ1bmN0aW9uIHNldE1lbnVTdHlsZXMoKSB7XG5cdFx0aWYgKHdpbmRvdy5pbm5lcldpZHRoICE9PSBXSU5ET1dfV0lEVEgpIHtcblx0XHRcdFdJTkRPV19XSURUSCA9IHdpbmRvdy5pbm5lcldpZHRoXG5cdFx0fVxuXHRcdFxuXHRcdGlmIChXSU5ET1dfV0lEVEggPiBIQU1CVVJHRVJfVEhSRVNISE9MRCkge1xuXHRcdFx0T1BFTl9OQVYgPSBmYWxzZVxuXHRcdFx0TkFWLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxuXHRcdH1cblx0XHRcblx0XHRpZiAoIU1PVklORykge1xuXHRcdFx0T1BFTl9OQVYgPyB0b2dnbGVOYXYodHJ1ZSkgOiB0b2dnbGVOYXYoKVxuXHRcdH1cblx0XHRcblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2V0TWVudVN0eWxlcylcblx0fVxuXG5cdGZ1bmN0aW9uIHRvZ2dsZU5hdihzaG93KSB7XG5cdFx0dmFyIHNob3dpbmcgPSBzaG93ICYmICHPgGJvZHkuaGFzQ2xhc3MoJ29wZW4tbmF2Jylcblx0XHR2YXIgaGlkaW5nID0gIXNob3cgJiYgz4Bib2R5Lmhhc0NsYXNzKCdvcGVuLW5hdicpXG5cdFx0aWYgKHNob3dpbmcgfHwgaGlkaW5nKSB7XG5cdFx0XHRNT1ZJTkcgPSB0cnVlXG5cdFx0XHRpZihzaG93aW5nKSDPgGJvZHkuYWRkQ2xhc3MoJ29wZW4tbmF2JykgXG5cdFx0XHRkb1RoZVRoaW5nKHNob3dpbmcpXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gZG9UaGVUaGluZygpIHtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdE5BVi5jc3Moe29wYWNpdHk6IE9QRU5fTkFWID8gMSA6IDB9KVxuXHRcdFx0ZG9BZnRlclRyYW5zaXRpb24oTkFWLCAnb3BhY2l0eScsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0aWYgKCFPUEVOX05BVikgz4Bib2R5LmtpbGxDbGFzcygnb3Blbi1uYXYnKVxuXHRcdFx0XHRNT1ZJTkcgPSBmYWxzZVxuXHRcdFx0fSlcblx0XHR9LCAxMClcblx0fVxuXHRcblx0z4AubW9kcy5wdXNoKGluaXQpXG59KSgpIiwiOyhmdW5jdGlvbigpe1xuXHTPgC5tb2RzLnB1c2goZnVuY3Rpb24gKCkge1xuXHRcdGNvbnNvbGUubG9nKFwiz4AgbG9hZGVkLiBwb28uXCIpXG5cblxuXHRcdGluaXRTdGlja3lIZWFkZXIoKTtcblx0XHRpbml0QW5jaG9yU2Nyb2xsaW5nKCk7XG5cdFx0aW5pdE1vYmlsZU1lbnUoKTtcblx0XHRpbml0RXhoaWJpdHMoKTtcblx0XHRpbml0Q2VudGVySW1hZ2VzKCk7XG5cblxuXHR9KVxuXG5cblxuXHRmdW5jdGlvbiBpbml0U3RpY2t5SGVhZGVyKCkge1xuXHRcdHZhciBoZWFkZXIgPSDPgDEoJ2hlYWRlcicpO1xuXHRcdHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYod2luZG93LnNjcm9sbFkgPj0gMjAwICYmICFoZWFkZXIuaGFzQ2xhc3MoJ3N0aWNreScpKSB7XG5cdFx0XHRcdGhlYWRlci5hZGRDbGFzcygnc3RpY2t5Jyk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmKHdpbmRvdy5zY3JvbGxZIDwgMjAwICYmIGhlYWRlci5oYXNDbGFzcygnc3RpY2t5JykpIHtcblx0XHRcdFx0aGVhZGVyLmtpbGxDbGFzcygnc3RpY2t5Jyk7XG5cdFx0XHR9XG5cdFx0fSwgMTApO1xuXHR9XG5cblx0ZnVuY3Rpb24gaW5pdE1vYmlsZU1lbnUoKSB7XG5cdFx0dmFyIGJ1dHRvbiA9IM+AMSgnI21lbnVCdXR0b24nKTtcblx0XHR2YXIgbWVudSA9IM+AMSgnI21lbnUnKTtcblx0XHR2YXIgYm9keSA9IM+AMSgnYm9keScpO1xuXHRcdGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG5cdFx0XHQoYm9keS5oYXNDbGFzcygnb3Blbk1lbnUnKSkgPyBib2R5LmtpbGxDbGFzcygnb3Blbk1lbnUnKTogYm9keS5hZGRDbGFzcygnb3Blbk1lbnUnKTtcblx0XHR9O1xuXHR9XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vIEVYSElCSVQgU0VDVElPTiBBTklNQVRJT05TXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRmdW5jdGlvbiBpbml0RXhoaWJpdHMoKSB7XG5cdFx0z4AoJy5leGhpYml0JykuZm9yRWFjaChmdW5jdGlvbihlbCkge1xuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcblx0XHRcdFx0dG9nZ2xlRXhoaWJpdHMoZWwpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiB0b2dnbGVFeGhpYml0cyhlbCkge1xuXG5cdFx0dmFyIG1hcmdpbiA9IChlbC5kYXRhc2V0LnJhbmdlTWFyZ2luKSA/IHBhcnNlSW50KGVsLmRhdGFzZXQucmFuZ2VNYXJnaW4pOiAxMDtcblx0XHR2YXIgaW5SYW5nZSA9IGVsZW1lbnRJblJhbmdlKGVsLCBtYXJnaW4pO1xuXG5cdFx0aWYoaW5SYW5nZSAmJiAhZWwuaGFzQ2xhc3MoJ2luUmFuZ2UnKSkge1xuXHRcdFx0ZWwuYWRkQ2xhc3MoJ2luUmFuZ2UnKTtcblx0XHRcdGlmKGVsLmRhdGFzZXQucmFuZ2VGdW5jdGlvbikgcHJvY2Vzc1JhbmdlRnVuY3Rpb24oZWwpO1xuXHRcdH1cblx0XHRlbHNlIGlmKCFpblJhbmdlICYmIGVsLmhhc0NsYXNzKCdpblJhbmdlJykgJiYgIWVsLmhhc0NsYXNzKCdleGhpYml0T25Pbmx5JykpIGVsLmtpbGxDbGFzcygnaW5SYW5nZScpO1xuXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcblx0XHRcdHRvZ2dsZUV4aGliaXRzKGVsKTtcblx0XHR9KTtcblx0fVxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLyBTQ1JPTEwgVE8vRlJPTSBGSVhFRCBDRU5URVJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGZ1bmN0aW9uIGluaXRDZW50ZXJJbWFnZXMoKSB7XG5cdFx0z4AoJypbZGF0YS1zY3JvbGwtY2VudGVyXScpLmZvckVhY2goZnVuY3Rpb24oZWwsIGkpIHtcblx0XHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHNjcm9sbEluQW5kT3V0T2ZGaXhlZENlbnRlcihlbCwgaSk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHNjcm9sbEluQW5kT3V0T2ZGaXhlZENlbnRlcihlbCwgaSkge1xuXG5cdFx0dmFyIHBhcmVudCA9IM+AMSgnIycrZWwuZGF0YXNldC5zY3JvbGxDZW50ZXIpO1xuXHRcdHZhciBwUG9zID0gc2Nyb2xsUG9zaXRpb24oJChwYXJlbnQpKTtcblx0XHR2YXIgbWF4VG9wID0gKCh3aW5kb3cuaW5uZXJIZWlnaHQvMiktKGVsLm9mZnNldEhlaWdodC8yKSk7XG5cdFx0dmFyIG1heEJvdHRvbSA9IG1heFRvcCArIGVsLm9mZnNldEhlaWdodDtcblxuXHRcdHZhciBpc1RvcCA9IChwUG9zLnRvcCA+IG1heFRvcCk7XG5cdFx0dmFyIGlzQm90dG9tID0gKHBQb3MuYm90dG9tIDwgbWF4Qm90dG9tKTtcblx0XHR2YXIgaXNDZW50ZXIgPSAocFBvcy50b3AgPCBtYXhUb3AgJiYgcFBvcy5ib3R0b20gPiBtYXhCb3R0b20pO1xuXG5cdFx0Ly8gQUREIENMQVNTRVNcblx0XHRpZihpc1RvcCAmJiAhZWwuaGFzQ2xhc3MoJ2ZpeFRvVG9wJykpIGVsLmFkZENsYXNzKCdmaXhUb1RvcCcpO1xuXHRcdGlmKGlzQm90dG9tICYmICFlbC5oYXNDbGFzcygnZml4VG9Cb3R0b20nKSkgZWwuYWRkQ2xhc3MoJ2ZpeFRvQm90dG9tJyk7XG5cdFx0aWYoaXNDZW50ZXIgJiYgIWVsLmhhc0NsYXNzKCdmaXhUb0NlbnRlcicpKSBlbC5hZGRDbGFzcygnZml4VG9DZW50ZXInKTtcblxuXHRcdGlmKCFpc1RvcCAmJiBlbC5oYXNDbGFzcygnZml4VG9Ub3AnKSkgZWwua2lsbENsYXNzKCdmaXhUb1RvcCcpO1xuXHRcdGlmKCFpc0JvdHRvbSAmJiBlbC5oYXNDbGFzcygnZml4VG9Cb3R0b20nKSkgZWwua2lsbENsYXNzKCdmaXhUb0JvdHRvbScpO1xuXHRcdGlmKCFpc0NlbnRlciAmJiBlbC5oYXNDbGFzcygnZml4VG9DZW50ZXInKSkgZWwua2lsbENsYXNzKCdmaXhUb0NlbnRlcicpO1xuXG5cdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcblx0XHRcdHNjcm9sbEluQW5kT3V0T2ZGaXhlZENlbnRlcihlbCwgaSk7XG5cdFx0fSk7XG5cdH1cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLyBIQVNIVEFHL0FOQ0hPUiBMSU5LIEFOSU1BVEVEIFNDUk9MTElOR1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRmdW5jdGlvbiBpbml0QW5jaG9yU2Nyb2xsaW5nKCkge1xuXHRcdCQoJ2FbaHJlZio9XCIjXCJdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdHZhciB1cmwgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKS5yZXBsYWNlKC9cXC8kLywgXCJcIik7XG5cdFx0XHR2YXIgbmFtZSA9ICh1cmwuaW5kZXhPZihcIiNcIikgIT09IC0xKSA/IHVybC5zdWJzdHJpbmcodXJsLmluZGV4T2YoXCIjXCIpKzEpOiB1cmwubWF0Y2goLyhbXlxcL10qKVxcLyokLylbMV07XG5cdFx0XHR2YXIgZXhpc3RzID0gKHR5cGVvZigkKFwiYVtuYW1lPSdcIituYW1lK1wiJ11cIikub2Zmc2V0KCkpICE9PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZigkKFwiI1wiK25hbWUpLm9mZnNldCgpKSAhPT0gXCJ1bmRlZmluZWRcIik7XG5cblx0XHRcdGlmKGV4aXN0cykge1xuXHRcdFx0XHR2YXIgdGhlVGFyZ2V0ID0gKHR5cGVvZigkKFwiYVtuYW1lPSdcIituYW1lK1wiJ11cIikub2Zmc2V0KCkpICE9PSBcInVuZGVmaW5lZFwiKSA/ICQoXCJhW25hbWU9J1wiK25hbWUrXCInXVwiKTogJChcIiNcIituYW1lKTtcblx0XHRcdFx0JCh0aGlzKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHNjcm9sbFRvQW5jaG9yKHRoZVRhcmdldCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8gVVRJTElUSUVTXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRmdW5jdGlvbiBlbGVtZW50T3ZlcmxhcHBpbmdBbm90aGVyKGJveCwgd2luKSB7XG5cdFx0Ym94ID0gJChib3gpO1xuXHRcdHdpbiA9ICQod2luKTtcblxuXHRcdHZhciBib3hQb3MgPSBzY3JvbGxQb3NpdGlvbihib3gpO1xuXHRcdHZhciB3aW5Qb3MgPSBzY3JvbGxQb3NpdGlvbih3aW4pO1xuXG5cdFx0cmV0dXJuIChib3hQb3MuYm90dG9tID4gd2luUG9zLnRvcCAmJiBib3hQb3MudG9wIDwgd2luUG9zLmJvdHRvbSk7XG5cdH1cblxuXHRmdW5jdGlvbiBlbGVtZW50SW5WaWV3KGJveCkge1xuXHRcdGJveCA9ICQoYm94KTtcblx0XHR2YXIgYm94UG9zID0gc2Nyb2xsUG9zaXRpb24oYm94KTtcblx0XHRyZXR1cm4gKGJveFBvcy5ib3R0b20gPiAwICYmIGJveFBvcy50b3AgPCAkKHdpbmRvdykuaGVpZ2h0KCkpXG5cdH1cblxuXHRmdW5jdGlvbiBlbGVtZW50SW5SYW5nZShib3gsIG1hcmdpbikge1xuXG5cdFx0Ym94ID0gJChib3gpO1xuXHRcdG1hcmdpbiA9ICghbWFyZ2luKSA/IDAuMjogbWFyZ2luKjAuMDE7XG5cblx0XHR2YXIgYm94UG9zID0gc2Nyb2xsUG9zaXRpb24oYm94KTtcblx0XHR2YXIgd2luSGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xuXG5cdFx0dmFyIHpvbmVCb3R0b20gPSBwYXJzZUludCh3aW5IZWlnaHQqbWFyZ2luKTtcblx0XHR2YXIgem9uZVRvcCA9IHBhcnNlSW50KHdpbkhlaWdodCooMS1tYXJnaW4pKTtcblxuXHRcdHJldHVybiAoYm94UG9zLmJvdHRvbSA+IHpvbmVUb3AgJiYgYm94UG9zLnRvcCA8IHpvbmVCb3R0b20pO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBzY3JvbGxQb3NpdGlvbihlbCkge1xuXHRcdHZhciBib3hUb3AgPSBlbC5vZmZzZXQoKS50b3AtJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXHRcdHZhciBib3hCb3R0b20gPSBib3hUb3ArZWwub3V0ZXJIZWlnaHQoKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dG9wOiBib3hUb3AsXG5cdFx0XHRib3R0b206IGJveEJvdHRvbVxuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIHNjcm9sbFRvQW5jaG9yKGVsLCBzcGVlZCwgcGFkZGluZykge1xuXHRcdGNvbnNvbGUubG9nKGVsKTtcblx0XHRlbCA9ICQoZWwpO1xuXHRcdHNwZWVkID0gKHNwZWVkKSA/IHNwZWVkOiA1MDA7XG5cdFx0cGFkZGluZyA9IChwYWRkaW5nKSA/IHBhZGRpbmc6IC0xO1xuXHRcdHZhciB0aGVUb3AgPSBlbC5vZmZzZXQoKS50b3AtcGFkZGluZztcblxuXHRcdCQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7IHNjcm9sbFRvcDp0aGVUb3AgfSwgc3BlZWQsICdlYXNlSW5PdXRDdWJpYycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly93aW5kb3cubG9jYXRpb24uaGFzaCA9IG5hbWU7XG5cdFx0fSk7XG5cdH1cblxuXHRmdW5jdGlvbiBjZW50ZXJpemVUaGlzVGhpbmcoZWwsIHBhcmVudCkge1xuXHRcdHBhcmVudCA9ICghcGFyZW50KSA/IGVsLnBhcmVudCgpOiBwYXJlbnQ7XG5cdFx0dmFyIHRoID0gcGFyZW50LmhlaWdodCgpLCB0dyA9IHBhcmVudC53aWR0aCgpLCBpaCA9IGVsLmhlaWdodCgpLCBpdyA9IGVsLndpZHRoKCk7XG5cdFx0dmFyIHRoZUhlaWdodCA9ICgodGgvdHcpID4gKGloL2l3KSkgPyB0aDogJ2F1dG8nO1xuXHRcdHZhciB0aGVXaWR0aCA9ICgodGgvdHcpID4gKGloL2l3KSkgPyAnYXV0byc6IHR3O1xuXG5cdFx0aW1hZ2UuY3NzKHsgaGVpZ2h0OiB0aGVIZWlnaHQsIHdpZHRoOiB0aGVXaWR0aCB9KTtcblxuXHRcdHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG5cdFx0XHRjZW50ZXJpemVUaGlzVGhpbmcoZWwsIHBhcmVudCk7XG5cdFx0fSk7XG5cdH1cblxuXG59KSgpIl19
