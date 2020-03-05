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

const saveNews = data => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `INSERT INTO news (title, image, content, user_id) VALUES (${db.escape(data.title)}, ${db.escape(data.image)}, ${db.escape(data.content)}, ${db.escape(data.user_id)})`
	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

const changeNewsStatus = id => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `UPDATE news SET status = !status WHERE id = ${db.escape(id)}`
	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

module.exports = {
	getNews,
	saveNews,
	changeNewsStatus,
}