;(function(){
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
					var text = document.createTextNode()
					text.textContent = arguments[i]
					el.appendChild(text)
				} else {
					el.appendChild(arguments[i])
				}
			}
		}

		return(el)
	}
})()