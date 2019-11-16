var express = require("express");
var router = express.Router();
var User = require("../models/user"); 
var passport= require("passport");

// ==============
// Authenticate route
// ==============

// Register route
router.get("/register", function(req, res) {
	res.render("user/register");
});

router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});

	User.register(newUser, req.body.password, function(err, user) {
		 if(err){
		 	console.log(err);
		 }
		 passport.authenticate("local")(req, res, function(){
		 	res.redirect("/blogs");
		 })
	})
});

// Log In route
router.get("/login", function(req, res) {
	res.render("user/login");
});

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/blogs",
		failureRedirect: "/login"
	}),function(req, res){
});

// Lout Out route
router.get("/logout", function(req, res) {
	req.logout();
	res.redirect("/blogs");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;