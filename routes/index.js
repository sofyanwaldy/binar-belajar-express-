var express = require('express');
var router = express.Router();
const superuser = require('../superuser.json');

/* GET home page. */

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/login', function (req, res, next) {
	res.render('login');
});

router.get('/logout', function (req, res, next) {
	req.session.is_logged_in = false;
	res.send('berhasil logout');
});

router.post('/user/login', function (req, res, next) {
	const { username, password } = req.body;

	if (username === superuser.username && password === superuser.password) {
		req.session.is_logged_in = true;
		return res.redirect('/articles');
	}

	req.session.is_logged_in = false;
	return res.send('username atau password salah');
});

module.exports = router;
