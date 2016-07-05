(function () {
	popAlert = {};
	popAlert.old = {};
	popAlert.init = function(params) {

		// create background
		if (!popAlert.shadow) {
			shadow = document.createElement('div');
			shadow.id = 'popAlert-shadow';
			shadow.style.height = window.innerHeight + 'px';
			shadow.style.width = window.innerWidth + 'px';
			popAlert.shadow = shadow;
		}
		
		// create popbox
		// if (!popAlert.box) {
			popbox = document.createElement('div');
			title = document.createElement('div');
			content = document.createElement('div');
			btn = document.createElement('input');
			btn.type = 'button';
			btn.value = 'close';
			btn.onclick = popAlert.close;

			var width = 200,
				ox = (window.innerWidth - width) / 2,
				oy = 300;

			popbox.style.width = width + 'px';
			popbox.style.left = ox + 'px';
			popbox.style.top = oy + 'px';

			popAlert.box = popbox;

			popbox.appendChild(title);
			popbox.appendChild(content);
			popbox.appendChild(btn);

			popbox.id = 'popbox';
			title.id = 'popbox-title';
			content.id = 'popbox-content';
			btn.id = 'popbox-cancelbtn';

			params = params || {};
			params.title = params.title || 'title';
			params.content = params.content || 'content';
			// params.draggable = params.draggable || true;
			if (params.draggable == undefined) {params = true}
			params.closeKey = params.closeKey || 27;

			title.innerHTML = params.title;
			content.innerHTML = params.content;

			popAlert.params = params;
			popAlert.params.ox = popAlert.params.px = ox;
			popAlert.params.oy = popAlert.params.py = oy;
		// }	
	}
	popAlert.show = function() {
		if (!popAlert.shadow || !popAlert.box) {
			console.info("popAlert can't show without init");
			return;
		}
		body = document.getElementsByTagName('body')[0];
		body.appendChild(popAlert.shadow);
		body.appendChild(popAlert.box);


		title = popAlert.box.children[0];
		title.onmousedown = function(e) {
			if (popAlert.params.draggable == false) {
				return;
			}
			originMX = e.clientX;
			originMY = e.clientY;
			document.onmousemove = function(e) {
				popAlert.box.style.left = popAlert.params.ox + e.clientX - originMX + 'px';
				popAlert.box.style.top = popAlert.params.oy + e.clientY - originMY + 'px';
			}
			document.onmouseup = function(e) {
				popAlert.params.ox = popAlert.params.ox + e.clientX - originMX;
				popAlert.params.oy = popAlert.params.oy + e.clientY - originMY;
				document.onmousemove = undefined;
				document.onmouseup = undefined;
			}
		}
		popAlert.old.onkeydown = document.onkeydown;
		document.onkeydown = function(e) {
			if (e.keyCode == popAlert.params.closeKey) {
				popAlert.close();
			}
		}
	}
	popAlert.close = function() {
		var box = document.getElementById('popbox');
		var shadow = document.getElementById('popAlert-shadow');
		if (!box || !shadow) {
			console.info('close error');
			return;
		}
		body = document.getElementsByTagName('body')[0];
		body.removeChild(box);
		body.removeChild(shadow);

		document.onkeydown = popAlert.old.onkeydown;
	}
})();