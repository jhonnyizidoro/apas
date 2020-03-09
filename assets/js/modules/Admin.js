import {on} from '../functions/EventHandler'
import {showAlert} from './Alert'

const navbar = () => {
	const links = document.querySelectorAll('.navbar__link')
	links.forEach(link => {
		if (window.location.href.includes(link.href)) {
			link.classList.add('navbar__link--active')
		}
	})
}

const tinyMCE = () => {
	tinymce.init({
		selector: 'textarea',
		language: 'pt_BR',
		plugins: 'image imagetools advlist code media link colorpicker paste table textcolor fullscreen preview',
		images_upload_url: "/admin/upload",
		entity_encoding : "raw",
		height: 450,
		mobile: {
			theme: 'mobile'
		},
	})
}

const preview = () => {
	const input = document.querySelector('.default__file')
	const image = document.querySelector('.default__image')
	on('change', input, () => {
		image.src = URL.createObjectURL(input.files[0])
		input.dataset.placeholder = 'ALTERAR IMAGEM'
	})
}

const phoneInput = () => {
	const addButton = document.querySelector('.button--small')
	const deleteButtons = document.querySelectorAll('.button--orange')
	phoneDeleteButtons(deleteButtons)

	on('click', addButton, () => {
		const formGroup = document.querySelector('.default__group').cloneNode(true)
		const deleteButton = formGroup.querySelector('button')
		formGroup.querySelector('input').value = null
		formGroup.querySelector('select').selectedIndex = 0
		addButton.parentNode.insertBefore(formGroup, addButton)
		phoneDeleteButtons([deleteButton])
	})
}

const phoneDeleteButtons = buttons => {
	on('click', buttons, button => {
		if (document.querySelectorAll('.default__group').length > 1) {
			button.parentNode.remove()
		} else {
			showAlert('Erro!', 'É necessário ter ao menos um telefone cadastrado!')
		}
	})
}

export {
	navbar,
	tinyMCE,
	preview,
	phoneInput,
}