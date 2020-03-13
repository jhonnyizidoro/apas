const mysql = require('../db/mysql')

const getPages = params => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `SELECT * FROM pages WHERE status = ${params.status ? db.escape(params.status) : 1} AND content LIKE '%${params.content || ''}%'`
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
			resolve(result || {})
		}
	})
})

const savePage = data => new Promise((resolve, reject) => {
	const db = mysql()
	let query
	if (data.id) {
		query = `UPDATE pages SET name = ${db.escape(data.name)}, content = ${db.escape(data.content)} WHERE id = ${db.escape(data.id)}`
	} else {
		query = `INSERT INTO pages (name, content) VALUE (${db.escape(data.name)}, ${db.escape(data.content)})`
	}
	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

const changePageStatus = id => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `UPDATE pages SET status = !status WHERE id = ${db.escape(id)}`
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
	changePageStatus,
}