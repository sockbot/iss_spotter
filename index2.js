const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then(passTimes => {
    printPassTimes(passTimes);
  })

const printPassTimes = function(data) {
  const passTimes = JSON.parse(data).response;
  // console.log(risetimes);
  for (let pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    // console.log(datetime);
    console.log(`Next pass at ${datetime} for ${duration} seconds!`)
  }
}