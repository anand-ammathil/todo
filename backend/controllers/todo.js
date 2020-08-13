var express = require("express");
var router = express.Router();
var db = require("../models/index");
var roleCheck = require("../middleware/role");
var userType = require("../enums/usersType");

/* Get todo listing. */
router.get(
	"/",
	(req, res, next) => {
		roleCheck(req, res, next, userType.REGULAR);
	},
	async (req, res, next) => {
		const todos = await db.sequelize.models.Todo.findAll();
		res.json(todos);
	}
);

/* Create new todo. */
router.post(
	"/",
	(req, res, next) => {
		roleCheck(req, res, next, userType.ADMIN);
	},
	async (req, res, next) => {
		const todos = await db.sequelize.models.Todo.create({
			task: req.body.task,
		});
		res.json(todos);
	}
);

/* Update todo. */
router.put(
	"/:id",
	(req, res, next) => {
		roleCheck(req, res, next, userType.ADMIN);
	},
	async (req, res, next) => {
		await db.sequelize.models.Todo.update(
			{
				task: req.body.task,
			},
			{
				where: {
					id: req.params.id,
				},
			}
		);
		const todos = await db.sequelize.models.Todo.findOne({
			where: { id: req.params.id },
		});
		if (todos === null)
			return res.status("404").send({
				error: "not_found",
				message: "Item not found.",
			});
		return res.json(todos);
	}
);

/* Delete todo. */
router.delete(
	"/:id",
	(req, res, next) => {
		roleCheck(req, res, next, userType.ADMIN);
	},
	async (req, res, next) => {
		const deleted = await db.sequelize.models.Todo.destroy({
			where: { id: req.params.id },
		});
		if (deleted === 0)
			return res.status("404").send({
				error: "not_found",
				message: "Item not found.",
			});
		return res.json({ success: true });
	}
);

module.exports = router;
