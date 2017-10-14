const express = require('express');
const hbs = require('hbs');

const port = 4000;

const app = express();

app.set('view engine', 'hbs');

app.get('/', (req,res) => {

  res.render('home.hbs', {
    pageTitle: 'PathMapper',
    path: "testpath"
  });


});

app.get('/path/:path_name', (req,res) => {
  var path_name = req.params.path_name;
  console.log(path_name);

  res.render('home.hbs', {
    pageTitle: 'PathMapper',
    path: path_name
  });

});

app.listen(port, () => {
  console.log(`Started on port: ${port}`);
});
