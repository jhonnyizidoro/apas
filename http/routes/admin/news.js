const express = require('express'),
	router = express.Router(),
	auth = require('../../middlewares/auth'),
	{getNews, saveNews, changeNewsStatus} = require('../../services/news'),
	{uploadImage} = require('../../services/image')

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

router.post('/formulario', auth(), (req, res) => {
	const image = uploadImage(req.files.image).location
	const data = {
		image,
		title: req.body.title,
		content: req.body.content,
		user_id: req.session.user.id,
	}
	saveNews(data).then(() => {
		req.session.message = 'Notícia salva com sucesso.'
		res.redirect('/admin/noticias')
	}).catch(error => {
		req.session.message = error
		res.redirect('/admin/noticias')
	})
})

router.get('/status/:id', auth(), (req, res) => {
	changeNewsStatus(req.params.id).then(res => {
		req.session.message = 'Alterações salvas com sucesso.'
		res.redirect('back')
	}).catch(error => {
		req.session.message = error
		res.redirect('/admin/noticias')
	})
})

module.exports = router