var userType = require("../enums/usersType");

const role = function (req, res, next, role) {
	console.log("role checking...");
	const user = req.user;
	if (userType[user.role].priority >= role.priority) next();
	else
		res.status("401").json({
			error: "permission_denied",
			message: "Permission denied.",
		});
};

module.exports = role;
