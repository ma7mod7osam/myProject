const axios = require('axios');
const fs = require('fs');

const getWeather = (city) => {
  var encodedCity = encodeURIComponent(city);
  var geoCodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedCity}`;

  axios.get(geoCodeUrl).then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address .. Please try again');
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/8f0878b56e253dc63ed108154a69bc9b/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  }).then((response) => {
    var summary = response.data.currently.summary;
    var feelsLike = ((response.data.currently.apparentTemperature)-32)/1.8;
    var icon = response.data.currently.icon;
    var tempreture = ((response.data.currently.temperature)-32)/1.8;
    var pressure  = response.data.currently.pressure;
    var windSpeed = response.data.currently.windSpeed;
    fs.appendFile('weather.json', `{
      "summary": "${summary}",
      "feelsLike": ${feelsLike},
      "icon": "${icon}",
      "tempreture": ${tempreture},
      "pressure": ${pressure},
      "windSpeed": ${windSpeed}
    }`
    );
    console.log(`it's currently : ${tempreture} C and it feels like : ${feelsLike} C `);
  }).catch((e) => {
    if(e.code === 'ENOTFOUND') {
      console.log('Sorry .. Unable to connect with Google servers');
    } else {
      console.log(e.message);
    }

  });
}

module.exports = {
  getWeather
}
