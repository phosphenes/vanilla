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
