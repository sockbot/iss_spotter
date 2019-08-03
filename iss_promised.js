const request = require('request-promise-native');

const fetchMyIP = function() {
  return request("https://api.ipify.org/?format=json");
}

const fetchCoordsByIP = function(body) {
  const latLong = '{ "data": { "latitude": 49.26200, "longitude": -123.09230 } }';
  const ip = JSON.parse(body).ip;
  // return request("https://ipvigilante.com/" + ip)
  return new Promise((resolve, reject) => {
    resolve(latLong);
  })
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
    // .then(body => console.log(JSON.parse(body)))
}

module.exports = { nextISSTimesForMyLocation };