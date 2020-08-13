var express = require("express");
var bcrypt = require("bcrypt");
var router = express.Router();
var db = require("../models/index");
var userType = require("../enums/usersType");

const authMiddleware = require("../middleware/auth");

/* login user. */
router.post("/login", async (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
	const user = await db.sequelize.models.User.findOne({
		where: {
			username: username,
		},
	});
	if (user !== null) {
		const result = await bcrypt.compare(password, user.password);
		if (result) {
			req.login(user.id, (err) => {
				if (err) console.log(err);
				res.json({ role: user.role });
			});
		}
	}
	if (!res.headersSent)
		return res
			.status("401")
			.json({ error: "login_failed", message: "Login failed" });
});

router.get("/me", async (req, res, next) => {
	if (req.user) return res.json(res.json({ role: req.user.role }));
	res.status("401").json({
		error: "not_authenticated",
		message: "Not authenticated",
	});
});

/* logout user. */
router.post("/logout", async (req, res, next) => {
	req.logout();
	res.json({ success: true });
});

/* register user. */
router.post("/register", async (req, res, next) => {
	const name = req.body.name;
	const username = req.body.username;
	const password = req.body.password;
	const role =
		req.body.role === "admin" ? userType.ADMIN.role : userType.REGULAR.role;
	const user = await db.sequelize.models.User.findOne({
		where: {
			username: username,
		},
	});
	if (user !== null) {
		return res
			.status("409")
			.json({ error: "user_exist", message: "User already exists" });
	}
	const salt = await bcrypt.genSalt(10);
	const hashPass = await bcrypt.hash(password, salt);
	await db.sequelize.models.User.create({
		name: name,
		username: username,
		password: hashPass,
		role: role,
	});
	res.json({ success: true });
});

module.exports = router;
