const express = require('express'),
	router = express.Router(),
	{getUser} = require('../../services/auth'),
	{compareSync} = require('bcryptjs')

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
	getUser(req.body).then(user => {
		if (compareSync(req.body.password, user.password)) {
			req.session.user = user
			res.redirect('/admin/noticias')
		} else {
			req.session.message = 'Não encontramos nenhum usuário com essas credenciais.'
			res.redirect('/autenticacao')
		}
	}).catch(error => {
		req.session.message = error
		res.redirect('/autenticacao')
	})
})

module.exports = router