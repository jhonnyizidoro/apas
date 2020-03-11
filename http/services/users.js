const mysql = require('../db/mysql')

const getUsers = () => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `SELECT * FROM users WHERE status`
	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

module.exports = {
	getUsers,
}