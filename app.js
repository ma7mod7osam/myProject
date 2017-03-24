const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const h = require('./app/helper');
const hbs = require('hbs');
const fs = require('fs');


app.set('port',process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
    console.log('Sorry .. Unable to append to server.log ');
    }
  });
  next();
});
hbs.registerPartials(__dirname + '/views/partials');
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

  app.get('/', (req, res) => {
    res.render('home');
  });
  app.post('/', (req, res) => {
    var city = req.body.city;
    h.getWeather(city);
    res.redirect('/weather');
  });
  app.get('/weather', (req, res) => {
    res.render('weather');
  });

 app.listen(app.get('port'), () => {
   console.log("app Running on port : ", app.get('port'));
});
