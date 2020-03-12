const express = require('express'),
	router = express.Router(),
	auth = require('../../middlewares/auth'),
	{getAllNews, saveNews, changeNewsStatus, getNews} = require('../../services/news'),
	{uploadImage} = require('../../services/image')

router.get('/', auth(), (req, res) => {
	getAllNews().then(allNews => {
		res.render('admin/news', {
			allNews,
		})
	}).catch(error => {
		req.session.message = error
		res.redirect('back')
	}).finally(() => {
		delete req.session.message
		req.session.save()
	})
})

router.get('/formulario/:id?', auth(), (req, res) => {
	getNews(req.params.id).then(news => {
		res.render('admin/newsForm', {
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

router.post('/formulario', auth(), (req, res) => {
	const data = {
		id: req.body.id,
		title: req.body.title,
		content: req.body.content,
		user_id: req.session.user.id,
		image: req.files ? uploadImage(req.files.image).location : false,
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
	changeNewsStatus(req.params.id).then(() => {
		req.session.message = 'Alterações salvas com sucesso.'
		res.redirect('/admin/noticias')
	}).catch(error => {
		req.session.message = error
		res.redirect('/admin/noticias')
	})
})

module.exports = router