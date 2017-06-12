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


