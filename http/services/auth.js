const mysql = require('../db/mysql')

const login = data => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `SELECT * FROM users WHERE email = ${db.escape(data.email)} AND password = ${db.escape(data.password)}`
	db.query(query, (error, [result]) => {
		if (error) {
			reject(error.sqlMessage)
		} else if (!result) {
			reject('Não encontramos nenhum usuário com essas credenciais.')
		} else {
			resolve(result)
		}
	})
})

module.exports = {
	login,
}