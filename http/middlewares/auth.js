const auth = () => (req, res, next) => {
	if (req.session.user) {
		next()
	} else {
		req.session.message = 'Efetue o login para acessar essa página.'
		res.redirect('/autenticacao')
	}
}

module.exports = auth