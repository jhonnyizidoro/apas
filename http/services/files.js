const {mkdirSync, existsSync} = require('fs')

const uploadImage = file => {
	const name = `${new Date().getTime()}.${file.name.split('.').pop()}`

	if (file.mimetype.split('/')[0] !== 'image') {
		return false
	}

	if (!existsSync(`${rootPath}/storage`)) {
		mkdirSync(`${rootPath}/storage`)
	}

	file.mv(`${rootPath}/storage/${name}`)

	return {
		location: `/storage/${name}`
	}
}

module.exports = {
	uploadImage,
}