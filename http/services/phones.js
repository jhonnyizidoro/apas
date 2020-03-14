const mysql = require('../db/mysql')

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
	let query = 'TRUNCATE phones;'

	if (!Array.isArray(data.phone)) {
		data.phone = [data.phone]
		data.type = [data.type]
	}

	data.phone.forEach((number, index) => query += `INSERT INTO phones (type, number) VALUES (${db.escape(data.type[index])}, ${db.escape(number)});`)

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
	savePhones,
}