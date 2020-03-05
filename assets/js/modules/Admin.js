import {on} from '../functions/EventHandler'

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

export {
	navbar,
	tinyMCE,
	preview,
}