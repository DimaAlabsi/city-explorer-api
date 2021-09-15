"use strict";
const Forecast=require('../models/Weather.model');
const axios=require("axios");

// ------------lab8----------------
let handleWeather= async (req,res)=>{
  let lat = Number(req.query.lat);
  let lon = Number(req.query.lon);
  let city_name = req.query.city.toLowerCase();
  if (city_name){
  let url=`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&city=${city_name}`;

  const axiosResponse= await axios.get(url);
  let weatherDetails=axiosResponse.data.data.map(i=>{
      return new Forecast(i.datetime,
        i.weather.description);
  })
 res.status(200).json(weatherDetails);

}}
module.exports= handleWeather;


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