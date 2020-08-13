const auth = function (req, res, next) {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status("401").json({
			error: "auth_failed",
			message: "Authentication failed.",
		});
	}
};

module.exports = auth;
