const express = require('express'),
	router = express.Router(),
	{getUserByEmail, updateUserPassword} = require('../../services/users'),
	{compareSync, hashSync} = require('bcryptjs'),
	auth = require('../../middlewares/auth')

router.get('/', (req, res) => {
	res.render('admin/login')
	delete req.session.message
	req.session.save()
})

router.get('/logout', auth(), (req, res) => {
	delete req.session.user
	req.session.message = 'Logout efetuado com sucesso!'
	req.session.save()
	res.redirect('/autenticacao')
})

router.post('/', (req, res) => {
	getUserByEmail(req.body.email).then(user => {
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

router.post('/senha', auth(), (req, res) => {
	if (req.body.password !== req.body.password_confirmation) {
		req.session.message = 'As senhas não coincidem.'
		res.redirect('back')
	} else {
		const password = hashSync(req.body.password, 8)
		const data = {
			password,
			id: req.session.user.id
		}
		updateUserPassword(data).then(() => {
			req.session.message = 'Senha atualizada com sucesso.'
			res.redirect('back')
		}).catch(error => {
			req.session.message = error
			res.redirect('/autenticacao')
		})
	}
})

module.exports = router