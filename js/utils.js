
// Automatically resize iframe according to the content within
function resizeIframe(obj) {
	obj.style.height = obj.contentWindow.document.body.scrollHeight + 20 + 'px';
}