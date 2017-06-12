#π-stickyHeader
fixed header which shrinks/slides up after a threshold is breached,  
then reappears on scroll up/disappears on scroll down

## OPTIONS [defaults]
threshold [100]: pixel distance in a given direction to show or hide the header

##API
```
<header class="pi-sticky-header"
    data-options='{
          "threshold": 262
	}'>
	<h3>Header Content here</h3> 
</div>

```
###notes
it's expected that each use will involve extensive tweaks to the css
