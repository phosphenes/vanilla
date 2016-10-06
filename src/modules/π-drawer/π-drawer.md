#π-drawer
Content drawer which lives out-of-sight,
then appears on demand via CSS transition.

##OPTIONS [defaults]
externalTrigger [false]: won't create a closeButton

##API
```
<div class="pi-drawer" id="ID_OF_DRAWER" 
    data-options='{
        "externalTrigger": false
    }'>
    
    ANY DOM STRUCTURE HERE
    
</div>

<anyTag pi-drawer-trigger="ID_OF_DRAWER">toggle my drawer</anyTag>
<anyTag pi-drawer-trigger="ID_OF_DRAWER">toggle my drawer from somewhere else</anyTag>
```

anyTag Elements will toggle the targeted drawer open/closed
