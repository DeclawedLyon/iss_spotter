const request = require("request");
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    const IP = JSON.parse(body).ip;
    return callback(null, IP);
  });
};

// const myIP = fetchMyIP((error, data) => {console.log(data)});
// console.log("My IP:", myIP);

const fetchCoordsByIP = function(ipString, callback) {
  const theirIP = ipString;
  const url = "https://freegeoip.app/json/" + theirIP;
  request(url, (error, response, body) => {
    if (error !== null) {
      let phrase = "Something went wrong! " + error;
      return callback(phrase);
    }
    if (response.statusCode !== 200) {
      return callback(`Something went wrong! ERROR:${response.statusCode}`);
    }
    const { latitude, longitude } = JSON.parse(body);
    return callback(null, {latitude, longitude});
  });
};

const fetchISSFlyoverTimes = function(coords, callback) {
  const LAT = coords['latitude'];
  const LON = coords['longitude'];
  // console.log(LAT, LON)
  const url = `http://api.open-notify.org/iss-pass.json?lat=${LAT}&lon=${LON}`
  request(url, (error, response, body) => {
    const status = response.statusCode;
    if (error) {
      console.log("Something went wrong! ", error)
      return callback(error, null);
    }
    if (status !== 200) {
      console.log("Something went wrong! ", status)
      return callback(status)
    }
    const spotTimes = JSON.parse(body).response;
    return callback(null, spotTimes);
  })
}

// const nextISSTimesForMyLocation = function(callback) {
//   fetchMyIP(() => {
//     if (error) {
//       return callback(error, null);
//     }
//     fetchCoordsByIP((ip, (error, coords) => {
//       if (error) {
//         return callback(error, null);
//       }
//       fetchISSFlyoverTimes(coords, (error, spotTimes) => {
//         if (error) {
//           return callback(error);
//         }
//         return spotTimes
//       })
//     }))
//   })
//   // const idk = fetchIP
//   // console.log('val is:' ,idk)
// }


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyoverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};


// console.log(nextISSTimesForMyLocation((data) => console.log(data)))
module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyoverTimes,
  nextISSTimesForMyLocation
};