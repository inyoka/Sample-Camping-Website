var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

var campgrounds = [
    {name: 'Salmons Creek', image: 'imgs/camp-01.jpg'},
    {name: 'Granite Hill', image: 'imgs/camp-02.jpg'},
    {name: "Mountain Goat's Rest", image: 'imgs/camp-03.jpg'},
    {name: "Canoe Pass", image: 'imgs/camp-04.jpg'},
    {name: 'Family Camping', image: 'imgs/camp-05.jpg'},
    {name: 'Cabin Life', image: 'imgs/camp-06.jpg'},
    {name: 'Lake View', image: 'imgs/camp-07.jpg'},
    {name: 'Hammock Hill', image: 'imgs/camp-08.jpg'},
    {name: 'Stary Night Campsite', image: 'imgs/camp-09.jpg'},
    {name: 'Campfire Beech', image: 'imgs/camp-10.jpg'}
  ];

app.get('/', function(req, res){
  res.render('landing');
});

// Images from https://www.photosforclass.com/search?text=camping
app.get('/campgrounds', function(req, res){

    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image}
  campgrounds.push(newCampground);
  res.redirect('/campgrounds');
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
