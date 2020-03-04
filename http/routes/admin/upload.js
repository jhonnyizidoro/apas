const express = require('express'),
	router = express.Router(),
	auth = require('../../middlewares/auth'),
	{uploadImage} = require('../../services/image')

router.post('/', (req, res) => {
	const path = uploadImage(req.files.file)
	res.send(path)
})

module.exports = router