const mysql = require('../db/mysql')

const getUserByEmail = email => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `SELECT * FROM users WHERE email = ${db.escape(email)}`
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

const getUsers = params => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `SELECT * FROM users WHERE status = ${params.status ? db.escape(params.status) : 1} AND email LIKE '%${params.email || ''}%'  ORDER BY id DESC`
	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

const saveUser = data => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `INSERT INTO users (email, password, admin) VALUES (${db.escape(data.email)}, ${db.escape(data.password)}, ${db.escape(data.admin)})`
	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

const changeUserProfile = id => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `UPDATE users SET admin = !admin WHERE id = ${db.escape(id)}`
	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

const changeUserPassword = data => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `UPDATE users SET password = ${db.escape(data.password)} WHERE id = ${db.escape(data.id)}`
	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

const changeUserStatus = id => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `UPDATE users SET status = !status WHERE id = ${db.escape(id)}`
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
	saveUser,
	changeUserProfile,
	changeUserStatus,
	changeUserPassword,
	getUserByEmail,
}