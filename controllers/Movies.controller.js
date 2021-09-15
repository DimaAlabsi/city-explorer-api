"use strict";
const Movie= require('../models/Movies.model');
const axios=require("axios");


let moviesInformation =async (req, res) => {
    let city_name = req.query.query.toLowerCase();
    let movies= await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_name}`)
    let moviesData = movies.data.results.map((i) => {
      return new Movie(
        i.title,
        i.overview,
        i.release_date,
        i.vote_average,
        i.vote_count,
        
      );
    });
              res.status(200).json(moviesData)
      }
// app.get("/movies", moviesData )
 module.exports=moviesInformation;