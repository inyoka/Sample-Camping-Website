var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require("mongoose"),
Campground = require("./models/campground"),
Comment = require("./models/comment"),
seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser : true });
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Schema Setup



app.get('/', function(req, res){
  res.render('landing');
});

// INDEX - Displays list of all campgrounds.

// Images from https://www.photosforclass.com/search?text=camping
app.get('/campgrounds', function(req, res){
    // Get all campgrounds from server.
    Campground.find({}, function(err, allCampgrounds){
      if (err) {
        console.log(err);
      } else {
        res.render('campgrounds/index', {campgrounds:allCampgrounds});
      }
    });
});

// CREATE - Add new campground to DB.

app.post('/campgrounds', function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc}
  //  Create new campground and save to DB.
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      res.redirect("campgrounds/index");
    }
  })
});

// NEW - Displays form for new campground.

app.get('/campgrounds/new', function(req, res){
  res.render('campgrounds/new');
});

// SHOW - Displays info about one campground.
app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

// This differs from the course logging the port and IP being used.
// ... I am running locally not on c9.
// Express 4.x app.listen() is an asynchronous operation, hence the 'var listener'.
var listener = app.listen(3000, '127.0.0.1', function(){
  var address = listener.address().address;
  var port = listener.address().port;

  console.log('YelpCamp server listening on : ' + address + ':' + port);
});
