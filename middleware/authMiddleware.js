const authMiddleware = (req, res, next) => {
	if (!req.session.is_logged_in) {
		return res.redirect('/login');
	}
	next();
};

module.exports = authMiddleware;
