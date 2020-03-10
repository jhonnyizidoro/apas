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

const savePhones = data => new Promise((resolve, reject) => {
	const db = mysql()
	let query = 'TRUNCATE phones; REPLACE INTO phones (type, number) VALUES'

	if (!Array.isArray(data.phone)) {
		data.phone = [data.phone]
		data.type = [data.type]
	}

	data.phone.forEach((number, index) => query += ` (${db.escape(data.type[index])}, ${db.escape(number)}),`)
	query = query.slice(0, -1)

	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})

})

const saveApp = data => new Promise((resolve, reject) => {
	const db = mysql()
	const query = `UPDATE apps SET facebook = ${db.escape(data.facebook)}, instagram = ${db.escape(data.instagram)}, address = ${db.escape(data.address)}, business_hours = ${db.escape(data.business_hours)} WHERE id = 1`
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
	savePhones,
	saveApp,
}