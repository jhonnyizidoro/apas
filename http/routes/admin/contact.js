const express = require('express'),
	router = express.Router(),
	auth = require('../../middlewares/auth'),
	{getPhones, savePhones} = require('../../services/phones'),
	{getApp, saveApp} = require('../../services/apps')

router.get('/', auth(), (req, res) => {
	Promise.all([getPhones(), getApp()]).then(([phones, app]) => {
		res.render('admin/contact', {
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