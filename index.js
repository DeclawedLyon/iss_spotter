const {fetchMyIP, fetchCoordsByIP, fetchISSFlyoverTimes, nextISSTimesForMyLocation} = require('./iss');

// fetchMyIP((error, IP) => {
//   if (error) {
//     console.log("Something went wrong...", error);
//     return;
//   }
//   console.log("Your IP address is: ", IP);
// })

// console.log(fetchCoordsByIP("66.222.190.35", (error, coords) => {
//   console.log(error)
//   console.log(coords)
// }))

// const coords = { latitude: 50.7358, longitude: -113.9659 }
// console.log(fetchISSFlyoverTimes(coords, (error, data) => {
//   console.log(data);
//   console.log(error)
// }))

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});
