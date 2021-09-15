"use strict";

class Movie {
  constructor(title, overview, date, voteAvg, votCount) {
    (this.title = title),
      (this.overview = overview),
        (this.voteAvg = voteAvg),
      (this.votCount = votCount),
      (this.date = date)
  }
}
module.exports = Movie;

