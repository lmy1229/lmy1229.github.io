(function () {
	if (!document.getElementsByClassName) {
		if (document.querySelectorAll) {
			document.getElementsByClassName = function (query) {
				if (typeof query == 'string') {				
					return document.querySelectorAll('.' + query);
				}
			}
		}
	}

	if (!document.getElementsByTagName) {
		if (document.querySelectorAll) {
			document.getElementsByTagName = function (query) {
				if (typeof query == 'string') {				
					return document.querySelectorAll(query);
				}
			}
		}
	}
})();

function attr(attrName, value) {
	if (!value) {
		try {
			return this.getAttribute(attrName);
		} catch(err) {
			console.info('getAttribute error' + err);
		}
	} else {
		try {
			this.setAttribute(attrName, value);
			return this;
		} catch(err) {
			console.info('setAttribute error' + err);
		}
	}
}

function $() {

	arglen = arguments.length;
	if (arglen != 1) {console.error('Invalid Arguments');}
	if (typeof arguments[0] != 'string') {console.info('Invalid Argument');return;}

	query = arguments[0].concat();
	var result;
	if (query[0] == '.') {
		result = document.getElementsByClassName(query.slice(1, query.length));
	} else if (query[0] == '#') {
		r = document.getElementById(query.slice(1, query.length));
		if (r) {r.attr = attr;}
		return r;
	} else {
		result = document.getElementsByTagName(query);
	}

	if (!result) {return null;}
	else if (result.length == 0) {return null;}
	else if (result.length == 1) {
		r = result[0];
		if (r) {r.attr = attr;}
		return r;
	}
	else {
		r = [];
		r.length = result.length
		for (var i = 0; i < r.length; i++) {
			r[i] = result[i];
			r[i].attr = attr;
		}
		return r;
	}
}