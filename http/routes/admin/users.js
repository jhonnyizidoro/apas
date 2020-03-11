const express = require('express'),
	router = express.Router(),
	auth = require('../../middlewares/auth'),
	{getUsers} = require('../../services/users')

router.get('/', auth(), (req, res) => {
	const seo = {
		title: APP_NAME,
		description: '',
		keywords: '',
	}
	getUsers().then(users => {
		res.render('admin/users', {
			seo,
			users,
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