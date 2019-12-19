var express = require("express");
var router = express.Router();
var Post = require("../models/post"); 

// ==============
// Post route
// ==============

router.get("/", isLoggedIn, function(req, res) {
	console.log(Post.find());
	Post.find({}, function(err, posts){
		if(err) {
			console.log(err);
			console.log("Error in comment default route");
		} else {

			res.render("posts/index", {posts: posts});
		}
	})
});

// NEW route
router.get("/new", function(req, res) {
	res.render("posts/new");
});

// CREATE route
router.post("/", function(req, res) {
	//var name = req.body.name;
	//var desc = req.body.

	console.log(req.user);

	Post.create(req.body.blog, function(err, newBlog) {
		if(err) {
			console.log(err);
			console.log("Error in post create route");
			res.render("posts/new");
		} else {
			res.redirect("/blogs");
		}
	});
});

// SHOW route
router.get("/:id", function(req, res){
	Post.findById(req.params.id).populate("comments").exec(function(err, foundPost) {
		if(err) {
			console.log(err);
			console.log("Error in post show route");
			res.redirect("/blogs");
		} else {
			res.render("posts/show", {post:foundPost});
		}
	});
});

// EDIT route
router.get("/:id/edit", function(req, res){
	Post.findById(req.params.id, function(err, foundPost) {
		if(err){
			console.log(err);
			console.log("Error in post edit route");
			res.redirect("/blogs");
		} else {
			res.render("posts/edit", {post:foundPost});
		}
	});
});

// UPDATE route
router.put("/:id", function(req, res) {
	Post.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedPost){
		if(err){
			console.log(err);
			console.log("Error in post update route");
			res.redirect("/blogs");
		} else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

// DELETE route
router.delete("/:id", function(req, res) {
	Post.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			console.log(err);
			console.log("Error in post delete route");
			res.redirect("/blogs");
		} else {
			res.redirect("/blogs");
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