const { articles } = require('../models');

const controllerArticles = {
	getArticles({ offset, limit, order }) {
		return articles.findAll({
			offset: offset || 0,
			limit: limit || 10,
			order: order || [],
		});
	},
	updateArticleById(id, data) {
		return articles
			.update(data, { where: { id } })
			.then((result) => {
				return {
					message: 'berhasil update article',
				};
			})
			.catch((err) => {
				return {
					message: err.message,
				};
			});
	},
	insertArticle(data) {
		return articles
			.create(data)
			.then((result) => {
				return {
					message: 'berhasil create article',
				};
			})
			.catch((err) => {
				return {
					message: err.message,
				};
			});
	},
	deleteArticleById(id) {
		return articles
			.destroy({ where: { id } })
			.then(() => {
				return {
					message: 'berhasil delete article',
				};
			})
			.catch((err) => {
				return {
					message: err.message,
				};
			});
	},
};

module.exports = controllerArticles;
