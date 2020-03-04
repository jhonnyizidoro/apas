const navbar = () => {
	const links = document.querySelectorAll('.navbar__link')
	links.forEach(link => {
		if (window.location.href.includes(link.href)) {
			link.classList.add('navbar__link--active')
		}
	})
}

const editor = () => {
	const textarea = document.querySelector('textarea')
	ClassicEditor.create(textarea)
		.then(editor => console.log(editor))
		.catch(error => console.log(eror))
}

export {
	navbar,
	editor,
}