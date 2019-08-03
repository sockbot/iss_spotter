const request = require('request-promise-native');

const fetchMyIP = function() {
  let options = { 
    uri: "https://api.ipify.org/?format=json",
    resolveWithFullResponse:  true
  }
  return request(options);
}

const fetchCoordsByIP = function(req) {
  console.log(req.body);
  const ip = JSON.parse(req.body).ip;
  return request("https://ipvigilante.com/" + ip)
  // return request("https://ipvigilante.com/" + '192.168.1.1');
  // const latLong = '{ "data": { "latitude": 49.26200, "longitude": -123.09230 } }';
  // return new Promise((resolve, reject) => {
  //   resolve(latLong);
  // })
};

const fetchISSFlyOverTimes = function(body) {
  // console.log(typeof body)
  let coords = {}
  const jsonString = JSON.parse(body);
  // console.log(typeof jsonString);
  coords.latitude = jsonString.data.latitude;
  coords.longitude = jsonString.data.longitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`)
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  // .catch((err) => {
  //   console.log('Error:', err.statusCode)
  // })
  // .then(body => console.log(JSON.parse(body)))
}

module.exports = { nextISSTimesForMyLocation };