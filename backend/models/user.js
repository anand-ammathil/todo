"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING(100),
				primaryKey: true,
			},
			password: {
				type: DataTypes.TEXT,
			},
			role: {
				type: DataTypes.STRING(20),
			},
		},
		{
			sequelize,
			modelName: "User",
			tableName: "user",
			timestamps: true,
			createdAt: "created_at",
			updatedAt: "updated_at",
		}
	);
	return User;
};
