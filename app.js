var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

var campgrounds = [
    {name: 'Salmons Creek', image: 'https://cdn.vox-cdn.com/thumbor/1j72cfH6ka3baNiIvbstiHQbnfo=/0x0:5225x3479/920x613/filters:focal(2195x1322:3031x2158):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg'},
    {name: 'Granite Hill', image: 'https://s3.amazonaws.com/imagescloud/images/medias/reservation/camping/main.jpg'},
    {name: "Mountain Goat's Rest", image: 'https://media.timeout.com/images/105160998/1024/576/image.jpg'},
    {name: "Mountain Goat's Rest", image: 'https://media.timeout.com/images/105160998/1024/576/image.jpg'},
    {name: 'Salmons Creek', image: 'https://cdn.vox-cdn.com/thumbor/1j72cfH6ka3baNiIvbstiHQbnfo=/0x0:5225x3479/920x613/filters:focal(2195x1322:3031x2158):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg'},
    {name: 'Granite Hill', image: 'https://s3.amazonaws.com/imagescloud/images/medias/reservation/camping/main.jpg'}
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
var listener = app.listen(8000, '127.0.0.1', function(){
  var address = listener.address().address;
  var port = listener.address().port;

  console.log('YelpCamp server listening on : ' + address + ':' + port);
});
