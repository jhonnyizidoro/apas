const formatDate = date => `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getUTCHours()}:${date.getUTCMinutes()}`

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
}