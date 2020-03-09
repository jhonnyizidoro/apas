window.LazyLoad = require('./modules/LazyLoad')
window.Admin = require('./modules/Admin')
window.Alert = require('./modules/Alert')

document.addEventListener('DOMContentLoaded', () => {
	LazyLoad.observe()
})

window.addEventListener('load', () => {
	if (navigator.serviceWorker && !location.href.includes('localhost')) {
		navigator.serviceWorker.register('/sw.js')
	}
})