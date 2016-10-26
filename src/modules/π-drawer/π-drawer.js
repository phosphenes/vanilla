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
