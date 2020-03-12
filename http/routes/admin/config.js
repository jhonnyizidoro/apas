const express = require('express'),
	router = express.Router(),
	auth = require('../../middlewares/auth'),
	{getBanners, getApp} = require('../../services/config')

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

module.exports = router