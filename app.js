var passportLocalMongoose = require("passport-local-mongoose");
var methodOverride = require("method-override");
var LocalStrategy = require("passport-local");
var bodyParser = require("body-parser");
var passport = require("passport");
var mongoose = require("mongoose");
var express = require("express");
var app = express();

var Comment = require("./models/comment");
var Post = require("./models/post");
var User = require("./models/user");

var commentRoutes = require("./route/comments.js");
var indexRoutes = require("./route/index.js");
var postsRoutes = require("./route/posts.js");

// ================
// SET UP
// ================
//mongoose.connect("mongodb://localhost/blog");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// ================
// AUTHENTICATION
// ================
app.use(require("express-session")({
	secret: "This is the secret",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

// ================
// ROUTES
// ================
app.get("/", function(req, res) {
	res.redirect("/blogs");
});

app.use(indexRoutes);
app.use("/blogs", postsRoutes);
app.use("/blogs/:id/comments", commentRoutes); 

app.listen("3000", function() {
	console.log("App is running");
});