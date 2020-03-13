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

const getBanners = () => new Promise((resolve, reject) => {
	const db = mysql()
	const query = 'SELECT * FROM banners'

	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

const saveBanners = data => new Promise((resolve, reject) => {
	const db = mysql()

	if (!Array.isArray(data.id)) {
		data.link = [data.link]
		data.id = [data.id]
	}

	let query = `DELETE FROM banners WHERE id NOT IN (${db.escape(data.id)});`

	data.id.forEach(id => {
		query += `UPDATE banners SET link = ${db.escape(data.link[0])} WHERE id = ${db.escape(id)};`
		data.link.shift()
	})

	if (data.image) {
		data.image.forEach((image, index) => query += `INSERT INTO banners (image, link) VALUES (${db.escape(image)}, ${db.escape(data.link[index])});`)
	}

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
	const query = `UPDATE apps SET instagram_token = ${db.escape(data.instagram_token)}, google_maps_iframe = ${db.escape(data.google_maps_iframe)}, logo = ${data.logo ? db.escape(data.logo) : 'logo'} WHERE id = 1`
	db.query(query, (error, result) => {
		if (error) {
			reject(error.sqlMessage)
		} else {
			resolve(result)
		}
	})
})

module.exports = {
	getBanners,
	getApp,
	saveApp,
	saveBanners,
}