"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT;
const handleWeather = require("./controllers/Weather.controller");
const moviesInformation = require("./controllers/Movies.controller");


app.get("/", (req, res) => {
  res.status(200).send("Hi from Jordan");
});

app.get('/weather',handleWeather);
app.get("/movies", moviesInformation )

app.listen(process.env.PORT, () =>
 console.log(`Server up on ${process.env.PORT}`));















// "use strict";

// const express = require("express");
// require("dotenv").config();
// const cors = require("cors");
// const app = express();
// app.use(cors());
// // const weatherData = require("./data/Weather.json");
// const axios=require("axios");
// const PORT = process.env.PORT;
// const moviesInformation= require("./controllers/Movies.controller");
// const handleWeather=require("./controllers/Weather.controller");
// const { request } = require("express");
// const Cache= require('./helpers/cache');
// let cache=new Cache();




// app.get("/", (req, res) => {
//   res.status(200).send("Hi from Jordan");
// });

// app.get('/weather',handleWeather);
// app.get("/movies", moviesInformation )

// app.listen(PORT, () => {
//   console.log('Hello ')
// });









