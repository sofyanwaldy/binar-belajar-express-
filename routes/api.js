const express = require('express');
const router = express.Router();
const { updateArticleById, insertArticle, deleteArticleById, getArticles } = require('../controllers/articleController');

router.get('/articles', (req, res) => {
	return getArticles({ offset: 0, limit: 10, order: [] }).then((result) => {
		return res.json(result);
	});
});
router.put('/articles', (req, res) => {
	return updateArticleById(); // logic
});
// router.post('/articles', insertArticle);
// router.delete('/articles/', deleteArticleById);

module.exports = router;
