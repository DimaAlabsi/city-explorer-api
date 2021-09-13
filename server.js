"use strict";

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
const weatherData = require("./data/Weather.json");
const PORT = process.env.PORT;

app.get('/data',(req,res)=>{
  res.status(200).send('Hi from Jordan');

});

class Forecast {
  constructor(date, description) {
    (this.date = date), (this.description = description);
  }
}

app.get("/weather", (req, res) => {
  let lat = Number(req.query.lat);
  let lon = Number(req.query.lon);
  let city_name = req.query.searchQuery.toLowerCase();

  if (city_name) {
    const arr = weatherData.find((item) => {
      return item.city_name.toLowerCase() === city_name;
    });
    let weatherDetails = arr.data.map((i) => {
      return new Forecast(i.datetime, i.weather.description);
    });

    res.json(weatherData);
  }
});
app.listen(PORT, () => {
});
