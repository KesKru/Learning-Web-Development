const express = require("express");
const router = express.Router();
// const app = express();
//Put everything on router variable instead of app and export it.
const Campground = require("../models/campground");

//// CAMPGROUNDS ROUTES

//INDEX - display all campgrounds
router.get("/campgrounds", function (req, res) {
    Campground.find({},
        function (err, allcampgrounds) {
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/index", { campgrounds: allcampgrounds, currentUser: req.user });
            }
        });
});

//NEW - show form to create new campground
router.get("/campgrounds/new", isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

//CREATE - add new campground to database
router.post("/campgrounds", isLoggedIn, function (req, res) {
    Campground.create(req.body.newCampground,
        function (err, campground) {
            if (err) {
                console.log(err);
            } else {
                campground.author.id = req.user._id;
                campground.author.username = req.user.username;
                campground.save();
                console.log(campground);
            }
        });
    res.redirect("/campgrounds");
});

// <--------------------------

//SHOW - show all info about a campground 
router.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(
        function (err, oneCampground) {
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/show", { oneCampground: oneCampground });
            }
        });
});

// ISLOGGEDIN MIDDLEWERE
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;
