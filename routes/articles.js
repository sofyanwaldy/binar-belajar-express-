const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { articles } = require('../models');
const { updateArticleById, insertArticle, deleteArticleById } = require('../controllers/articleController');

// router.use(authMiddleware);

router.get('/', async (req, res) => {
	const page = req.query.page || 1;
	const limit = req.query.limit || 10;
	const offset = page > 1 ? (page - 1) * limit : 0;

	const results = await articles.findAll({
		offset,
		limit,
		order: [['updatedAt', 'DESC']],
	});
	res.json(results);
	// res.render('articles/list', { results });
});

router.get('/create', function (req, res, next) {
	res.render('articles/create', { id: null });
});

router.get('/:id/update', function (req, res, next) {
	res.render('articles/create', {
		id: req.params.id,
	});
});

/**
 * @deprecated
 */
router.post('/:id', async function (req, res) {
	const { title, body } = req.body;
	const update = await articles.update(
		{
			title,
			body,
		},
		{
			where: { id: req.params.id },
		}
	);

	if (update) {
		return res.send('data berhasil diperbaharui');
	}
	return res.send('data gagal di perbaharui');
});

/**
 * Monolith
 */
router.post('/', async (req, res) => {
	const { title, body, id, method } = req.body;

	if (method === 'PUT') {
		return updateArticleById(id, { title, body }).then((result) => {
			res.json(result);
		});
	}

	if (method === 'DELETE') {
		return deleteArticleById(id).then((result) => {
			res.json(result);
		});
	}

	return insertArticle({ title, body }).then((result) => {
		res.json(result);
	});
});

module.exports = router;
