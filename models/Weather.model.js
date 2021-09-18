"use strict";

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
}

// class Forecast {
//   constructor(date, description) {
//     (this.date = date), (this.description = description);
//   }
// }
module.exports = Weather;
