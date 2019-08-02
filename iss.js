/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode === 200) {
      let ip = JSON.parse(body).ip;
      callback(null, ip);
      return;
    } else { // assume server error
      const errorMsg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(errorMsg), null);
      return;
    }
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request("https://ipvigilante.com/" + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const errorMsg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      callback(Error(errorMsg), null);
      return;
    } else {
      let coordinates = {};
      let jsonBody = JSON.parse(body);
      coordinates.latitude = jsonBody.data.latitude;
      coordinates.longitude = jsonBody.data.longitude;
      callback(null, coordinates);
      return;
    }
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys latitude and longitude
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
// const fetchISSFlyOverTimes = function(coords, callback) {
//   request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
//     if (error) {
//       callback(error, null);
//       return;
//     } else if (response.statusCode !== 200) {
//       const errorMsg = `Status Code ${response.statusCode} when fetching flyover times. Response: ${body}`;
//       callback(Error(errorMsg), null);
//     } else {
//       const response = JSON.parse(body).response
//       callback(null, response);
//     }
//   })
// }
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };