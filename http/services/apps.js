const mysql = require('../db/mysql')

const getApp = () => new Promise((resolve, reject) => {
	const db = mysql()
	const query = 'SELECT * FROM apps'
	db.query(query, (error, [result]) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

const saveApp = data => new Promise((resolve, reject) => {
	const db = mysql()
	let query
	if (data.instagram_token !== undefined && data.google_maps_iframe !== undefined) {
		query = `UPDATE apps SET instagram_token = ${db.escape(data.instagram_token)}, google_maps_iframe = ${db.escape(data.google_maps_iframe)}, logo = ${data.logo ? db.escape(data.logo) : 'logo'} WHERE id = 1`
	} else {
		query = `UPDATE apps SET facebook = ${db.escape(data.facebook)}, instagram = ${db.escape(data.instagram)}, address = ${db.escape(data.address)}, business_hours = ${db.escape(data.business_hours)} WHERE id = 1`
	}
	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

module.exports = {
	getApp,
	saveApp,
}