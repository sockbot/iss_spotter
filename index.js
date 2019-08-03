const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP( (error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("typeof ip:", typeof ip)
  console.log("It worked! Returned IP:", ip);
})

fetchCoordsByIP("162.245.144.188", (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});

3
fetchISSFlyOverTimes(latLong, (error, data) => {
  console.log(error);
  console.log(data);
})

// const printPassTimes = fucntion(passTimes) {
// }