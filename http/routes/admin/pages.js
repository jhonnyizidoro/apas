const express = require('express'),
	router = express.Router(),
	auth = require('../../middlewares/auth'),
	{getPages, getPage, savePage, changePageStatus} = require('../../services/pages')

router.get('/', auth(), (req, res) => {
	getPages(req.query).then(pages => {
		res.render('admin/pages', {
			pages,
		})
	}).catch(error => {
		req.session.message = error
		res.redirect('back')
	}).finally(() => {
		delete req.session.message
		req.session.save()
	})
})

router.get('/formulario/:id?', auth(), (req, res) => {
	getPage(req.params.id).then(page => {
		res.render('admin/pagesForm', {
			page,
		})
	}).catch(error => {
		req.session.message = error
		res.redirect('back')
	}).finally(() => {
		delete req.session.message
		req.session.save()
	})
})

router.post('/formulario', auth(), (req, res) => {
	savePage(req.body).then(() => {
		req.session.message = 'Página salva com sucesso.'
		res.redirect('/admin/paginas')
	}).catch(error => {
		req.session.message = error
		res.redirect('/admin/paginas')
	})
})

router.get('/status/:id', auth(), (req, res) => {
	changePageStatus(req.params.id).then(() => {
		req.session.message = 'Status alterado com sucesso.'
		res.redirect('/admin/paginas')
	}).catch(error => {
		req.session.message = error
		res.redirect('/admin/paginas')
	})
})

module.exports = router