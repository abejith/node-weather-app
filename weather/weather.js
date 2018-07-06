const request = require('request');
const dotenv = require('dotenv');

dotenv.config();

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.forecast.io/forecast/${process.env.DARK_SKY_KEY}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io server.');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
};

module.exports.getWeather = getWeather;
