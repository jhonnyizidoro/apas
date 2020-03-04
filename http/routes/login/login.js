const express = require('express'),
	router = express.Router(),
	{login} = require('../../services/login')

router.get('/', (req, res) => {
	const seo = {
		title: APP_NAME,
		description: '',
		keywords: '',
	}
	res.render('admin/login', {
		seo,
	})
	delete req.session.message
	req.session.save()
})

router.post('/', (req, res) => {
	const data = {
		email: req.body.email,
		password: req.body.password,
	}
	login(data).then(user => {
		req.session.user = user.id
		res.redirect('/admin')
	}).catch(error => {
		req.session.message = error
		res.redirect('/login')
	})
})

module.exports = router