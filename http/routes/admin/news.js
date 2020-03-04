const express = require('express'),
	router = express.Router(),
	auth = require('../../middlewares/auth')

router.get('/', auth(), (req, res) => {
	const seo = {
		title: APP_NAME,
		description: '',
		keywords: '',
	}
	res.render('admin/news', {
		seo,
	})
	delete req.session.message
	req.session.save()
})

module.exports = router