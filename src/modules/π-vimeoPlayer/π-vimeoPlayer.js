var tag = document.createElement('script')
tag.src = "https://www.youtube.com/iframe_api"

var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

var player

var allPlayers = {}
;(function(){

	π.vimeoPlayer = {
		show: function(el, event){
			if (player){
				player.playVideo()
			} else {
				player = new YT.Player('player', {
					height: '100%',
					width: '100%',
					videoId: 'M7lc1UVf-VE'
				});
				
					player.addEventListener('onReady', function () {
						player.playVideo()
					})
			}
			
			
			//
			//
			// var videoId = actualDrawerTrigger(event.target).dataset.videoId
			// var videoURL = 'https://player.vimeo.com/video/' + videoId
			//
			// iframe = π.dom('iframe')
			// iframe.width = '100%'
			// iframe.height = '100%'
			// iframe.src = videoURL
			//
			// el.π1('.drawer-wrapper').add(iframe)
			//
			// if (player) {
			// 	player.play() 
			// }
			// else {
			// 	player = new Vimeo.Player(iframe)
			// 	player.ready().then(function () {
			// 		player.play()
			// 	})
			// }


			π.listen(listenForEsc, 'keydown');

			el.css({display: "block"});

			setTimeout(function () {
				el.addClass("on");
				πbody.addClass('overlay-on');
			}, 50);

			π.vimeoPlayer.current = el;

			πbody.css({overflow: 'hidden'})
		},
		hide: function(){
			π.clean(listenForEsc, 'keydown');

			var el = π.vimeoPlayer.current;
			el.killClass("on");

			doAfterTransition(el, 'opacity', function () {
				el.css({display: 'none'})
				player.pauseVideo()
				setTimeout(function () {
					// iframe.kill()
					player.destroy()
					player = null
				}, 500)
			})

			π.vimeoPlayer.current = null;

			πbody.css({overflow: 'auto'})
		},
		toggle: function (id, event) {
			var el = πd(id)
			if (el.hasClass('on')) {
				π.vimeoPlayer.hide()
			} else {
				π.vimeoPlayer.show(el, event)
			}
		},
		current: null
	};

	function actualDrawerTrigger(el) {
		while (!el.getAttribute('data-vimeo-trigger')) {
			el = el.parentNode
		}

		return el
	}

	function listenForEsc(e) {
		if (e.which == 27) {
			π.vimeoPlayer.hide();
		}
	}





	function Drawer(el) {
		this.el = el

		var options = JSON.parse(el.dataset.options ? el.dataset.options : '{}')
		delete el.dataset.options

		// var wrapper = π.dom(".drawer-wrapper#player", el.innerHTML);
		// el.fill(wrapper);

		if (!options.externalTrigger) {
			var closeButton = π.dom('button.pi-modal-close-button');
			closeButton.setAttribute('data-vimeo-trigger', el.id)
			el.appendChild(closeButton)
		}
	}

	function init() {
		π(".pi-vimeo-player").forEach(function (el) {
			var aDrawer = new Drawer(el)
			allPlayers[el.id] = aDrawer
		});

		setDrawerTriggers();
	}

	function setDrawerTriggers(selector){
		π('[data-vimeo-trigger]').forEach(function(trigger){
			trigger.onclick = function(e){
				π.vimeoPlayer.toggle(trigger.getAttribute('data-vimeo-trigger'), e)
			}
		})
	}

	π.mods.push(init)
})();
