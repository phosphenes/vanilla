(function(){
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
			var wrapper = π.div('wrapper');
			wrapper.fill(π.div('content', 0, item.innerHTML));
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
