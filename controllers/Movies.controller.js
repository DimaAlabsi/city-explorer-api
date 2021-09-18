"use strict";
const axios = require("axios");

const Movie = require("../models/Movies.model");
let cache = require("../helpers/cache");

let moviesInformation = (req, res) => {
  let city_name = req.query.query.toLowerCase();

  getMovie(city_name)
    .then((summaries) => res.json(summaries))
    .catch((error) => {
      console.error(error);
      res.status(200).send("Sorry. Something went wrong!");
    });
};

let getMovie = (city_name) => {
  const key = "movie-" + city_name;
  let city = city_name;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;

  if (cache[key] && Date.now() - cache[key].timestamp < 50000) {
    console.log("Cache hit");
  } else {
    console.log("Cache miss");
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(url)
      .then((res) => parseMovie(res.data));
  }

  return cache[key].data;
};

let parseMovie = (movieData) => {
  try {
    const movieSummaries = movieData.results.map((item) => {
      return new Movie(item);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
};

module.exports = moviesInformation;

// let moviesInformation =async (req, res) => {
//     let city_name = req.query.query.toLowerCase();
//     let movies= await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_name}`)
//     let moviesData = movies.data.results.map((i) => {
//       return new Movie(
//         i.title,
//         i.overview,
//         i.release_date,
//         i.vote_average,
//         i.vote_count,
//         i.poster_path

//       );
//     });
//               res.status(200).json(moviesData)
//       }
// // app.get("/movies", moviesData )
//  module.exports=moviesInformation;
