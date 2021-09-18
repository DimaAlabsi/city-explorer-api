"use strict";

class Movie {
  constructor(movie) {
    (this.name = movie.title),
      (this.voteAvg = movie.vote_average),
      (this.votCount = movie.vote_count),
      (this.date = movie.release_date),
      (this.description = movie.overview),
      (this.img = movie.poster_path);
  }
}
// constructor(title, overview, date, voteAvg, votCount,img) {
//   (this.title = title),
//     (this.overview = overview),
//       (this.voteAvg = voteAvg),
//     (this.votCount = votCount),
//     (this.date = date),
//     this.img=img
// }

module.exports = Movie;
