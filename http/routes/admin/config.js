const express = require('express'),
	router = express.Router(),
	auth = require('../../middlewares/auth'),
	{getBanners, getApp, saveBanners, saveApp} = require('../../services/config'),
	{uploadImage} = require('../../services/image')

router.get('/', auth(), (req, res) => {
	Promise.all([getBanners(), getApp()]).then(([banners, app]) => {
		res.render('admin/config', {
			banners,
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
	req.body.logo = req.files && req.files.logo ? uploadImage(req.files.logo).location : false
	if (req.files && req.files.image) {
		if (!Array.isArray(req.files.image)) {
			req.files.image = [req.files.image]
		}
		req.body.image = req.files.image.map(image => uploadImage(image).location)
	}
	Promise.all([saveBanners(req.body), saveApp(req.body)]).then(() => {
		req.session.message = 'Configurações atualizadas com sucesso.'
		res.redirect('/admin/configuracoes')
	}).catch(error => {
		req.session.message = error
		res.redirect('back')
	})
})

module.exports = router