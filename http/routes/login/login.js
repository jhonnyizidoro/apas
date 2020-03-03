const express = require('express'),
	router = express.Router()

router.get('/', (req, res) => {
	const seo = {
		title: APP_NAME,
		description: '',
		keywords: '',
	}
	res.render('admin/login', {
		seo,
	})
	req.session.destroy()
})

module.exports = router