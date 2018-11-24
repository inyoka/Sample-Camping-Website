var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser : true });
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// Schema Setup

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.get('/', function(req, res){
  res.render('landing');
});

// Images from https://www.photosforclass.com/search?text=camping
app.get('/campgrounds', function(req, res){
    // Get all campgrounds from server.
    Campground.find({}, function(err, allCampgrounds){
      if (err) {
        console.log(err);
      } else {
        res.render('campgrounds', {campgrounds:allCampgrounds});
      }
    });
});

app.post('/campgrounds', function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image}
  //  Create new campground and save to DB.
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  })
});

app.get('/campgrounds/new', function(req, res){
  res.render('new');
});

// This differs from the course logging the port and IP being used.
// ... I am running locally not on c9.
// Express 4.x app.listen() is an asynchronous operation, hence the 'var listener'.
var listener = app.listen(3000, '127.0.0.1', function(){
  var address = listener.address().address;
  var port = listener.address().port;

  console.log('YelpCamp server listening on : ' + address + ':' + port);
});
