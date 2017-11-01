// require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Path} = require('./models/path');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);

    // Pass to next layer of middleware
    next();
});

app.get('/testpath', (req,res) => {
  var points = [
    {lat: 40.602452, lng: -74.057636},
    {lat: 40.610434, lng: -74.032574},
    {lat: 40.616396, lng: -74.026480},
    {lat: 40.616982, lng: -74.027510},
    {lat: 40.614897, lng: -74.029527},
    {lat: 40.615777, lng: -74.031243},
    {lat: 40.636785, lng: -74.022703},
    {lat: 40.665373, lng: -73.993049}
  ]
  return res.send(points).catch((e) => {
    res.status(400).send();
  });

});


app.post('/newpath', (req,res) => {
  var path = new Path({
    path_name: req.body.path_name
  });

  path.save().then((doc)=>{
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });

});

app.post('/point', (req, res) => {

  var point = req.body.point;

  Path.findOneAndUpdate({"path_name": req.body.path_name}, {$push: {points: point}}).then((path_name) => {
    if (!path_name) {
      return res.status(404).send(`Path with name ${req.body.path_name} not found.`);
    }
    res.send(point);
  }).catch((e) => {
    res.status(400).send();
  })

});

app.get('/path/:path_name', (req,res) => {
  var path_name = req.params.path_name;

  Path.findOne({path_name: path_name}).then((path) => {
    return res.send(JSON.stringify(path.points))
  }).catch((e) => {
    res.status(400).send();
  })

});

app.listen(port, () => {
  console.log(`Started on port: ${port}`);
});

module.exports = {app};
