const { fetchCoordsByIP, fetchMyIP, fetchISSFlyoverTimes, nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });