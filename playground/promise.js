const request = require('request');
var geocodeAddress = (city) => {
  return new Promise ((resolve, reject) => {
    var encodedCity = encodeURIComponent(city);
    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedCity}`,
        json: true
    }, (error, response, body) => {
      if(body.status === 'OK'){
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      } else if(body.status === 'ZERO_RESULTS') {
        reject('sorry .. there is No City with That Name');
      } else {
        reject('Sorry ... There is an error with Google service');
      }
      });
  });
}

geocodeAddress('sanaa').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});
