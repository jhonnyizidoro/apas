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

const getPage = id => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `SELECT * FROM pages WHERE id = ${db.escape(id)}`
	db.query(query, (error, [result]) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

const savePage = data => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `UPDATE pages SET name = ${db.escape(data.name)}, content = ${db.escape(data.content)} WHERE id = ${db.escape(data.id)}`
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
	getPage,
	savePage,
}