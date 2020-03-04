const mysql = require('../db/mysql')

const getNews = () => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `SELECT * FROM news ORDER BY id DESC`
	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

module.exports = {
	getNews ,
}