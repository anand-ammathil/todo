"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Todo extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Todo.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			task: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Todo",
			tableName: "todo",
			timestamps: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return Todo;
};
