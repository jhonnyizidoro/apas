const express = require('express'),
	router = express.Router(),
	{login} = require('../../services/auth')

router.get('/', (req, res) => {
	res.render('admin/login')
	delete req.session.message
	req.session.save()
})

router.get('/logout', (req, res) => {
	delete req.session.user
	req.session.message = 'Logout efetuado com sucesso!'
	req.session.save()
	res.redirect('/autenticacao')
})

router.post('/', (req, res) => {
	login(req.body).then(user => {
		req.session.user = user
		res.redirect('/admin/noticias')
	}).catch(error => {
		req.session.message = error
		res.redirect('/autenticacao')
	})
})

module.exports = router