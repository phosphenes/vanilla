#π-rotator
modal rotator

## OPTIONS [all default to false]
inline          : vs. modal  
crossfade       : crossfade transition instead of l/r slide   
carousel        : wraps around prev/next to lastItem/firstItem  
counter         : displays "11 of 704"  
blips           : shows the nav dots  
externalTrigger : won't create a closeButton
prevNext        : create prev/next buttons
autoPlay        : milliseconds for delay between auto-playing slides

##API
```
<div class="pi-rotator" id="ID_OF_ROTATOR"
     data-options='{
		"carousel": true,
		"counter": true,
		"blips": true
	}'>
	<div class="item">
		<img src="images/0.jpg">
	</div>
	<div class="item">
		<img src="images/1.jpg">
	</div>
</div>

<anyTag pi-rotator-trigger="ID_OF_ROTATOR" data-idx="0">toggle my rotator</anyTag>
```
###notes
anyTag Elements will toggle the targeted rotator open/closed. The optional data-idx  
opens the rotator to a specific item.  

The "data-options" value must be valid JSON, meaning keys must be in double quotes.  
Best practice is simply to copy/paste the above example as a place to start.  
