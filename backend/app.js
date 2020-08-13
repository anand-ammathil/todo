var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
var redis = require("redis");
var rSore = require("connect-redis")(session);
var cors = require("cors");

const indexController = require("./controllers/index");
const authController = require("./controllers/auth");
const todoController = require("./controllers/todo");

const authMiddleware = require("./middleware/auth");

var app = express();

const db = require("./models/index");

let rClient = redis.createClient();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:3000",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	})
);
app.use(express.static(path.join(__dirname, "public")));

app.use(
	session({
		store: new rSore({ client: rClient }),
		secret: "#IxVq7K&^1x6Z#fBN@ni",
		resave: false,
		saveUninitialized: false,
		// cookie: { secure: true },
	})
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user_id, done) => {
	done(null, user_id);
});

passport.deserializeUser(async function (id, done) {
	let user = await db.sequelize.models.User.findOne({
		where: {
			id: id,
		},
	});
	done(null, user);
});

app.use("/", indexController);
app.use("/auth", authController);

//auth route
app.use("/todo", authMiddleware, todoController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
