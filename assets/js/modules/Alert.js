import {on} from '../functions/EventHandler'

const showAlert = (titleHTML, contentHTML) => {
	const alert = document.createElement('div')
	const modal = document.createElement('div')
	const title = document.createElement('div')
	const content = document.createElement('div')
	const close = document.createElement('button')

	title.innerHTML = titleHTML
	content.innerHTML = contentHTML
	close.innerText = 'OK!'

	alert.classList.add('alert')
	modal.classList.add('alert__modal')
	title.classList.add('alert__title')
	content.classList.add('alert__content')
	close.classList.add('alert__close')

	alert.appendChild(modal)
	modal.appendChild(title)
	modal.appendChild(content)
	modal.appendChild(close)
	document.body.appendChild(alert)

	on('click', close, () => alert.parentNode.removeChild(alert))

}

export {
	showAlert,
}