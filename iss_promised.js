const request = require('request-promise-native');

const fetchMyIP = function() {
  return request("https://api.ipify.org/?format=json");
}

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request("https://ipvigilante.com/" + ip)
};

const fetchISSFlyOverTimes = function(body) {
  const jsonString = JSON.parse(body);
  let coords = {}
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