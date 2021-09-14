"use strict";

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
app.use(cors());
const weatherData = require('./data/Weather.json');
const PORT = process.env.PORT;


app.listen(PORT, () => {});

app.get("/data", (req, res) => {
  res.status(200).send("Hi from Jordan");
});

class Forecast {
  constructor(date, description) {
    (this.date = date), (this.description = description);
  }

  // searchQuery
}

app.get("/weather", (req, res) => {
  let lat = Number(req.query.lat);
  let lon = Number(req.query.lon);
  let city_name = req.query.searchQuery.toLowerCase();

  if (city_name) {
    let arr = weatherData.find((item) => {
      return item.city_name.toLowerCase() === city_name;
    });
    if (arr) {
      let weatherDetails = arr.data.map((i) => {
        return new Forecast(i.datetime, i.weather.description);
      });

      res.status(200).json(weatherDetails);
    } else {
      res.status(404).send("This location doesnot found");
    }
  } else {
    res.status(400).send("Something went wrong");
  }
});
