const mysql = require('../db/mysql')

const getPages = () => new Promise((resolve, reject) => {
	const db = mysql()
	const query = 'SELECT * FROM pages'
	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

module.exports = {
	getPages,
}