'use strict';
const { Model } = require('sequelize');
const { users } = require('./index');
module.exports = (sequelize, DataTypes) => {
	class articles extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.users);
		}
	}
	articles.init(
		{
			title: DataTypes.STRING,
			body: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'articles',
		}
	);

	return articles;
};
