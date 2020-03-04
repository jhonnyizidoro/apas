const express = require('express'),
	router = express.Router(),
	auth = require('../../middlewares/auth'),
	{getNews} = require('../../services/news')

router.get('/', auth(), (req, res) => {
	const seo = {
		title: APP_NAME,
		description: '',
		keywords: '',
	}
	getNews().then(news => {
		res.render('admin/news', {
			seo,
			news,
		})
	}).catch(error => {
		req.session.message = error
		res.redirect('back')
	}).finally(() => {
		delete req.session.message
		req.session.save()
	})
})

router.get('/formulario', auth(), (req, res) => {
	const seo = {
		title: APP_NAME,
		description: '',
		keywords: '',
	}
	res.render('admin/newsForm', {
		seo,
	})
})

module.exports = router