var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            req.flash("error", "Campground was not found.");
            res.redirect("back");
        } else {
            if(foundCampground.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "Please ask Campground owner to do this.");
                res.redirect("back");
            }
        }
        });
    } else {
        req.flash("error", "Please login first.");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err) {
            res.redirect("back");
        } else {
            if(foundComment.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "Only the comment owner can do that.");
                res.redirect("back");
            }
        }
        });
    } else {
        req.flash("error", "Please login first.");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first!!");
    res.redirect("/login");
}

module.exports = middlewareObj