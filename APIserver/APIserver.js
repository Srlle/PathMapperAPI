require('./config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {Path} = require('./models/path');
const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());

// DATA STRUCTURE
// USER_Schema
// TRACK_Schema:
// User_field: user_id [string]
// Points_field: [(lon,lat), (lon,lat)]


// MobApp sends POST request to /point route (lon, lat)

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

  Path.findOneAndUpdate(req.body.path_name, {$push: {points: point}}).then((path_name) => {
    if (!path_name) {
      return res.status(404).send(`Run with name ${req.body.path_name} not found.`);
    }
    res.send(point);
  }).catch((e) => {
    res.status(400).send();
  })

});

app.get('/path/:path_name', (req,res) => {
  var path_name = req.params.path_name;

  Path.findOne({path_name: path_name}).then((path) => {
    return res.send(path.points)
  }).catch((e) => {
    res.status(400).send();
  })

});

app.listen(port, () => {
  console.log(`Started on port: ${port}`);
});

module.exports = {app};
