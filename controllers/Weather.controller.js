"use strict";
const axios = require("axios");
const Weather = require("../models/Weather.model");
let cache = require("../helpers/cache");

let handleWeather = (req, res) => {
  let lat = Number(req.query.lat);
  let lon = Number(req.query.lon);
  // let city_name = req.query.city.toLowerCase();
  getWeather(lat, lon)
    .then((summaries) => res.send(summaries))
    .catch((error) => {
      console.error(error);
      res.status(200).send("Sorry. Something went wrong!");
    });
};

let getWeather = (latitude, longitude) => {
  const key = "weather-" + latitude + longitude;
  const url = `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${process.env.WEATHER_API_KEY}`;

  if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
    console.log("Cache hit");
  } else {
    console.log("Cache miss");
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url).then((res) => parseWeather(res.data));
  }

  return cache[key].data;
};

let parseWeather = (weatherData) => {
  try {
    const weatherSummaries = weatherData.data.map((day) => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
};

module.exports = handleWeather;




// // ------------lab8----------------
// let handleWeather= async (req,res)=>{
//   let lat = Number(req.query.lat);
//   let lon = Number(req.query.lon);
//   let city_name = req.query.city.toLowerCase();
//   // if (city_name){
//     let currentDate=new Date()
//   let url=`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&city=${city_name}`;

// if (cache.data.length>0 && cache.date.getDate()===currentDate.getDate());
// {
//   res.json({"data":cache});
// }

//  const axiosResponse= await axios.get(url);
//           cache.data=express.data;
//             cache.date=currentDate;
//   let weatherDetails=axiosResponse.data.data.map(i=>{
//       return new Forecast(i.datetime,
//         i.weather.description);
//   })

//   res.json({"data":cache.data})
// //  res.status(200).json(weatherDetails);

// }

// // }
// module.exports= handleWeather;

// / ----------lab7:------------
// app.get("/weather", (req, res) => {
//   let lat = Number(req.query.lat);
//   let lon = Number(req.query.lon);
//   let city_name = req.query.searchQuery.toLowerCase();
//   if (city_name) {
//     let arr = weatherData.find((item) => {
//       return item.city_name.toLowerCase() === city_name;
//     });
//     if (arr) {
//       let weatherDetails = arr.data.map((i) => {
//         return new Forecast(i.datetime, i.weather.description);
//       });
//       res.status(200).json(weatherDetails);
//     } else {
//       res.status(404).send("This location doesnot found");
//     }
//   } else {
//     res.status(400).send("Something went wrong");
//   }
// });
