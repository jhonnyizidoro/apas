const express = require('express'),
	router = express.Router(),
	auth = require('../../middlewares/auth'),
	{getUsers, saveUser, changeUserProfile, changeUserPassword, changeUserStatus} = require('../../services/users')

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

router.post('/', auth(), (req, res) => {
	const password = Math.random().toString(36).substring(6)
	const data = {
		password,
		email: req.body.email,
		admin: req.body.admin,
	}
	saveUser(data).then(() => {
		req.session.message = `Usuário inserido. Senha de acesso: ${password}`
		res.redirect('/admin/usuarios')
	}).catch(error => {
		req.session.message = error
		res.redirect('/admin/usuarios')
	})
})

router.get('/perfil/:id', auth(), (req, res) => {
	changeUserProfile(req.params.id).then(() => {
		req.session.message = 'Perfil alterado com sucesso.'
		res.redirect('/admin/usuarios')
	}).catch(error => {
		req.session.message = error
		res.redirect('/admin/usuarios')
	})
})

router.get('/senha/:id', auth(), (req, res) => {
	const password = Math.random().toString(36).substring(6)
	const data = {
		password,
		id: req.params.id
	}
	changeUserPassword(data).then(() => {
		req.session.message = `Senha atualizada com sucesso: ${password}`
		res.redirect('/admin/usuarios')
	}).catch(error => {
		req.session.message = error
		res.redirect('/admin/usuarios')
	})
})

router.get('/status/:id', auth(), (req, res) => {
	changeUserStatus(req.params.id).then(() => {
		req.session.message = 'Status do usuário alterado com sucesso.'
		res.redirect('/admin/usuarios')
	}).catch(error => {
		req.session.message = error
		res.redirect('/admin/usuarios')
	})
})

module.exports = router