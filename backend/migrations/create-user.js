"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("user", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING(200),
				allowNull: false,
			},
			username: {
				type: Sequelize.STRING(100),
				primaryKey: true,
			},
			password: {
				type: Sequelize.TEXT,
			},
			role: {
				type: Sequelize.STRING(20),
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("user");
	},
};
