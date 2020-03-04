const auth = require('./admin/auth'),
	error = require('./error/error'),
	news = require('./admin/news')

module.exports = app => {
	app.use('/autenticacao', auth)
	app.use('/admin/noticias', news)
	app.use('*', error)
}