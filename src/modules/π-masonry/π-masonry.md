#π-masonry
This component creates columns of even-width, odd-height boxes

Column counts are determined per media query based on the percentage width given to the "item" class, e.g.

```.item {width: 25%}```

would create a 4-column layout.

#####HTML:
```html
<div class="pi-masonry">
     <div class="item">this is item 1</div>
     <div class="item">this is item 2</div>
     <div class="item">this is item 3</div>
</div>
```


#####SASS:
For "space-around"-style layouts, add `.space-around` to the `.pi-masonry` container.
Then include `masonrySpaceAround($gutter, $numberOfColumns)` in each of your media queries:

```sass
.pi-masonry.space-around
	.item
		padding: 0 20px

	@media screen and (min-width: 750px) and (max-width: 1024px)
		@include masonrySpaceAround(20, 2)

	@media screen and (min-width: 1025px) and (max-width: 1299px)
		@include masonrySpaceAround(20, 3)

	@media screen and (min-width: 1300px) and (max-width: 1599px)
		@include masonrySpaceAround(20, 4)

	@media screen and (min-width: 1600px) and (max-width: 2099px)
		@include masonrySpaceAround(20, 5)

	@media screen and (min-width: 2100px)
		@include masonrySpaceAround(20, 6)
```

In the example above, the desired gutters are 20px wide at all breakpoints,
and the number of columns increases by 1 at each.