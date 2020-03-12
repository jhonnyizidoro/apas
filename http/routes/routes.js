const auth = require('./admin/auth'),
	error = require('./error/error'),
	news = require('./admin/news'),
	upload = require('./admin/upload'),
	contact = require('./admin/contact'),
	users = require('./admin/users'),
	pages = require('./admin/pages'),
	config = require('./admin/config')

module.exports = app => {
	app.use('/autenticacao', auth)
	app.use('/admin/noticias', news)
	app.use('/admin/upload', upload)
	app.use('/admin/contato', contact)
	app.use('/admin/usuarios', users)
	app.use('/admin/paginas', pages)
	app.use('/admin/configuracoes', config)
	app.use('*', error)
}