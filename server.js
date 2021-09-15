"use strict";

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
const weatherData = require("./data/Weather.json");
const axios=require("axios");

const PORT = process.env.PORT;



app.listen(PORT, () => {});

app.get("/data", (req, res) => {
  res.status(200).send("Hi from Jordan");
});

class Forecast {
  constructor(date, description) {
    (this.date = date), (this.description = description);
  }
}
// ----------lab7:------------

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

// ------------lab8----------------
// if (city_name){
//   let weatherDetails= 
// await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&city=${city_name}`)

//   let arr = weatherData.data.data.map((i)=>{

//     return new Forecast(i.datetime, i.weather.description);
//   })
// });

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

}
}
app.get('/weather',handleWeather)


// ----------movies----------

app.get("/movies", async (req, res) => {
  let city_name = req.query.city.toLowerCase();
  const movies= await axios.get(`https://api.themoviedb.org/3/movie/157336?api_key=${process.env.MOVIE_API_KEY}&city=${city_name}`)
  // https://api.themoviedb.org/3/movie/157336?api_key=
  // movies
  let moviesData = movies_name.production_companies.map((i) => {
    return new Forecast(
      i.movies.production_companies,
      i.genres.name,
      i.valid_date,
      i.overview,
    );
  });
  res.status(200).json(moviesData)
   
}  )
  






