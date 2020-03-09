const express = require('express'),
	router = express.Router(),
	auth = require('../../middlewares/auth'),
	{getPhones, getApp, savePhones, saveApp} = require('../../services/contact')

router.get('/', auth(), (req, res) => {
	const seo = {
		title: APP_NAME,
		description: '',
		keywords: '',
	}

	Promise.all([getPhones(), getApp()]).then(([phones, app]) => {
		res.render('admin/contact', {
			seo,
			phones,
			app,
		})
	}).catch(error => {
		req.session.message = error
		res.redirect('back')
	}).finally(() => {
		delete req.session.message
		req.session.save()
	})
})

router.post('/', auth(), (req, res) => {
	Promise.all([savePhones(req.body), saveApp(req.body)]).then(() => {
		req.session.message = 'Contato atualizado com sucesso.'
		res.redirect('/admin/contato')
	}).catch(error => {
		req.session.message = error
		res.redirect('back')
	})
})

module.exports = router