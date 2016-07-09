(function() {
	BackToTop = {};
	BackToTop.init = function (opts) {
		if (!opts) {
			opts = {RightDown: true};
		}
		if (opts && (typeof opts != 'object')) {
			console.info('Invalid Argument');
			return;
		}
		btn = document.createElement('div');
		btn.innerHTML = "<img src='/img/backtotop_icon.svg' width='30px' style='margin:0, padding:0'/>";
		btn.style.position = 'fixed';
		btn.style.display = 'none';
		btn.id = 'BackToTopBtn';

		w = window.innerWidth;
		h = window.innerHeight;

		if (opts.x && opts.y) {
			btn.style.left = opts.x;
			btn.style.top = opts.y;
			btn.pos = '0';
		} else if (opts.LeftUp == true) {
			btn.style.left = "20px";
			btn.style.top = 100 + "px";
			btn.pos = '1';
		} else if (opts.LeftDown == true) {
			btn.style.left = "20px";
			btn.style.top = h - 100 + "px";
			btn.pos = '2';
		} else if (opts.RightUp == true) {
			btn.style.left = w - 50 + "px";
			btn.style.top = 100 + "px";
			btn.pos = '3';
		} else if (opts.RightDown == true) {
			btn.style.left = w - 50 + "px";
			btn.style.top = h - 100 + "px";
			btn.pos = '4';
		} else {
			console.info('opt not supported');
			return;
		}
		document.getElementsByTagName('body')[0].appendChild(btn);
	}
	BackToTop.start = function() {
		var obj = document.getElementById("BackToTopBtn"); 
		function getScrollTop() { 
			return document.documentElement.scrollTop + document.body.scrollTop; 
		} 
		function setScrollTop(value) { 
			if (document.documentElement.scrollTop) { 
				document.documentElement.scrollTop = value; 
			} else { 
				document.body.scrollTop = value; 
			} 
		} 
		window.onscroll = function() { 
			getScrollTop() > 0 ? obj.style.display = "": obj.style.display = "none"; 
		} 
		window.onresize = function() {
			if (obj.pos == '0' || obj.pos == '1') {return;}
			w = window.innerWidth;
			h = window.innerHeight;
			if (obj.pos == '2') {
				obj.style.top = h - 100 + "px";
			} else if (obj.pos == '3') {
				obj.style.left = w - 50 + "px";
			} else if (obj.pos == '4') {
				obj.style.left = w - 50 + "px";
				obj.style.top = h - 100 + "px";
			}
		}
		function goToTop() { 
			var goTop = setInterval(scrollMove, 10); 
			function scrollMove() { 
				setScrollTop(getScrollTop() * 0.9); 
				if (getScrollTop() < 1) clearInterval(goTop); 
			} 
		} 
		obj.onclick = goToTop;
		document.onkeydown = function(e) {
			if (e.keyCode == 72) {
				goToTop();
			}
		}
	}
})();