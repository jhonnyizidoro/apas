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
		mobile: {
			theme: 'mobile'
		},
	})
}

export {
	navbar,
	tinyMCE,
}