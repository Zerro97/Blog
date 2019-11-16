var express = require("express");
var router = express.Router({mergeParams: true});
var Post = require("../models/post"); 
var Comment = require("../models/comment"); 

// ==============
// Comment route
// ==============

// NEW route
router.get("/new", isLoggedIn, function(req, res){
	Post.findById(req.params.id, function(err, post) {
		if(err){
			console.log(err);
			console.log("Error in comment new route");
			res.redirect("/blogs");
		} else {
			res.render("comments/new", {post:post});
		}
	});
});

// Create route
router.post("/", isLoggedIn, function(req, res){
	Post.findById(req.params.id, function(err, post){
		if(err){
			console.log(err);
			console.log("Error in comment create route");
			res.redirect("/blogs");
		} else {
			Comment.create(req.body.comment, function(err, comment) {
				if(err){
					console.log(err);
					console.log("Error in comment create route");
					res.redirect("/blogs");
				} else {
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();

					post.comments.push(comment);
					post.save();
					res.redirect("/blogs/" + post._id);
				}
			});
		}
	});
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;