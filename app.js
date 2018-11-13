var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('landing');
});

// Images from https://www.photosforclass.com/search?text=camping
app.get('/campgrounds', function(req, res){
    var campgrounds = [
      {name: 'Salmons Creek', image: 'https://pixabay.com/get/e83db40e28fd033ed1584d05fb1d4e97e07ee3d21cac104491f2c17daee9b4b9_340.jpg'},
      {name: 'Granite Hill', image: 'https://pixabay.com/get/e83db50a2ff5083ed1584d05fb1d4e97e07ee3d21cac104491f2c17daee9b4b9_340.jpg'},
      {name: "Mountain Goat's Rest", image: 'https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f2c17daee9b4b9_340.jpg'}
    ]
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
  res.send("Campground POST route.");
});

app.get('/campgrounds/new', function(req, res){
  res.render('new.ejs');
});

// This differs from the course logging the port and IP being used.
// ... I am running locally not on c9.
// Express 4.x app.listen() is an asynchronous operation, hence the 'var listener'.
var listener = app.listen(8000, '127.0.0.1', function(){
  var address = listener.address().address;
  var port = listener.address().port;

  console.log('YelpCamp server listening on : ' + address + ':' + port);
});
