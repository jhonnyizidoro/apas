const login = require('./login/login'),
	error = require('./error/error')

module.exports = app => {
	app.use('/login', login)
	app.use('*', error)
}