const express = require('express'),
	router = express.Router(),
	auth = require('../../middlewares/auth'),
	{getPages} = require('../../services/pages')

router.get('/', auth(), (req, res) => {
	const seo = {
		title: APP_NAME,
		description: '',
		keywords: '',
	}
	getPages().then(pages => {
		res.render('admin/pages', {
			seo,
			pages,
		})
	}).catch(error => {
		req.session.message = error
		res.redirect('back')
	}).finally(() => {
		delete req.session.message
		req.session.save()
	})
})

module.exports = router