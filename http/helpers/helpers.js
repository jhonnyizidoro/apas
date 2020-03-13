const {hashSync} = require('bcryptjs')

const getParam = param => new URL(url).searchParams.get(param)

const bcrypt = password => {
	const encrypted = {}
	encrypted.text = password || Math.random().toString(36).substring(6)
	encrypted.hash = hashSync(encrypted.text, 8)
	return encrypted
}

const formatDate = date => {
	const formatted = {
		day: `0${date.getDate()}`.slice(-2),
		month: `0${date.getMonth() + 1}`.slice(-2),
		year: date.getFullYear(),
		hours: `0${date.getUTCHours()}`.slice(-2),
		minutes: `0${date.getUTCMinutes()}`.slice(-2),
	}
	return `${formatted.day}/${formatted.month}/${formatted.year} - ${formatted.hours}:${formatted.minutes}`
}
const textPreview = string => {
	const stripped = string.replace(/<[^>]*>/g, '').slice(0, 300)
	return string.length > 300 ? `${stripped}...` : stripped
}

const getSchemaJSON = () => {
	return `
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "${APP_NAME}",
			"legalName": "${APP_NAME}",
			"url": "${host}",
			"logo": "${host}/favicon/android-chrome-512x512.png",
			"foundingDate": "1970",
			"founders": [
				{
					"@type": "Person",
					"name": "Associação Privada"
				}
			],
			"address": {
				"@type": "PostalAddress",
				"streetAddress": "${LOCATION.ADDRESS}",
				"addressLocality": "${LOCATION.CITY}",
				"addressRegion": "${LOCATION.STATE}",
				"postalCode": "${LOCATION.POSTAL_CODE}",
				"addressCountry": "BRA"
			},
			"contactPoint": {
				"@type": "ContactPoint",
				"contactType": "customer support",
				"telephone": "+55 ${TELEPHONE}",
				"email": "${EMAIL}"
			},
			"sameAs": [
				"https://www.facebook.com/${FACEBOOK}"
			]
		}
	`
}

module.exports = {
	getSchemaJSON,
	formatDate,
	textPreview,
	getParam,
	bcrypt,
}