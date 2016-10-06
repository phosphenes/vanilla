// ;(function(){
// 	var AllPushmenus = {}, sled
//
// 	π.pushmenu = {
// 		toggle: function (id) {
// 			AllPushmenus[id][sled.hasClass('on') ? 'hide' : 'show']()
// 		}
// 	}
//
// 	function PushMenu(el) {
// 		this.el = el
//
// 		var options = JSON.parse(el.dataset.options ? el.dataset.options : '{}')
// 		delete el.dataset.options
//
// 		var overlay = π.div('pi-overlay')
// 		while (el.childNodes.length) {
// 			overlay.appendChild(el.childNodes[0])
// 		}
// 		el.fill(overlay)
//
// 		var menu = el.π1('ul')
// 		menu.css({minWidth: options.minWidth || 'auto'})
//
// 		el.π('li').forEach(function (li) {
// 			if (li.π1('li')) {
// 				var ul = li.π1('ul')
// 				var div = π.div()
//
// 				div.wrap(ul)
//
// 				li.add(π.button('expander', 0, '', function (e) {
// 					e.stopPropagation()
// 					var parent = this.parentNode
// 					var opening = !parent.hasClass('open')
// 					var newHeight = opening ? px(ul.offset().height) : 0
//
// 					console.log(newHeight)
//
// 					div.css({height: newHeight})
// 					doAfterTransition(div, 'height', function () {
// 						parent.toggleClass('open')
// 					})
// 				}))
// 			}
// 		})
//
// 		this.show = function () {
// 			el.css({display: 'block'})
// 			setTimeout(function () {
// 				sled.addClass('on')
// 				var w = menu.offset().width
// 				sled.css({transform: 'translateX(-' + w + 'px)'})
// 			}, 50)
// 		}
//
// 		this.hide = function () {
// 			sled.css({transform: 'translateX(0)'})
// 			sled.killClass('on')
// 			doAfterTransition(overlay, 'opacity', function () {
// 				el.css({display: 'none'})
// 			})
// 		}
//
// 		overlay.onclick = this.hide
// 		AllPushmenus[el.id] = this
// 	}
//
// 	function init() {
// 		sled = π1('.pi-pushmenu-sled')
//
// 		if (!sled) {
// 			sled = π.div('pi-pushmenu-sled')
// 			sled.css({padding: πbody.css().padding})
// 			πbody.css({padding: 0})
//
// 			while (πbody.childNodes.length) {
// 				sled.appendChild(πbody.firstChild)
// 			}
// 			πbody.fill(sled)
// 		}
//
// 		π('.pi-pushmenu').forEach(function (el) {
// 			new PushMenu(el)
// 		})
//
// 		π.setNewTriggers('pushmenu')
// 	}
//
// 	π.mods.push(init)
// })()