// adorable little functions

function booleanAttributeValue(element, attribute, defaultValue){
	// returns true if an attribute is present with no value
	// e.g. booleanAttributeValue(element, 'data-modal', false);
	if (element.hasAttribute(attribute)) {
		var value = element.getAttribute(attribute);
		if (value === '' || value === 'true') {
			return true;
		} else if (value === 'false') {
			return false;
		}
	}

	return defaultValue;
}

function px(n){
	return n + 'px';
}

function pct(n) {
	return n + '%';
}

function doAfterTransition(element, transitionProperty, callback) {
	setTimeout(callback, millisecondsForTransition(element, transitionProperty))
}

function millisecondsForTransition(element, transitionProperty){
	// returns the millis for a css transition duration + delay
	//e.g. millisecondsForTransition(el, 'transform')

	var styles = getComputedStyle(element);
	var idx = styles.transitionProperty.split(', ').indexOf(transitionProperty);

	return (parseFloat(styles.transitionDuration.split(', ')[idx]) + parseFloat(styles.transitionDelay.split(', ')[idx])) * 1000;
}

function deepCopy(obj) {
	// make new references for an array/object and all its complex children
	var value, key, output = Array.isArray(obj) ? [] : {};
	for (key in obj) {
		value = obj[key];
		output[key] = (typeof value === "object") ? copy(value) : value;
	}
	return output;
}
