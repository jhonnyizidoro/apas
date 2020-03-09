const mysql = require('../db/mysql')

const getApp = () => new Promise((resolve, reject) => {
	const db = mysql()
	const query = 'SELECT * FROM apps'

	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result[0])
		}
	})
})

const getPhones = () => new Promise((resolve, reject) => {
	const db = mysql()
	const query = 'SELECT * FROM phones'

	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

module.exports = {
	getPhones,
	getApp,
}