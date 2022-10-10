const express = require('express');
const router = express.Router();
const { users } = require('../models');
const articleController = require('../controllers/articleController');

router.get('/', articleController.index);

router.get('/:id', articleController.show);

router.post('/register', (req, res) => {
	users
		.create({
			// masukin data disini
		})
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			res.json(err.message);
		});
});

router.get('/users', (req, res) => {
	return users.findAll({ include: 'articles' }).then((result) => {
		res.json(result);
	});
});

module.exports = router;
