// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((err, passTimes) => {
  if (err) {
    return console.log('It didn\'t work!', err);
  }
  for (let i = 0; i < passTimes.length; i++) {
    printPassTime(passTimes[i]);
  }
})

const printPassTime = function(passTime) {
  let d = new Date(0)
  d.setUTCSeconds(passTime.risetime);
  // console.log(passTime.risetime, passTime.duration)
  console.log(`Next pass is at ${d} for ${passTime.duration} seconds.`)
}