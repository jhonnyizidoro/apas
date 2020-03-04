const auth = require('./admin/auth'),
	error = require('./error/error'),
	news = require('./admin/news'),
	upload = require('./admin/upload')

module.exports = app => {
	app.use('/autenticacao', auth)
	app.use('/admin/noticias', news)
	app.use('/admin/upload', upload)
	app.use('*', error)
}